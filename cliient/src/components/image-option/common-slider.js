import { Box, Button, Slider, Typography } from "@mui/material";
import React from "react";

export default function Commonslider(props) {
  //console.log(props, "children");
  return (
    <Box style={{ textAlign: "left", paddingLeft: "5px", paddingRight: "5px" }}>
      <Typography style={{ fontSize: "16px" }}>{props.header}</Typography>
      <Slider
        size="small"
        defaultValue={props.default == null || undefined ? 0 : props.default}
        max={props.max}
        aria-label="Default"
        valueLabelDisplay="auto"
        color="secondary"
        onChange={(e) => props.setStateHandle(e.target.value)}
        onChangeCommitted={props.handleFunction}
      />
    </Box>
  );
}
