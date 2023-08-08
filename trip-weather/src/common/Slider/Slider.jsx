import React, { useRef, useState } from 'react'
import './Slider.css'

const Slider = ({ slides, itemsPerSlide, children }) => {
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const sliderContentRef = useRef()

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        const touchDiff = touchStartX - touchEndX;
        if (touchDiff > 50) {
            handleNextSlide();
        } else if (touchDiff < -50) {
            handlePrevSlide();
        }
        setTouchStartX(0);
        setTouchEndX(0);
    };

    const handlePrevSlide = () => {
        let width = sliderContentRef.current.clientWidth
        sliderContentRef.current.scrollLeft -= width
    }

    const handleNextSlide = () => {
        let width = sliderContentRef.current.clientWidth
        sliderContentRef.current.scrollLeft += width
    }

    return (
        <div className="slider-container">
            <div className="slider-content"
                ref={sliderContentRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {children}
            </div>
            {
                slides?.length > itemsPerSlide ?
                    <div className='slider-arrows'>
                        <button
                            className={`prev-arrow`}
                            onClick={handlePrevSlide}
                        >
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                        <button
                            className={`next-arrow`}
                            onClick={handleNextSlide}
                        >
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Slider
