import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Input,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../context/provider";
import { commonUrl } from "../config";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function SignUpPage() {
  const { setOpen, setIsLoggedIn, setUserData } = useProvider();
  const [resData, setResData] = useState(null);
  const [email, setEmail] = useState("");
  const [passKey, setPassKey] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const history = useNavigate();
  const handleClick = () => {
    setOpen(true);
    history("/");
  };
  const bodyData = {
    email: email,
    pass: passKey,
    firstname: firstName,
    lastname: lastName,
  };
  const storageData = {
    loginStatus: 200,
    email: email,
    firstname: firstName,
    lastname: lastName,
  };
  const checkPass = (pass) => {
    setPassKey(pass);
    setTimeout(() => {
      if (confirmPass === pass) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    }, 800);
  };

  function signUpUser(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    };
    fetch(`${commonUrl}/setItem`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          console.log(response, "res");
          localStorage.setItem(
            "user-session-data",
            JSON.stringify(storageData)
          );
          setIsLoggedIn(true);

          history("/");
          setResData(response.message);
        } else {
          setResData(response.message);
          console.log(response, "no data");
        }
        //console.log(response, "res");
      })
      .catch((err) => console.error(err, "error from client"));
  }

  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
          >
            <Typography variant="h5" color="secodary" fontFamily="Helvetica">
              Sign Up
            </Typography>
            <Container maxWidth="xlg">
              <form onSubmit={signUpUser}>
                <Box sx={{ flexGrow: 1, w: "100%", p: 2 }}>
                  <InputLabel htmlFor="firstname">
                    <Typography variant="p" fontSize={20}>
                      First Name
                    </Typography>
                  </InputLabel>
                  <TextField
                    id="firstname"
                    variant="outlined"
                    placeholder="Enter username"
                    color="secondary"
                    width="400"
                    sx={{ width: "100%", mt: 1, mb: 1 }}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <InputLabel htmlFor="lastname">
                    <Typography variant="p" fontSize={20}>
                      Last Name
                    </Typography>
                  </InputLabel>
                  <TextField
                    id="lastname"
                    variant="outlined"
                    placeholder="Enter full name"
                    color="secondary"
                    width="400"
                    sx={{ width: "100%", mt: 1, mb: 1 }}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <InputLabel htmlFor="email">
                    <Typography variant="p" fontSize={20}>
                      Email
                    </Typography>
                  </InputLabel>
                  <TextField
                    id="email"
                    variant="outlined"
                    type="email"
                    placeholder="Enter Email address"
                    color="secondary"
                    width="400"
                    sx={{ width: "100%", mt: 1, mb: 1 }}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputLabel htmlFor="Password">
                    <Typography variant="p" fontSize={20}>
                      Password
                    </Typography>
                  </InputLabel>
                  <TextField
                    id="password"
                    variant="outlined"
                    type="password"
                    placeholder="Enter password"
                    color="secondary"
                    width="400"
                    sx={{ width: "100%", mt: 1, mb: 1 }}
                    inputProps={{
                      pattern: "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                    }}
                    required
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                      setPassKey("");
                    }}
                  />
                  <ul style={{ marginTop: "0px" }}>
                    <li className="list-style">
                      Length must be greater than or equal to 8
                    </li>
                    <li className="list-style">
                      Must contain one or more uppercase characters
                    </li>
                    <li className="list-style">
                      Must contain one or more numeric valu
                    </li>
                  </ul>
                  <InputLabel htmlFor="CPassword">
                    <Typography variant="p" fontSize={20}>
                      Confirm Password
                    </Typography>
                  </InputLabel>
                  <TextField
                    id="Cpassword"
                    type="password"
                    variant="outlined"
                    placeholder="Confirm your password"
                    color="secondary"
                    width="400"
                    sx={{ width: "100%", mt: 1 }}
                    required
                    value={passKey}
                    onChange={(e) => checkPass(e.target.value)}
                  />
                  {isMatch ? (
                    <p></p>
                  ) : (
                    <p style={{ color: "red" }}>Password doesn't match</p>
                  )}
                </Box>

                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  {resData && (
                    <p style={{ fontSize: "14px", color: "red" }}> {resData}</p>
                  )}
                  <Button
                    variant="contained"
                    className="Login-button"
                    type="submit"
                  >
                    <h3>sign up</h3>
                  </Button>
                </Grid>
              </form>
            </Container>
            <Box sx={{ marginY: 2 }}>
              <Typography variant="p" fontSize={18}>
                Already have an account?
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Login In</span>
                </Button>
              </Typography>
            </Box>
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                history("/");
              }}
            >
              <span style={{ fontWeight: "bold" }}>← Back</span>
            </Button>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
