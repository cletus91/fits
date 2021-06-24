import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/">Home</Link>
      <Link href="/sell">Products</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </NavStyles>
  );
}
