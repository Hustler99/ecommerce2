import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/images/1cb6d337-ab43-42bf-b381-64e705052e66.avif";
import img2 from "../../Assets/images/a92443db-1170-4ab9-92ca-7d204c972416.avif";
import img3 from "../../Assets/images/12518e86-9379-4605-b26c-37241ff84dc4.avif";
import img4 from "../../Assets/images/80986018-eadd-499f-9d99-be18df80a4e8.avif";


export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 1800,
    autoplay: true,
    dots: false,
    arrows: false,

  };
  return (  
    <>
            <Slider   {...settings}>
      <img src={img1} alt="Slide 1" />
      <img src={img2} alt="Slide 2"  />
        <img src={img3} alt="Slide 3" />
        <img src={img4} alt="Slide 3"  />

    </Slider>
    </>

  );
}
