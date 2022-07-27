import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const classes = useStyles();
  const history = useHistory();
  const navs = [
    {
      path: '/',
      name: 'Landing'
    },
    {
      path: '/signIn',
      name: 'SignIn'
    },
    {
      path: '/search',
      name: 'Search'
    },
    {
      path: '/reviews',
      name: 'Reviews'
    },
    {
      path: '/myPage',
      name: 'MyPage'
    }
  ];
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {navs.map(nav => {
            const active = nav.path === pathname;
            return <Button
                    onClick={() => history.push(nav.path)}
                    key={nav.name}
                    variant={active ? 'contained' : ''}
                    color={active ? 'secondary' : "inherit" }>{nav.name}</Button>
          })}
        </Toolbar>
      </AppBar>
    </div>
  );
}