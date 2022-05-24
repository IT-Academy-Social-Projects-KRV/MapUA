import React from 'react';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

import { StyledSearchForm } from './style';

function SearchForm() {
  const { t } = useTranslation();

  const { getLocationName } = useTypedDispatch();
  const { locationName } = useTypedSelector(state => state.locationList);
  const handleChange = (e: any): void => {
    getLocationName(e.target.value);
  };
  return (
    <StyledSearchForm
      value={locationName}
      onChange={handleChange}
      placeholder={t('searchForm.search')}
    />
  );
}

export default SearchForm;
