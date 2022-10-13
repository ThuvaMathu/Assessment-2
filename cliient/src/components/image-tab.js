import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { imageArray } from "./images";
import { useProvider } from "../context/provider";
import { Grid } from "@mui/material";
import ImageCollection from "./image-collection";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ImageTab(props) {
  const [value, setValue] = React.useState(0);
  const { selectImage, setSelectImage } = useProvider();
  const handleSelect = (img) => {
    props.setDispImg(img);
    setSelectImage(img);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Galary" />
          <Tab label="Collection" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container justifyContent="center" className="img-container">
          {imageArray.map((imgX, index) => (
            <Box
              sx={{
                width: 130,
                padding: 0.2,
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageCollection />
      </TabPanel>
    </Box>
  );
}
