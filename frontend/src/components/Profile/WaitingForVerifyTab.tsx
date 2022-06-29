import { Avatar } from '@mui/material';
import React, { useEffect } from 'react';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Link, useNavigate } from 'react-router-dom';
import { StyledTabComponentBox } from 'components/design/StyledTabComponentBox';
import { useTranslation } from 'react-i18next';
import CircularLoader from '../CircularLoader/CircularLoader';
import imageNotFound from '../../static/image-not-found.jpg';

export const WaitingForVerifyTab = () => {
  const { t } = useTranslation();
  const { data: locations, loading } = useTypedSelector(
    state => state.locationList
  );
  const { setLocationName, fetchWaitingForVerifyLocations } =
    useTypedDispatch();

  const navigate = useNavigate();

  const redirectToLocation = (locationId: string, locationName: string) => {
    setLocationName(locationName);
    navigate(`/${locationId}`);
  };

  useEffect(() => {
    fetchWaitingForVerifyLocations();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  if (!locations.length) {
    return <>`${t('profile.basicTabs.noWaitingForVerify')}`</>;
  }

  return (
    <>
      {locations.map(
        ({ _id: locationId, locationName, arrayPhotos: [locationPhoto] }) => (
          <StyledTabComponentBox
            onClick={() => redirectToLocation(locationId, locationName)}
            key={locationId}
          >
            <Link to={`/${locationId}`}>
              <Avatar src={locationPhoto || imageNotFound} />
            </Link>
            <Link to={`/${locationId}`}>{locationName}</Link>
          </StyledTabComponentBox>
        )
      )}
    </>
  );
};
