import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid, Button, InputLabel, Typography } from "@mui/material";
import "./style.css";
import img from "../assets/Birthday-cake.png";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CollectionsIcon from "@mui/icons-material/Collections";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ImageSelector from "./image-selector";
import { useProvider } from "../context/provider";
import { commonUrl } from "../config";
export default function CreatePage() {
  const { selectImage } = useProvider();
  const [startDate, setStartDate] = useState("");
  const [open, setOpen] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [hostName, setHostName] = useState(null);
  const [discription, setDiscription] = useState(null);
  const [pageUser, setpageUser] = useState(null);

  const history = useNavigate();
  const handleClose = () => setOpen(false);
  const openBrowser = () => history("/browse");
  useEffect(() => {
    const user = localStorage.getItem("user-session-data");
    const userData = JSON.parse(user);
    setHostName(`${userData.firstname} ${userData.lastname} `);
    setpageUser(userData);
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
  };
  const handleClick = () => {
    addImage();
    history("/event", {
      state: {
        id: 1,
        name: eventName,
        hostName: hostName,
        eventImage: selectImage,
        eventStartDate: startDate,
        eventEndDate: endDate,
        eventLocation: location,
        eventDisc: discription,
      },
    });
  };

  const addImage = () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: selectImage,
        email: pageUser.email,
      }),
    };

    fetch(`${commonUrl}/addimage`, options)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          //console.log(res, "response");
        }
      })
      .catch((err) => console.error(err, "error from client"));
  };
  return (
    <Box className="createPage">
      <div className="Responsive-Height">
        <Box sx={{ padding: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography
              variant="p"
              sx={{
                fontSize: { xs: 24, sm: 30, md: 40 },
                fontFamily: "Helvetica",
                fontStyle: "normal",
              }}
            >
              Create your event
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "gray",
                fontSize: { xs: 18, sm: 24, md: 30 },
                textTransform: "none",
                fontWeight: "300",
              }}
              onClick={() => history("/")}
            >
              Cancel
            </Button>
          </Grid>

          <Grid
            container
            spacing={6}
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              order={{ xs: 2, sm: 2, md: 1 }}
            >
              <Grid container direction="column">
                <form onSubmit={() => handleClick()}>
                  <InputLabel aria-label="My event is called">
                    <p className="create-label">
                      <span role="img" aria-label="emoji">
                        {" "}
                        ????
                      </span>{" "}
                      My event is called
                    </p>
                  </InputLabel>
                  <input
                    required
                    className="create-textfield"
                    onChange={(e) => setEventName(e.target.value)}
                  />
                  <InputLabel htmlFor="My event is called">
                    <p className="create-label">
                      {" "}
                      <span role="img" aria-label="emoji">
                        {" "}
                        ????/????{" "}
                      </span>
                      Hosted by <span className="create-span">(optional)</span>
                    </p>
                  </InputLabel>
                  <input
                    value={hostName}
                    required
                    id="My event is called"
                    className="create-textfield"
                    onChange={(e) => setHostName(e.target.value)}
                  />

                  <InputLabel>
                    <p className="create-label">
                      {" "}
                      <span role="img" aria-label="emoji">
                        ???????{" "}
                      </span>
                      It starts at
                    </p>
                  </InputLabel>
                  <input
                    required
                    type="datetime-local"
                    className="create-textfield"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <InputLabel htmlFor="My event is called">
                    <p className="create-label">
                      <span role="img" aria-label="emoji">
                        ????{" "}
                      </span>{" "}
                      It ends at <span className="create-span">(optional)</span>
                    </p>
                  </InputLabel>
                  <input
                    type="datetime-local"
                    id="My event is called"
                    className="create-textfield"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <InputLabel htmlFor="My event is called">
                    <p className="create-label">
                      <span role="img" aria-label="emoji">
                        {" "}
                        ????
                      </span>{" "}
                      It's happening at{" "}
                    </p>
                  </InputLabel>
                  <input
                    required
                    id="My event is called"
                    className="create-textfield"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />

                  <InputLabel htmlFor="My event is called">
                    <p className="create-label">
                      {" "}
                      <span role="img" aria-label="emoji">
                        {" "}
                        ??????
                      </span>{" "}
                      Description{" "}
                      <span className="create-span">(optional)</span>
                    </p>
                  </InputLabel>
                  <input
                    id="My event is called"
                    className="create-textfield"
                    onChange={(e) => {
                      setDiscription(e.target.value);
                    }}
                  />
                  {/* <Box sx={{ padding: 5, height: 300 }}>
                  <img src={image} alt="..." style={{ maxWidth: "100%" }} />
                </Box> */}

                  <Box sx={{ paddingY: 4 }}>
                    <Button
                      type="submit"
                      sx={{ width: "100%" }}
                      variant="contained"
                      className="LandingPage-button"
                    >
                      Create event
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              order={{ xs: 1, sm: 1, md: 2 }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                height="100%"
                direction="column"
              >
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  maxWidth="400px"
                  maxHeight="400px"
                  direction="row"
                >
                  <img
                    src={selectImage == null ? img : selectImage}
                    alt={"Landing"}
                    style={{ maxWidth: "80%" }}
                  />
                </Grid>

                <Box sx={{ margin: 2, p: 3 }}>
                  <Button
                    sx={{ margin: 2, width: "100%", height: "50px" }}
                    variant="contained"
                    component="label"
                    className="LoginOrSign-button"
                    onClick={() => history("/upload")}
                  >
                    Upload{" "}
                    <span style={{ marginLeft: "10px", marginTop: "5px" }}>
                      <AddAPhotoIcon
                        sx={{ fontSize: "25px", color: "aliceblue" }}
                      />
                    </span>
                  </Button>

                  <Button
                    sx={{ margin: 2, width: "100%", height: "50px" }}
                    variant="contained"
                    component="label"
                    className="LoginOrSign-button"
                    onClick={() => setOpen(true)}
                  >
                    select Image{" "}
                    <span style={{ marginLeft: "10px", marginTop: "5px" }}>
                      <CollectionsIcon
                        sx={{ fontSize: "25px", color: "aliceblue" }}
                      />
                    </span>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
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
            <ImageSelector
              handleClose={handleClose}
              openBrowser={openBrowser}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "60%",
  minHeight: "60%",
  maxHeight: "80%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 1,
};
