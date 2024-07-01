import Carousel from 'react-bootstrap/Carousel';
// import assets
// import pic1 from '../assets/Rectangle25.png';
// import pic2 from '../assets/Rectangle 26.png';

import styles from '@styles/home.module.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { GrNext } from "react-icons/gr";
// import { GrPrevious } from "react-icons/gr";

const { mycarousel, carouselindicators, carouselcontrolnext, carouselcontrolprev, carouselcontainer, indicator } = styles;

function InspireCarousel({ images }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex:number, e) => {
        setIndex(selectedIndex);
    };

    const onPrevClick = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else if (index === 0) setIndex(images.length - 1);
    };

    const onNextClick = () => {
        if (index === images.length - 1) {
            setIndex(0);
        } else if (index >= 0 && index < images.length - 1) {
            setIndex(index + 1);
        }
    };

    return (
        <div className={carouselcontainer}>

            <Carousel 
                activeIndex={index}
                onSelect={handleSelect}
                indicators={false}
                controls={false}
                className={mycarousel}
                interval={null}
            >
                {images.map((image, imageIndex) => (
                    <Carousel.Item key={imageIndex}>
                        <div className="d-flex gap-3">
                            <img src={image} alt={`pic${imageIndex}`} className="flex-grow-1" />
                            {/* Render partially visible part of the second slide */}
                            {(imageIndex + 1 < images.length) && (
                                <img src={images[imageIndex + 1]} alt={`pic${imageIndex + 1}`} className="partially-visible" />
                            )}
                        </div>
                    </Carousel.Item>))}
            </Carousel>

            <Button variant="primary" onClick={onNextClick} className={carouselcontrolnext}>
                <GrNext />
            </Button>
            
            <div className={indicator}>
                {/* Render spans as indicators */}
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={index === i ? 'active' : ''}
                        onClick={() => setIndex(i)}
                        style={{ backgroundColor: index === i ? '#B88E2F' : '#D8D8D8' }}
                    />
                ))}
            </div>


        </div>

    );
}

export default InspireCarousel;