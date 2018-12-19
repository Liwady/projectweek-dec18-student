var img;
var canvas;
var rij = 5;
var col = 5;

function setup() {

  img = createImg("https://images7.memedroid.com/images/UPLOADED971/5958d10406a9c.jpeg");
  canvas = createCanvas(500, 500);

  img.position(0, 50);
  img.size(500, 500);
  canvas.position(500, 50);
}

function draw() {
  background(0, 0, 0);
  for (var i = 0; i < col; i ++) {
    for (var j = 0; j < row; i++)
      stroke(0);
      fill(255);
      rect(i*30,j*30,30,30);
  }
}