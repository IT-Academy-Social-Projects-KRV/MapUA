/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Checkbox, ListItemText } from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { StyledList } from './style';

type NestType = {
  [key: number]: boolean;
};

export default function NestedList() {
  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState<NestType>({});

  const selectedFilters = useTypedSelector(
    state => state.locationList.selectedFilters
  );

  const userIsSignedIn = useTypedSelector(state => state.userLogin.isLogged);

  const { applyFilter, fetchFilters, fetchFiltersWithoutAuth } =
    useTypedDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchFilters(accessToken);
    } else {
      fetchFiltersWithoutAuth();
    }
  }, [userIsSignedIn]);

  const filters = useTypedSelector(state => state.filterList.filters);

  const OnChange = (value: string) => {
    if (selectedFilters.some(f => f === value)) {
      applyFilter(selectedFilters.filter(f => f !== value));
    } else {
      applyFilter([...selectedFilters, value]);
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
        <ListItemText primary="Filters" />
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <StyledList>
          {filters.map(filter => (
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
