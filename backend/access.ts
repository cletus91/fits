import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// console.log('generatedPermission', generatedPermissions);

export const permissions = {
  ...generatedPermissions,
};

// rule based function
// return true or false or filter with limits which products the user can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    //   1. Do they have permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own the product
    return { user: { id: session.itemId } };
  },
};
