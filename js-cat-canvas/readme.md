# 背景

![image.png](https://pic4.zhimg.com/v2-214f695ecef00cde0a988126cfe76fd5_r.jpg)
在以前有一个很火的养猫项目，会随机生成各种猫的图案，鉴于我女儿非常喜欢卡通猫，所以我想帮她也画一批随机的猫。

首先用 ai 生成一张猫的图片
![cat_back.png](https://pic4.zhimg.com/v2-98dc61933ffc7377a426705575167138_r.jpg)

# 技术方案

其实最好的方案是使用 svg，但是我真的没有办法画出来猫的全部 svg，所以我想是不是可以使用一个简单的办法。
按照图片上的信息来说，分成 3 个部分
![image.png](https://pic4.zhimg.com/v2-406372a968c7c71da389cf732292f293_r.jpg)

一个完整的图片样式，通过背景，花纹，边框三部分组成。

那么我们只要实现了这几部分，然后叠加上去就可以了。

例如一条没有花纹的尾巴，那么只需要

![image.png](https://pic4.zhimg.com/v2-53af51f1db0b3ff3acd6519fc29c7660_r.jpg)

一张背景图片改变颜色，然后加上边框，即可自动生成。

所以我们先把猫的所有需要渲染的部分，进行切割，拆成底色和边框两部分。
![image.png](https://pic4.zhimg.com/v2-ad2f0c8e0479ba84d172e8ff2edde43f_r.jpg)

# 具体实现

## 加载图片

```js
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
```

加载图片需要保证图片已经加载成功，所以封装一个 promise，在图片资源加载完成后返回图片信息。

## 图片着色

```js

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
```

这里最关键的代码在于`context.globalCompositeOperation = "destination-in"`,它的作用在于讲目标图形与源图形合并，并保留源图形。
整体代码的过程为先绘制一个矩形填充整体区域即背景，然后设定为 destination-in 模式，绘制图片，此时经过叠加，会保留图片绘制区域内的背景。

![image.png](https://pic4.zhimg.com/v2-2995f62f4d7136a9c8b9ddc57f206fa1_r.jpg)

在绘制完成后将`globalCompositeOperation`修改为默认的`source-over`,并将图片通过`toDataURL`转成转成 base64 供绘制使用

## 绘制图片

绘制边框比较简单，直接使用 context.drawImage 即可，将着色后的背景图及边框依次绘制，即可得到一个改变颜色图片。
![image.png](https://pic4.zhimg.com/v2-18d49fe3328d9aa3125276fbcaa081a4_r.jpg)

## 颜色选择 hsl

如果随机一个 rgb 颜色，可能存在颜色过亮或者过暗的情况。
![image.png](https://pic4.zhimg.com/v2-95019c026ecbb5e64353d8a0dff03c62_r.jpg)
我们更希望以一种颜色比较柔和的方式呈现，所以不适用 rgb 颜色，改为 hsl 颜色。
hsl 是将 rgb 颜色变为坐标显示的一种颜色表现方式。
![image.png](https://pic4.zhimg.com/v2-7aa865fd09a5472029b3e3389cccc103_r.jpg)
可以看到，亮度（light ness）越低的地方，颜色越暗，越高的地方，颜色越亮。
饱和度(saturation)越靠外的地方，颜色越鲜艳，所以我们可以设定一定的范围取值，用来约束颜色的色彩范围。

```js
export function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    // (25 + 70 * Math.random()) +
    100 * Math.random() +
    "%," +
    // (70 + 10 * Math.random()) +
    100 * Math.random() +
    "%)"
  );
}
```

此时获取到颜色色值更符合我们的审美。

## 花纹生成

花纹，我们可以直接使用如上述描述的方式，通过图片的形式生成，在头部我也尝试使用了一种随机的圆形用来模拟猫的脸部。灵感来源于起司猫。

![image.png](https://pic4.zhimg.com/v2-b9500737266bdfede7617a990e1099c9_r.jpg)
可以看到基本的图形就是两个圆形的叠加，所以我用了两个圆来模拟各种情况

```js
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
```

这里用半圆，两个圆，没有圆来模拟三种情况。

![image.png](https://pic4.zhimg.com/v2-ce38ccd0268e256b1af6e13d4def889c_r.jpg)

# end 最终效果

![image.png](https://pic4.zhimg.com/v2-1513f6bb7faadc61dc4833ad4d0c064e_r.jpg)
