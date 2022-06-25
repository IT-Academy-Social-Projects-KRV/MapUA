import React from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { t } from 'i18next';

interface Props {
  disabledPressedButton: boolean;
  openEditOrReplyComment: Function;
}

const ReplyComment = ({
  disabledPressedButton,
  openEditOrReplyComment
}: Props) => (
  <Box>
    <MenuItem
      disabled={disabledPressedButton}
      onClick={e => openEditOrReplyComment(e, 'reply')}
    >
      <ListItemIcon>
        <ReplyIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>
        {t('bigPopup.commentSection.commentSection.replyToComment')}
      </ListItemText>
    </MenuItem>
  </Box>
);

export default ReplyComment;
