import React, { useState } from 'react';
import "./Images.scss";

const Images = ({ images }: Props) => {
    const [index, setIndex] = useState(0);

    const goToPrev = () => setIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);

    const goToNext = () => setIndex((prevIndex) => (prevIndex + 1) % images.length);

    return (
        <div className='slider-container'>
            <div
                className="slider-track"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map(({url, name}, i) => (
                    <img key={i} src={url} alt={name} className="slide-image" />
                ))}
            </div>
            <button className='image-button button-left' onClick={goToPrev}> {'<'} </button>
            <button className='image-button button-right' onClick={goToNext}> {'>'} </button>
        </div>
    )
}

type Props = {
    images: {
        url: string,
        name?: string
    }[]
}

export default Images;