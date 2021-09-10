import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
      price
      description
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ pageNum }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: pageNum * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductListStyles>
        {data?.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductListStyles>
    </div>
  );
}
