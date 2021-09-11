import Link from 'next/link';
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';

export default function Pagination({ productCount, pageCount, page }) {
  return (
    <PaginationStyles>
      <Head>
        <title>
          Fits - Page {page} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev 👈</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>Total items: {productCount} </p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next 👉</a>
      </Link>
    </PaginationStyles>
  );
}
