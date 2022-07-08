import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Link
} from '@mui/material';
import { StyledDeveloperCard } from 'components/design/StyledDeveloperCard';

interface Props {
  photo: string;
  fullName: string;
  linkedIn: string;
}

const AboutDeveloperCard = ({ photo, fullName, linkedIn }: Props) => (
  <StyledDeveloperCard>
    <CardActionArea>
      <CardMedia component="img" image={photo} alt="personal photo" />
      <CardContent>
        <Typography align="center" variant="h6">
          {fullName}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Button
        component={Link}
        href={linkedIn}
        size="small"
        endIcon={<LinkedInIcon />}
      >
        LinkedIn
      </Button>
    </CardActions>
  </StyledDeveloperCard>
);

export default AboutDeveloperCard;
