import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assets/carousel-img/img1.png";
import img2 from "../../assets/carousel-img/img2.png";
import img3 from "../../assets/carousel-img/img3.png";

export default () => (
  <Carousel autoPlay interval={3000} showThumbs={false} infiniteLoop>
    <div>
      <img alt="" src={img1} />
    </div>
    <div>
      <img alt="" src={img2} />
    </div>
    <div>
      <img alt="" src={img3} />
    </div>
  </Carousel>
);
