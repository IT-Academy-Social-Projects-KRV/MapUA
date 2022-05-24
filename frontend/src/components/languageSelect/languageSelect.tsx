import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function languageSelect() {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };
  const handleChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={language}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value="en">En</MenuItem>
          <MenuItem value="ua">Ua</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
