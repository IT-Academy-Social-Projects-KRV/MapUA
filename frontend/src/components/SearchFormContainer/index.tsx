import NestedList from 'components/List/List';
import SearchForm from 'components/SearchForm';
import React from 'react';
import { StyledSearchFormContainer } from './style';

function SearchFormContainer() {
  return (
    <StyledSearchFormContainer>
      <SearchForm />
      <NestedList />
    </StyledSearchFormContainer>
  );
}

export default SearchFormContainer;
