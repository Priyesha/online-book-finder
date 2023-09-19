import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

function App() {
    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6C5B7B, #2C3E50)' 
      }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Books Finder
            </Typography>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Router>
            <Routes>
                <Route path="/" Component={Catalogue}>
                </Route>
            </Routes>
        </Router>
      </div>
    );
}

export default App;
