import { Avatar } from '@mui/material';
import React from 'react';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Link, useNavigate } from 'react-router-dom';
import { StyledTabComponentBox } from 'components/design/StyledTabComponentBox';

export const ModerationTab = () => {
  const { data: locations } = useTypedSelector(state => state.locationList);
  const { setLocationName } = useTypedDispatch();
  const navigate = useNavigate();
  const redirectToLocation = (locationId: any, locationName: any) => {
    setLocationName(locationName);
    navigate(`/${locationId}`);
  };
  return (
    <div>
      {locations.map(
        ({ _id: locationId, locationName, arrayPhotos: [locationPhoto] }) => (
          <StyledTabComponentBox
            onClick={() => redirectToLocation(locationId, locationName)}
            key={locationId}
          >
            <Link to={`/${locationId}`}>
              <Avatar src={locationPhoto || ''} />
            </Link>
            <Link to={`/${locationId}`}>{locationName}</Link>
          </StyledTabComponentBox>
        )
      )}
    </div>
  );
};
