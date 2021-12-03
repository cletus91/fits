import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Order = list({
  fields: {
    total: integer({ isRequired: true }),
    user: relationship({
      ref: 'User.order',
    }),
    items: relationship({
      ref: 'OrderItem.order',
      many: true,
    }),
  },
});
