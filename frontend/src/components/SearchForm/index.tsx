import React, { useState } from 'react';
import { StyledSearchForm } from './style';

function SearchForm() {
  const [locationName, setlocationName] = useState('');
  const handleChange = (e: any): void => {
    setlocationName(e.target.value);
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
