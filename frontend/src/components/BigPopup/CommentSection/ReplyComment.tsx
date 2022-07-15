import React, { memo } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, MenuItem, ListItemIcon, Typography } from '@mui/material';
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
      <Typography>
        {t('bigPopup.commentSection.commentSection.replyToComment')}
      </Typography>
    </MenuItem>
  </Box>
);

export default memo(ReplyComment);
