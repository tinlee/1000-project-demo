import { getColor } from "../utils/color";
const earShadowColors = ["#8e887e", "#eaa9aa", "#cecece"];
import {
  createImage,
  fillColor,
  fillAndDraw,
  translateImage,
} from "../utils/image";

type Position = [number, number];

type CatInfo = {
  skinColor: string;
  side: number;
  hairColor: string;
  earShadowColor: string;
  hasHair: boolean;
};

function getFace(
  img: HTMLImageElement | null,
  hairColor: string,
  side: number
) {
  if (!img) {
    return null;
  }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);

  context.fillStyle = hairColor;
  // 圆形
  context.beginPath();
  if (side !== 3) {
    const randomHeight = Math.floor(Math.random() * 120);
    if (side === 0) {
      // 左半边
      context.arc(40, 0, 240, 0, 2 * Math.PI);
    } else if (side === 1) {
      // 右半边
      context.arc(460, 0, 240, 0, 2 * Math.PI);
    } else if (side === 2) {
      // 全部
      context.arc(40, 0, 240 + randomHeight, 0, 2 * Math.PI);
      context.arc(460, 0, 240 + randomHeight, 0, 2 * Math.PI);
    }
  }
  context.fill();
  context.globalCompositeOperation = "destination-in";
  context.drawImage(img, 0, 0);
  context.globalCompositeOperation = "source-over";
  const finnalImage = canvas.toDataURL();
  return finnalImage;
}

function getBaseInfo(): CatInfo {
  let side = Math.floor(Math.random() * 4);
  const skinColor = getColor();

  return {
    skinColor: skinColor,
    side: side,
    hairColor: side === 3 ? skinColor : getColor(),
    earShadowColor: earShadowColors[Math.floor(Math.random() * 2)],
    hasHair: Math.random() > 0.5,
  };
}

export class Cat {
  info: CatInfo;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(index: number) {
    const canvas = document.getElementById(
      `canvas${index}`
    ) as HTMLCanvasElement;

    if (!canvas) {
      throw new Error(`#canvas${index} not found`);
    }
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (!context) {
      throw new Error(`#canvas${index} not found`);
    }

    this.canvas = canvas;
    this.context = context;
    this.info = getBaseInfo();
  }
  // 渲染主体
  draw() {
    this.drawTail()
      .then(() => this.darawFoot())
      .then(() => {
        this.drawBody();
      })
      .then(() => {
        this.drawFace();
        this.drawHand();
      });
  }

  // 渲染尾巴
  drawTail() {
    const position: Position = [160, 574];
    return fillAndDraw({
      backGroundUrl: "./assets/img/base/tail.png",
      color: this.info.skinColor,
      drawImage: this.drawImage(position),
      borderImage: "./assets/img/base/tail-border.png",
    });
  }

  // 加载图片并绘制
  loadAndDrawImage(
    src: string,
    position: Position,
    context?: CanvasRenderingContext2D
  ) {
    return createImage(src).then((img) => {
      if (!context) {
        context = this.context;
      }
      context.drawImage(img, ...position);
      return img;
    });
  }
  // 绘制图片
  drawImage(position: Position, context?: CanvasRenderingContext2D) {
    return (img: CanvasImageSource) => {
      if (!img) return null;
      if (!context) {
        context = this.context;
      }
      context.drawImage(img, ...position);
      return img;
    };
  }

  // 绘制脚
  darawFoot() {
    return this.loadAndDrawImage("./assets/img/base/foot.png", [248, 772]).then(
      (img) => this.loadAndDrawImage(translateImage(img), [472, 772])
    );
  }
  // 绘制身体
  drawBody() {
    return fillAndDraw({
      backGroundUrl: "./assets/img/base/body.png",
      color: this.info.skinColor,
      drawImage: this.drawImage([248, 534]),
      borderImage: "./assets/img/base/body-border.png",
    });
  }

  // 绘制脸
  drawFace() {
    const { skinColor, hairColor, side, hasHair } = this.info;

    return fillColor("./assets/img/base/face-iouter.png", skinColor)
      .then((img: HTMLImageElement | null) => getFace(img, hairColor, side))
      .then((img) => this.loadAndDrawImage(img as string, [184, 198]))
      .then(() => {
        this.drawFaceBorder();
        this.drawFacebeard()
          .then(() => this.drawMouth())
          .then(() => this.drawNouse());

        hasHair && this.drawHair();
        const isHairColor = side === 1 || side === 2;
        this.drawEar(isHairColor);
        this.drawEyes();
      });
  }

  // 绘制脸的边框
  drawFaceBorder() {
    this.loadAndDrawImage(
      "./assets/img/base/face-iouter-border.png",
      [184, 198]
    );
  }

  // 绘制胡子
  drawFacebeard() {
    return this.loadAndDrawImage(
      "./assets/img/base/beard.png",
      [535, 398]
    ).then((img) => this.loadAndDrawImage(translateImage(img), [98, 398]));
  }
  // 绘制嘴巴
  drawMouth() {
    return this.loadAndDrawImage("./assets/img/base/mouth.png", [373, 452]);
  }

  // 绘制鼻子

  drawNouse() {
    this.loadAndDrawImage("./assets/img/base/nouse.png", [400, 420]);
  }
  // 绘制头发
  drawHair() {
    fillAndDraw({
      backGroundUrl: "./assets/img/base/hair.png",
      color: this.info.hairColor,
      drawImage: this.drawImage([421, 150]),
      borderImage: "./assets/img/base/hair-border.png",
    });
  }

  // 绘制耳朵
  drawEar(isHairColor: boolean) {
    const { hairColor, skinColor, earShadowColor } = this.info;
    const color = isHairColor ? hairColor : skinColor;
    const context = this.getCanvasContext(true);

    fillAndDraw({
      backGroundUrl: "./assets/img/base/ear.png",
      color: color,
      drawImage: this.drawImage([0, 0], context),
    })
      .then(() =>
        fillAndDraw({
          backGroundUrl: "./assets/img/base/ear-shadow.png",
          color: earShadowColor,
          drawImage: this.drawImage([85, 60], context),
        })
      )
      .then(() =>
        this.loadAndDrawImage(
          "./assets/img/base/ear-border.png",
          [0, 0],
          context
        )
      )
      .then(() => {
        const imgData = context.canvas.toDataURL();
        this.loadAndDrawImage(imgData, [480, 100]);
        createImage(imgData).then((img) => {
          this.loadAndDrawImage(translateImage(img), [-234, 94]);
        });
      });
  }
  // 获取画布上下文
  getCanvasContext(vitual?: boolean) {
    if (!vitual) {
      return this.context;
    } else {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.canvas.width = 600;
      context.canvas.height = 800;
      return context;
    }
  }

  // 绘制眼睛
  drawEyes() {
    this.loadAndDrawImage("./assets/img/base/eye.png", [270, 338]).then(
      (img) => {
        this.loadAndDrawImage(translateImage(img), [484, 338]);
      }
    );
  }

  // 绘制手
  drawHand() {
    fillAndDraw({
      backGroundUrl: "./assets/img/base/hand.png",
      color: this.info.skinColor,
      drawImage: this.drawImage([315, 630]),
      borderImage: "./assets/img/base/hand-border.png",
    }).then((img) => {
      if (!img) return;
      this.loadAndDrawImage(translateImage(img), [445, 630]);
    });
  }
}
