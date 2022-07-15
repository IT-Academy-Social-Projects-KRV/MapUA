import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  selectOtherUserDataSubscriptions,
  selectOtherUserDataSubscribers,
  selectOtherUserDataDescription
} from 'redux/memoizedSelectors/otherUserDataSelectors';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import ProfileTabsData from '../../components/ProfileTabsData/index';

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
export default function BasicTabs() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const handleChange = React.useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  const description = useTypedSelector(selectOtherUserDataDescription);
  const subscribers = useTypedSelector(selectOtherUserDataSubscribers);
  const subscriptions = useTypedSelector(selectOtherUserDataSubscriptions);

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
      <Box>
        <TabPanel value={value} index={0}>
          <Typography component="span">
            {description || `${t('profile.basicTabs.noDescription')}`}
          </Typography>
        </TabPanel>
      </Box>
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
    </Box>
  );
}
