import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  //   1. Get the existing product

  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  // console.log(data);

  //   2. Get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // console.log('updateData', updateData);

  //   3. Form to handle the update

  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await updateProduct({
            variables: {
              id,
              name: inputs.name,
              description: inputs.description,
              price: inputs.price,
            },
          }).catch(console.log(error));
          // console.log('res', res);
          //   clearForm();
        }}
      >
        <DisplayError error={error || updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="name">
            Name
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Cletus"
              value={inputs.name || ''}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              name="price"
              id="price"
              placeholder="200"
              value={inputs.price || 0}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              placeholder="These are some nice shoes"
              value={inputs.description || ''}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update Product</button>
        </fieldset>
      </Form>
    </div>
  );
}
