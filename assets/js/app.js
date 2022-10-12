console.log("🦆Linkin' duck");

const drawingGrid = document.querySelector("#drawingGrid");

drawingGrid.ondragstart = function () {
  return false;
};

const createGridButton = document.querySelector("#createGridButton");
const gridRowSelection = document.querySelector("#gridRowSelection");

let brush = "black";

//MOUSEDOWN VALIDATION
let isMousedown = false;
drawingGrid.onmousedown = () => (isMousedown = true);
drawingGrid.onmouseup = () => (isMousedown = false);

//PAINT FUNCTION
const paintingFunction = (e) => {
  if (e.type === "mouseover" && !isMousedown) return;

  if (brush === "black") e.target.style.background = "rgb(0, 0, 0)";
  if (brush === "rainbow")
    e.target.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
  if (brush === "shadow") {
    let currentColor = e.target.style.background;
    colorArray = currentColor.split(",");
    for (i = 0; i < 3; i++) {
      colorArray[i] = Number(colorArray[i].replace(/\D/g, "")) - 20;
    }
    e.target.style.background = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
  }
  if (brush === "erase") e.target.style.background = "rgb(255, 255, 255)";
};

//CREATES A GRID WITH SELECTED GRIDSIZE
const createGrid = (gridSize) => {
  drawingGrid.innerHTML = "";
  drawingGrid.style.gridTemplateColumns = "none";

  let gridFragment = document.createDocumentFragment();

  for (i = 0; i < gridSize; i++) {
    for (j = 0; j < gridSize; j++) {
      let square = document.createElement("div");
      square.style.background = "rgb(255, 255, 255)";
      square.addEventListener("mouseover", paintingFunction);
      square.addEventListener("mousedown", paintingFunction);
      gridFragment.appendChild(square);
    }
  }

  drawingGrid.appendChild(gridFragment);
  drawingGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
};

//FIRST LOAD OF THE GRID rainbowBrush()
window.onload = createGrid(16);

//BUTTONS
createGridButton.addEventListener("click", () => {
  if (gridRowSelection.value <= 100) {
    createGrid(gridRowSelection.value);
  }
});

const clearGridButton = document.querySelector("#clearGrid");
clearGridButton.addEventListener("click", () => {
  let childs = drawingGrid.childNodes;
  for (const child of childs) {
    child.style.background = "rgb(255, 255, 255)";
  }
});

const blackCButton = document.querySelector("#blackButton");
blackButton.addEventListener("click", () => {
  brush = "black";
});

const rainbowCButton = document.querySelector("#rainbowButton");
rainbowButton.addEventListener("click", () => {
  brush = "rainbow";
});

const shadowColorButton = document.querySelector("#shadowButton");
shadowButton.addEventListener("click", () => {
  brush = "shadow";
});

const eraseButton = document.querySelector("#eraseButton");
eraseButton.addEventListener("click", () => {
  brush = "erase";
});
