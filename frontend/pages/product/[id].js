import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
    }
  }
`;

export default function SingleProduct({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  console.log({ data, loading, error });

  return (
    <div>
      <p>Hello, I'm the single product page</p>
      <p>DATA: {data.Product.name}</p>
    </div>
  );
}
