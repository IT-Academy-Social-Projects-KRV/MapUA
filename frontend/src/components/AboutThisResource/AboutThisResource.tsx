import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AboutThisResource = () => {
  const { t } = useTranslation();

  return (
    <Stack my={6} spacing={8}>
      <Typography px={50} variant="h6" align="center">
        {t('common.aboutThisResource')}
      </Typography>
      <Typography px={10} variant="subtitle1" align="justify">
        {t('common.descriptionThisResource')}
      </Typography>
      <Divider>{t('common.developmentTeam')}</Divider>
    </Stack>
  );
};

export default AboutThisResource;
