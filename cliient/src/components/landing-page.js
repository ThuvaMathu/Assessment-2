import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import landingBg from "../assets/landing-bg.png";
export default function LandingPage() {
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
                      style={{ maxWidth: "70%" }}
                    /> */}
                    <div class="slider">
	<div class="slide-track">
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" height="100" width="250" alt="" />
		</div>
		<div class="slide">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" height="100" width="250" alt="" />
		</div>
	</div>
</div>
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
                    Imagine if <br />
                    <span aria-label="anima">
                      <TypeAnimation
                        sequence={[
                          "Snapchat", // Types 'One'
                          1000, // Waits 1s
                          "Instragram", // Deletes 'One' and types 'Two'
                          2000, // Waits 2s
                          "WhatsApp", // Types 'Three' without deleting 'Two'
                          3000,
                          "Messenger",
                          4000,
                          "Discord",
                          5000,
                          "Group Chats",
                          6000,
                          "Twitter",
                        ]}
                        wrapper="div"
                        cursor={true}
                        repeat={Infinity}
                        style={{ color: "rgb(230 20 69)" }}
                      />
                    </span>
                    had events.
                  </div>
                  <p className="LandingPage-Subheading">
                    Snapchat Easily host and share events with your friends
                    <br /> across any social media.
                  </p>
                  <Grid
                    container
                    justifyContent="right"
                    alignItems="center"
                    width="100%"
                    className="hide-on-small"
                  >
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
