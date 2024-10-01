import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1c1c1c',
    },
    text: {
      primary: '#ffffff',
      secondary: '#90caf9',
    },
  },
});

export default function SignIn() {
  const [auth, setAuth] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  function errorClear(){
    setEmailError(false);
    setPasswordError(false);
  }
  
  const login = async()=>{
    errorClear();
    try {
      const response = await axios.post('http://localhost:3000/api/user/login',{email,password});
      if (response?.data?.token) {
        localStorage.setItem('token',response.data.token)
        setAuth(true);
      }
      else if(response.data.msg == "User with this email doesnot exists"){
        setEmailError("User with this email doesnot exists");
      }
      else if(response.data.msg == "Password Incorrect"){
        setPasswordError("Password Incorrect");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/fileUpload');
    }
  },[auth])
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            error = {emailError ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e)=>{setEmail(e.target.value)}}
              helperText={emailError && emailError}
              autoFocus
              InputLabelProps={{
                style: { color: '#90caf9' }, // Change label color
              }}
              InputProps={{
                style: { color: '#ffffff' }, // Change input text color
              }}
            />
            <TextField
              error = {passwordError ? true : false}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>{setPassword(e.target.value)}}
              helperText={passwordError && passwordError}
              autoComplete="current-password"
              InputLabelProps={{
                style: { color: '#90caf9' },
              }}
              InputProps={{
                style: { color: '#ffffff' },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ color: '#ffffff' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{login()}}
            >
              Sign In
            </Button>
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
