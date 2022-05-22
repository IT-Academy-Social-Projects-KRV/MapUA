import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CommentSection from 'components/BigPopup/CommentSection/CommentSection';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Link from '@mui/material/Link';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography
} from '@mui/material';
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
            >
              <Typography variant="subtitle2">Add to visited</Typography>
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
          <CommentSection />
        </Collapse>
      </Card>
    </Box>
  );
}

export default PointPopup;
