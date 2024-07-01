import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import styles from './carousel.module.css';

import slidepic1 from '@assets/Rectangle25.png';
import slidepic2 from '@assets/Rectangle 26.png';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const carouselpics = [slidepic1, slidepic2];

const { carouselContainer, slicknextbefore , dot } = styles;

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${slicknextbefore}`}
            style={{ ...style, display: "block", right: '185px'}}
            onClick={onClick}
        />
    );
}


const Carousel = ({ images }) => {
    const settings = {
        dots:true,
      
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        // prevArrow: <SampleNextArrow />,

        // centerMode: true, // Enable center mode
        // centerPadding: '50px', // Adjust the space between images
   
    };


    return (
        <div className={carouselContainer}>
            <Slider  {...settings}  >
                {images.map((pic, index) => (
                    <div>
                        <img src={pic} alt={index}
                        //  className={styles.carouselImage}
                        />
                    </div>
                ))}
            </Slider>
          
        </div>
    );
};

export default Carousel;