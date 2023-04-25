import { Link } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Box,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FilterIcon from '@mui/icons-material/Filter';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { colors, link } from '../shared/styles/sharedStyles';
import logo from '../images/logo.png';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <Paper
      sx={{
        width: '100%',
        backgroundColor: colors.dark,
        color: colors.light,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 10,
        }}
      >
        <Link to="/" style={link}>
          <Tooltip title="Open Home page">
            <IconButton>
              <Avatar alt="Home page" src={logo} />
            </IconButton>
          </Tooltip>
        </Link>
        <Typography>© 2023 Dish Dilemma</Typography>
      </Box>
      <BottomNavigation
        sx={{
          backgroundColor: colors.dark,
          mr: 10,
        }}
      >
        <Link to="https://github.com/SlavyanaV/dish-dilemma" style={link}>
          <BottomNavigationAction
            label="GitHub"
            showLabel={true}
            sx={{ color: colors.light, p: '9px' }}
            icon={<GitHubIcon />}
          />
        </Link>
        <Link to="https://firebase.google.com/" style={link}>
          <BottomNavigationAction
            label="Firebase"
            showLabel={true}
            sx={{ color: colors.light, p: '9px' }}
            icon={<WhatshotIcon />}
          />
        </Link>
        <Link to="https://spoonacular.com/food-api" style={link}>
          <BottomNavigationAction
            label="spoonacular API"
            showLabel={true}
            sx={{ color: colors.light, p: '9px' }}
            icon={<RestaurantMenuIcon />}
          />
        </Link>
        <Link to="https://www.midjourney.com/home/" style={link}>
          <BottomNavigationAction
            label="Midjourney"
            showLabel={true}
            sx={{ color: colors.light, p: '9px' }}
            icon={<FilterIcon />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
};
