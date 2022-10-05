import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import logo from "../assets/logo.png";
import "./style.css";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const TopAppBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <AppBar position="sticky" style={{ background: "#fff" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ padding: 1, flexGrow: 1 }}>
              <img
                alt="logo"
                src={logo}
                style={{
                  height: 50,
                }}
              />
            </Box>
            <Box sx={{ padding: 2 }}>
              <Button
                variant="contained"
                className="Login-button"
                onClick={handleOpen}
              >
                <h3>Login/Sign up</h3>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 3 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default TopAppBar;
