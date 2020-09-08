import React, {useState} from 'react';
import './NavBar.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    navButtons: {
        background: '#05286B',
        color: 'white',
        marginRight: 'px',
        [theme.breakpoints.up('md')]: {
            marginRight: '10px'
        },
        '&:hover': {
            textDecoration: 'none',
            background: 'red',
            boxShadow: 'none'
        }
    },
    linkButtons: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    pageLinks: {
        textDecoration: 'none',
        color: 'white',
        lineHeight: '1.43',
        letterSpacing: '0.01071em',
        fontFamily: 'Roboto',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    dropMenuLink: {
        textDecoration: 'none',
        color: '#05286B',
    }
}));

function NavBar(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    let greeting;
    let loggedIn;
    

    if (props.user) {
        greeting = 
        <h4> Welcome {props.user.rows[0].name}! </h4>
        loggedIn = 
        <>
            <MenuItem><a className={classes.dropMenuLink} href="/finances">Finance</a></MenuItem>
        <MenuItem><a className={classes.dropMenuLink} href="/profile">Profile</a></MenuItem>
        <MenuItem><a className={classes.dropMenuLink} href="/" onClick={props.handleLogout}>Logout</a></MenuItem>
        </>
    } else {
        greeting = <h4>Welcome to the app!</h4>
        loggedIn = 
        <>
        <MenuItem><a className={classes.dropMenuLink} href="/demo">Demo</a></MenuItem>
        <MenuItem><a className={classes.dropMenuLink} href="/signup">Signup</a></MenuItem>
        <MenuItem><a className={classes.dropMenuLink} href="/login">Login</a></MenuItem>
        </>
    }
        
    return (
        <div className="App-header">
            <div className='Logo'>
                <Link href="/" className={classes.pageLinks}><p><img src={require("./logo/logo_white.png")} alt="logo" width="40px"/> Tabs</p></Link>
            </div>
            <div className='about-info'>
                {greeting}
                <Link href='/about' className={classes.linkButtons}><Button variant="contained" color="primary" className={classes.navButtons}>About</Button></Link>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.navButtons}>
                    Menu
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {loggedIn}
                </Menu>
            </div>
        </div>
    )
}
// };

export default NavBar;