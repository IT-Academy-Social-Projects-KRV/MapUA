import {
  Input,
  TextareaAutosize,
  Typography,
  Button,
  Autocomplete,
  TextField
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { latlngType } from '../../../types';
import { getFiltersForUser } from '../../static/mainFIlters';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';

type Props = {
  closeBigPopup: Function;
  coordinate: latlngType;
  setIsAddLocationActive: Function;
};

const CreateLocation = ({
  coordinate,
  closeBigPopup,
  setIsAddLocationActive
}: Props) => {
  const ref = useRef<null | HTMLInputElement>();
  const { t } = useTranslation();

  const {
    data: success,
    // loading,
    error
  } = useTypedSelector(state => state.createLocation);
  const {
    bounds,
    locationName: searchName,
    selectedFilters
  } = useTypedSelector(state => state.mapInfo);
  const { createLocation, fetchLocations } = useTypedDispatch();

  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [filters, setFilters] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      fetchLocations(bounds, searchName, selectedFilters);
      closeBigPopup();
      setIsAddLocationActive(false);
      setLocationName('');
      setDescription('');
      setFilters('');
      if (ref.current) {
        ref.current.value = '';
      }
    }
  }, [success]);

  const handleChange = (e: any): void => {
    setLocationName(e.target.value);
  };

  const handleChangeDescription = (e: any): void => {
    setDescription(e.target.value);
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('locationName', locationName);
    formData.append('description', description);
    formData.append('coordinates', String(coordinate.lat));
    formData.append('coordinates', String(coordinate.lng));
    formData.append('filters', String(filters));
    formData.append('image', files[0]);

    createLocation(formData);
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

      <Input
        id="contained-button-file"
        type="file"
        onChange={e => handleFilesChange(e)}
        ref={ref}
        sx={{ padding: '20px' }}
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
