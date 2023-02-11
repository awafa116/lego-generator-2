const fileInput = document.querySelector('#choose-image');
const pixelatedImage = document.querySelector('#pixelated-image');

// storying a copy of the original image
const originalImage = pixelatedImage.cloneNode(true);

const pixelsInRowInput = document.querySelector('#pixels-in-row');
let pixelsInRow = 0;
fileInput.addEventListener('change', async e => {
  const [file] = fileInput.files;
  // showing the uploaded image
  pixelatedImage.src = await URL.createObjectURL(file);
  // storing the original image
  originalImage.src = await URL.createObjectURL(file);
  pixelsInRowInput.value = 0;

  return false;
});

pixelsInRowInput.oninput = e => {
  pixelsInRow = parseInt(e.target.value);
  pixelateImage(originalImage, pixelsInRow);
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
  previewContainer.style.maxWidth = `${blockSize * pixelsInRow}px`;
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
      block.style.height = `${blockSize}px`;
      block.style.width = `${blockSize}px`;
      previewContainer.appendChild(block);
    }
  }
};
