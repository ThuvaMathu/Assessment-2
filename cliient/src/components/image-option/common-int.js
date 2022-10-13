import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function CommonInt(props) {
  return (
    <TextField
      label={props.lable}
      sx={{ m: 1, width: "110px" }}
      value={props.value}
      size="small"
      color="secondary"
      type="number"
      InputProps={{
        inputProps: {
          min: 0,
          max: props.max,
          step: props.step,
        },
        startAdornment: (
          <InputAdornment position="start">{props.index}: </InputAdornment>
        ),
        onKeyDown: (event) => {
          event.preventDefault();
        },
      }}
      onChange={(e) => props.handleCrop(e.target.value)}
    />
  );
}
