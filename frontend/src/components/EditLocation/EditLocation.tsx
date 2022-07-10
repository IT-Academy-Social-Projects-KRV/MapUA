import React, { useState } from 'react';
import UploadInput from 'components/design/UploadInputCreateLocation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Typography, TextField, Stack, Autocomplete } from '@mui/material';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormState
} from 'react-hook-form';
import { CreatingLocationSchema } from 'utils/validation';
import {
  CancelButton,
  SaveBox,
  SaveButton
} from 'components/design/StyledProfile';
import { resizeImageFn } from 'utils/imgResizer';
import { getFiltersForUser } from '../../static/mainFIlters';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';
import { StyledCreateLocationWrapper } from '../design/StyledCreateLocationWrapper';

type Props = {
  locationNamelocationName: string;
  closeEditData: any;
  descriptiondescription: string;
  locationId: string;
  selectedLocationFilters: string[];
};
type EditingLocation = {
  locationName: string;
  locationDescription: string;
  locationFilters: string[];
};

const EditLocation = ({
  locationNamelocationName,
  closeEditData,
  descriptiondescription,
  locationId,
  selectedLocationFilters
}: Props) => {
  const [files, setFiles] = useState<Blob[]>([]);
  const [locationImageName, setLocationImageName] = useState<string>('');
  const [filters, setFilters] = useState([...selectedLocationFilters]);
  console.log(filters);
  const { t } = useTranslation();
  const { updatePopupLocationAfterEditing } = useTypedDispatch();
  const { handleSubmit, control } = useForm<EditingLocation>({
    mode: 'onBlur',
    resolver: yupResolver(CreatingLocationSchema)
  });

  const { errors } = useFormState({
    control
  });

  const onSubmit: SubmitHandler<EditingLocation> = async ({
    locationName,
    locationDescription
  }) => {
    const formData = new FormData();
    formData.append('locationName', locationName);
    formData.append('description', locationDescription);
    formData.append('filters', String(filters));
    files.map(file => formData.append('image', file));
    updatePopupLocationAfterEditing(
      locationId,
      formData,
      t('createLocation.locationSuccessfullyEdited')
    );

    closeEditData();
  };
  const onChangeAutocomplete = (e: any, value: any) => {
    setFilters(value);
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
      <Stack spacing={3}>
        <Typography>{t('createLocation.updateLocation')}</Typography>
        <Controller
          name="locationName"
          control={control}
          defaultValue={locationNamelocationName}
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
          defaultValue={descriptiondescription}
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
          defaultValue={[...filters]}
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

        <SaveBox>
          <Stack direction="row" spacing={2}>
            <SaveButton size="large" variant="contained" type="submit">
              {t('profile.profilePage.save')}
            </SaveButton>
            <CancelButton
              size="large"
              variant="contained"
              onClick={closeEditData}
            >
              {t('profile.profilePage.cancel')}
            </CancelButton>
          </Stack>
        </SaveBox>
      </Stack>
    </StyledCreateLocationWrapper>
  );
};

export default EditLocation;
