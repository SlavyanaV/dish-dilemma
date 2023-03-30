import { Navbar } from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ContentContainer } from './components/ContentContainer';
import './shared/styles/sharedStyles.css'

function App() {
  return (
    <>
      <CssBaseline />
      <div
        style={{
          minHeight: '100vh',
          background:
            'url(https://i.ibb.co/s1yNGV6/Psychozub-Realistic-wooden-kitchen-board-with-kitchen-utensils-f6c72a8a-d4c0-4be8-9e3b-aca73ea1dff6.png) #39411099',
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
    </>
  );
}

export default App;
