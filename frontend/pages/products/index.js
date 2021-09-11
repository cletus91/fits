import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import DisplayError from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';
import { perPage } from '../../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  if (query.page > pageCount && typeof window !== 'undefined') {
    const router = useRouter();
    query.page = pageCount;
    router.push({
      pathname: `/products/${pageCount}`,
    });
  }

  return (
    <div>
      <Pagination productCount={count} page={page || 1} pageCount={pageCount} />
      <Products page={page || 1} />
      <Pagination productCount={count} page={page || 1} pageCount={pageCount} />
    </div>
  );
}
