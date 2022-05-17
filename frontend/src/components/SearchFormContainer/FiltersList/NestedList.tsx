/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
  let processedFilters;

  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState<NestType>({});

  const selectedFilters = useTypedSelector(
    state => state.locationList.selectedFilters
  );

  const userIsSignedIn = useTypedSelector(state => state.userLogin.isLogged);

  const userSubscriptions = useTypedSelector(
    state => state.user.data.subscriptions
  );

  // console.log('userSubscriptions: ', userSubscriptions);

  // const testData = useTypedSelector(state => state);
  // console.log('testData: ', testData);

  const { applyFilter, fetchUser } = useTypedDispatch();

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

  // useEffect(() => {
  //   if (userIsSignedIn) {
  //     const accessToken = localStorage.getItem('accessToken');
  //   fetchUser(accessToken || '');
  //   }
  // }, [userIsSignedIn]);

  if (userIsSignedIn) {
    const lastId = mainFilters.length;
    const newArrayEl = {
      id: lastId + 1,
      forLoggedUser: true,
      type: 'Subscriptions',
      values: userSubscriptions
    };
    processedFilters = [...mainFilters, newArrayEl];
  } else {
    processedFilters = mainFilters.filter(el => el.forLoggedUser === false);
  }

  return (
    <StyledList aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary="Filters" />
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <StyledList>
          {processedFilters.map(filter => (
            <Box key={filter.id}>
              <ListItemButton onClick={() => handleClickNested(filter.id)}>
                <ListItemText primary={filter.type} />
                {openNested[filter.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openNested[filter.id]} timeout="auto">
                <StyledList>
                  {filter.values?.map(nestedFilter => (
                    <ListItemButton
                      onClick={() => OnChange(nestedFilter)}
                      key={useId()}
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
