import { useEffect, useState } from 'react';
import './Preview.css';

const Preview = ({ pixelsArr, width }) => {
  const elPixels = pixelsArr.map((pixel, i) => {
    return (
      <div
        key={i}
        className='pixel'
        style={{ backgroundColor: `rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})` }}
      ></div>
    );
  });

  return (
    <div className='preview-container' style={{ maxWidth: `${width * 3}px` }}>
      {elPixels}
    </div>
  );
};

export default Preview;
