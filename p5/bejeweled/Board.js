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
  for (var y=0; y<col; y++) {
    board[y]=[];
    for (var x = 0; x<row; x++) {
      const jewel = new Jewel([x, y]);
      board[y][x] = jewel;
    }
  }

}


function width(board) {
  return board[0].length;
}

function height(board) {
  return board.length;
}

function isInside(board, jewel) {
  let x = jewel.getPositionX();
  let y = jewel.getPositionY();

  if (x>=0 && y>=0) {
      if (x <= board[0].length-1 && y <= board.length-1) {
          return true;
      }
  }
  
  return false;
}

function swap(board, jewel1, jewel2) {
  let x1 = jewel1.getPositionX();
  let y1 = jewel1.getPositionY();
  let x2 = jewel2.getPositionX();
  let y2 = jewel2.getPositionY();

  let elementjewel = board[y][x];

  board[y1][x1] = board[y2][x2];
  board[y2][x2] = elementjewel;
}

function horizontalChainAt(board, jewel) {
  let x = jewel.getPositionX();
  let y = jewel.getPositionY();

  let acc = 1;
  let color = board[y][x];
  
  let i = 1;
  while (x-i >= 0 && board[y][x-i] === color) {
      acc++;
      i++;
  }

  let j = 1;
  while (x+j < width(board) && board[y][x+j] === color) {
      acc++;
      j++;
  }

  return acc;
}

function verticalChainAt(board, position) {
  let x = jewel.getPositionX();
  let y = jewel.getPositionY();

  let acc = 1;
  let color = board[y][x];
  let i = 1;
  let j = 1;

  while (y-i >= 0 && board[y-i][x] === color) {
      acc++;
      i++;
  }

  while (y+j < height(board) && board[y+j][x] === color) {
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

  for (let y=0; y<height(board); y++) {      
      let x = 0;

      while (x<width(board)) {
          let position = {x:x, y:y};

          if (horizontalChainAt(board, position) >= 3) {
              if (board[y][x] === "red") {
                  red++;
                  remove.push({x:x, y:y});
              }
              if (board[y][x] === "green") {
                  green++;
                  remove.push({x:x, y:y});
              }
              if (board[y][x] === "blue") {
                  blue++;
                  remove.push({x:x, y:y});
              }
          }

          x++;
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

