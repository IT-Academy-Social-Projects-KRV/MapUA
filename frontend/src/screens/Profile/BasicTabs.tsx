import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { selectUserRole } from 'redux/memoizedSelectors/isUserAuthorizedSelectors';
import {
  selectUserDataDescription,
  selectUserDataSubscribers,
  selectUserDataSubscriptions
} from 'redux/memoizedSelectors/userDataSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { Tabs, Tab, Typography, Box, TextField } from '@mui/material';
import { Controller, Control, FieldError } from 'react-hook-form';
import ProfileTabsData from 'components/ProfileTabsData';
import CircularLoader from 'components/CircularLoader/CircularLoader';
import { UserForm } from '../../../types';

const LazyModerationTab = lazy(() => import('./ModerationTab'));

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
      sx={{
        height: '60vh',
        overflow: 'auto',
        borderBottom: '1px solid rgba(0, 0, 0, 0.17)'
      }}
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
  const role = useTypedSelector(selectUserRole);

  const description = useTypedSelector(selectUserDataDescription);
  const subscribers = useTypedSelector(selectUserDataSubscribers);
  const subscriptions = useTypedSelector(selectUserDataSubscriptions);

  const { fetchWaitingForVerifyLocations, fetchReportedLocations } =
    useTypedDispatch();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="basic tabs example"
        >
          <Tab label={t('profile.basicTabs.description')} {...a11yProps(0)} />
          <Tab label={t('profile.basicTabs.subscribers')} {...a11yProps(1)} />
          <Tab label={t('profile.basicTabs.subscriptions')} {...a11yProps(2)} />
          {(role === 'moderator' || role === 'admin') && (
            <Tab
              label={t('profile.basicTabs.waitingForVerify')}
              {...a11yProps(3)}
            />
          )}
          {(role === 'moderator' || role === 'admin') && (
            <Tab
              label={t('profile.basicTabs.reportedLocations')}
              {...a11yProps(4)}
            />
          )}
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
              {description || `${t('profile.basicTabs.noDescription')}`}
            </Typography>
          </TabPanel>
        </Box>
      )}
      <Box>
        <TabPanel value={value} index={1}>
          {subscribers.length > 0 ? (
            <ProfileTabsData array={subscribers} />
          ) : (
            `${t('profile.basicTabs.noSubscribers')}`
          )}
        </TabPanel>
      </Box>
      <TabPanel value={value} index={2}>
        {subscriptions.length > 0 ? (
          <ProfileTabsData array={subscriptions} />
        ) : (
          `${t('profile.basicTabs.noSubscriptions')}`
        )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Suspense fallback={<CircularLoader />}>
          <LazyModerationTab
            t={t('profile.basicTabs.noWaitingForVerify')}
            fetchLocationsForModeration={fetchWaitingForVerifyLocations}
          />
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Suspense fallback={<CircularLoader />}>
          <LazyModerationTab
            t={t('profile.basicTabs.noReportedLocations')}
            fetchLocationsForModeration={fetchReportedLocations}
          />
        </Suspense>
      </TabPanel>
    </Box>
  );
}
