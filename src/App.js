import { Navbar } from './components/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ContentContainer } from './components/ContentContainer';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <ContentContainer />
    </>
  );
}

export default App;
