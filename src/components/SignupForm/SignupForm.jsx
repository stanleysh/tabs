import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import "./SignupForm.css";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function SignupForm(props) {
    const [state, setState] = useState({name: '', email: '', pw: '', pwConf: ''})

  let handleChange = (e) => {
    props.updateMessage('');
    const {name, value} = e.target;
    setState(prevState => ({...prevState, [name]: value}));
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(state);
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (err) {
      // Invalid user data
      props.updateMessage(err.message);
    }
  }

  const isFormInvalid = () => {
    return !(state.name && state.email && state.pwConf && state.pw === state.pwConf);
  }

  const classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='paper'>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className='form' noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pw"
                label="Password"
                type="password"
                id="pw"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pwConf"
                label="Confirm Password"
                type="password"
                id="pwConf"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isFormInvalid()}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="space-between">
            <Grid item>
              <Link href='/' variant="body2">
                Cancel
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    );
}

export default SignupForm;
