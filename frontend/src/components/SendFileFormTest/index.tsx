import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

function SendFileFormTest() {
  const [links, setLinks] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const handleFilesChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { files: filesLst } = e.currentTarget;
    const filesListArr = [];

    if (filesLst) {
      for (let i = 0; i < filesLst.length; i += 1) {
        filesListArr.push(filesLst[i]);
      }

      setFiles(filesListArr);
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
    <form>
      <Box>Select file</Box>
      <input name="file" type="file" multiple onChange={handleFilesChange} />
      <Button onClick={handleFormSubmit}>Submit files</Button>
      {links.map(url => (
        <Typography variant="h6" key={url}>
          URL: {url}
        </Typography>
      ))}
    </form>
  );
}

export default SendFileFormTest;
