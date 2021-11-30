/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerms: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerms }
          { description_contains_i: $searchTerms }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 300);
  resetIdCounter();
  const {
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
  } = useCombobox({
    items: [],
    onInputValueChange() {
      console.log('Input changed');
      findItemsButChill({
        variables: {
          searchTerms: inputValue,
        },
      });
    },
    onSelectedItemChange() {
      console.log('Selected item change');
    },
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search an Item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {items.map((item) => (
          <DropDownItem key={item.id}>
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.name}
              width="50"
              height="50"
            />
            {item.name}
          </DropDownItem>
        ))}
      </DropDown>
    </SearchStyles>
  );
}
