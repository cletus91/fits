import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'Wes',
    price: 199,
    description: 'Nice shoes',
  });
  return (
    <div>
      <form>
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
          <textarea />
        </label>
      </form>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
      <button type="button" onClick={clearForm}>
        Clear
      </button>
    </div>
  );
}
