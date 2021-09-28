import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

export default function Cart() {
  const me = useUser();
  if (!me) return null;

  console.log(me);
  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
