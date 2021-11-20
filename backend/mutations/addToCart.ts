/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  CartItemWhereInput,
} from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('ADDING TO CART');
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  const allCartItems = await context.lists.CartItem.findMany({
    where: {
      user: { id: sesh.itemId } as CartItemWhereInput,
      product: { id: productId },
    },
    resolveField: 'id, quantity',
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(`There are ${allCartItems} in your cart`);
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  console.log(existingCartItem);

  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
