import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';

export default async function addToCart(
	root: any,
	{ productId }: { productId: string },
	context: KeyStoneContext
): Promise<CartItemCreateInput> {
	console.log('ADDING TO CART');
}
