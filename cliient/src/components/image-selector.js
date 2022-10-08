import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Container } from "@mui/system";
import React, { useState } from "react";
import "./style.css";
import ClearIcon from "@mui/icons-material/Clear";
import onlyLogo from "../assets/only-logo-no-bg.png";
import { imageArray } from "./images";
import { useProvider } from "../context/provider";

export default function ImageSelector(props) {
  const { selectImage, setSelectImage } = useProvider();
  const [dispImg, setDispImg] = useState(imageArray[0]);
  function onImageChange(event) {
    setDispImg(URL.createObjectURL(event.target.files[0]));
    setSelectImage(URL.createObjectURL(event.target.files[0]));
  }
  const handleSelect = (img) => {
    setDispImg(img);
    setSelectImage(img);
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
              props.handleClose();
            }}
          >
            <ClearIcon color="secondary" sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 3 }} style={{ width: "100%" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    fontFamily: "Helvetica",
                    textAlign:'center'
                  }}
                >
                  Select Image from Collection
                </p>
              </Container>
          <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
         
            {/* <Grid
              item
              xs={4}
              sm={8}
              md={7}
              order={{ xs: 2, sm: 2, md: 1 }}
              sx={{ overflow: "hidden", height: "100%" }}
            >
              <Container maxWidth="md" sx={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    fontFamily: "Helvetica",
                    textAlign:'center'
                  }}
                >
                  Select Image from Collection
                </p>
              </Container>
              <Grid container justifyContent="center" className="img-container">
                {imageArray.map((imgX, index) => (
                  <Box sx={{ width: 130, padding: 0.2 }}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={{ bgcolor: "lightpink" }}
                    >
                      <img
                        src={imgX}
                        alt={imgX}
                        key={index}
                        style={{ width: "100%" }}
                        onClick={() => handleSelect(imgX)}
                      />
                    </Grid>
                  </Box>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={4} sm={8} md={5} order={{ xs: 1, sm: 1, md: 2 }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                height="100%"
                sx={{ mt: 3, p: 4 }}
              >
                <img
                  src={dispImg}
                  alt="selected"
                  className="common-box-shadow image-size"
                />
              </Grid>
            </Grid> */}
            <TabContext value={value}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList onChange={handleChange} aria-label="lab API tabs example">
      <Tab label="Previous Imaege" value="1" />
      <Tab label="Default Image" value="2" />
    </TabList>
  </Box>
  <TabPanel value="1">
  <Grid
              item
              xs={4}
              sm={8}
              md={7}
              order={{ xs: 2, sm: 2, md: 1 }}
              sx={{ overflow: "hidden", height: "100%" }}
            >
              
              <Grid container justifyContent="center" className="img-container">
                {imageArray.map((imgX, index) => (
                  <Box sx={{ width: 130, padding: 0.2 }}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      sx={{ bgcolor: "lightpink" }}
                    >
                      <img
                        src={imgX}
                        alt={imgX}
                        key={index}
                        style={{ width: "100%" }}
                        onClick={() => handleSelect(imgX)}
                      />
                    </Grid>
                  </Box>
                ))}
              </Grid>
            </Grid>
  </TabPanel>
  <TabPanel value="2">
  <Grid item xs={4} sm={8} md={5} order={{ xs: 1, sm: 1, md: 2 }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                height="100%"
                sx={{ mt: 3, p: 4 }}
              >
                <img
                  src={dispImg}
                  alt="selected"
                  className="common-box-shadow image-size"
                />
              </Grid>
            </Grid>
  </TabPanel>
  
</TabContext>
          </Grid>
          
        </Box>
      </Box>
    </div>
  );
}
