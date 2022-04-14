import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box, IconButton } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PointPopup from '../modals/pointPopup/PointPopup';

function Map() {
  const [popup, setPopup] = useState(false);

  // TODO
  // Function that defines coordinates on mouse click
  // function CoordsFinder() {
  //   useMapEvents({
  //     click(e) {
  //       console.log(e.latlng);
  //     }
  //   });
  //   return null;
  // }

  // <PlaceIcon/> simulates a point on the map
  // Connecting this popup with a map is another Big Task
  return (
    // Test implementation of the popup. Should be moved to another place/component
    // It doesn't block the main screen, it is possible to scroll when the pop-up is open, it opens when you click on a point, you can change it to a hover. Closes with a cross or on the substrate. The checkmark appears/disappears depending on whether the place has already been visited.

    <Box>
      <IconButton>
        <PlaceIcon
          onClick={() => {
            setPopup(true);
          }}
        />
      </IconButton>

      <PointPopup active={popup} setActive={setPopup}>
        {[
          {
            locationName: 'Duke monument',
            avatarMini:
              'https://freepikpsd.com/file/2019/10/avatar-icon-png-5-Images-PNG-Transparent.png',
            name: 'Chief Vasya',
            dateOfPublic: 'June 22, 2022',
            likeCounter: 231,
            visited: true,
            description: `Monument to the Duke de Richelieu in Odessa - a full-length
            bronze monument dedicated to Armand Emmanuel du Plessis, Duke
            de Richelieu, opened in 1828.`,
            comments: [
              {
                userCommentAvatar:
                  'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
                userCommentName: 'Vasya',
                userCommentText: 'Beautiful place'
              }
            ]
          }
        ]}
      </PointPopup>

      <MapContainer
        center={[50.447731, 30.542721]}
        zoom={9}
        style={{ height: '100vh' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </Box>
  );
}

export default Map;
