import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Tabs, Tab, Typography, Box, TextField } from '@mui/material';
import { Controller, Control, FieldError } from 'react-hook-form';
import { UserForm } from '../../../types';

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
          <Typography component="span">{children}</Typography>
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
  error: FieldError | undefined;
};

export default function BasicTabs({
  showEditPanel,
  control,
  error
}: BasicTabsProps) {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const userDescription = useTypedSelector(state => state.userData);

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
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                placeholder={t('profile.basicTabs.enterDescription')}
                label={t('profile.basicTabs.description')}
                fullWidth
                onChange={field.onChange}
                onBlur={field.onBlur}
                defaultValue={field.value}
                type="text"
                error={!!error}
                helperText={t(!error ? '' : String(error.message))}
              />
            )}
          />
        </TabPanel>
      ) : (
        <Box>
          <TabPanel value={value} index={0}>
            <Typography component="span">
              {userDescription.data.description ||
                `${t('profile.basicTabs.noDescription')}`}
            </Typography>
          </TabPanel>
        </Box>
      )}
      <Box>
        <TabPanel value={value} index={1}>
          {userDescription.data.subscribers.length > 0
            ? userDescription.data.subscribers
            : `${t('profile.basicTabs.noSubscribers')}`}
        </TabPanel>
      </Box>
      <TabPanel value={value} index={2}>
        {userDescription.data.subscriptions.length > 0
          ? userDescription.data.subscriptions
          : `${t('profile.basicTabs.noSubscribers')}`}
      </TabPanel>
    </Box>
  );
}
