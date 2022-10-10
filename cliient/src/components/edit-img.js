import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useProvider } from "../context/provider";
import img from "../assets/Birthday-cake.png";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import { useNavigate } from "react-router-dom";
import CropImg from "./image-option/crop-img";
import { commonUrl } from "../config";

export default function EditImg() {
  const { selectImage, setSelectImage, rawImage, setRawImage } = useProvider();
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setSelectImage(URL.createObjectURL(file[0]));
    setFile(file);
  };
  useEffect(() => {
    console.log(rawImage);
    getBase64(rawImage)
      .then((result) => {
        getMetaData(result);

        console.log("File Is", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = () => {
    getBase64(rawImage)
      .then((result) => {
        console.log("File Is", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMetaData = (imageFile) => {
    console.log("getMetaData");
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: selectImage === null ? img : selectImage }),
    };
    fetch(`${commonUrl}/importimg`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res, "response");
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err, "error from client"));
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Box sx={{ marginY: "300px" }}></Box>
        <CircularProgress color="secondary" />
      </Grid>
    );
  }
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ textAlign: "center" }}
      >
        <h1>Customize your image</h1>

        <Box sx={{ p: 4, maxWidth: 900 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <img
              src={selectImage == null ? img : selectImage}
              alt={"Landing"}
              style={{ maxWidth: "50%" }}
            />
            <Box
              sx={{
                p: 1,
                marginY: 1,
                bgcolor: "#ffe3f2",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
              >
                <CropImg />
                <CropImg />
                <CropImg />
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
