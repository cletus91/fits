import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  const pageNum = parseInt(query.page);
  return (
    <div>
      <Pagination page={pageNum || 1} />
      <Products />
      <Pagination page={pageNum || 1} />
    </div>
  );
}
