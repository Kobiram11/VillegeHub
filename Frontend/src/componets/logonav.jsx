import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Box } from '@mui/material';
import { Search as SearchIcon, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const Logonav = ({ logoUrl }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
    // Add your search logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#f4a261' }}> {/* Custom background color */}
        <Toolbar>
          {/* Logo */}
          <Box component="div" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={logoUrl} alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
            <Typography variant="h6" noWrap>
              MyBrand
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ position: 'relative', marginRight: '20px' }}>
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: darkMode ? '#fff' : '#000',  // Text color for light and dark modes
                paddingLeft: '10px',
                backgroundColor: theme.palette.mode === 'light' ? '#f1f1f1' : '#333',
                borderRadius: '5px',
                padding: '5px 10px',
                width: '250px',
              }}
            />
            <IconButton type="submit" sx={{ position: 'absolute', right: 0 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Navigation Buttons */}
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>

          {/* User Profile Icon */}
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>

          {/* Dark Mode Toggle */}
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Logonav;
