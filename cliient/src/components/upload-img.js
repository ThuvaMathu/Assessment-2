import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useProvider } from "../context/provider";
import img from "../assets/Birthday-cake.png";

import "./style.css";
import { useNavigate } from "react-router-dom";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export default function UploadImg() {
  const { selectImage, setSelectImage, setRawImage } = useProvider();
  const history = useNavigate();
  const [file, setFile] = useState(null);

  const handleChange = (fileParam) => {
    console.log(fileParam);
    if (fileParam[0].size <= 4194304) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(fileParam[0]);
      fileReader.onload = (event) => {
        setRawImage(event.target.result);
        localStorage.setItem("_editor_img", event.target.result);
        setSelectImage(event.target.result);
        setFile(event.target.result);
      };
    } else {
      window.alert(
        "The file your trying to use is too large! please select a file with size less than 4MB"
      );
      window.location.reload();
    }
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <h1>Upload or drop a Image right here</h1>
        <p>File size should be less then 4MB!</p>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          label="Upload or drop a Image right here"
          types={fileTypes}
        />

        {file && (
          <Box sx={{ p: 4, maxWidth: 300 }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <img
                src={selectImage == null ? img : selectImage}
                alt={"Landing"}
                style={{ maxWidth: "80%" }}
              />
              <Box sx={{ marginY: 1 }}>
                <Button
                  sx={{ paddingX: "30px" }}
                  variant="contained"
                  component="label"
                  className="LoginOrSign-button"
                  onClick={() => {
                    history("/edit");
                    //console.log(selectImage, "file");
                  }}
                >
                  Next{" "}
                  <span style={{ marginLeft: "10px", marginTop: "5px" }}></span>
                </Button>
              </Box>
            </Grid>
          </Box>
        )}
      </Grid>
    </div>
  );
}
