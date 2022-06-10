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
import { getFiltersForUser } from '../../static/mainFIlters';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';
import { StyledCreateLocationWrapper } from '../design/StyledCreateLocationWrapper';
import {
  CancelButton,
  SaveBox,
  SaveButton
} from 'components/design/StyledProfile';

type Props = {
  locationNamelocationName: string;
  closeEditData: any;
  descriptiondescription: string;
  locationId: string;
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
  locationId
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filters, setFilters] = useState('');
  const [locationImageName, setLocationImageName] = useState<string>('');
  // const ref = useRef<null | HTMLInputElement>();

  const { t } = useTranslation();

  const { updateLocationData } = useTypedDispatch();

  // const { success } = useTypedSelector(state => state.createLocation);
  // const {
  //   bounds,
  //   locationName: searchName,
  //   selectedFilters
  // } = useTypedSelector(state => state.mapInfo);

  const { handleSubmit, control, reset } = useForm<EditingLocation>({
    mode: 'onBlur',
    resolver: yupResolver(CreatingLocationSchema)
  });

  const { errors } = useFormState({
    control
  });

  console.log(locationNamelocationName, 'locationNamelocationName');

  const onChangeAutocomplete = (e: any, value: any) => {
    setFilters(value);
  };

  const onSubmit: SubmitHandler<EditingLocation> = async ({
    locationName,
    locationDescription
  }) => {
    const formData = new FormData();
    formData.append('locationName', locationName);
    formData.append('description', locationDescription);

    for (let i = 0; i < files.length; i += 1) {
      formData.append('image', files[i]);
    }

    updateLocationData(
      formData,
      t('createLocation.locationSuccessfullyCreated'),
      locationId
    );
  };

  console.log(locationId, 'locationId');

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
      <Stack spacing={3}>
        <Typography>{t('createLocation.creatingLocation')}</Typography>
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
    </StyledCreateLocationWrapper>
  );
};

export default EditLocation;
