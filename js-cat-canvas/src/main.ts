import { Cat } from "./models/cat";

function drawCats() {
  Array.from({ length: 8 }).forEach((item, index) => {
    const cat = new Cat(index);
    cat.draw();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".refresh")?.addEventListener("click", drawCats);

  drawCats();
});
