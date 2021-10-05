import Link from 'next/link';
import { useCart } from '../lib/cartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/">Home</Link>
      {user && (
        <>
          <Link href="/sell">Products</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
