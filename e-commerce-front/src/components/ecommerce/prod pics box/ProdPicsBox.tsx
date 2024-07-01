import React, { useEffect, useState } from "react";
import "./prodPicsBox.css";
import pic1 from "@assets/Image-living room.png";
import pic2 from "@assets/Rectangle 36.png";
import pic3 from "@assets/Rectangle 37.png";

const ProdPicsBox = ({ pics }) => {
  const picsarr = [pics, pics, pics, pics];
  const [mainPic, setMainPic] = useState(picsarr[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handlePicHover = (index, picUrl) => {
    setHoveredIndex(index);
    setMainPic(picUrl);
  }

  const handlePicLeave = () => {
    setHoveredIndex(null);
    setMainPic(picsarr[0]);
  }

  return (
    <div className="pics-box">
      <div className="smallPics">
        {picsarr.map((pic, index) => (
          <div
            key={index}
            className='smallpic'
            onMouseEnter={() => handlePicHover(index, pic)}
            onMouseLeave={handlePicLeave}
            style={{ backgroundImage: `url(${pic})` }}
          ></div>
        ))}
        </div>
      <div
        className={hoveredIndex === 1 ? 'mainPic active2' : hoveredIndex === 2 ? 'mainPic active3' : hoveredIndex === 3 ? 'mainPic active4'  : "mainPic" }
        style={{ backgroundImage: `url(${mainPic})` }}
      ></div>
    </div>
  );
};

export default ProdPicsBox;
