import React from 'react';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { StyledSearchForm } from './style';

function SearchForm() {
  const { getLocationName } = useTypedDispatch();
  const { locationName } = useTypedSelector(state => state.locationList);
  const handleChange = (e: any): void => {
    getLocationName(e.target.value);
  };
  return (
    <StyledSearchForm
      value={locationName}
      onChange={handleChange}
      placeholder="Search"
    />
  );
}

export default SearchForm;
