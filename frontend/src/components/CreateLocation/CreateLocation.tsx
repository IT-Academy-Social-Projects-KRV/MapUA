import React, { useRef } from 'react';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Button,
  Autocomplete,
  TextField,
  Box
} from '@mui/material';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import { CreatingLocationSchema } from 'utils/validation';
import { latlngType } from '../../../types';
import { getFiltersForUser } from '../../static/mainFIlters';

type Props = {
  coordinate: latlngType;
};

type CreatingLocation = {
  locationName: string;
  locationDescription: string;
  locationFilters: string[];
  locationFile: File[];
};

const { REACT_APP_API_URI } = process.env;

const CreateLocation = ({ coordinate }: Props) => {
  // const [files, setFiles] = useState<File[]>([]);
  // const [, setLinks] = useState<string[]>([]);

  const ref = useRef<null | HTMLInputElement>();

  const accessToken = localStorage.getItem('accessToken');

  const { handleSubmit, control, reset } = useForm<CreatingLocation>({
    mode: 'onBlur',
    resolver: yupResolver(CreatingLocationSchema)
  });

  const { errors } = useFormState({
    control
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<CreatingLocation> = async ({
    locationName,
    locationDescription,
    locationFilters,
    locationFile
  }) => {
    try {
      const formData = new FormData();
      formData.append('locationName', locationName);
      formData.append('description', locationDescription);
      formData.append('coordinates', String(coordinate.lat));
      formData.append('coordinates', String(coordinate.lng));
      formData.append('filters', String(locationFilters));
      formData.append('image', locationFile[0]);

      await axios.post(`${REACT_APP_API_URI}locations/create`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      reset();
      if (ref.current) {
        ref.current.value = '';
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '400px',
        height: '600px',
        textAlign: 'center',
        margin: '36px'
      }}
    >
      <Typography>{t('createLocation.creatingLocation')}</Typography>

      <Controller
        control={control}
        name="locationName"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ marginTop: '20px', width: '100%' }}
            type="text"
            placeholder={t('createLocation.enterLocName')}
            error={!!errors.locationName?.message}
            helperText={t(
              !errors.locationName ? '' : String(errors.locationName.message)
            )}
          />
        )}
      />

      <Controller
        control={control}
        name="locationDescription"
        render={({ field }) => (
          <TextField
            multiline
            rows={5}
            {...field}
            placeholder={t('createLocation.enterDescription')}
            style={{
              marginTop: '20px',
              width: '100%',
              resize: 'vertical',
              minWidth: '30px'
            }}
            error={!!errors.locationDescription?.message}
            helperText={t(
              !errors.locationDescription
                ? ''
                : String(errors.locationDescription.message)
            )}
          />
        )}
      />

      <Controller
        defaultValue={[]}
        control={control}
        name="locationFilters"
        render={({ field }) => (
          <Autocomplete
            {...field}
            sx={{ marginTop: '20px' }}
            multiple
            options={getFiltersForUser()}
            getOptionLabel={option => option}
            filterSelectedOptions
            onChange={(e, value) => field.onChange(value)}
            renderInput={params => (
              <TextField
                {...params}
                label={t('common.filters')}
                error={!!errors.locationFilters}
                helperText={t(
                  !errors.locationFilters
                    ? ''
                    : t('utils.validation.locationDescriptionMinLengthError')
                )}
                placeholder={t('createLocation.favorites')}
              />
            )}
          />
        )}
      />

      <Controller
        control={control}
        name="locationFile"
        render={({ field }) => (
          <TextField
            {...field}
            type="file"
            error={!!errors.locationFile}
            onChange={e => field.onChange((e.target as HTMLInputElement).files)}
            helperText={t('utils.validation.emptyLocationFileError')}
            sx={{ padding: '20px' }}
          />
        )}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button sx={{ marginTop: '20px' }} variant="contained" type="submit">
          {t('createLocation.doneAndSubmit')}
        </Button>
      </div>
    </Box>
  );
};

export default CreateLocation;
