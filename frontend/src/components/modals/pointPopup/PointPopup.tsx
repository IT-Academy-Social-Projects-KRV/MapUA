// I need a map, points and other data to implement the logic for this component
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
import DoneIcon from '@mui/icons-material/Done';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  Box
} from '@mui/material';

import './pointPopup.scss';

// It can be reused in different components
// When the rest of the functionality is available, this component will be assigned to a specific and each point on the map
// Change position a photo, description, buttons, etc. you can without problems
// Now it works on stubs

//  how many symbols should be in the description?
//  height and width of this window ?
//  photo height X width ?

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
                <Avatar sx={{ bgcolor: '#FFCC33' }} aria-label="recipe">
                  {children[0].avatarMini}
                </Avatar>
              }
              title={<h3>{children[0].name}</h3>}
              subheader={children[0].dateOfPublic}
            />
            <IconButton
              onClick={() => setActive(false)}
              sx={{ left: '88%', top: '-11vh' }}
            >
              <CloseIcon color="action" />
            </IconButton>

            <CardMedia
              sx={{ p: 3.2, pt: 0 }}
              component="img"
              image={imgUrl}
              alt="Monument to the Duke de Richelieu"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <div className="subInfo">
                  <Typography variant="h6" className="location__name">
                    {children[0].locationName}
                  </Typography>
                  <IconButton>
                    <DoneIcon />
                  </IconButton>
                  <IconButton>
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton>{children[0].likeCounter}</IconButton>
                  <IconButton>
                    <ThumbDownIcon />
                  </IconButton>
                </div>

                <Typography variant="subtitle2" mt={2}>
                  Monument to the Duke de Richelieu in Odessa - a full-length
                  bronze monument dedicated to Armand Emmanuel du Plessis, Duke
                  de Richelieu, opened in 1828.
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
                <Typography paragraph>Comments section</Typography>
                <Typography paragraph>{children[0].comments}</Typography>
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
