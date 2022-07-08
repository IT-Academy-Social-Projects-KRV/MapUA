import Compress from 'compress.js';

const compress = new Compress();
export async function resizeImageFn(
  files: File[],
  maxWidth: number,
  maxHeight: number
) {
  const resizeImages = await compress.compress(files, {
    size: 4, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth, // the max width of the output image, defaults to 1920px
    maxHeight, // the max height of the output image, defaults to 1920px
    resize: true // defaults to true, set false if you do not want to resize the image width and height
  });
  const imgs = resizeImages.map(img => {
    const base64str = img.data;
    const imgExt = img.ext;
    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
    return resizedFile;
  });
  return imgs;
}
