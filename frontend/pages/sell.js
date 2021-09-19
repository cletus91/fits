import CreateProduct from '../components/CreateProduct';
import PleaseSignIn from '../components/PleaseSignIn';

export default function sell() {
  return (
    <PleaseSignIn>
      <p>Create a Product Listing</p>
      <CreateProduct />
    </PleaseSignIn>
  );
}
