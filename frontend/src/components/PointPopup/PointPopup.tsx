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
import axios from 'axios';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { locationType } from '../../../types';

interface Props {
  location: locationType;
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

function PointPopup({ location }: Props) {
  const userData = useTypedSelector(state => state.user);
  const locationData = useTypedSelector(state => state.popupLocation);
  const [locationIsFavorite, setLocationIsFavorite] = useState(
    locationData._id && userData.data.favorite.includes(locationData._id)
  );
  const [locationIsVisited, setLocationIsVisited] = useState(
    locationData._id && userData.data.visited.includes(locationData._id)
  );
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleFavoriteClick = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_API_URI}tougleFavorite`,
      {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        idOfUser: userData.data._id,
        idOfLocation: locationData._id
      } /* ,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    } */
    );
    if (result.status === 200) {
      setLocationIsFavorite(!locationIsFavorite);
    }
  };
  const handleVisitedClick = async () => {
    const result = await axios.put(
      `${process.env.REACT_APP_API_URI}tougleVisited`,
      {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        idOfUser: userData.data._id,
        idOfLocation: locationData._id
      }
    );
    if (result.status === 200) {
      setLocationIsVisited(!locationIsVisited);
    }
  };

  return (
    <Box>
      <Card>
        <CardMedia
          sx={{
            p: 3.2,
            pt: 0,
            pb: 0
          }}
          component="img"
          image={location.arrayPhotos[0]}
          alt={location.locationName}
        />

        <Box>
          <Typography
            color="text.secondary"
            variant="h4"
            sx={{ pl: 5, pt: 2, mb: 2 }}
          >
            {location.locationName}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 5,
              pr: 10
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
              {location.rating?.likes}
            </Typography>

            <Link href="/" component="button" underline="none">
              <ThumbDownAltOutlinedIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
              />
            </Link>

            <Link
              sx={{ color: 'text.secondary' }}
              href="/"
              component="button"
              underline="none"
            >
              <Typography variant="subtitle2">To share</Typography>
            </Link>

            <Link
              sx={{ color: 'text.secondary' }}
              href="/"
              component="button"
              underline="none"
              onClick={handleFavoriteClick}
            >{locationIsFavorite ? 
                <Typography variant="subtitle2"> Remove from favorite</Typography>:
                <Typography variant="subtitle2"> Add to favorite</Typography>
              }
            </Link>

            <Link
              sx={{ color: 'text.secondary' }}
              href="/"
              component="button"
              underline="none"
              onClick={handleVisitedClick}
            >{locationIsVisited ?
              <Typography variant="subtitle2"> Remove from visited</Typography>:
              <Typography variant="subtitle2"> Add to visited</Typography>
              }
            </Link>

            <Link
              sx={{ color: 'text.secondary' }}
              href="/"
              component="button"
              underline="none"
            >
              <MoreHorizIcon />
            </Link>
          </Box>
        </Box>

        <CardContent>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 5,
                mt: 5
              }}
            >
              This location created by:
              <Avatar
                sx={{ mt: -2 }}
                aria-label="avtor"
                src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
              />
              <Typography>Vasya</Typography>
              <Typography>June 22 2022</Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                mt: 5,
                p: 3,
                border: '1px solid grey '
              }}
            >
              {location.description}
            </Typography>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ mt: 3 }}
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
                      mt: 2,
                      color: 'black',
                      mb: 3
                    }}
                    endIcon={<SendOutlinedIcon />}
                  >
                    Send
                  </Button>
                </FormControl>
              </Box>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start" sx={{ pl: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    alt="Vasya"
                    src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Nice place..."
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    />
                  }
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 3,
                    alignSelf: 'flex-end'
                  }}
                >
                  <Link
                    href="/"
                    sx={{ color: 'text.secondary' }}
                    component="button"
                    underline="none"
                  >
                    <ThumbUpOutlinedIcon fontSize="small" />
                  </Link>

                  <Link
                    href="/"
                    sx={{ color: 'text.secondary' }}
                    component="button"
                    underline="none"
                  >
                    <ThumbDownAltOutlinedIcon fontSize="small" />
                  </Link>
                </Box>
              </ListItem>
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}

export default PointPopup;
