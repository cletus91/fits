import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function updateCache(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update: updateCache,
    }
  );
  return (
    <div>
      <button
        disabled={loading}
        type="button"
        onClick={() => {
          if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id).catch((error) =>
              alert(
                `This action cannot be performed. GraphQL Error: ${error.message}`
              )
            );
            console.log(id);
          }
        }}
      >
        {children}
      </button>
    </div>
  );
}
