import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import "./style.css";
import BirthDayCake from "../assets/Birthday-cake.png";
import { useNavigate, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function EventPage() {
  const history = useNavigate();
  const location = useLocation();

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
            style={{ height: "100%" }}
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container justifyContent="center" alignItems="center">
                <Box sx={{ p: 4 }}>
                  <img
                    src={
                      location.state.eventImage == null
                        ? BirthDayCake
                        : location.state.eventImage
                    }
                    alt={"Landing..."}
                    style={{ maxWidth: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <p className="Birthday-Bash">{location.state.name}</p>
                  <p className="Birthday-Bash-secondary">Hosted by Elysia</p>
                  <List>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      }
                    >
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

                    <ListItem
                      secondaryAction={
                        <IconButton edge="end">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      }
                    >
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
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Box>
  );
}
