import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import "./style.css";
import onlyLogo from "../assets/only-logo-no-bg.png";
import { commonUrl } from "../config";

export default function LogiPage(props) {
  const [resData, setResData] = useState(null);
  const [email, setEmail] = useState("");
  const [passKey, setPassKey] = useState("");

  const logInUser = (params) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, pass: passKey }),
    };
    fetch(`${commonUrl}/signin`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          console.log(response, "response");
          //setUserData(response.data);
          //setIsLoggedIn(true);
          localStorage.setItem(
            "user-session-data",
            JSON.stringify(response.data)
          );
          window.location.reload(false);
          //setResData(response.message);
        } else {
          setResData(response.message);
          console.log(response, "no data");
        }
        //console.log(response, "res");
      })
      .catch((err) => console.error(err, "error from client"));
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1, position: "relative" }}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassKey(e.target.value)}
              />
            </Box>
          </Container>
          {resData && (
            <p style={{ fontSize: "14px", color: "red" }}> {resData}</p>
          )}
          <Box>
            <Button
              variant="contained"
              className="Login-button"
              onClick={() => {
                logInUser();
              }}
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
