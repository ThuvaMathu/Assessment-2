import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { imageURLArray } from "./images";
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
  const handleSelect = (img) => {
    props.setDispImg(img);
    //setSelectImage(img);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Galary" />
          <Tab label="Collection" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container justifyContent="center" className="img-container">
          {imageURLArray.map((imgX, index) => (
            <Box
              key={index}
              sx={{
                width: 130,
                padding: 0.2,
                "&:hover": {
                  transform: "scale(1.04)",
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
                  style={{ width: "100%" }}
                  onClick={() => handleSelect(imgX)}
                />
              </Grid>
            </Box>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageCollection handleSelect={handleSelect} />
      </TabPanel>
    </Box>
  );
}
