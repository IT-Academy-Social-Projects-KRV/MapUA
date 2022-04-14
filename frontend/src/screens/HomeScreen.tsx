import * as React from 'react';
import { Container } from '@mui/material';
import Map from 'components/Map';
import BigPopup from 'components/big popup/index';
import Button from '@mui/material/Button';

function HomeScreen() {
  const [isOpen, setIsopen] = React.useState(false);
  return (
    <div>
      <BigPopup isOpen={isOpen} togleClose={() => setIsopen(false)} />
      <Button variant="text" onClick={() => setIsopen(true)} sx={{ ml: 100 }}>
        Open Popup
      </Button>

      <Container onClick={() => setIsopen(false)}>
        HomeScreen
        <Map />
      </Container>
    </div>
  );
}

export default HomeScreen;
