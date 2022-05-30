import {
  Input,
  TextareaAutosize,
  Typography,
  Button,
  Autocomplete,
  TextField
} from '@mui/material';
import UploadInput from 'components/design/UploadInputCreateLocation';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'services/axios';
import { latlngType } from '../../../types';
import { getFiltersForUser } from '../../static/mainFIlters';

type Props = {
  coordinate: latlngType;
};

const CreateLocation = ({ coordinate }: Props) => {
  const ref = useRef<null | HTMLInputElement>(null);
  const [locationImageName, setlocationImageName] = useState<string>('');

  const { t } = useTranslation();

  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [filters, setFilters] = useState('');
  const [files, setFiles] = useState<any>([]);

  const handleChange = (e: any): void => {
    setLocationName(e.target.value);
  };

  const handleChangeDescription = (e: any): void => {
    setDescription(e.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('locationName', locationName);
      formData.append('description', description);
      formData.append('coordinates', String(coordinate.lat));
      formData.append('coordinates', String(coordinate.lng));
      formData.append('filters', String(filters));
      formData.append('image', files[0]);

      await axios.post(`locations/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setLocationName('');
      setDescription('');
      setFilters('');
      if (ref.current) {
        ref.current.value = '';
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeAutocomplete = (e: any, value: any) => {
    setFilters(value);
  };

  const handleFilesChange = (e: any) => {
    const { files: filesLst } = e.currentTarget;
    const filesListArr = [];

    if (filesLst) {
      for (let i = 0; i < filesLst.length; i += 1) {
        filesListArr.push(filesLst[i]);
      }

      setFiles(filesListArr);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '400px',
        height: '600px',
        textAlign: 'center',
        margin: '36px'
      }}
    >
      <Typography>{t('createLocation.creatingLocation')}</Typography>
      <Input
        sx={{ marginTop: '20px', width: '100%' }}
        type="text"
        value={locationName}
        onChange={handleChange}
        placeholder={t('createLocation.enterLocName')}
      />
      <TextareaAutosize
        aria-label="minimum height"
        value={description}
        onChange={handleChangeDescription}
        minRows={3}
        placeholder={t('createLocation.enterDescription')}
        style={{
          marginTop: '20px',
          width: '100%',
          resize: 'vertical',
          minWidth: '30px'
        }}
      />
      <Autocomplete
        sx={{ marginTop: '20px' }}
        multiple
        id="tags-outlined"
        options={getFiltersForUser()}
        getOptionLabel={option => option}
        filterSelectedOptions
        onChange={(e, values) => onChangeAutocomplete(e, values)}
        renderInput={params => (
          <TextField
            {...params}
            value={filters}
            label={t('common.filters')}
            placeholder={t('createLocation.favorites')}
          />
        )}
      />
      <UploadInput
        handleFilesChange={handleFilesChange}
        setlocationImageName={setlocationImageName}
        locationImageName={locationImageName}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button sx={{ marginTop: '20px' }} variant="contained" type="submit">
          {t('createLocation.doneAndSubmit')}
        </Button>
      </div>
    </form>
  );
};

export default CreateLocation;
