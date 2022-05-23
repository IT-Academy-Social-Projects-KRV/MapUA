import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Tabs, Tab, Typography, Box, TextField } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { UserForm } from 'redux/ts-types/user';

interface TabPanelProps {
  index: number;
  value: number;
}

const defaultProps = {
  children: 'Firt tab'
};

function TabPanel(props: React.PropsWithChildren<TabPanelProps>) {
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

type BasicTabsProps = {
  showEditPanel: boolean;
  setShowEditPanel: Function;
  control: Control<UserForm>;
  handleDescription: Function;
  newDescription: string;
};

export default function BasicTabs({
  showEditPanel,
  control,
  handleDescription,
  newDescription
}: BasicTabsProps) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { t } = useTranslation();

  // const postDescription = (description: any) => {
  //   handleDescription(description);
  // };
  const userDescription = useTypedSelector(state => state.user);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t('profile.basicTabs.description')} {...a11yProps(0)} />
          <Tab label={t('profile.basicTabs.subscribers')} {...a11yProps(1)} />
          <Tab label={t('profile.basicTabs.subscriptions')} {...a11yProps(2)} />
        </Tabs>
      </Box>
      {showEditPanel ? (
        <TabPanel value={value} index={0}>
          <form>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  placeholder="Please enter description"
                  label="Description"
                  fullWidth
                  onChange={(e: any) => handleDescription(e.target.value)}
                  onBlur={field.onBlur}
                  defaultValue={newDescription}
                  type="text"
                />
              )}
            />
          </form>
        </TabPanel>
      ) : (
        <Box>
          <TabPanel value={value} index={0}>
            <Typography>
              {userDescription.data.description || 'There is no description'}
            </Typography>
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
