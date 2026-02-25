/**
 * Sample the dominant color from an image URL using a hidden canvas
 * Returns an rgba string
 */
export async function sampleDominantColor(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 28;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 50, 28);
        const data = ctx.getImageData(0, 0, 50, 28).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve(`rgba(${r},${g},${b},0.5)`);
      } catch {
        resolve('rgba(255,45,45,0.3)');
      }
    };
    img.onerror = () => resolve('rgba(255,45,45,0.3)');
    img.src = imageUrl;
  });
}
