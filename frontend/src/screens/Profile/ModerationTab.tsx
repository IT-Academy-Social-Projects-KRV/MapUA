import React, { memo, useEffect } from 'react';
import { Avatar, Box } from '@mui/material';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import {
  selectLocationList,
  selectLocationsListLoading
} from 'redux/memoizedSelectors/locationListSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { StyledCardProfileTabs } from 'components/design/StyledCardProfileTabs';
import { Link, useNavigate } from 'react-router-dom';
import { StyledTabComponentBox } from 'components/design/StyledTabComponentBox';
import CircularLoader from '../../components/CircularLoader/CircularLoader';
import imageNotFound from '../../static/image-not-found.jpg';

interface Props {
  t: string;
  fetchLocationsForModeration: () => void;
}

const ModerationTab = ({ t, fetchLocationsForModeration }: Props) => {
  const locations = useTypedSelector(selectLocationList);
  const loading = useTypedSelector(selectLocationsListLoading);

  const { setLocationName } = useTypedDispatch();

  const navigate = useNavigate();

  const redirectToLocation = (locationId: string, locationName: string) => {
    setLocationName(locationName);
    navigate(`/moderation/${locationId}`);
  };

  useEffect(() => {
    fetchLocationsForModeration();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  if (!locations.length) {
    return <Box>{t}</Box>;
  }

  return (
    <>
      {locations.map(
        ({ _id: locationId, locationName, arrayPhotos: [locationPhoto] }) => (
          <StyledTabComponentBox
            onClick={() => redirectToLocation(locationId, locationName)}
            key={locationId}
          >
            <StyledCardProfileTabs>
              <Link to={`/${locationId}`}>
                <Avatar src={locationPhoto || imageNotFound} />
              </Link>
              <Link to={`/${locationId}`} style={{ textDecoration: 'none' }}>
                {locationName}
              </Link>
            </StyledCardProfileTabs>
          </StyledTabComponentBox>
        )
      )}
    </>
  );
};

export default memo(ModerationTab);
