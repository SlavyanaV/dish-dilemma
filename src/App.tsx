import { Navbar } from './components/Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ContentContainer } from './components/ContentContainer';
import './shared/styles/sharedStyles.css';
import './shared/styles/scrollStyles.css';
import './components/Login/login.css';
import './components/Navbar/navbarStyles.css';
import './components/Footer/footerStyles.css';
import './shared/components/SmallRecipesList/smallRecipesListStyles.css';
import './shared/components/ConfirmDialog/confirmDialog.css';
import { Footer } from './components/Footer/Footer';
import { UserContextProvider } from './contexts/UserContext';

export const App = () => {
  return (
    <UserContextProvider>
      <CssBaseline />
      <Navbar />
      <ContentContainer />
      <Footer />
    </UserContextProvider>
  );
};
