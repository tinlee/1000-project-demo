const imageMap = new Map<string, HTMLImageElement>();

export function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const imgCache = imageMap.get(src);
    if (imgCache) {
      resolve(imgCache);
      return;
    }
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageMap.set(src, img);
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

export function fillAndDraw({
  backGroundUrl,
  color,
  borderImage,
  drawImage,
}: {
  backGroundUrl: string;
  drawImage: (img: any) => void;
  borderImage?: string;
  color: string;
}): Promise<void> {
  return fillColor(backGroundUrl, color)
    .then(drawImage)
    .then((img) => {
      if (borderImage) {
        return createImage(borderImage).then(drawImage);
      } else {
        return img;
      }
    });
}
// 镜像翻转图片
export function translateImage(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.canvas.width = img.width;
  ctx.canvas.height = img.height;
  ctx.scale(-1, 1); //左右镜像翻转
  ctx.translate(-img.width, 0);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return canvas.toDataURL();
}
