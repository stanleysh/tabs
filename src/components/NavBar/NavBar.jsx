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

    if (props.user) {
        return (
        <div className="App-header">
            <div className='Logo'>
                <Link to="/" className="logo-holder"><p><img src={require("./logo/logo_white.png")} alt="logo" width="40px"/> Tabs</p></Link>
            </div>
            <div className='about-info'>
                <Link to='/about'><Button variant="outlined"className="nav-buttons info">About Us</Button></Link>
            </div>
            <div className='account-info btn-group'>
            <button type="button" className="btn btn-info dropdown-toggle nav-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Hi {props.user.rows[0].name}
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="/questions">Your Questions</a>
                <div className="dropdown-divider"></div>
                <Link to='/'><button className="dropdown-item" onClick={props.handleLogout}>Logout</button></Link>
            </div>
        </div>
        </div>
        )
    } 
    
    return (
    <div className="App-header">
        <div className='Logo'>
            <Link href="/" className={classes.pageLinks}><p><img src={require("./logo/logo_white.png")} alt="logo" width="40px"/> Tabs</p></Link>
        </div>
        <div className='tag-line'>
            <p>A clean simple way to help track your finances</p>
        </div>
        <div className='about-info'>
            <Link href='/about' className={classes.linkButtons}><Button variant="contained" color="primary" className={classes.navButtons}>About Us</Button></Link>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.navButtons}>
                Account
            </Button>
            <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem><a className={classes.dropMenuLink} href="/signup">Signup</a></MenuItem>
        <MenuItem><a className={classes.dropMenuLink} href="/login">Login</a></MenuItem>
      </Menu>
        </div>
    </div>
    )
};

export default NavBar;