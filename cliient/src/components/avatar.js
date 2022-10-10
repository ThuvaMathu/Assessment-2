import { Button, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { useProvider } from "../context/provider";
export default function Avatar(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { setIsLoggedIn, setUserData } = useProvider();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUserData({});
    localStorage.removeItem("user-session-data");
    setOpen(false);
  };
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
        minWidth={200}
      >
        <AccountCircleIcon
          style={{
            fontSize: "40px",
            padding: "5px 5px",
            color: "purple",
          }}
        />

        <Box>
          <p
            style={{
              color: "purple",
              textTransform: "uppercase",
              fontSize: "18px",
            }}
          >
            {props.data}
          </p>
        </Box>
        <Box sx={{ paddingX: 2 }}>
          <IconButton color="secondary" onClick={handleClickOpen}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="log-out"
        >
          <DialogTitle id="log-out">{"log out"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure o you want to logging out
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="secondary" onClick={handleLogOut} autoFocus>
              Log out
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
