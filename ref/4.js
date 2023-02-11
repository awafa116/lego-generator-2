const image = new Image();
image.src = 'img/image.jpeg';

const xFactor = 3;
let width = 200;
let height = 100;
const fileInput = document.querySelector('#choose-image');

fileInput.addEventListener('change', async e => {
  const [file] = fileInput.files;
  // showing the uploaded image
  image.src = await URL.createObjectURL(file);
  checkSize(image);
  return false;
});

image.onload = function () {
  checkSize(image);
  image.height = height;
  image.width = width;
  image.style.objectFit = 'cover';
  image.style.objectPosition = 'center';

  pixelateImage(image, image.width);
};

const checkSize = image => {
  if (image.height > image.width) {
    height = 200;
    width = 100;
  } else {
    height = 100;
    width = 200;
  }
};

const pixelateImage = (originalImage, pixelsInRow) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const originalWidth = originalImage.width;
  const originalHeight = originalImage.height;
  const canvasWidth = originalWidth;
  const canvasHeight = originalHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
  const originalImageData = context.getImageData(0, 0, originalWidth, originalHeight).data;
  const blockSize = Math.floor(originalWidth / pixelsInRow);
  let pixelsArr = [];

  if (blockSize !== 0) {
    for (let y = 0; y < originalHeight; y += blockSize) {
      for (let x = 0; x < originalWidth; x += blockSize) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * originalWidth) * 4;
        // drawing a square replacing the current pixels
        pixelsArr.push({
          r: originalImageData[pixelIndexPosition],
          g: originalImageData[pixelIndexPosition + 1],
          b: originalImageData[pixelIndexPosition + 2],
          a: originalImageData[pixelIndexPosition + 3],
        });
      }
      // pixelsArr.push({ isEnd: true });
    }
  }
  console.log(pixelsArr);
  createPreview(pixelsArr, blockSize, pixelsInRow);
};

const createPreview = (pixelsArr, blockSize, pixelsInRow) => {
  const previewContainer = document.querySelector('.preview-container');
  previewContainer.style.maxWidth = `${blockSize * pixelsInRow * xFactor}px`;
  previewContainer.innerHTML = '';
  for (i = 0; i < pixelsArr.length; i++) {
    if (pixelsArr[i].isEnd) {
      // previewContainer.appendChild(document.createElement('br'));
    } else {
      const block = document.createElement('div');
      block.style.backgroundColor = `rgba(
      ${pixelsArr[i].r},
      ${pixelsArr[i].g},
      ${pixelsArr[i].b},
      ${pixelsArr[i].a}
    )`;
      block.style.height = `${blockSize * xFactor}px`;
      block.style.width = `${blockSize * xFactor}px`;
      previewContainer.appendChild(block);
    }
  }
};
