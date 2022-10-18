import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import logo from "../assets/logo.png";
import onlyLogo from "../assets/only-logo-no-bg.png";
import "./style.css";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import LogiPage from "./login-page";
import { useLocation, useNavigate } from "react-router-dom";
import { useProvider } from "../context/provider";
import Avatar from "./avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 1,
};
const TopAppBar = () => {
  const { open, setOpen, isLoggedIn, userData } = useProvider();
  //const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useNavigate();
  const location = useLocation();
  let currentLocation = location.pathname;
  //console.log(location.pathname, "current location: ");
  const handleClick = () => {
    setOpen(false);
    history("/signUp");
    console.log("Sign Up");
  };
  return (
    <AppBar position="sticky" style={{ background: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ padding: 1, flexGrow: 1, height: 50 }}>
            <img
              alt="logo"
              src={logo}
              style={{
                maxWidth: "150px",
              }}
              className="full-logo"
              onClick={() => history("/")}
            />
            <img
              alt="logo"
              src={onlyLogo}
              style={{
                maxHeight: "40px",
              }}
              className="half-logo"
              onClick={() => history("/")}
            />
          </Box>
          {currentLocation !== "/signUp" ? (
            isLoggedIn !== true ? (
              <Box sx={{ padding: 1 }}>
                <Button
                  variant="contained"
                  className="LoginOrSign-button"
                  onClick={handleOpen}
                >
                  <h3 style={{ textTransform: "none" }}>Login/signUp</h3>
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style} className="modal">
                      <LogiPage handleClick={handleClick} />
                    </Box>
                  </Fade>
                </Modal>
              </Box>
            ) : (
              <Avatar data={userData.firstname} />
            )
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopAppBar;
