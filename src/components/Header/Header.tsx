import react, { Dispatch, FormEvent, SetStateAction } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './HeaderStyles';

interface HeaderProps {
  getForecast: (city: string) => void
  changeCity: (city: string) => void
  city: string
  setError: Dispatch<SetStateAction<Error | null>>
  setErrorBoundaryKey: Dispatch<SetStateAction<number>>
}

function Header(props: HeaderProps) {

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.setError(null);
    props.setErrorBoundaryKey((prev) => prev + 1);
    props.getForecast(props.city);
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Preferences
          </Typography>
          <form onSubmit={onFormSubmit}
          >
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search a city..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => (props.changeCity(e.target.value))}
                value={props.city}
                id="city"
                />
            </Search>
          </form>
          <Typography id="date" position="relative" left="65%" variant="h6" color="inherit" component="div">
            {new Date().toDateString()}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header