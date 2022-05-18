import * as React from 'react';
import { useState } from 'react';
import { Tabs, Tab, Typography, Box, Button, TextField } from '@mui/material';

interface TabPanelProps {
  children?: any;
  index: number;
  value: number;
}

const defaultProps = {
  children: 'Firt tab'
};

function TabPanel(props: TabPanelProps & typeof defaultProps) {
  const { children, value, index } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.defaultProps = defaultProps;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [editDescription, setEditDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('Item one');
  const editData = () => {
    setEditDescription(true);
  };
  const closeEditData = () => {
    setEditDescription(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const editDescriptionText = () => {
    setDescriptionText('Item one');
    closeEditData();
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="description" {...a11yProps(0)} />
          <Tab label="subscribers" {...a11yProps(1)} />
          <Tab label="subscriptions" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {editDescription ? (
        <TabPanel value={value} index={0}>
          <TextField
            type="text"
            label="Your Description"
            fullWidth
            sx={{ mt: '2vh' }}
          />
          <Box sx={{ mt: '2vh' }}>
            <Button
              size="large"
              variant="contained"
              onClick={editDescriptionText}
            >
              Save
            </Button>
            <Button
              size="large"
              variant="contained"
              sx={{ ml: '3.5vh' }}
              onClick={closeEditData}
            >
              Cancel
            </Button>
          </Box>
        </TabPanel>
      ) : (
        <Box>
          <TabPanel value={value} index={0}>
            <Typography>{descriptionText}</Typography>
            <Button
              size="large"
              variant="contained"
              sx={{ mt: '2vh' }}
              onClick={editData}
            >
              Edit Description
            </Button>
          </TabPanel>
        </Box>
      )}
      <Box>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
