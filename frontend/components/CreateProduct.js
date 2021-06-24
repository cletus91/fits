import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'Wes',
    price: 199,
    description: 'Nice shoes',
  });
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inputs);
        }}
      >
        <fieldset>
          <label htmlFor="image">
            Image
            <input
              type="file"
              name="image"
              id="image"
              required
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Cletus"
              value={inputs.name}
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
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              placeholder="These are some nice shoes"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">+ Add Product</button>
        </fieldset>
      </Form>
    </div>
  );
}
