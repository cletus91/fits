import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
        #   TODO: Cart of current user
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER);
  //   console.log(data);
  return data?.authenticatedItem;
}
