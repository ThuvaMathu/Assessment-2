import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useProvider } from "../context/provider";
import img from "../assets/Birthday-cake.png";

import "./style.css";
import { useNavigate } from "react-router-dom";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG", "DOCX"];

export default function UploadImg() {
  const { selectImage, setSelectImage, setRawImage } = useProvider();
  const history = useNavigate();
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setRawImage(file[0]);
    setSelectImage(URL.createObjectURL(file[0]));
    setFile(file);
  };
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <h1>Hello To Drag & Drop Files</h1>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
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
                    console.log(selectImage, "file");
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
