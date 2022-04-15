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
            name: 'Вася Пупкин',
            dateOfPublic: 'June 22, 2022',
            likeCounter: 231,
            description: `Nam nunc tortor, aliquam in nulla vel, tincidunt faucibus erat. Nunc cursus varius leo, 
            eget convallis est auctor ac. Quisque  sagittis commodo ipsum, ut mattis mauris rhoncus sit amet. Donec hendrerit, dui et porta feugiat, 
            eros nisi ullamcorper ex, vel venenatis quam nunc quis nunc. Phasellus ac orci non quam interdum auctor non ut lorem. Fusce lobortis pulvinar risus a laoreet. Nam congue nisi eu semper tincidunt. Integer eu risus massa. Sed non lorem elementum, dapibus ante sed, 
            elementum ex. Aliquam lacinia nisl at justo auctor, ut consectetur metus vehicula. Nullam ac tortor et diam sodales hendrerit quis eget urna. Etiam malesuada viverra rutrum. Nunc vel pulvinar eros, sed semper nisl.`,
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
