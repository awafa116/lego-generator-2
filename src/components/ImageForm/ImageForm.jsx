import { React, useRef, useState } from 'react';
import './ImageForm.css';

const ImageForm = ({ setConfigs }) => {
  const [image, setImage] = useState('');
  const [orientation, setOrientation] = useState('landscape');
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);

  const updateImage = async e => {
    const url = await URL.createObjectURL(e.target.files[0]);
    setImage(url);
  };
  const updateOrientation = e => {
    if (e.target.value == 'landscape') {
      setOrientation('landscape');
    } else {
      setOrientation('portrait');
    }
  };
  const updateWidth = e => {
    setWidth(e.target.value);
  };
  const updateHeight = e => {
    setHeight(e.target.value);
  };

  const generatePixels = () => {
    setConfigs({
      width: width,
      height: height,
      orientation: orientation,
      image: image,
    });
  };

  return (
    <section className='image-form'>
      <div className='field'>
        <h2 className='input-label'>Choose an Image:</h2>
        <input
          type='file'
          id='choose-image'
          onChange={e => {
            updateImage(e);
          }}
        />
      </div>

      <div className='field'>
        <h2 className='input-label'>Orientation:</h2>
        <input
          type='radio'
          id='landscape'
          name='orientation'
          value='landscape'
          onChange={e => {
            updateOrientation(e);
          }}
        />
        <label htmlFor='landscape'>Landscape</label>
        <input
          type='radio'
          id='portrait'
          name='orientation'
          value='portrait'
          onChange={e => {
            updateOrientation(e);
          }}
        />
        <label htmlFor='portrait'>Portrait</label>
      </div>

      <div className='field'>
        <h2 className='input-label'>Image Dimentions:</h2>
        <label htmlFor='width'>Width</label>
        <input
          type='number'
          id='width'
          onChange={e => {
            updateWidth(e);
          }}
        />
        <label htmlFor='height'>Height</label>
        <input
          type='number'
          id='height'
          onChange={e => {
            updateHeight(e);
          }}
        />
      </div>

      <button className='Generate-btn' onClick={generatePixels}>
        Generate
      </button>
    </section>
  );
};

export default ImageForm;
