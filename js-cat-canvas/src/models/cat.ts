import { getColor } from "../utils/color";

export class Cat {
  public id: number;
  public name: string;
  public color: string;
  public imageUrl: string;

  constructor() {
    let side = Math.floor(Math.random() * 4);
    this.skinColor = getColor();
  }
}

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
