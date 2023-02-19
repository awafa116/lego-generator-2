import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/ImageForm/ImageForm';
import Preview from './components/Preview/Preview';
import Colors from './components/Colors/Colors';
import colors from './colors.json';
function App() {
  const [configs, setConfigs] = useState(null);
  const [pixelsArr, setPixelsArr] = useState([]);

  // const colors = [
  //   [0, 0, 255, 0],
  //   [1, 255, 165, 0],
  //   [2, 0, 0, 255],
  //   [3, 255, 192, 203],
  //   [4, 165, 42, 42],
  //   [5, 255, 255, 255],
  //   [6, 0, 0, 0],
  //   [7, 230, 230, 350],
  //   [8, 255, 255, 0],
  //   [9, 0, 0, 0],
  // ];

  const createImage = () => {
    const image = new Image();
    image.onload = function () {
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
    image.src = configs.image;
  };
  useEffect(() => {
    if (configs) {
      createImage();
    }
  }, [configs]);

  const pixelateImage = imageData => {
    let arr = [];

    for (let y = 0; y < configs.height; y++) {
      for (let x = 0; x < configs.width; x++) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * configs.width) * 4;
        // drawing a square replacing the current pixels

        arr.push(
          get_closest_color({
            r: imageData[pixelIndexPosition],
            g: imageData[pixelIndexPosition + 1],
            b: imageData[pixelIndexPosition + 2],
            a: imageData[pixelIndexPosition + 3],
          })
        );
      }
    }
    setPixelsArr(arr);
  };

  function get_closest_color({ r, g, b }) {
    const [[closest_color_id]] = colors
      .map(([id, r1, g1, b1]) => {
        return [id, Math.sqrt(Math.pow(r - r1, 2) + Math.pow(g - g1, 2) + Math.pow(b - b1, 2))];
      })
      .sort(([, d1], [, d2]) => d1 - d2);

    const color = colors.find(([id]) => id == closest_color_id);
    return {
      r: color[1],
      g: color[2],
      b: color[3],
      a: 255,
    };
  }

  return (
    <div className='App'>
      <Form setConfigs={setConfigs} />
      {configs && <Preview pixelsArr={pixelsArr} width={configs.width} />}
      {/* <Colors /> */}
    </div>
  );
}

export default App;
