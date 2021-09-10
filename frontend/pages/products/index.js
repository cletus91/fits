import gql from 'graphql-tag';
import { useEffect } from 'react';
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
  const router = useRouter();
  let page = parseInt(query.page);
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  console.log(router);
  // const router = useRouter();
  useEffect(() => {
    if (page > pageCount) {
      page = pageCount;
      router.push({
        pathname: `/products/${pageCount}`,
      });
    }
  }, [page]);

  return (
    <div>
      <Pagination
        productCount={count}
        page={query.page || 1}
        pageCount={pageCount}
      />
      <Products page={query.page || 1} />
      <Pagination
        productCount={count}
        page={query.page || 1}
        pageCount={pageCount}
      />
    </div>
  );
}
