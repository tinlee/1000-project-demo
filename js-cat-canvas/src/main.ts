import { getColor, getLightColor } from "./utils/color";
import { createImage, fillColor } from "./utils/image";

type CatModel = {
  hairColor: string;
  side: number;
  skinColor: string;
  earShadowColor: string;
  hasHair: boolean;
};

function start(data: CatModel, id?: number) {
  const canvas = document.getElementById("canvas" + id) as HTMLCanvasElement;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const { hairColor, side, skinColor, earShadowColor, hasHair } = data;

  function drawBody(fn) {
    fillColor("./assets/img/base/body.png", hairColor).then((img) => {
      context.drawImage(img, 248, 534);
      createImage("./assets/img/base/body-border.png").then((img) => {
        context.drawImage(img, 248, 534);
        fn();
      });
    });
  }

  function drawNouse() {
    createImage("./assets/img/base/nouse.png").then((img) => {
      context.drawImage(img, 400, 420);
    });
  }
  function drawEyes() {
    createImage("./assets/img/base/eye.png").then((img) => {
      context.drawImage(img, 270, 338);
      const leftEye = translateImage(img);
      createImage(leftEye).then((img) => {
        context.drawImage(img, 484, 338);
      });
    });
  }

  function drawEar(isHairColor) {
    const color = isHairColor ? hairColor : skinColor;
    return createImage("./assets/img/base/ear.png").then((img) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.fillStyle = color;
      context.fillRect(0, 0, img.width, img.height);
      context.globalCompositeOperation = "destination-in";
      context.drawImage(img, 0, 0, img.width, img.height);
      context.globalCompositeOperation = "source-over";

      return fillColor("./assets/img/base/ear-shadow.png", earShadowColor).then(
        (img) => {
          context.drawImage(img, 85, 60, img.width, img.height);
          return fillColor(
            "./assets/img/base/ear-down-shadow.png",
            "rgba(0,0,0,0.8)"
          ).then((img) => {
            context.drawImage(img, 85, 140, img.width, img.height);
            return createImage("./assets/img/base/ear-border.png").then(
              (img) => {
                context.drawImage(img, 0, 0, img.width, img.height);
                const hairImage = canvas.toDataURL();
                return hairImage;
              }
            );
          });
        }
      );
    });
  }

  function drawHair() {
    createImage("./assets/img/base/hair.png")
      .then((img) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.fillStyle = hairColor;
        context.fillRect(0, 0, img.width, img.height);
        context.globalCompositeOperation = "destination-in";
        context.drawImage(img, 0, 0, img.width, img.height);
        context.globalCompositeOperation = "source-over";
        const hairImage = canvas.toDataURL();
        return hairImage;
      })
      .then((hairImage) => {
        createImage(hairImage).then((img) => {
          context.drawImage(img, 421, 150);
          createImage("./assets/img/base/hair-border.png").then((img) => {
            context.drawImage(img, 421, 150);
          });
        });
      });
  }

  function drawMouth() {
    return createImage("./assets/img/base/mouth.png").then((img) => {
      context.drawImage(img, 373, 452);
    });
  }
  function translateImage(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.scale(-1, 1); //左右镜像翻转
    ctx.translate(-img.width, 0);
    ctx.drawImage(img, 0, 0, img.width, img.height);

    return canvas.toDataURL();
  }

  function drawFaceBorder() {
    const borderImag = new Image();
    borderImag.src = "./assets/img/base/face-iouter-border.png";
    borderImag.onload = function () {
      context.drawImage(borderImag, 184, 198);
    };
  }
  function drawFacebeard() {
    const borderImag = new Image();
    borderImag.src = "./assets/img/base/beard.png";
    borderImag.onload = function () {
      context.drawImage(borderImag, 535, 398);

      const left = translateImage(
        borderImag,
        borderImag.width,
        borderImag.height
      );
      createImage(left).then((img) => {
        context.drawImage(img, 98, 398);
        drawMouth().then(() => {
          drawNouse();
        });

        hasHair && drawHair();
        const isHairColor = side === 1 || side === 2;
        drawEar(isHairColor).then((rightEar) => {
          createImage(rightEar).then((img) => {
            context.drawImage(img, 480, 100);
            let leftEar = "";
            if (side === 0 || side === 1) {
              leftEar = drawEar(!isHairColor)
                .then(createImage)
                .then(translateImage)
                .then(createImage)
                .then((img) => {
                  context.drawImage(img, 180, 94);
                });
            } else {
              leftEar = translateImage(img);
              createImage(leftEar).then((img) => {
                context.drawImage(img, 180, 94);
              });
            }
          });
        });
        drawEyes();
      });
    };
  }

  // 要用canvas绘制一只猫
  function drawFace() {
    return fillColor("./assets/img/base/face-iouter.png", skinColor)
      .then((img) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        // 图片改为红色

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
        return createImage(finnalImage);
      })
      .then((img) => {
        context.drawImage(img, 184, 198);
        drawFaceBorder();
        drawFacebeard();
      });

    // 用图片遮罩这个矩形
  }
  // drawFace();

  function drawHand() {
    fillColor("./assets/img/base/hand.png", hairColor)
      .then((img) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0);
        return createImage("./assets/img/base/hand-border.png").then((img) => {
          context.drawImage(img, 0, 0);
          return createImage(canvas.toDataURL());
        });
      })
      .then((leftHand) => {
        context.drawImage(leftHand, 315, 630);
        const rightHand = translateImage(leftHand);
        createImage(rightHand).then((img) => {
          context.drawImage(img, 445, 630);
        });
      });
  }

  function drawTail() {
    const position = [160, 574];
    return fillColor("./assets/img/base/tail.png", hairColor)
      .then((img) => {
        return context.drawImage(img, ...position);
      })
      .then(() => {
        return createImage("./assets/img/base/tail-border.png").then((img) => {
          context.drawImage(img, ...position);
        });
      });
  }

  function darawFoot() {
    const position = [248, 772];
    return createImage("./assets/img/base/foot.png").then((img) => {
      context.drawImage(img, ...position);

      return createImage(translateImage(img)).then((img) => {
        context.drawImage(img, 472, 772);
      });
    });
  }

  drawTail()
    .then(darawFoot)
    .then(() => {
      drawBody(() => {
        drawFace();
        drawHand();
      });
    });
}

const earShadowColors = ["#8e887e", "#eaa9aa", "#cecece"];

function randomData(): CatModel {
  const data: CatModel = {} as CatModel;
  let side = Math.floor(Math.random() * 4);
  data.skinColor = getColor();
  data.side = side;
  data.hairColor = side === 3 ? data.skinColor : getColor();
  data.earShadowColor = earShadowColors[Math.floor(Math.random() * 2)];
  data.hasHair = Math.random() > 0.5;

  return data;
}

const data: CatModel[] = Array.from({ length: 9 }).map(randomData);

data.forEach((d, i) => {
  start(d, i);
});
