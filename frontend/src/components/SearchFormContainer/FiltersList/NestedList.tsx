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
import { StyledList } from './style';

type NestType = {
  [key: number]: boolean;
};

export default function NestedList() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState<NestType>({});

  const selectedFilters = useTypedSelector(
    state => state.mapInfo.selectedFilters
  );
  const { subscriptions } = useTypedSelector(state => state.userData.data);
  const { data: isAuthorized } = useTypedSelector(
    state => state.isUserAuthorized
  );

  const {
    setFilters,
    setAuthorizedListOfFiltersOptions,
    setUnauthorizedListOfFiltersOptions
  } = useTypedDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (isAuthorized) {
      setAuthorizedListOfFiltersOptions(subscriptions);
    } else {
      setUnauthorizedListOfFiltersOptions();
    }
  }, [isAuthorized]);

  const filters = useTypedSelector(state => state.filtersList.filters);

  const OnChange = (value: string) => {
    if (selectedFilters.some(f => f === value)) {
      setFilters(selectedFilters.filter(f => f !== value));
    } else {
      setFilters([...selectedFilters, value]);
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
                      onClick={() => OnChange(nestedFilter)}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="pl-4"
                    >
                      <Checkbox
                        checked={selectedFilters.some(f => f === nestedFilter)}
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
