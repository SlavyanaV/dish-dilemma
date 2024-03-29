import { FC, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, useNavigate } from 'react-router-dom';
import { colors, link } from '../../shared/styles/sharedStyles';
import logo from '../../images/logo.png';
import { useUserContext } from '../../hooks/useUserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const {
    user: { accessToken },
  } = useUserContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleOnLogout = async () => {
    try {
      await signOut(auth);

      navigate('/login');
    } catch (err: any) {
      setAlertMessage(err.message);
      setIsOpen(true);
    }
  };

  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: colors.dark,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link to="/" style={link}>
              <Tooltip title="Open Home page">
                <IconButton>
                  <Avatar alt="Home page" src={logo} />
                </IconButton>
              </Tooltip>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: colors.light,
                }}
              >
                Dish Dilemma
              </Typography>
            </Link>
          </Box>
          <Box>
            <Box className={'navbar-links'}>
              <Link to="/" style={link}>
                <Button sx={{ color: colors.light }}>Random recipe</Button>
              </Link>
              <Link to="/all-recipes" style={link}>
                <Button sx={{ color: colors.light }}>All recipes</Button>
              </Link>
              {!!accessToken ? (
                <>
                  <Link to="/add-recipe" style={link}>
                    <Button sx={{ color: colors.light }}>Add recipe</Button>
                  </Link>
                  <Link to="/my-profile" style={link}>
                    <Button sx={{ color: colors.light }}>My profile</Button>
                  </Link>
                  <Button sx={{ color: colors.light }} onClick={handleOnLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" style={link}>
                    <Button sx={{ color: colors.light }}>Login</Button>
                  </Link>
                  <Link to="/register" style={link}>
                    <Button sx={{ color: colors.light }}>Register</Button>
                  </Link>
                </>
              )}
            </Box>
            <Box className={'menu-links'}>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      Menu
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>
                        <Link to="/" style={link}>
                          <Button sx={{ color: colors.light }}>
                            Random recipe
                          </Button>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Link to="/all-recipes" style={link}>
                          <Button sx={{ color: colors.light }}>
                            All recipes
                          </Button>
                        </Link>
                      </MenuItem>
                      {!!accessToken ? (
                        <>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/add-recipe" style={link}>
                              <Button sx={{ color: colors.light }}>
                                Add recipe
                              </Button>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/my-profile" style={link}>
                              <Button sx={{ color: colors.light }}>
                                My profile
                              </Button>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Button
                              sx={{ color: colors.light }}
                              onClick={handleOnLogout}
                            >
                              Logout
                            </Button>
                          </MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/login" style={link}>
                              <Button sx={{ color: colors.light }}>
                                Login
                              </Button>
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Link to="/register" style={link}>
                              <Button sx={{ color: colors.light }}>
                                Register
                              </Button>
                            </Link>
                          </MenuItem>
                        </>
                      )}
                    </Menu>
                  </>
                )}
              </PopupState>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <AlertMessage
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        severity={'error'}
        alertTitle={'Error'}
        alertMessage={alertMessage}
      />
    </Box>
  );
};
