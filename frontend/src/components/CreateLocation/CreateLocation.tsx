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
import {
  selectIsLoading,
  selectIsSuccess
} from 'redux/memoizedSelectors/createLocationSelectors';
import {
  selectAuthorizedFilters,
  selectMapInfoBounds,
  selectMapInfoFilters,
  selectMapInfolocationName
} from 'redux/memoizedSelectors/mapInfoSelectors';
import { resizeImageFn } from 'utils/imgResizer';
import { latlngType } from '../../../types';
import { getFiltersForUser } from '../../static/mainFIlters';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';
import { StyledCreateLocationWrapper } from '../design/StyledCreateLocationWrapper';
import CircularLoader from '../CircularLoader/CircularLoader';

type Props = {
  closeBigPopup: Function;
  coordinate: latlngType;
  setIsAddLocation: Function;
};
type CreatingLocation = {
  locationName: string;
  locationDescription: string;
  locationFilters: string[];
};

const CreateLocation = ({
  coordinate,
  closeBigPopup,
  setIsAddLocation
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filters, setFilters] = useState('');

  const [locationImageName, setLocationImageName] = useState<string>('');
  const ref = useRef<null | HTMLInputElement>();

  const { t } = useTranslation();
  const success = useTypedSelector(selectIsSuccess);
  const loading = useTypedSelector(selectIsLoading);

  const bounds = useTypedSelector(selectMapInfoBounds);
  const searchName = useTypedSelector(selectMapInfolocationName);
  const selectedFilters = useTypedSelector(selectMapInfoFilters);
  const authorizedFilters = useTypedSelector(selectAuthorizedFilters);

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
      fetchLocations(bounds, searchName, selectedFilters, authorizedFilters);
      closeBigPopup();
      setIsAddLocation(false);
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
    locationDescription
  }) => {
    const formData = new FormData();
    formData.append('locationName', locationName);
    formData.append('description', locationDescription);
    formData.append('coordinates', String(coordinate.lat));
    formData.append('coordinates', String(coordinate.lng));
    formData.append('filters', String(filters));
    files.map(file => formData.append('image', file));
    createLocation(formData, t('createLocation.locationSuccessfullyCreated'));
  };

  const handleFilesChange = async (e: any) => {
    const imgFiles = [...e.target.files];
    const images = await resizeImageFn(imgFiles, 800, 500);
    setFiles(images);
  };

  return (
    <StyledCreateLocationWrapper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loading ? (
        <CircularLoader />
      ) : (
        <Stack spacing={3}>
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
                  !errors.locationName
                    ? ''
                    : String(errors.locationName.message)
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
                rows={5}
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
            setlocationImageName={setLocationImageName}
            locationImageName={locationImageName}
          />

          <Button fullWidth variant="contained" type="submit">
            {t('createLocation.doneAndSubmit')}
          </Button>
        </Stack>
      )}
    </StyledCreateLocationWrapper>
  );
};

export default CreateLocation;
