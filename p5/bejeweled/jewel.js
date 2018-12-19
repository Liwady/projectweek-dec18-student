var img;
var canvas;
var row = 5;
var col = 5;
var board = [];

function setup() {

  img = createImg("https://images7.memedroid.com/images/UPLOADED971/5958d10406a9c.jpeg");
  canvas = createCanvas(500, 500);
  for (var i = 0; i < col; i ++) {
    board[i]=[];
    for (var j = 0; j < row; j++)
      board[i][j]= random(255);
  }
  img.position(0, 50);
  img.size(500, 500);
  canvas.position(500, 50);
}

function draw() {
  background(50);

}