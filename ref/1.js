const canvas = document.getElementById('preview');
const ctx = canvas.getContext && canvas.getContext('2d');
const image = new Image();
image.src = 'img/img.jpg';

const height = (canvas.height = image.height);
const width = (canvas.width = image.width);

let pixelsInRow = 100;
const pixelsRatio = Math.round(width / pixelsInRow);
// const pixelsCount = Math.round(pixe);

image.addEventListener('load', () => {
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, width, height);
  const dataRGB = generateRGB(data);
  groupPixels(dataRGB);
  const color = averageColor(dataRGB);

  // TEMP
  const elAverage = document.querySelector('.average');
  elAverage.style.height = `${height}px`;
  elAverage.style.width = `${width}px`;
  elAverage.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`;
});

// this function takes an array of sRGB values, and returns an array of RGB objects
const generateRGB = data => {
  let colorArr = [];
  for (let i = 0; i < data.data.length; i += 4) {
    colorArr.push({ r: data.data[i], g: data.data[i + 1], b: data.data[i + 2] });
  }
  console.log(colorArr);
  return colorArr;
};

// this function takes an array of RGB objects, ande returns the RGB average of these objects
const averageColor = colors => {
  let r = 0,
    g = 0,
    b = 0;
  for (let i = 0; i < colors.length; i++) {
    r += colors[i].r;
    g += colors[i].g;
    b += colors[i].b;
  }
  const result = {
    r: Math.floor(r / colors.length),
    g: Math.floor(g / colors.length),
    b: Math.floor(b / colors.length),
  };
  return result;
};

const pixelate = arr => {
  let blocksArr = [];
};
