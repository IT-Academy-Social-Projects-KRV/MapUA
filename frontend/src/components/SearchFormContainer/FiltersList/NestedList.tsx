/* eslint-disable no-unused-vars */
import React, { memo, useCallback, useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Checkbox, ListItemText } from '@mui/material';
import { selectFiltersListfilters } from 'redux/memoizedSelectors/filtersListSelectors';
import { selectIsUserAuthorized } from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import {
  selectMapInfoBounds,
  selectMapInfoFilters
} from 'redux/memoizedSelectors/mapInfoSelectors';

import {
  selectUserDataFavorite,
  selectUserDataPersonalLocations,
  selectUserDataSubscriptions,
  selectUserDataVisited
} from 'redux/memoizedSelectors/userDataSelectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { mainFilters, mainFiltersUa } from '../../../static/mainFIlters';
import { StyledList } from '../../design/StyledList';

type NestType = {
  [key: number]: boolean;
};

function NestedList() {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('i18nextLng');
  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState<NestType>({});
  const [selectedFiltersUa, setSelectedFiltersUa] = useState<string[]>([]);

  const bounds = useTypedSelector(selectMapInfoBounds);
  const selectedFilters = useTypedSelector(selectMapInfoFilters);

  const subscriptions = useTypedSelector(selectUserDataSubscriptions);
  const personalLocations = useTypedSelector(selectUserDataPersonalLocations);
  const visited = useTypedSelector(selectUserDataVisited);
  const favorite = useTypedSelector(selectUserDataFavorite);

  const isAuthorized = useTypedSelector(selectIsUserAuthorized);

  const {
    setFilters,
    setAuthorizedListOfFiltersOptions,
    setUnauthorizedListOfFiltersOptions,
    setAuthorizedFilters
  } = useTypedDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (isAuthorized) {
      setAuthorizedListOfFiltersOptions(subscriptions, t);
    } else {
      setUnauthorizedListOfFiltersOptions(t);
    }
  }, [subscriptions, isAuthorized, currentLanguage]);

  useEffect(() => {
    let authorizedFilters: string[] = [];
    setAuthorizedFilters([]);
    if (selectedFilters.includes('favorites')) {
      authorizedFilters = [...authorizedFilters, ...favorite];
      setAuthorizedFilters(authorizedFilters);
    }
    if (selectedFilters.includes('visited')) {
      authorizedFilters = [...authorizedFilters, ...visited];
      setAuthorizedFilters(authorizedFilters);
    }
    if (selectedFilters.includes('personal')) {
      authorizedFilters = [...authorizedFilters, ...personalLocations];
      setAuthorizedFilters(authorizedFilters);
    }
  }, [selectedFilters, bounds]);

  const filters = useTypedSelector(selectFiltersListfilters);

  const AddSelectedFiltersUaLogic = (selectedValue: string) => {
    if (selectedFiltersUa.some(f => f === selectedValue)) {
      setSelectedFiltersUa(selectedFiltersUa.filter(f => f !== selectedValue));
    } else {
      setSelectedFiltersUa([...selectedFiltersUa, selectedValue]);
    }
  };

  const OnChange = (selectedValue: string, filterId: number, index: number) => {
    let value: string = selectedValue;
    if (currentLanguage === 'ua') {
      AddSelectedFiltersUaLogic(selectedValue);
      if (filterId === 5) {
        value = selectedValue;
      } else value = mainFilters[filterId - 1].values[index];
    }

    if (currentLanguage === 'en') {
      if (filterId === 5) {
        AddSelectedFiltersUaLogic(selectedValue);
      } else
        AddSelectedFiltersUaLogic(mainFiltersUa[filterId - 1].values[index]);
    }

    if (selectedFilters.some(f => f === value)) {
      setFilters(selectedFilters.filter(f => f !== value));
    } else {
      setFilters([...selectedFilters, value]);
    }
  };

  const onChecked = (nestedFilter: any) => {
    switch (currentLanguage) {
      case 'ua':
        return selectedFiltersUa.some(f => f === nestedFilter);

      case 'en':
        return selectedFilters.some(f => f === nestedFilter);

      default:
        return false;
    }
  };

  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);
  const handleClickNested = (id: number) => {
    setOpenNested((prevState: any) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <StyledList aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={t('common.filters')} />
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <StyledList>
          {filters.map((filter: any) => (
            <Box key={filter.id}>
              <ListItemButton onClick={() => handleClickNested(filter.id)}>
                <ListItemText primary={filter.type} />
                {openNested[filter.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openNested[filter.id]} timeout="auto">
                <StyledList>
                  {filter.values?.map((nestedFilter: any, index: number) => (
                    <ListItemButton
                      onClick={() =>
                        OnChange(
                          typeof nestedFilter === 'object'
                            ? nestedFilter._id
                            : nestedFilter,
                          filter.id,
                          index
                        )
                      }
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="pl-4"
                    >
                      <Checkbox
                        checked={onChecked(
                          typeof nestedFilter === 'object'
                            ? nestedFilter._id
                            : nestedFilter
                        )}
                        edge="start"
                      />
                      <ListItemText
                        primary={
                          typeof nestedFilter === 'object'
                            ? nestedFilter.displayName
                            : nestedFilter
                        }
                      />
                    </ListItemButton>
                  ))}
                </StyledList>
              </Collapse>
            </Box>
          ))}
        </StyledList>
      </Collapse>
    </StyledList>
  );
}

export default memo(NestedList);
