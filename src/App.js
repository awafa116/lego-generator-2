import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/ImageForm/ImageForm';
import Preview from './components/Preview/Preview';

function App() {
  const [configs, setConfigs] = useState(null);
  const [pixelsArr, setPixelsArr] = useState([]);

  const createImage = async () => {
    const image = await new Image();
    image.src = configs.image;
    image.height = configs.height;
    image.width = configs.width;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = configs.width;
    canvas.height = configs.height;
    context.drawImage(image, 0, 0, configs.width, configs.height);
    const imageData = context.getImageData(0, 0, configs.width, configs.height).data;
    pixelateImage(imageData);
  };
  useEffect(() => {
    if (configs) {
      createImage();
    }
  }, [configs]);

  const pixelateImage = imageData => {
    console.log(imageData);
    let arr = [];

    for (let y = 0; y < configs.height; y++) {
      for (let x = 0; x < configs.width; x++) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * configs.width) * 4;
        // drawing a square replacing the current pixels

        arr.push({
          r: imageData[pixelIndexPosition],
          g: imageData[pixelIndexPosition + 1],
          b: imageData[pixelIndexPosition + 2],
          a: imageData[pixelIndexPosition + 3],
        });
      }
    }
    setPixelsArr(arr);
  };

  return (
    <div className='App'>
      <Form setConfigs={setConfigs} />
      {configs && <Preview pixelsArr={pixelsArr} />}
    </div>
  );
}

export default App;
