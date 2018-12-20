var img;
var canvas;
var row = 5;
var col = 5;
var board = [];

function setup() {

  img = createImg("https://images7.memedroid.com/images/UPLOADED971/5958d10406a9c.jpeg");
  canvas = createCanvas(500, 500);

  img.position(0, 50);
  img.size(500, 500);
  canvas.position(500, 50);
}


function draw() {
  background(50);
  for (var i = 0; i < col; i ++) {
    board[i]=[];
    for (var j = 0; j < row; j++)
      board[i][j] = Jewel();
  }

}


function width(board) {
  return board[0].length;
}

function height(board) {
  return board.length;
}

function isInside(board, position) {
  if (position.x>=0 && position.y>=0) {
      if (position.x <= board[0].length-1 && position.y <= board.length-1) {
          return true;
      }
  }
  
  return false;
}

function swap(board, p, q) {    
  let pp = board[p.y][p.x];

  board[p.y][p.x] = board[q.y][q.x];
  board[q.y][q.x] = pp;
}

function horizontalChainAt(board, position) {
  let acc = 1;
  let color = board[position.y][position.x];
  
  let i = 1;
  while (position.x-i >= 0 && board[position.y][(position.x)-i] === color) {
      acc++;
      i++;
  }

  let j = 1;
  while (position.x+j < width(board) && board[position.y][(position.x)+j] === color) {
      acc++;
      j++;
  }

  return acc;
}

function verticalChainAt(board, position) {
  let acc = 1;
  let color = board[position.y][position.x];
  let i = 1;
  let j = 1;

  while (position.y-i >= 0 && board[(position.y)-i][position.x] === color) {
      acc++;
      i++;
  }

  while (position.y+j < height(board) && board[(position.y)+j][position.x] === color) {
      acc++;
      j++;
  }

  return acc;
}

function removeChains(board) {
  let red = 0;
  let green = 0;
  let blue = 0;
  let remove = [];

  for (let yposition=0; yposition<height(board); yposition++) {      
      let xposition = 0;

      while (xposition<width(board)) {
          let position = { x:xposition, y:yposition };

          if (horizontalChainAt(board, position) >= 3) {
              if (board[yposition][xposition] === "red") {
                  red++;
                  remove.push({x: xposition, y: yposition});
              }
              if (board[yposition][xposition] === "green") {
                  green++;
                  remove.push({x: xposition, y: yposition});
              }
              if (board[yposition][xposition] === "blue") {
                  blue++;
                  remove.push({x: xposition, y: yposition});
              }
          }

          xposition++;
      }
  }

  for (let xposition=0; xposition<width(board); xposition++) {      
      let yposition = 0;

      while (yposition<height(board)) {
          let position = {x:xposition, y:yposition};

          if (verticalChainAt(board, position) >= 3) {
              if (board[yposition][xposition] === "red") {
                  red++;
                  remove.push({x: xposition, y: yposition});
              }
              if (board[yposition][xposition] === "green") {
                  green++;
                  remove.push({x: xposition, y: yposition});
              }
              if (board[yposition][xposition] === "blue") {
                  blue++;
                  remove.push({x: xposition, y: yposition});
              }
          }

          yposition++;
      }
  }

  for (let i=0; i<remove.length; i++) {
      let position = remove[i];
      board[position.y][position.x] = "";
  }

  let color = {};
  if (red !== 0) {
      color.red = red;
  }
  if (green !== 0) {
      color.green = green;
  }
  if (blue !== 0) {
      color.blue = blue;
  }

  return color;
}

function collapse(board) {
  for (let x=0; x<width(board); x++) {
      let last = height(board)-1;

      for (let y=last; y>=0; y--) {
          if (board[y][x] === "") {    
              let element = {x:x, y:y};
              let element2 = checkHigherElement(board, x, y);
  
              swap(board, element, element2);
          }
      }
  }

  function checkHigherElement(board, xelement, yelement) {
      let element = {x:xelement, y:yelement};

      for (let y=element.y; y>=0; y--) {
          if (board[element.y][element.x] === "") {
              element = {x:xelement, y:y};
          }
      }
      
      return element;
  }
}