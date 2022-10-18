import { Box, Button, CircularProgress, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import ClearIcon from "@mui/icons-material/Clear";
import { useProvider } from "../context/provider";
import LanguageIcon from "@mui/icons-material/Language";
import ImageTab from "./image-tab";
import img from "../assets/Birthday-cake.png";

export default function ImageSelector(props) {
  const { setSelectImage } = useProvider();
  const [dispImg, setDispImg] = useState(img);
  const [isLoading, setIsLoading] = useState(false);
  // function onImageChange(event) {
  //   setDispImg(URL.createObjectURL(event.target.files[0]));
  //   setSelectImage(URL.createObjectURL(event.target.files[0]));
  // }

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress size={40} color="secondary" />
      </Grid>
    );
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Box className="floating-x">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => {
              props.handleClose();
            }}
          >
            <ClearIcon color="secondary" sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 3 }} style={{ width: "100%" }}>
          <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid
              item
              xs={4}
              sm={8}
              md={7}
              order={{ xs: 2, sm: 2, md: 1 }}
              sx={{ overflow: "hidden", height: "100%" }}
            >
              <ImageTab setDispImg={setDispImg} />
            </Grid>
            <Grid item xs={4} sm={8} md={5} order={{ xs: 1, sm: 1, md: 2 }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                height="100%"
                sx={{ mt: 3, p: 3 }}
              >
                <img
                  src={dispImg}
                  alt="selected"
                  className="common-box-shadow image-size"
                />
                <Box>
                  <Button
                    sx={{ paddingX: "30px", mt: 2 }}
                    variant="contained"
                    component="label"
                    className="LoginOrSign-button"
                    onClick={() => {
                      props.handleClose();
                      setSelectImage(dispImg);
                    }}
                  >
                    Done
                  </Button>
                </Box>
                <Box>
                  <Button
                    sx={{ paddingX: "30px", mt: 4, w: 4, height: "60px" }}
                    variant="contained"
                    component="label"
                    color="primary"
                    //className="LoginOrSign-button"
                    onClick={() => props.openBrowser()}
                  >
                    Search web{" "}
                    <span style={{ marginLeft: "10px", marginTop: "5px" }}>
                      <LanguageIcon
                        sx={{ fontSize: "35px", color: "aliceblue" }}
                      />
                    </span>
                  </Button>
                </Box>
              </Grid>

              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
              ></Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
