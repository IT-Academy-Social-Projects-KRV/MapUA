import React, { memo } from 'react';
import { selectMapInfolocationName } from 'redux/memoizedSelectors/mapInfoSelectors';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { StyledSearchForm } from '../../design/StyledSearchForm';

function SearchForm() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('locationName');
  const { setLocationName } = useTypedDispatch();
  const locationName = useTypedSelector(selectMapInfolocationName);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setLocationName(e.target.value);
    const query = e.target.value;
    if (locationName.length) {
      setSearchParams({ locationName: query });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setLocationName('');
    setSearchParams({});
  };

  return (
    <StyledSearchForm
      value={locationName || searchQuery || ''}
      onChange={handleChange}
      placeholder={t('searchForm.search')}
      endAdornment={
        locationName || searchQuery ? (
          <Button
            onClick={handleClear}
            style={{
              borderRadius: '50%',
              color: '#949494',
              minWidth: '0'
            }}
          >
            <CancelOutlinedIcon />
          </Button>
        ) : (
          ''
        )
      }
    />
  );
}

export default memo(SearchForm);
