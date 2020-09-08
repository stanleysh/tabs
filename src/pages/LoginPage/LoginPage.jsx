import React, { useReducer } from 'react';
import './LoginPage.css';
import userService from '../../utils/userService';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/user'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyle = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
        justifyContent: "center"
    },
}));

function formReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_INPUT':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        default:
            throw new Error(`Unsupported action ${action.type}`);
    }
}


function LoginPage(props) {
    const initialState = {
        email: '', 
        pw: ''
    }

    const [info, setInfo] = useReducer(formReducer, initialState);

    function handleChange(e) {
        setInfo({
            type: 'UPDATE_INPUT',
            payload: e.target
        });
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(info);
            props.handleSignupOrLogin();
            props.history.push('/');
        } catch (err) {
            alert('Invalid Credentials!');
        }
    }

    const classes = useStyle();

        return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
            <Avatar className="avatar">
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className="form" noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="pw"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
            </Button>
            <Grid container justify="space-between">
                <Grid item>
                <Link href="/" variant="body2">
                    Cancel
                </Link>
                </Grid>
                <Grid item>
                <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
        );
    }

    const mapDispatchToProps = (dispatch) => ({
        loginUser: () => dispatch(loginUser())
    });

    export default connect(null, mapDispatchToProps) (LoginPage);
