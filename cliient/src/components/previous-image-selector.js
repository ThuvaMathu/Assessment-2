import React from 'react'
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    TextField,
    Typography,
  } from "@mui/material";

export const PreviousImageSelector = (props) => {
    const {imageArray,handleSelect,dispImg} =props
  
  return (
    <>
    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
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
          </Grid>
    </>
  )
}
