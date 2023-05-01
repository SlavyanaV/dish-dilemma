import { Navbar } from './components/Navbar/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ContentContainer } from './components/ContentContainer';
import './shared/styles/sharedStyles.css';
import './components/Login/login.css';
import './shared/components/ConfirmDialog/confirmDialog.css';
import { Footer } from './components/Footer';
import backgroundImg from './images/background-image.png';
import { UserContextProvider } from './contexts/UserContext';

export const App = () => {
  return (
    <UserContextProvider>
      <CssBaseline />
      <div
        style={{
          minHeight: '100vh',
          background: `url(${backgroundImg}) #39411099`,
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <Navbar />
        <ContentContainer />
      </div>
      <Footer />
    </UserContextProvider>
  );
};
