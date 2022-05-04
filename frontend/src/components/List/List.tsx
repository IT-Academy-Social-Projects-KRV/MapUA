import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Checkbox, ListItemText } from '@mui/material';

import { StyledList } from './style';

const filterGroups = [
  {
    id: 1,
    title: 'Dashboard'
  },
  {
    id: 2,
    title: 'Form'
  },
  {
    id: 3,
    title: 'List'
  },
  {
    id: 4,
    title: 'Profile'
  },
  {
    id: 5,
    title: 'Result'
  },
  {
    id: 6,
    title: 'Account'
  }
];

export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const [openNested, setOpenNested] = React.useState<any>({});
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
      <Collapse in={open} timeout="auto" unmountOnExit>
        <StyledList>
          {filterGroups.map(filter => (
            <>
              <ListItemButton onClick={() => handleClickNested(filter.id)}>
                <ListItemText primary={filter.title} />
                {openNested[filter.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openNested[filter.id]} timeout="auto" unmountOnExit>
                <StyledList>
                  <ListItemButton className="pl-4">
                    <Checkbox edge="start" tabIndex={-1} disableRipple />
                    <ListItemText primary={filter.title} />
                  </ListItemButton>
                </StyledList>
              </Collapse>
            </>
          ))}
        </StyledList>
      </Collapse>
    </StyledList>
  );
}
