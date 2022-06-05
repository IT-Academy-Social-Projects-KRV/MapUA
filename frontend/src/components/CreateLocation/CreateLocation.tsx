import React, { useState, useRef, useEffect } from 'react';
import UploadInput from 'components/design/UploadInputCreateLocation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Button,
  Autocomplete,
  TextField,
  Stack
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
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';
import { StyledCreateLocationWrapper } from '../design/StyledCreateLocationWrapper';

type Props = {
  closeBigPopup: Function;
  coordinate: latlngType;
  setIsAddLocationActive: Function;
};
type CreatingLocation = {
  locationName: string;
  locationDescription: string;
  locationFilters: string[];
};

const CreateLocation = ({
  coordinate,
  closeBigPopup,
  setIsAddLocationActive
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filters, setFilters] = useState('');
  const [locationImageName, setLocationImageName] = useState<string>('');
  const ref = useRef<null | HTMLInputElement>();

  const { t } = useTranslation();

  const { data: success } = useTypedSelector(state => state.createLocation);
  const {
    bounds,
    locationName: searchName,
    selectedFilters
  } = useTypedSelector(state => state.mapInfo);
  const { createLocation, fetchLocations } = useTypedDispatch();

  const { handleSubmit, control, reset } = useForm<CreatingLocation>({
    mode: 'onBlur',
    resolver: yupResolver(CreatingLocationSchema)
  });

  const { errors } = useFormState({
    control
  });

  useEffect(() => {
    if (success) {
      fetchLocations(bounds, searchName, selectedFilters);
      closeBigPopup();
      setIsAddLocationActive(false);
      reset();
      setFilters('');
      if (ref.current) {
        ref.current.value = '';
      }
    }
  }, [success]);

  const onChangeAutocomplete = (e: any, value: any) => {
    setFilters(value);
  };

  const onSubmit: SubmitHandler<CreatingLocation> = async ({
    locationName,
    locationDescription,
    locationFilters
  }) => {
    const formData = new FormData();
    formData.append('locationName', locationName);
    formData.append('description', locationDescription);
    formData.append('coordinates', String(coordinate.lat));
    formData.append('coordinates', String(coordinate.lng));
    formData.append('filters', String(locationFilters));

    for (let i = 0; i < files.length; i += 1) {
      formData.append('image', files[i]);
    }

    createLocation(formData, t('createLocation.locationSuccessfullyCreated'));
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
    <StyledCreateLocationWrapper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={2}>
        <Typography>{t('createLocation.creatingLocation')}</Typography>
        <Controller
          name="locationName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
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
          defaultValue=""
          render={({ field }) => (
            <TextField
              multiline
              fullWidth
              minRows={5}
              {...field}
              placeholder={t('createLocation.enterDescription')}
              error={!!errors.locationDescription?.message}
              helperText={t(
                !errors.locationDescription
                  ? ''
                  : String(errors.locationDescription.message)
              )}
            />
          )}
        />
        <Autocomplete
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

        <Button fullWidth variant="contained" type="submit">
          {t('createLocation.doneAndSubmit')}
        </Button>
      </Stack>
    </StyledCreateLocationWrapper>
  );
};

export default CreateLocation;
