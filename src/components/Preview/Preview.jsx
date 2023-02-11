import { useEffect, useState } from 'react';
import './Preview.css';

const Preview = ({ pixelsArr }) => {
  // const generatePreview = ( blockSize, pixelsInRow) => {
  //   const previewContainer = document.querySelector('.preview-container');
  //   previewContainer.style.maxWidth = `${blockSize * pixelsInRow * xFactor}px`;
  //   previewContainer.innerHTML = '';
  //   for (i = 0; i < pixelsArr.length; i++) {
  //     if (pixelsArr[i].isEnd) {
  //       // previewContainer.appendChild(document.createElement('br'));
  //     } else {
  //       const block = document.createElement('div');
  //       block.style.backgroundColor = `rgba(
  //     ${pixelsArr[i].r},
  //     ${pixelsArr[i].g},
  //     ${pixelsArr[i].b},
  //     ${pixelsArr[i].a}
  //   )`;
  //       block.style.height = `${blockSize * xFactor}px`;
  //       block.style.width = `${blockSize * xFactor}px`;
  //       previewContainer.appendChild(block);
  //     }
  //   }
  // };

  const elPixels = pixelsArr.map((pixel, i) => {
    return (
      <div
        key={i}
        className='pixel'
        style={{ backgroundColor: `rgba(${pixel.r},${pixel.g},${pixel.b},${pixel.a})` }}
      ></div>
    );
  });
  // useEffect(generatePixels, []);

  return <div className='preview-container'>{elPixels}</div>;
};

export default Preview;
