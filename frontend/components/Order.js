import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import OrderStyles from './styles/OrderStyles';
import OrderItem from './OrderItem';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    allOrders(where: { id: $id }) {
      total
      user {
        name
        email
      }
      items {
        name
        quantity
        price
        photo {
          image {
            publicUrlTransformed
          }
          altText
        }
      }
      charge
    }
  }
`;

export default function Order({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <OrderStyles>
      {data?.allOrders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </OrderStyles>
  );
}
