import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Grid, Button, Slider, Typography } from "@mui/material";
import "./style.css";
import BirthDayCake from "../assets/Birthday-cake.png";
import { useNavigate, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import { SwatchesPicker } from "react-color";
import DownloadIcon from "@mui/icons-material/Download";
import SendIcon from "@mui/icons-material/Send";
import * as htmlToImage from "html-to-image";
export default function EventPage() {
  const [customBg, setCustomBg] = useState(null);
  const [customBorder, setCustomBorder] = useState(null);
  const [pageImage, setpageImage] = useState();
  const history = useNavigate();
  const location = useLocation();
  console.log(location);
  const domEl = useRef(null);
  useEffect(() => {
    const user = localStorage.getItem("user-session-data");
    const userData = JSON.parse(user);
    //console.log(userData.email, "user data from session");
    setpageImage(
      location.state.eventImage == null
        ? BirthDayCake
        : location.state.eventImage
    );
  }, []);

  const handleDownload = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);
    const link = document.createElement("a");
    link.download = "html-to-img.png";
    link.href = dataUrl;
    link.click();
  };
  const handleChange = (color) => {
    setCustomBg(color.hex);
  };

  const handleShare = async () => {
    // const response = await fetch(
    //   "https://m.media-amazon.com/images/I/71r-FDitNoL.jpg"
    // );
    //const blob = await response.blob();
    const dataUrl = await htmlToImage.toPng(domEl.current);
    const blob = await (await fetch(dataUrl)).blob();
    console.log(blob);
    const file = new File([blob], "share.png", { type: blob.type });
    if (navigator.share) {
      await navigator
        .share({
          title: "title",
          text: "your text",
          url: "url to share",
          files: [file],
        })
        .then(() => {})
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="Responsive-Height">
        <Box sx={{ padding: 6 }}>
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
              ←
            </Button>
          </div>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container justifyContent="center" alignItems="center">
                <Box
                  ref={domEl}
                  sx={{
                    p: 2,
                    bgcolor: customBg === null ? "lightpink" : customBg,
                    borderRadius: customBorder === null ? 3 : customBorder,
                    width: "80%",
                    maxWidth: "400px",
                  }}
                >
                  <Grid container justifyContent="center" alignItems="center">
                    <img
                      src={pageImage}
                      alt={"Landing..."}
                      style={{ maxWidth: "100%" }}
                    />
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="left"
                    direction={"column"}
                  >
                    <p className="Birthday-Bash">{location.state.name}</p>
                    <p className="Birthday-Bash-secondary">
                      {location.state.hostName}
                    </p>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "white" }}>
                            <CalendarMonthIcon style={{ color: "#8456EC" }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={location.state.eventStartDate}
                          secondary={location.state.eventEndDate}
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "white" }}>
                            <LocationOnIcon style={{ color: "#8456EC" }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Street name"
                          secondary={location.state.eventLocation}
                        />
                      </ListItem>
                      {location.state.eventDisc && (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "white" }}>
                              <DescriptionIcon style={{ color: "#8456EC" }} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Discription"
                            secondary={location.state.eventDisc}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container justifyContent="center" alignItems="center">
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "lightpink",
                    width: "80%",
                    borderRadius: "5px",
                  }}
                >
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction={"column"}
                  >
                    <Typography variant="body2" fontSize={20}>
                      Background Color
                    </Typography>
                    <SwatchesPicker onChange={handleChange} />;
                    <Typography variant="body2" fontSize={20}>
                      Set border radius
                    </Typography>
                    <Slider
                      value={customBorder}
                      max={30}
                      defaultValue={0}
                      onChange={(e) => setCustomBorder(e.target.value)}
                      color="secondary"
                      sx={{ width: "80%" }}
                    />
                    <Box sx={{ marginY: 1 }}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        direction={"row"}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<SendIcon />}
                          onClick={handleShare}
                          sx={{ p: 2, height: "50px", m: 2 }}
                        >
                          <Typography variant="h6">share</Typography>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DownloadIcon />}
                          onClick={handleDownload}
                          sx={{ p: 2, height: "50px", m: 2 }}
                        >
                          <Typography variant="h6">download</Typography>
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}
