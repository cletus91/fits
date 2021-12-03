/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('You must be signed in to create an order');
  }
  //   1.5 query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
       id
       name
       email
       cart {
        id
        quantity
        product {
            id
            name
            price
            description
            photo {
                id
                image {
                    id
                    publicUrlTransformed
                }
            }
        }
       }
    `,
  });
  console.dir(user, { dept: null });
  const cartItems = user.cart.filter((cartItem) => cartItem.product);

  // 2. calc the total price for their order
  const totalPrice = cartItems.reduce(
    (total: number, cartItem: CartItemCreateInput) => {
      return total + cartItem.quantity * cartItem.product.price;
    },
    0
  );
  console.log(totalPrice);
  // 3. create charge with stripe library

  const charge = await stripeConfig.paymentIntents
    .create({
      amount: totalPrice,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  // 4. convert cart items to order items
  // 5. create order and return it
}

export default checkout;
