import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid, Button, InputLabel, IconButton } from "@mui/material";
import "./style.css";
import img from "../assets/Birthday-cake.png";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
export default function CreatePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState();
  const [eImage, setImage] = useState(null);
  const [eventName, setEventName] = useState();
  const history = useNavigate();
  const handleClick = () => {
    history("/event", {
      state: {
        id: 1,
        name: eventName,
        eventImage: eImage,
        eventStartDate: startDate,
        eventEndDate: endDate,
        eventLocation: location,
      },
    });
  };
  function onImageChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }
  return (
    <Box className="createPage">
      <div className="Responsive-Height">
        <Box sx={{ padding: 4 }}>
          <div className="create-cancel">
            <Button
              variant="text"
              className="cancel-btn"
              sx={{
                fontSize: 26,
                textTransform: "none",
                color: "gray",
                fontWeight: "300",
              }}
              onClick={() => history("/")}
            >
              Cancel
            </Button>
          </div>
          <div className="create-header">
            <p>Create your event</p>
          </div>

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
              <Grid
                container
                direction="column"
                // justifyContent="center"
                // alignItems="center"
              >
                <form onSubmit={() => handleClick()}>
                  <InputLabel aria-label="My event is called">
                    <p className="create-label">
                      <span role="img" aria-label="emoji">
                        {" "}
                        🎉
                      </span>{" "}
                      My event is called
                    </p>
                  </InputLabel>
                  <input
                    required
                    className="create-textfield"
                    onChange={(e) => setEventName(e.target.value)}
                  />
                  <InputLabel>
                    <p className="create-label">
                      {" "}
                      <span role="img" aria-label="emoji">
                        🗓️{" "}
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
                        🏁{" "}
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
                        📍
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
                        🔗{" "}
                      </span>
                      Add a URL link{" "}
                      <span className="create-span">(optional)</span>
                    </p>
                  </InputLabel>
                  <input id="My event is called" className="create-textfield" />
                  <InputLabel htmlFor="My event is called">
                    <p className="create-label">
                      {" "}
                      <span role="img" aria-label="emoji">
                        {" "}
                        ✏️
                      </span>{" "}
                      Description{" "}
                      <span className="create-span">(optional)</span>
                    </p>
                  </InputLabel>
                  <input id="My event is called" className="create-textfield" />
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
                style={{ position: "relative" }}
              >
                <Box className="add-photo">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    className="add-photo"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={onImageChange}
                    />
                    <AddAPhotoIcon
                      sx={{ fontSize: "100px", color: "aliceblue" }}
                    />
                  </IconButton>
                </Box>

                <Box sx={{ p: 4 }}>
                  <img
                    src={eImage == null ? img : eImage}
                    alt={"Landing"}
                    style={{ maxWidth: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}
