export function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
}
export function fillColor(
  imgUrl: string,
  color: string
): Promise<HTMLImageElement | null> {
  return createImage(imgUrl).then((img) => {
    if (!img) {
      return null;
    }
    const canvas: HTMLCanvasElement = document.createElement(
      "canvas"
    ) as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    canvas.width = img.width;
    canvas.height = img.height;

    context.fillStyle = color;

    context.fillRect(0, 0, img.width, img.height);

    context.globalCompositeOperation = "destination-in";

    context.drawImage(img, 0, 0, img.width, img.height);

    context.globalCompositeOperation = "source-over";

    const finnalImage = canvas.toDataURL();

    return createImage(finnalImage);
  });
}
