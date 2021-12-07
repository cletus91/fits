import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from '../components/styles/OrderItemStyles';

const USER_ORDER_QUERY = gql`
  query USER_ORDER_QUERY {
    allOrders {
      id
      total
      user {
        name
        email
      }
      items {
        id
        name
        description
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

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function itemsInanOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function ordersPage() {
  const { data, error, loading } = useQuery(USER_ORDER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  //   console.log(data);
  const { allOrders } = data;
  return (
    <div>
      <Head>
        <title>You have ({allOrders.length}) orders</title>
      </Head>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`} key={order.id}>
              <a>
                <div className="order-meta">
                  <p>
                    Total: {itemsInanOrder(order)} Item
                    {itemsInanOrder(order) === 1 ? '' : 's'}
                  </p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.altText}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
