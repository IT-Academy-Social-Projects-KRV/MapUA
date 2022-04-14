import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportIcon from '@mui/icons-material/Report';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import IosShareIcon from '@mui/icons-material/IosShare';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import SendIcon from '@mui/icons-material/Send';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  Box,
  TextField,
  FormControl,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar
} from '@mui/material';

import './pointPopup.scss';

// It can be reused in different components
// When the rest of the functionality is available, this component will be assigned to a specific and each point on the map
// Change position a photo, description, buttons, etc. you can without problems
// Now it works on stubs

interface Props {
  active: boolean;
  setActive: Function;
  children: Array<any>;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

function PointPopup({ active, setActive, children }: Props) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // test URL for image:
  const imgUrl: string =
    'https://images.unian.net/photos/2021_08/thumb_files/1200_0_1630338489-6635.jpg';

  // data from the input array will be iterated and dynamically 'mapping' formed
  // however on stubs yet

  return (
    <Box>
      <Typography
        className={active ? 'modal active' : 'modal'}
        onClick={() => setActive(false)}
        onKeyDown={() => setActive(false)}
      >
        <Typography
          role="dialog"
          sx={{ maxWidth: '35%', maxHeight: '25%' }}
          className={active ? 'modal__content active' : 'modal'}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
        >
          <Card>
            <CardHeader
              sx={{ paddingBottom: 0 }}
              avatar={
                <Avatar aria-label="recipe" src={children[0].avatarMini} />
              }
              title={<h3>{children[0].name}</h3>}
              subheader={children[0].dateOfPublic}
            />
            <IconButton
              onClick={() => setActive(false)}
              sx={{ left: '90%', top: '-8vh' }}
            >
              <CloseIcon color="action" />
            </IconButton>

            <CardMedia
              sx={{
                p: 3.2,
                pt: 0,
                pb: 0
              }}
              component="img"
              image={imgUrl}
              alt="Monument to the Duke de Richelieu"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <Box>
                  <IconButton sx={{ p: 0 }}>
                    {children[0].locationName}
                  </IconButton>
                  <IconButton sx={{ pr: 7 }}>
                    {children[0].visited ? <CheckCircleTwoToneIcon /> : null}
                  </IconButton>
                  <IconButton>
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton>{children[0].likeCounter}</IconButton>
                  <IconButton>
                    <ThumbDownIcon />
                  </IconButton>
                </Box>

                <Typography variant="subtitle1" mt={2}>
                  {children[0].description}
                </Typography>
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Comments section
                </Typography>
                <List
                  sx={{
                    bgcolor: 'background.paper'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <FormControl variant="standard">
                      <TextField
                        multiline
                        rows={5}
                        id="your comment"
                        placeholder="Your comment"
                        variant="outlined"
                        fullWidth
                      />

                      <Button
                        sx={{
                          width: '25%',
                          borderRadius: 10,
                          alignSelf: 'center',
                          mt: 3
                        }}
                        endIcon={<SendIcon />}
                      >
                        Send
                      </Button>
                    </FormControl>
                  </Box>

                  <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Vasya"
                        src={children[0].comments[0].userCommentAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={children[0].comments[0].userCommentName}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {children[0].comments[1]}
                          </Typography>

                          {children[0].comments[0].userCommentText}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Vasya"
                        src={children[0].comments[0].userCommentAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={children[0].comments[0].userCommentName}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          />
                          {children[0].comments[0].userCommentText}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Vasya"
                        src={children[0].comments[0].userCommentAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={children[0].comments[0].userCommentName}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          />

                          {children[0].comments[0].userCommentText}
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Collapse>
            <CardActions
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-around'
              }}
              disableSpacing
            >
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <IosShareIcon />
              </IconButton>
              <IconButton aria-label="report">
                <ReportIcon />
              </IconButton>
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Typography>
      </Typography>
    </Box>
  );
}

export default PointPopup;
