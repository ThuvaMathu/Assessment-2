import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./style.css";
import ClearIcon from "@mui/icons-material/Clear";
import onlyLogo from "../assets/only-logo-no-bg.png";
import { imageArray } from "./images";
import { useProvider } from "../context/provider";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import { commonUrl } from "../config";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
export default function BrowseImage(props) {
  const { selectImage, setSelectImage } = useProvider();
  const [dispImg, setDispImg] = useState(imageArray[0]);
  const [photos, setPhotos] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [searchKey, setSearchKey] = useState();
  const handleSelect = (img) => {
    setDispImg(img);
    setSelectImage(img);
  };
  const history = useNavigate();
  const handleNavigate = () => {
    history("/create");
  };
  useEffect(() => {
    getImage("birthday card");
  }, []);

  const getImage = (params) => {
    setIsloading(true);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reqData: params }),
    };
    fetch(`${commonUrl}/searchimage`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.total_results > 0) {
          console.log(response, "res");
          setPhotos(response.photos);
          setIsloading(false);
        } else {
          console.log(response, "no data");
        }
        //console.log(response, "res");
      })
      .catch((err) => console.error(err, "error from client"));
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Box className="floating-x">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => {
              handleNavigate();
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
              sx={{ overflow: "hidden", height: "100%" }}
            >
              <Grid
                container
                justifyContent="center"
                className="img-container"
                maxWidth="md"
                sx={{ textAlign: "center" }}
              >
                <Box className="common-box-shadow" sx={{ m: 3 }}>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search Google Maps"
                      inputProps={{ "aria-label": "search images" }}
                      value={searchKey}
                      onChange={(e) => {
                        setSearchKey(e.target.value);
                      }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={() => {
                        getImage(searchKey);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Box>
              </Grid>
              <Grid container justifyContent="center" className="img-container">
                {isloading == false ? (
                  photos.map((imgX, index) => (
                    <Box sx={{ width: 130, padding: 0.2 }}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ bgcolor: "lightpink" }}
                      >
                        <img
                          src={imgX.src.tiny}
                          alt={imgX.alt}
                          key={index}
                          style={{ width: "100%" }}
                          onClick={() => handleSelect(imgX.src.medium)}
                        />
                      </Grid>
                    </Box>
                  ))
                ) : (
                  <CircularProgress size={24} />
                )}
              </Grid>
            </Grid>
            <Grid item xs={4} sm={8} md={5}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                height="100%"
                sx={{ mt: 3 }}
              >
                <img
                  src={dispImg}
                  alt="selected"
                  className="common-box-shadow"
                  style={{ width: "70%", marginTop: "20px" }}
                />
                <Box sx={{ marginY: 1 }}>
                  <Button
                    sx={{ paddingX: "30px" }}
                    variant="contained"
                    component="label"
                    className="LoginOrSign-button"
                    onClick={() => handleNavigate()}
                  >
                    Select
                    <span style={{ marginLeft: "10px", marginTop: "5px" }}>
                      <DoneIcon sx={{ fontSize: "25px", color: "aliceblue" }} />
                    </span>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
