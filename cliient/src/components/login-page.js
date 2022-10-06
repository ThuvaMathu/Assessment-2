import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./style.css";
import onlyLogo from "../assets/only-logo-no-bg.png";

export default function LogiPage(props) {
  return (
    <div>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <h2>{props.handle}</h2>
        <Box>
          <img src={onlyLogo} alt="loin logo" className="loginLogo" />
        </Box>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          style={{}}
        >
          <Typography variant="h5" color="secodary" fontFamily="Helvetica">
            Log In
          </Typography>
          <Container maxWidth="xlg">
            <Box sx={{ flexGrow: 1, w: "100%", p: 2 }}>
              <InputLabel htmlFor="username">
                <Typography variant="p" fontSize={20}>
                  Username
                </Typography>
              </InputLabel>
              <TextField
                id="username"
                variant="outlined"
                placeholder="Enter your username"
                color="secondary"
                width="400"
                sx={{ width: "100%", mt: 1, mb: 1 }}
              />
              <InputLabel htmlFor="username">
                <Typography variant="p" fontSize={20}>
                  Password
                </Typography>
              </InputLabel>
              <TextField
                id="password"
                variant="outlined"
                type="password"
                placeholder="Enter your username"
                color="secondary"
                width="400"
                sx={{ width: "100%", mt: 1 }}
              />
            </Box>
          </Container>
          <Box>
            <Button
              variant="contained"
              className="Login-button"
              onClick={() => {}}
            >
              <h3>Login</h3>
            </Button>
          </Box>
          <Box sx={{ marginY: 2 }}>
            <Typography variant="p" fontSize={18}>
              Don't have an account?
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  //handleClick();
                  props.handleClick();
                }}
              >
                <span style={{ fontWeight: "bold" }}>Sign up</span>
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Box>
    </div>
  );
}
