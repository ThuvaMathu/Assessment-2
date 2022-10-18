import React from "react";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useProvider } from "../context/provider";
import Carausel from "./carousal/carausel";

export default function LandingPage() {
  const { isLoggedIn, setOpen } = useProvider();
  const history = useNavigate();
  const handleClick = () => {
    history("/create");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="LandingPage">
        <div className="Responsive-Height">
          <Grid
            container
            spacing={1}
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
              <Grid container justifyContent="center" alignItems="center">
                <Box sx={{ p: 2 }}>
                  <Grid container justifyContent="center" alignItems="center">
                    {/* {" "}
                    <img
                      src={landingBg}
                      alt={"Landing..."}
                      style={{ maxWidth: "60%", opacity: 0.2 }}
                    /> */}
                    <Box
                      style={{
                        maxWidth: "350px",
                        maxHeight: "500px",
                      }}
                    >
                      <Carausel />
                    </Box>
                  </Grid>
                </Box>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  className="hide-on-large"
                >
                  <Button
                    variant="contained"
                    className="LandingPage-button"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <span role="img" aria-label="emoji">
                      🎉
                    </span>
                    Create my event
                  </Button>
                </Grid>
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
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box sx={{ p: 2 }}>
                  <div className="LandingPage-Heading">
                    Create stunning event invitation for
                    <br />
                    <span aria-label="anima">
                      <TypeAnimation
                        sequence={[
                          "Birthday party",
                          1000,
                          "Surprice party",
                          2000,
                          "Wedding",
                          500,
                          "Dinner party",
                          1000,
                          "Reception party",
                          2000,
                          "Farewell party",
                          1000,
                          "Christmas caroling party",
                        ]}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                        style={{ color: "rgb(230 20 69)" }}
                      />
                    </span>
                    to bring people together in easy steps.
                  </div>
                  <p className="LandingPage-Subheading">
                    With our easy-to-use platform, <br /> you can customise
                    every detail of your event invitation
                    <br /> and engage with your invitees.
                  </p>
                  <Grid
                    container
                    justifyContent="right"
                    alignItems="center"
                    width="100%"
                    className="hide-on-small"
                  >
                    {isLoggedIn ? (
                      <>
                        <Button
                          variant="contained"
                          className="LandingPage-button hide-on-small"
                          onClick={() => {
                            handleClick();
                          }}
                        >
                          <span role="img" aria-label="emoji">
                            🎉
                          </span>
                          Create my event
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        className="LandingPage-button hide-on-small"
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        <span role="img" aria-label="emoji">
                          🎉
                        </span>
                        Login to Create event
                      </Button>
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}
