import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from 'react-i18next';

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    language: string
  ) => {
    i18n.changeLanguage(language);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="en">En</ToggleButton>
      <ToggleButton value="ua">UA</ToggleButton>
    </ToggleButtonGroup>
  );
}
