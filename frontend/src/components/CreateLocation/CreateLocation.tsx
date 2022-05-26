import {
  Input,
  TextareaAutosize,
  Typography,
  Button,
  Autocomplete,
  TextField,
  Box
} from '@mui/material';
import axios from 'axios';
import { HiddenInput } from 'components/design/HiddenInput';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { latlngType } from '../../../types';
import { getFiltersForUser } from '../../static/mainFIlters';

type Props = {
  coordinate: latlngType;
};

const { REACT_APP_API_URI } = process.env;

const CreateLocation = ({ coordinate }: Props) => {
  const ref = useRef<null | HTMLInputElement>(null);
  const Imageref = useRef<null | HTMLInputElement>(null);
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

  const accessToken = localStorage.getItem('accessToken');

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('locationName', locationName);
      formData.append('description', description);
      formData.append('coordinates', String(coordinate.lat));
      formData.append('coordinates', String(coordinate.lng));
      formData.append('filters', String(filters));
      formData.append('image', files[0]);

      await axios.post(`${REACT_APP_API_URI}locations/create`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setLocationName('');
      setDescription('');
      setFilters('');
      if (ref.current) {
        ref.current.value = '';
      }
    } catch (error) {
      console.log(error);
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
      <Box>
        <label htmlFor="contained-button-file">
          <HiddenInput
            id="contained-button-file"
            type="file"
            onChange={e => {
              handleFilesChange(e);
              setlocationImageName(
                (Imageref.current?.files && Imageref.current?.files[0].name) ||
                  ''
              );
            }}
            ref={Imageref}
          />
          <Button
            sx={{ m: '10px 10px 0px 0px ' }}
            variant="contained"
            component="span"
          >
            Upload Image
          </Button>
          <span>{locationImageName}</span>
        </label>
      </Box>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button sx={{ marginTop: '20px' }} variant="contained" type="submit">
          {t('createLocation.doneAndSubmit')}
        </Button>
      </div>
    </form>
  );
};

export default CreateLocation;
