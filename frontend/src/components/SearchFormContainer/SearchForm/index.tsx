import React from 'react';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

import { StyledSearchForm } from '../../design/StyledSearchForm';

function SearchForm() {
  const { t } = useTranslation();

  const { setLocationName } = useTypedDispatch();
  const { locationName } = useTypedSelector(state => state.mapInfo);
  const handleChange = (e: any): void => {
    setLocationName(e.target.value);
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
