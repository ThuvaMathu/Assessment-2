import { Box, Grid } from "@mui/material";
import React from "react";
import { imageArray } from "./images";

export default function ImageCollection() {
  return (
    <div>
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
              />
            </Grid>
          </Box>
        ))}
      </Grid>
    </div>
  );
}
