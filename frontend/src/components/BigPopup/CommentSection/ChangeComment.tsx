import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { t } from 'i18next';

interface Props {
  openEditOrReplyComment: Function;
  deleteComment: Function;
  disabledPressedButton: boolean;
}

const ChangeComment = ({
  openEditOrReplyComment,
  deleteComment,
  disabledPressedButton
}: Props) => (
  <Box>
    <MenuItem disabled={disabledPressedButton} onClick={() => deleteComment()}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
        {t('bigPopup.commentSection.commentSection.deleteComment')}
      </ListItemText>
    </MenuItem>
    <MenuItem
      disabled={disabledPressedButton}
      onClick={e => openEditOrReplyComment(e, 'edit')}
    >
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
        {t('bigPopup.commentSection.commentSection.editComment')}
      </ListItemText>
    </MenuItem>
  </Box>
);

export default ChangeComment;
