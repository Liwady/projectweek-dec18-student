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

function verticalChainAt(board, jewel) {
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
  let yellow =0;
  let green = 0;
  let blue = 0;
  let remove = [];

  for (let y=0; y<height(board); y++) {      
      let x = 0;

      while (x<width(board)) {
          let jewel = {x:x, y:y};

          if (horizontalChainAt(board, jewel) >= 3) {
              if (board[y][x] === "Red") {
                  red++;
                  remove.push({x:x, y:y});
              }
              if (board[y][x] === "Yellow") {
                  yellow++;
                  remove.push({x:x, y:y});
            }
              if (board[y][x] === "Green") {
                  green++;
                  remove.push({x:x, y:y});
              }
              if (board[y][x] === "Blue") {
                  blue++;
                  remove.push({x:x, y:y});
              }
          }

          x++;
      }
  }

  for (let x=0; x<width(board); x++) {      
      let y = 0;

      while (y<height(board)) {
          let jewel = {x:x, y:y};

          if (verticalChainAt(board, jewel) >= 3) {
              if (board[y][x] === "Red") {
                  red++;
                  remove.push({x:x, y:y});
              }
              if (board[y][x] === "Yellow") {
                  yellow++;
                  remove.push({x:x, y:y});
            }
              if (board[y][x] === "Green") {
                  green++;
                  remove.push({x:x, y:y});
              }
              if (board[y][x] === "Blue") {
                  blue++;
                  remove.push({x:x, y:y});
              }
          }

          y++;
      }
  }

  for (let i=0; i<remove.length; i++) {
      let jewel = remove[i];
      let x = jewel.getPositionX();
      let y = jewel.getPositionY();

      board[y][x] = "";
  }

  let color = {};
  if (red !== 0) {
      color.red = red;
  }
  if (yellow !== 0) {
    color.yellow = yellow;
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
              let jewel1 = {x:x, y:y};
              let jewel2 = checkHigherElement(board, jewel.getPositionX(), jewel.getPositionY());
  
              swap(board, jewel1, jewel2);
          }
      }
  }

  function checkHigherElement(board, x, y) {
      let element = {x:x, y:y};

      for (let y2=element.y; y2>=0; y2--) {
          if (board[element.y][element.x] === "") {
              element = {x:x, y:y2};
          }
      }
      
      return element;
  }
}
