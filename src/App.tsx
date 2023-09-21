import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalogue from "./pages/Catalogue";
import { AccountCircle, GitHub } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import BookDetails from "./pages/BookDetails";
import { useState } from "react";

function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => setAnchorEl(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(to right, #6C5B7B, #2C3E50)",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Books Finder
          </Typography>
          <Typography variant="body1" style={{ marginRight: "8px" }}>
            App Info
          </Typography>
          <IconButton
            color="inherit"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              component="a"
              href="https://github.com/Priyesha/online-book-finder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <GitHub fontSize="small" />
              </ListItemIcon>
              <ListItemText>Git Repository</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component="a"
              href="https://www.linkedin.com/in/priyesha-yadav-0b2b4581/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText>Author Info</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Router>
        <Routes>
          <Route path="/" Component={Catalogue} />
          <Route path="/books/:bookId/details" Component={BookDetails} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
