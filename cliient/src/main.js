import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppRouter } from "./app-router";
import LogiPage from "./components/login-page";
import TopAppBar from "./components/top-app-bar";
import Backdrop from "@mui/material/Backdrop";
import { Modal, Box } from "@mui/material";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import AppProvider from "./context/provider";
import { useProvider } from "./context/provider";

export default function Main() {
  const { open, setOpen } = useProvider();
  const handleClose = () => setOpen(false);
  const history = useNavigate();
  const handleClick = () => {
    setOpen(false);
    history("/signUp");
    console.log("Sign Up");
  };
  return (
    <>
      <TopAppBar />
      <AppRouter />
      {/* <LogiPage /> */}
      {/* <Modal
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
      </Modal> */}
    </>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 1,
};
