import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { commonUrl } from "../config";
import { useProvider } from "../context/provider";

export default function ImageCollection(props) {
  const { setUserData } = useProvider();
  const [isLoading, setIsLoading] = useState(true);
  const [imageList, setImageList] = useState();
  const [isHaveData, setIsHaveData] = useState(false);
  useEffect(() => {
    let user = localStorage.getItem("user-session-data");
    let userData = JSON.parse(user);
    //console.log(userData);
    setUserData(userData);
    if (userData !== null) {
      if (userData.loginStatus === 200) {
        getImages(userData.email);
      }
    }
  }, []);
  const getImages = (email) => {
    console.log("sample local storage data", email);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    fetch(`${commonUrl}/getimage`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          //console.log(response.data, "response");
          var temp = [];
          if (response.data.length > 0) {
            response.data.forEach((image) => {
              temp.push(image.S);
            });
            //console.log(temp, "response");
            setImageList(temp);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setIsHaveData(true);
          }
        } else {
          console.log(response, "no data");
        }
      })
      .catch((err) => console.error(err, "error from client"));
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Box style={{ padding: "10px", marginTop: "30px" }}>
          <CircularProgress size="40px" color="secondary" />
        </Box>
      </Grid>
    );
  }
  if (isHaveData) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Box style={{ padding: "10px", marginTop: "30px" }}>
          <Typography variant="p" fontSize={20} textAlign="center">
            You don't have any previously used images
          </Typography>
        </Box>
      </Grid>
    );
  }
  return (
    <div>
      <Grid container justifyContent="center" className="img-container">
        {imageList.map((imgX, index) => (
          <Box
            key={index}
            sx={{
              width: 130,
              padding: 0.2,
            }}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                bgcolor: "lightpink",
              }}
            >
              <img
                src={imgX}
                alt={imgX}
                style={{
                  width: "100%",
                }}
                onClick={() => props.handleSelect(imgX)}
              />
            </Grid>
          </Box>
        ))}
      </Grid>
    </div>
  );
}
