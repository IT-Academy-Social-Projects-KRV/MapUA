import TopLocations from 'components/TopLocations/TopLocations';
import TopUsers from 'components/TopUsers/TopUsers';
import { Divider } from '@mui/material';
import React from 'react';
import { StyledBox } from './styles';

const TopList = () => (
  <StyledBox>
    <TopLocations />
    <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5 }} />
    <TopUsers />
  </StyledBox>
);

export default TopList;
