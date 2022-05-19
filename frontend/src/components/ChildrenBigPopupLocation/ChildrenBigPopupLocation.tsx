import { Input, TextareaAutosize, Typography, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { latlngType } from '../../../types';
// import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
// import { useTypedSelector } from 'redux/hooks/useTypedSelector';

type Props = {
  coordinate: latlngType;
};

const ChildrenBigPopupLocation = ({ coordinate }: Props) => {
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [links, setLinks] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

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
  // const [images, SetImages] = UseState([]);

  const proces = process.env.REACT_APP_API_URI;

  const handleChange = (e: any): void => {
    setLocationName(e.target.value);
  };

  const handleChangeDescription = (e: any): void => {
    setDescription(e.target.value);
  };

  const accessToken = localStorage.getItem('accessToken');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log('coordinate', coordinate);
      const formData = new FormData();
      formData.append('locationName', locationName);
      formData.append('description', description);
      formData.append('coordinates', String(coordinate.lat));
      formData.append('coordinates', String(coordinate.lng));

      console.log(formData, 'formData');

      const data = await axios.post(
        `${proces}add_personal_location`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      console.log('data', data);

      // console.log(
      //   fetch(`${proces}add_personal_location`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${accessToken}`
      //     },
      //     body: formData
      //   })
      // );

      setLocationName('');
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();

    const urls = await Promise.all(
      files.map(async file => {
        formData.set('file', file);
        const res = await fetch(
          `${process.env.REACT_APP_API_URI}/uploadImage`,
          {
            method: 'POST',
            body: formData
          }
        );

        return res.json();
      })
    );
    setLinks(urls.map(itm => itm.url));
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '300px',
        height: '600px',
        backgroundColor: 'tomato',
        textAlign: 'center',
        marginTop: '150px'
      }}
    >
      <Typography>Creating location</Typography>

      <img
        src=""
        alt=""
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'white'
        }}
      />
      <Input
        type="text"
        value={locationName}
        onChange={handleChange}
        placeholder="enter location name"
      />

      <TextareaAutosize
        aria-label="minimum height"
        value={description}
        onChange={handleChangeDescription}
        minRows={3}
        placeholder="Minimum 3 rows"
        style={{ width: 200 }}
      />
      <Input
        id="contained-button-file"
        type="file"
        onChange={e => handleFilesChange(e)}
      />
      <Button variant="contained" component="span" onClick={handleFormSubmit}>
        Upload
      </Button>
      <Button variant="contained" type="submit">
        Done and submit
      </Button>
    </form>
  );
};

export default ChildrenBigPopupLocation;
