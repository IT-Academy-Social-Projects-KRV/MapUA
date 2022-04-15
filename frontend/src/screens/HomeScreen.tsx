import * as React from 'react';
import { Button, Container } from '@mui/material';
import Map from 'components/Map/index';
import SendFileFormTest from 'components/SendFileFormTest';
import BigPopup from 'components/BigPopup/index';

function HomeScreen() {
  const [isOpen, setIsopen] = React.useState(false);
  return (
    <div>
      <BigPopup isOpen={isOpen} toggleClose={() => setIsopen(false)} />
      <Button variant="text" onClick={() => setIsopen(true)} sx={{ ml: 100 }}>
        Open Popup
      </Button>

      <Container onClick={() => setIsopen(false)}>
        <Map />
        <SendFileFormTest />
      </Container>
    </div>
  );
}

export default HomeScreen;
