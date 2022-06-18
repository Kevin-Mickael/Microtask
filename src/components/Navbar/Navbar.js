import React from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';


const Navbar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            <Link
              href="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Microtask Counter
            </Link>
          </Typography>
          {authUser.username !== "" && (
            <Typography variant="h6" color="inherit" component="div">
              {authUser.username}
            </Typography>
          )}
          {authUser.username !== "" && (
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                aria-label="Logout"
                component="button"
                onClick={logoutHandler}
                sx={{ ml: 2 }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
