/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Checkbox, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { mainFilters, mainFiltersUa } from '../../../static/mainFIlters';
import { StyledList } from './style';

type NestType = {
  [key: number]: boolean;
};

export default function NestedList() {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem('i18nextLng');

  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState<NestType>({});
  const [selectedFiltersUa, setSelectedFiltersUa] = useState<string[]>([]);

  const selectedFilters = useTypedSelector(
    state => state.locationList.selectedFilters
  );

  const { isAuthorized } = useTypedSelector(state => state.userAuth);

  const { applyFilter, fetchFilters, fetchFiltersWithoutAuth } =
    useTypedDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (isAuthorized) {
      fetchFilters(accessToken || '', t);
    } else {
      fetchFiltersWithoutAuth(t);
    }
  }, [isAuthorized, currentLanguage]);

  const filters = useTypedSelector(state => state.userFilters.filters);
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
      value = mainFilters[filterId - 1].values[index];
    }

    if (currentLanguage === 'en') {
      AddSelectedFiltersUaLogic(mainFiltersUa[filterId - 1].values[index]);
    }

    if (selectedFilters.some(f => f === value)) {
      applyFilter(selectedFilters.filter(f => f !== value));
    } else {
      applyFilter([...selectedFilters, value]);
    }
  };

  const OnChaked = (nestedFilter: any) => {
    switch (currentLanguage) {
      case 'ua':
        return selectedFiltersUa.some(f => f === nestedFilter);

      case 'en':
        return selectedFilters.some(f => f === nestedFilter);

      default:
        return false;
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };
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
                      onClick={() => OnChange(nestedFilter, filter.id, index)}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="pl-4"
                    >
                      <Checkbox
                        checked={OnChaked(nestedFilter)}
                        edge="start"
                        onChange={() => null}
                        value={nestedFilter}
                      />
                      <ListItemText primary={nestedFilter} />
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
