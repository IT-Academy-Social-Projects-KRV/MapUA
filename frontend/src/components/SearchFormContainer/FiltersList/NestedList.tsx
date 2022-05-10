/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Checkbox, ListItemText } from '@mui/material';
import useId from '@mui/material/utils/useId';
import { mainFilters } from 'static/mainFIlters';
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
  const { applyFilter } = useTypedDispatch();

  const OnChange = (e: any) => {
    const ischecked = e.target.checked;
    if (ischecked) {
      applyFilter([...selectedFilters, e.target.value]);
    } else {
      const index = selectedFilters.indexOf(e.target.value);
      selectedFilters.splice(index, 1);
      applyFilter(selectedFilters);
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
          {mainFilters.map(filter => (
            <Box key={filter.id}>
              <ListItemButton onClick={() => handleClickNested(filter.id)}>
                <ListItemText primary={filter.type} />
                {openNested[filter.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openNested[filter.id]} timeout="auto">
                <StyledList>
                  {filter.values?.map(nestedFilter => (
                    <ListItemButton key={useId()} className="pl-4">
                      <Checkbox
                        edge="start"
                        onChange={OnChange}
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
