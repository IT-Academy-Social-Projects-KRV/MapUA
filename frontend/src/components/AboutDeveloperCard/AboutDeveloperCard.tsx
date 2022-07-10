import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
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
  gitHub: string;
}

const AboutDeveloperCard = ({ photo, fullName, linkedIn, gitHub }: Props) => (
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
      <Button
        component={Link}
        href={gitHub}
        size="small"
        endIcon={<GitHubIcon />}
      >
        GitHub
      </Button>
    </CardActions>
  </StyledDeveloperCard>
);

export default AboutDeveloperCard;
