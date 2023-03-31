import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FilterIcon from '@mui/icons-material/Filter';
import { colors, link } from '../shared/styles/sharedStyles';

export const Footer = () => {
  return (
    <Paper
      sx={{
        width: '100%',
        backgroundColor: colors.dark,
        color: colors.light,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ pl: 10 }}>© 2023 Dish Dilemma</Typography>
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor: colors.dark,
          pt: 1,
          pr: 10,
        }}
      >
        <Link to="https://github.com/SlavyanaV/dish-dilemma" style={link}>
          <BottomNavigationAction
            label="GitHub"
            showLabel="true"
            sx={{ color: colors.light }}
            icon={<GitHubIcon />}
          />
        </Link>
        <Link to="https://www.themealdb.com/" style={link}>
          <BottomNavigationAction
            label="TheMealDB"
            showLabel="true"
            sx={{ color: colors.light }}
            icon={<RestaurantMenuIcon />}
          />
        </Link>
        <Link to="https://www.midjourney.com/home/" style={link}>
          <BottomNavigationAction
            label="Midjourney"
            showLabel="true"
            sx={{ color: colors.light }}
            icon={<FilterIcon />}
          />
        </Link>
      </BottomNavigation>
    </Paper>
  );
};
