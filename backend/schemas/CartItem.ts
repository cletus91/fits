/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const CartItem = list({
	// TODO
	// access:
	fields: {
		quantity: integer({
			defaultValue: 1,
			isRequired: true,
		}),
		product: relationship({ ref: 'Product' }),
		user: relationship({
			ref: 'User.cart',
			many: true,
			ui: {
				createView: { fieldMode: 'hidden' },
				listView: {
					fieldMode: 'read',
				},
			},
		}),
	},
	ui: {
		listView: {
			initialColumns: ['product', 'quantity', 'user'],
		},
	},
});
