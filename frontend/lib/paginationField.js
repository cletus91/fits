import { PAGINATION_QUERY } from '../pages/products/index';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      //   console.log({ existing, args, cache });
      const { skip, first } = args;
      // Read no. of items on page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      //   Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      //   If tehre are items and there aren't enought items to satisy how many were requested
      //   and we are on the last page then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      //   If we don't have any items, go to the netwrok to fetch them; the merge function will be executed
      if (items.length !== first) {
        return false;
      }

      //   If there are items return them from cache and we don't need to go to the network
      if (items.length) {
        return items;
      }

      return false; // fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      return merged;
    },
  };
}
