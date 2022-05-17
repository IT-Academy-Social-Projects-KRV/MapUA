import React, { useState, MouseEvent } from 'react';
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
  ListItemAvatar,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

function PointPopup() {
  const isLoggedUser = useTypedSelector(state => state.userLogin.isLogged);
  const infoLocation = useTypedSelector(state => state.popupLocation);
  const emailUser = useTypedSelector(state => state.user);

  console.log(emailUser);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { isLoading, _id, rating, locationName, description, photoSrc } =
    infoLocation;

  console.log(isLoading, _id, rating, locationName);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleLikes = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(isLoggedUser);

    if (!isLoggedUser) {
      setOpenSnackbar(true);
    } else {
      //
    }
  };

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          image={photoSrc}
          alt={locationName}
        />

        <Box>
          <Typography
            color="text.secondary"
            variant="h4"
            sx={{ pl: 5, pt: 2, mb: 2 }}
          >
            {locationName}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 5,
              pr: 10
            }}
          >
            <IconButton onClick={handleLikes}>
              <ThumbUpOutlinedIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
              />
              {rating.likes.length}
            </IconButton>

            <IconButton onClick={handleLikes}>
              <ThumbDownAltOutlinedIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
              />
              {rating.dislikes.length}
            </IconButton>

            <IconButton size="small">To share</IconButton>

            <IconButton size="small">Add to visited</IconButton>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
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
              {description}
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
            <List>
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
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={5000}
            open={openSnackbar}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: '100%' }}
            >
              Sign up to be able to likes!
            </Alert>
          </Snackbar>
        </Stack>
      </Card>
    </Box>
  );
}

export default PointPopup;
