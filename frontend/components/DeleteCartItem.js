import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
      quantity
    }
  }
`;

const DeleteButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function DeleteCartItem({ id }) {
  const [deleteCartItem, { loading }] = useMutation(DELETE_CART_ITEM_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <div>
      <DeleteButton
        title="Remove Item from Cart"
        disabled={loading}
        type="DeleteButton"
        onClick={deleteCartItem}
      >
        &times;
      </DeleteButton>
    </div>
  );
}
