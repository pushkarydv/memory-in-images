import React from 'react';

const ImagesCarousel = ({ images }) => {
  return (
    <div className='carousel carousel-vertical rounded-box max-h-dvh max-w-sm mx-auto'>
      {images.map((image, index) => (
        <div
          key={index}
          className='carousel-item w-full h-full bg-black flex items-center justify-center'
        >
          <img
            src={image}
            className='object-contain max-h-full max-w-full'
            alt={`Image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesCarousel;
