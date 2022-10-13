import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useProvider } from "../context/provider";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { commonUrl } from "../config";
import CommonInt from "./image-option/common-int";
import Commonslider from "./image-option/common-slider";

export default function EditImg() {
  const { selectImage, setSelectImage } = useProvider();

  const [isLoading, setIsLoading] = useState(true);
  const [resData, setResData] = useState(null);
  const [once, setOnce] = useState(true);
  const [currentBuff, setCurrentBuff] = useState(null);
  const [afterRotate, setAfterRotate] = useState(null);
  const [afterCrop, setAfterCrop] = useState(null);
  const [afterModulate, setAfterModulate] = useState(null);
  const [lastEdit, setLastEdit] = useState(null);
  const [latestBuff, setLatestBuff] = useState(null);
  const history = useNavigate();
  const [file, setFile] = useState(null);
  const [cropH, setCropH] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropL, setCropL] = useState(0);
  const [cropT, setCropT] = useState(0);
  const [angle, setAngle] = useState(0);
  const [rotateR, setRotateR] = useState(0);
  const [rotateB, setRotateB] = useState(0);
  const [rotateG, setRotateG] = useState(0);
  const [rotateO, setRotateO] = useState(1);
  const [adjustB, setAdjustB] = useState(100);
  const [adjustL, setAdjustL] = useState(0);
  const [adjustS, setAdjustS] = useState(100);
  const [adjustH, setAdjustH] = useState(0);
  const [disableReset, setDisableReset] = useState(true);

  useEffect(() => {
    const editor_img = localStorage.getItem("_editor_img");
    if (editor_img !== null && once) {
      getMetaData(editor_img);
      setOnce(false);
    }
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
  };
  const getBuff = (callFrom) => {
    setDisableReset(false);
    console.log("user enter none");

    if (callFrom !== lastEdit) {
      console.log("user enter 1");
      if (lastEdit == "crop") {
        setLatestBuff(afterCrop);
        return afterCrop;
      } else if (lastEdit == "rotate") {
        setLatestBuff(afterRotate);
        return afterRotate;
      } else if (lastEdit == "modulate") {
        setLatestBuff(afterModulate);
        return afterModulate;
      } else {
        setLatestBuff(currentBuff);
        return currentBuff;
      }
    } else {
      console.log("user enter 2");

      return latestBuff;
    }
  };
  const getMetaData = (imageFile) => {
    //console.log(imageFile);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageFile,
      }),
    };
    fetch(`${commonUrl}/importimg`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res, "response");
          var img = `data:image/png;base64,${res.base64Img}`;
          setSelectImage(img);
          setCurrentBuff(res.buff);
          setResData(res.meta);
          setFile([img, res.meta, res.buff]);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err, "error from client"));
  };

  const crop = () => {
    const buffer = getBuff("crop");
    console.log(buffer, "test");
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buffer: buffer,
        height: cropH * 2,
        width: cropW * 2,
        left: cropL * 2,
        top: cropT * 2,
      }),
    };
    fetch(`${commonUrl}/crop`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "response");
          var img = `data:image/png;base64,${res.base64Img}`;
          setSelectImage(img);
          setLastEdit("crop");
          setAfterCrop(res.buff);
          setCropH(0);
          setCropW(0);
          setCropL(0);
          setCropT(0);
          setResData(res.meta);
        }
      })
      .catch((err) => console.error(err, "error from client"));
  };
  const rotate = () => {
    const buffer = getBuff("rotate");

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //buffer: currentBuff,
        buffer: buffer,
        angle: angle,
        red: rotateR,
        blue: rotateB,
        green: rotateG,
        opacity: rotateO,
      }),
    };
    fetch(`${commonUrl}/rotate`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "response");
          var img = `data:image/png;base64,${res.base64Img}`;
          setSelectImage(img);
          setAfterRotate(res.buff);
          setLastEdit("rotate");
          setResData(res.meta);
        }
      })
      .catch((err) => console.error(err, "error from client"));
  };
  const modulate = () => {
    const buffer = getBuff("modulate");

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buffer: buffer,
        brightness: adjustB / 100,
        lightness: adjustL,
        saturation: adjustS / 100,
        hue: adjustH,
      }),
    };
    fetch(`${commonUrl}/filter`, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "response");
          var img = `data:image/png;base64,${res.base64Img}`;
          setSelectImage(img);
          setAfterModulate(res.buff);
          setResData(res.meta);
          setLastEdit("modulate");
        }
      })
      .catch((err) => console.error(err, "error from client"));
  };
  const reset = () => {
    setDisableReset(true);
    setLastEdit(null);
    console.log("reset", file);
    setCurrentBuff(file[2]);
    setResData(file[1]);
    setSelectImage(file[0]);
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

        <Box sx={{ p: 4, marginX: "20px" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className="outer-con">
                <div
                  className="container-absolute"
                  style={{
                    top: `${cropT}px`,
                    left: `${cropL}px`,
                    width: `${cropW}px`,
                    height: `${cropH}px`,
                  }}
                ></div>
                <img
                  src={selectImage}
                  alt={"Landing"}
                  style={{ width: "100%" }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                sx={{
                  p: 1,
                  marginY: 1,
                  bgcolor: "#ffe3f2",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <Box
                    sx={{
                      margin: "0px 20px",
                    }}
                  >
                    <Grid
                      container
                      justifyContent="right"
                      alignItems="center"
                      width="100%"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={reset}
                        disabled={disableReset}
                        sx={{ margin: "5px" }}
                      >
                        rest
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => {
                          history("/create");
                        }}
                        sx={{ margin: "5px" }}
                      >
                        Done
                      </Button>
                    </Grid>
                  </Box>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="top"
                    direction="row"
                    width="100%"
                  >
                    <Box
                      sx={{
                        p: 1,
                        margin: "5px",
                        width: "270px",
                        bgcolor: "#edcedf",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        Crop Image
                      </Typography>

                      <CommonInt
                        lable="Width"
                        index="px"
                        step={5}
                        value={cropW}
                        max={(resData.width - cropL * 2) / 2}
                        handleCrop={setCropW}
                      />
                      <CommonInt
                        lable="Height"
                        index="px"
                        step={5}
                        value={cropH}
                        max={(resData.height - cropT * 2) / 2}
                        handleCrop={setCropH}
                      />
                      <CommonInt
                        lable="Top"
                        index="px"
                        step={5}
                        value={cropT}
                        max={(resData.height - cropH * 2) / 2}
                        handleCrop={setCropT}
                      />
                      <CommonInt
                        lable="Left"
                        index="px"
                        step={5}
                        value={cropL}
                        max={(resData.width - cropW * 2) / 2}
                        handleCrop={setCropL}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={crop}
                      >
                        crop
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        p: 1,
                        margin: "5px",
                        width: "270px",
                        bgcolor: "#edcedf",
                        borderRadius: "10px",
                      }}
                    >
                      <Commonslider
                        header="Rotate(0°)"
                        max={360}
                        default={180}
                        handleFunction={rotate}
                        setStateHandle={setAngle}
                      />
                      <Typography
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        Background color
                      </Typography>
                      <CommonInt
                        lable="Red"
                        step={5}
                        value={rotateR}
                        max={255}
                        index="R"
                        handleCrop={setRotateR}
                      />
                      <CommonInt
                        lable="Blue"
                        step={5}
                        value={rotateB}
                        max={255}
                        index="B"
                        handleCrop={setRotateB}
                      />
                      <CommonInt
                        lable="Green"
                        step={5}
                        value={rotateG}
                        max={255}
                        index="G"
                        handleCrop={setRotateG}
                      />
                      <CommonInt
                        lable="Opacity"
                        step={0.1}
                        value={rotateO}
                        max={1}
                        handleCrop={setRotateO}
                        index="O"
                      />
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={rotate}
                      >
                        set
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        p: 1,
                        margin: "5px",
                        width: "270px",
                        bgcolor: "#edcedf",
                        borderRadius: "10px",
                      }}
                    >
                      <Commonslider
                        header="Brighness"
                        max={100}
                        default={100}
                        handleFunction={modulate}
                        setStateHandle={setAdjustB}
                      />
                      <Commonslider
                        header="saturation"
                        max={100}
                        default={100}
                        handleFunction={modulate}
                        setStateHandle={setAdjustS}
                      />
                      <Commonslider
                        header="lightness"
                        max={100}
                        default={0}
                        handleFunction={modulate}
                        setStateHandle={setAdjustL}
                      />
                      <Commonslider
                        header="hue"
                        max={100}
                        default={0}
                        handleFunction={modulate}
                        setStateHandle={setAdjustH}
                      />
                    </Box>
                  </Grid>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
