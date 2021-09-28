/* eslint-disable react/prop-types */
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export default function CartItem({ cartItem }) {
  //   const { product } = cartItem.product;
  //   if (!product) return null;
  return (
    <CartItemStyles>
      <img
        src={cartItem.product.photo.image.publicUrlTransformed}
        alt={cartItem.product.name}
        width="100"
      />
      <div>
        <h3>{cartItem.product.name}</h3>
        <p>
          {formatMoney(cartItem.product.price)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.product.price)}{' '}
            each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}
