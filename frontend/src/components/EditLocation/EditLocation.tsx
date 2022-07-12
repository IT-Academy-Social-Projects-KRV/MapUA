import React, { useEffect, useState } from 'react';
import UploadInput from 'components/design/UploadInputCreateLocation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Typography, TextField, Stack } from '@mui/material';
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
import { useTypedDispatch } from '../../redux/hooks/useTypedDispatch';
import { StyledCreateLocationWrapper } from '../design/StyledCreateLocationWrapper';
import UploadedImagesList from '../design/UploadedImagesList/UploadedImagesList';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { convertListOfUrlsToFiles } from '../../utils/getFileFromUrl';

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
  const [locationImageName, setLocationImageName] = useState<string>('');
  const { t } = useTranslation();
  const { updatePopupLocationAfterEditing } = useTypedDispatch();
  const { handleSubmit, control } = useForm<EditingLocation>({
    mode: 'onBlur',
    resolver: yupResolver(CreatingLocationSchema)
  });

  const {
    data: { arrayPhotos }
  } = useTypedSelector(state => state.popupLocation);

  useEffect(() => {
    convertListOfUrlsToFiles(arrayPhotos, setFiles);
  }, []);

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

    for (let i = 0; i < files.length; i += 1) {
      formData.append('image', files[i]);
    }

    updatePopupLocationAfterEditing(
      locationId,
      formData,
      t('createLocation.locationSuccessfullyEdited')
    );

    closeEditData();
  };

  const handleFilesChange = (e: any) => {
    const { files: filesLst } = e.currentTarget;
    const filesListArr = [];

    if (filesLst) {
      for (let i = 0; i < filesLst.length; i += 1) {
        filesListArr.push(filesLst[i]);
      }

      setFiles([...files, ...filesListArr]);
    }
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

        <UploadInput
          handleFilesChange={handleFilesChange}
          setlocationImageName={setLocationImageName}
          locationImageName={locationImageName}
        />

        <UploadedImagesList files={files} setFiles={setFiles} />

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
