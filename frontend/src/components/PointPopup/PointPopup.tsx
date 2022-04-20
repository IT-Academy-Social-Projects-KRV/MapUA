import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Link from '@mui/material/Link';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import {
  Card,
  CardMedia,
  CardContent,
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

// It can be reused in different components
// When the rest of the functionality is available, this component will be assigned to a specific and each point on the map
// Change position a photo, description, buttons, etc. you can without problems
// Now it works on stubs

interface Props {
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

function PointPopup({ children }: Props) {
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
      <Typography>
        <Typography role="dialog">
          <Card>
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

            <Typography
              color="text.secondary"
              variant="h4"
              sx={{ pl: 5, pt: 2 }}
            >
              {children[0].locationName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                gap: 5,
                pr: 10,
                mt: 5
              }}
            >
              <Typography variant="button">
                <Link
                  href="/"
                  component="button"
                  underline="none"
                  sx={{ pr: 1.5 }}
                >
                  <ThumbUpOutlinedIcon
                    fontSize="small"
                    sx={{ color: 'text.secondary' }}
                  />
                </Link>
                {children[0].likeCounter}
              </Typography>

              <Typography variant="button">
                <Link href="/" component="button" underline="none">
                  <ThumbDownAltOutlinedIcon
                    fontSize="small"
                    sx={{ color: 'text.secondary' }}
                  />
                </Link>
              </Typography>

              <Typography>
                <Link
                  sx={{ color: 'text.secondary' }}
                  href="/"
                  component="button"
                  underline="none"
                >
                  Поділитись
                </Link>
              </Typography>
              <Typography>
                <Link
                  sx={{ color: 'text.secondary' }}
                  href="/"
                  component="button"
                  underline="none"
                >
                  Додати у відвідані
                </Link>
              </Typography>

              <Typography variant="button">
                <Link
                  sx={{ color: 'text.secondary' }}
                  href="/"
                  component="button"
                  underline="none"
                >
                  <MoreHorizIcon />
                </Link>
              </Typography>
            </Box>

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 5,
                    mt: 5
                  }}
                >
                  <Typography>This location created by:</Typography>
                  <Avatar
                    sx={{ mt: -2 }}
                    aria-label="avtor"
                    src={children[0].avatarMini}
                  />
                  <Typography>{children[0].name}</Typography>

                  <Typography>{children[0].dateOfPublic}</Typography>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 5,
                    p: 3,
                    border: '1px solid grey '
                  }}
                >
                  {children[0].description}
                </Typography>
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ mt: 5 }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    textAlign: 'center',
                    borderBottom: '1px solid grey'
                  }}
                >
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
                        placeholder="Add your comment"
                        variant="outlined"
                        fullWidth
                      />

                      <Button
                        sx={{
                          width: '25%',
                          borderRadius: 10,
                          alignSelf: 'center',
                          mt: 3,
                          color: 'black'
                        }}
                        endIcon={<SendOutlinedIcon />}
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
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 4,
                        alignSelf: 'flex-end'
                      }}
                    >
                      <Typography variant="button">
                        <Link
                          href="/"
                          component="button"
                          underline="none"
                          sx={{ pr: 1, color: 'text.secondary' }}
                        >
                          <ThumbUpOutlinedIcon fontSize="small" />
                        </Link>
                        {children[0].likeCounter}
                      </Typography>
                      <Typography variant="button">
                        <Link
                          sx={{ pr: 1, color: 'text.secondary' }}
                          href="/"
                          component="button"
                          underline="none"
                        >
                          <ThumbDownAltOutlinedIcon fontSize="small" />
                        </Link>
                      </Typography>
                    </Box>
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
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 4,
                        alignSelf: 'flex-end'
                      }}
                    >
                      <Typography variant="button">
                        <Link
                          href="/"
                          component="button"
                          underline="none"
                          sx={{ pr: 1, color: 'text.secondary' }}
                        >
                          <ThumbUpOutlinedIcon fontSize="small" />
                        </Link>
                        {children[0].likeCounter}
                      </Typography>
                      <Typography variant="button">
                        <Link
                          sx={{ pr: 1, color: 'text.secondary' }}
                          href="/"
                          component="button"
                          underline="none"
                        >
                          <ThumbDownAltOutlinedIcon fontSize="small" />
                        </Link>
                      </Typography>
                    </Box>
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
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 4,
                        alignSelf: 'flex-end'
                      }}
                    >
                      <Typography variant="button">
                        <Link
                          href="/"
                          component="button"
                          underline="none"
                          sx={{ pr: 1, color: 'text.secondary' }}
                        >
                          <ThumbUpOutlinedIcon fontSize="small" />
                        </Link>
                        {children[0].likeCounter}
                      </Typography>
                      <Typography variant="button">
                        <Link
                          href="/"
                          sx={{ pr: 1, color: 'text.secondary' }}
                          component="button"
                          underline="none"
                        >
                          <ThumbDownAltOutlinedIcon fontSize="small" />
                        </Link>
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </CardContent>
            </Collapse>
          </Card>
        </Typography>
      </Typography>
    </Box>
  );
}

export default PointPopup;
