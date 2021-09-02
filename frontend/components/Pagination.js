import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  const totalItems = data._allProductsMeta.count;
  const totalPages = Math.ceil(totalItems / perPage);
  return (
    <PaginationStyles>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page === 1}>Prev 👈</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <p>Total items: {totalItems} </p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page === totalPages}>Next 👉</a>
      </Link>
    </PaginationStyles>
  );
}
