import React from 'react';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

import { useSearchParams } from 'react-router-dom';
import { StyledSearchForm } from '../../design/StyledSearchForm';

function SearchForm() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('locationName');
  const { setLocationName } = useTypedDispatch();
  const { locationName } = useTypedSelector(state => state.mapInfo);
  console.log(locationName);
  const handleChange = (e: any): void => {
    setLocationName(e.target.value);
    const query = e.target.value;
    if (locationName.length) {
      setSearchParams({ locationName: query });
    } else {
      setSearchParams({});
    }
  };

  return (
    <StyledSearchForm
      value={locationName || searchQuery || ''}
      onChange={handleChange}
      placeholder={t('searchForm.search')}
    />
  );
}

export default SearchForm;
