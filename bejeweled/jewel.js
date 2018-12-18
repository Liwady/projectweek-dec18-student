var img;
var canvas;

function setup() {

  img = createImg("https://images7.memedroid.com/images/UPLOADED971/5958d10406a9c.jpeg");
  canvas = createCanvas(500, 500);

  img.position(0, 50);
  img.size(500, 500);
  canvas.position(500, 50);
}

function draw() {
  background(0, 0, 0);
  for (var i = 0; i < width; i += 15) {
    line(i, 0, i, height);
  }
}