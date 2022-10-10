import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ".././style.css";
import { useNavigate } from "react-router-dom";
import { useProvider } from "../../context/provider";
import Slider from "@mui/material/Slider";

export default function CropImg() {
  const { selectImage, setSelectImage } = useProvider();
  const history = useNavigate();
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setSelectImage(URL.createObjectURL(file[0]));
    setFile(file);
  };
  return (
    <div>
      <Box
        sx={{
          p: 1,
          margin: "5px",
          width: "270px",
          height: "50px",
          bgcolor: "#edcedf",
          borderRadius: "10px",
        }}
      >
        <Slider
          defaultValue={50}
          min={30}
          max={300}
          aria-label="Default"
          valueLabelDisplay="auto"
          color="secondary"
        />
      </Box>
    </div>
  );
}
