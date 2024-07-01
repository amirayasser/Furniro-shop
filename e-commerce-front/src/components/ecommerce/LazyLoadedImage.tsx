import React, { useState, useRef, useEffect } from 'react';
import { Figure } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';

function LazyLoadedImage({ className, alt, src }) {
    const [ref, inView] = useInView({
        triggerOnce: true, // Load image only once when it becomes visible
        threshold: 0.1, // Trigger when 10% of the image is visible
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (inView) {
            // Image is in view, start loading
            const img = new Image();
            img.onload = () => {
                setIsLoaded(true);
            };
            img.src = src;
        }
    }, [inView, src]);

    return (
        <Figure.Image
      ref= { ref }
    className = { className }
    alt = { alt }
    src = { isLoaded? src: null } // Show image only when loaded
        />
  )
}

export default LazyLoadedImage;


