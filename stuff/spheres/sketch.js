const width = 800;
const height = 800;
const scl = 8;
const cols = width / scl;
const rows = height / scl;
const orbSize = scl * 2;
const rotationSize = Math.PI / 6;
let video = null;

function setup() {
  createCanvas(width, height, WEBGL);
  camera(0, 0, 1.2*height / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0)
  noStroke();
  video = createCapture(VIDEO);
  video.size(cols, rows);
  video.hide();
  frameRate(20);
}

function draw() {
  background(255);
  rotateX(map(mouseY, 0, height, -rotationSize, rotationSize));
  rotateY(map(mouseX, 0, width, rotationSize, -rotationSize));
  translate(-width, -height);
  video.loadPixels();

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const index = (i + j * cols) * 4
      const r = video.pixels[index]
      const g = video.pixels[index+1]
      const b = video.pixels[index+2]
      const z = (r + g + b) / 3;
      push();
      fill(r, g, b);
      translate((cols - i - 1) * orbSize, j * orbSize, z);
      sphere(orbSize / 2);
      pop();
    }
  }
}