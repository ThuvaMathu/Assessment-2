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
import { useNavigate } from "react-router-dom";
import { useProvider } from "../context/provider";
export default function SignUpPage() {
  const { setOpen } = useProvider();
  const history = useNavigate();
  const handleClick = () => {
    setOpen(true);
    history("/");
  };

  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            style={{}}
          >
            <Typography variant="h5" color="secodary" fontFamily="Helvetica">
              Sign Up
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
                  placeholder="Enter username"
                  color="secondary"
                  width="400"
                  sx={{ width: "100%", mt: 1, mb: 1 }}
                />
                <InputLabel htmlFor="fullname">
                  <Typography variant="p" fontSize={20}>
                    Full Name
                  </Typography>
                </InputLabel>
                <TextField
                  id="fullname"
                  variant="outlined"
                  placeholder="Enter full name"
                  color="secondary"
                  width="400"
                  sx={{ width: "100%", mt: 1, mb: 1 }}
                />
                <InputLabel htmlFor="email">
                  <Typography variant="p" fontSize={20}>
                    Email
                  </Typography>
                </InputLabel>
                <TextField
                  id="email"
                  variant="outlined"
                  placeholder="Enter Email address"
                  color="secondary"
                  width="400"
                  sx={{ width: "100%", mt: 1, mb: 1 }}
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
                />
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
                />
              </Box>
            </Container>
            <Box>
              <Button
                variant="contained"
                className="Login-button"
                onClick={() => {}}
              >
                <h3>sign up</h3>
              </Button>
            </Box>
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
