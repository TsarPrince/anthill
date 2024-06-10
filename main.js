const canvas = document.body.querySelector("#canvas");
const ctx = canvas.getContext("2d");

if (innerWidth < 680) {
  canvas.width = innerWidth;
  canvas.height = canvas.width;
} else {
  canvas.width = 600;
  canvas.height = 600;
}

const width = canvas.width;
const height = canvas.height;

let FOOD_DISTANCE = parseInt(
  document.querySelector("#inputFoodDistance").value
);
let GRID_SIZE = FOOD_DISTANCE + 1;
let resolution = width / (GRID_SIZE * 2);
let collisionDetected = 0;
let simlationMode = false;

const random = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

class Ant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.steps = 0;
    this.completedTime = [];

    this.image = new Image();
    this.image.src = "ant.png";
    this.image.onload = () => {
      ctx.drawImage(
        this.image,
        this.x - resolution / 2,
        this.y - resolution / 2,
        resolution,
        resolution
      );
    };
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.steps = 0;
    this.completedTime = [];
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.x - resolution / 2,
      this.y - resolution / 2,
      resolution,
      resolution
    );
  }

  step(action) {
    if (!action) action = random(["N", "S", "E", "W"]);
    if (action == "N") this.y -= resolution;
    if (action == "S") this.y += resolution;
    if (action == "E") this.x -= resolution;
    if (action == "W") this.x += resolution;

    this.steps++;
    if (
      // +-1 for calculation errors
      this.x <= width / 2 - FOOD_DISTANCE * resolution + 1 ||
      this.y <= height / 2 - FOOD_DISTANCE * resolution + 1 ||
      this.x >= width / 2 + FOOD_DISTANCE * resolution - 1 ||
      this.y >= height / 2 + FOOD_DISTANCE * resolution - 1
    ) {
      collisionDetected = Math.min(collisionDetected + 5, 5);
      this.x = width / 2;
      this.y = height / 2;
      this.completedTime.push(this.steps);
      this.steps = 0;
    }
  }
}

const ant = new Ant(width / 2, height / 2);

const init = () => {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;

  // X axis
  for (let i = 0; i < innerWidth; i += resolution) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
  // Y axis
  for (let i = 0; i < innerHeight; i += resolution) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }

  // Food boundary
  ctx.rect(
    width / 2 - FOOD_DISTANCE * resolution,
    height / 2 - FOOD_DISTANCE * resolution,
    2 * FOOD_DISTANCE * resolution,
    2 * FOOD_DISTANCE * resolution
  );
  if (collisionDetected) {
    collisionDetected--;
    ctx.strokeStyle = "green";
  } else {
    ctx.strokeStyle = "#fff";
  }
  ctx.lineWidth = 4;
  ctx.stroke();

  // Ant
  ant.draw();

  // info
  document.querySelector("#infoNumEpisode").innerHTML =
    ant.completedTime.length;
  document.querySelector("#infoCompletedTime").innerHTML =
    ant.completedTime.reduce((prev, curr) => prev + " " + curr, "");
  document.querySelector("#infoAverage").innerHTML = ant.completedTime.length
    ? ant.completedTime.reduce((prev, curr) => prev + curr, 0) /
      ant.completedTime.length
    : "";
};

// Event Listerners
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") ant.step();
});
window.addEventListener("touchstart", () => {
  ant.step();
});

document.querySelector("#inputFoodDistance").addEventListener("input", (e) => {
  document.querySelector("#infoFoodDistance").innerHTML = e.target.value;
  FOOD_DISTANCE = parseInt(e.target.value);
  GRID_SIZE = FOOD_DISTANCE + 1;
  resolution = width / (GRID_SIZE * 2);
  ant.reset();
});

document.querySelector("#simulate").addEventListener("change", (e) => {
  simlationMode = e.target.checked;
});

const update = () => {
  window.requestAnimationFrame(update);
  ctx.clearRect(0, 0, width, height);
  if (simlationMode) ant.step();
  init();
};
update();
