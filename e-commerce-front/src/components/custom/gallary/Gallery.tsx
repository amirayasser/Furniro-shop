import React, { useEffect, useState } from 'react';
import './gallery.module.css';
// import assets
import img1 from '../../../assets/Rectangle 36.png';
import img2 from '../../../assets/Rectangle 38.png';
import img3 from '../../../assets/Rectangle 40.png';
import img4 from '../../../assets/Rectangle 43.png';
import img5 from '../../../assets/Rectangle 45.png';
import img6 from '../../../assets/Rectangle 37.png';
import img7 from '../../../assets/Rectangle 39.png';
import img8 from '../../../assets/Rectangle 41.png';
import img9 from '../../../assets/Rectangle 44.png';

import styles from './gallery.module.css';

const { imagegallery, mid } = styles;

// const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

function Gallery() {

    return (
        <div className={imagegallery}>
            <section>
                <div>
                    <img src={img1} alt='1' />
                    <img src={img2} alt='2' />
                </div>
                <div>
                    <img src={img6} alt='6' />
                    <img src={img7} alt='7' />
                </div>
            </section>
            <section>
                <img src={img3} alt='3' className={mid} />
            </section>
            <section>
                <div>
                    <img src={img4} alt='4' />
                    <img src={img5} alt='5' />
                </div>
                <div>
                    <img src={img8} alt='8' />
                    <img src={img9} alt='9' />
                </div>
            </section>
        </div>
    );
}

export default Gallery;