import NestedList from 'components/SearchFormContainer/FiltersList/NestedList';
import SearchForm from 'components/SearchFormContainer/SearchForm';
import React, { useEffect } from 'react';
import L from 'leaflet';
import { StyledSearchFormContainer } from './style';

function SearchFormContainer() {
  const formRef = React.useRef<any>(null);
  useEffect(() => {
    L.DomEvent.disableClickPropagation(formRef.current);
    L.DomEvent.disableScrollPropagation(formRef.current);
  }, []);

  return (
    <StyledSearchFormContainer ref={formRef}>
      <SearchForm />
      <NestedList />
    </StyledSearchFormContainer>
  );
}

export default SearchFormContainer;
