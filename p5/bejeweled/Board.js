
var img;
var canvas;
var row = 5;
var col = 5;
var board = [];

function setup() {

img = createImg("https://pics.me.me/i-played-candy-crush-back-whenit-was-bejeweled-1988381.png");
canvas = createCanvas(500, 500);

img.position(0, 50);
img.size(500, 500);

img2 = createImg("https://pics.me.me/i-played-candy-crush-back-whenit-was-bejeweled-1988381.png");

img2.position(1000, 50);
img2.size(500, 500);

canvas.position(500, 50);
}

/************
    BOARD
************/
function draw() {
	background(0);
	
	for (var x = 0; x < width; x += width / 10) {
        board[x] = [];
		for (var y = 0; y < height; y += height / 10) {
			stroke(225);
			strokeWeight(1);
			line(x, 0, x, height);
            line(0, y, width, y);
            board[x][y] = new Jewel(board[x][y]);
            makeJewel(Jewel);
		}
	}
}

function makeJewel(){
    if (Jewel.color !== null){
        switch(color){
            case "Yellow":
                hue(60);
                ellipse(Jewel.getPositionX, Jewel.getPositionY, 144, 72, 72);
                break; 
            case "Red":
                hue(360);
                ellipse(Jewel.getPositionX, Jewel.getPositionY, 144, 72, 72);
                break;
            case "Blue":
                hue(245);
                ellipse(Jewel.getPositionX, Jewel.getPositionY, 144, 72, 72);
                break;
            case "Green":
                hue(124);
                ellipse(Jewel.getPositionX, Jewel.getPositionY, 144, 72, 72);
                break;
        }
    }
}



/*************
    WIDTH
*************/

function width(board) {
  return board[0].length;
}

/*************
    HEIGHT
*************/
function height(board) {
  return board.length;
}

/****************
    IS INSIDE?
****************/
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

/************
    SWAP
************/
function swap(board, jewel1, jewel2) {
  let x1 = jewel1.getPositionX();
  let y1 = jewel1.getPositionY();
  let x2 = jewel2.getPositionX();
  let y2 = jewel2.getPositionY();

  let jewel = board[y][x];

  board[y1][x1] = board[y2][x2];
  board[y2][x2] = jewel;
}

/**************************
    # HORIZONTAL CHAINS
**************************/
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

/*************************
    # VERTICAL CHAINS
*************************/
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

/***********************
    REMOVE CHAINS
***********************/
function removeChains(board) {
  let red = 0;
  let yellow =0;
  let green = 0;
  let blue = 0;
  let remove = [];

  /** COUNT JEWELS HORIZONTAL **/
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

  /** COUNT JEWELS VERTICAL **/
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

  /** REMOVE CHAINS **/
  for (let i=0; i<remove.length; i++) {
      let jewel = remove[i];
      let x = jewel.getPositionX();
      let y = jewel.getPositionY();

      board[y][x] = "";
  }

  /** RETURN # ELEMENTS IN CHAINS PER COLOR **/
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

/****************
    COLLAPSE
****************/
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

/**********************
    CHECK NEXT TO
**********************/
function mouseClick() {
    // switch two jewels
}

/**********************
    CHECK NEXT TO
**********************/
function checkNextTo(jewel1, jewel2) {
    let x1 = jewel1.getPositionX();
    let y1 = jewel1.getPositionY();
    let x2 = jewel2.getPositionX();
    let y2 = jewel2.getPositionY();

    return Math.abs(x2-x1) === 1 || Math.abs(y2-y1) === 1;
}

/*********************
    CHECK CHAINS
*********************/
function checkChains(board) {
    /** CHECK CHAIN HORIZONTAL **/
    for (let y=0; y<height(board); y++) {      
        let x = 0;
  
        while (x<width(board)) {
            let jewel = {x:x, y:y};
  
            if (horizontalChainAt(board, jewel) >= 3) {
                return true;
            }
  
            x++;
        }
    }
  
    /** COUNT JEWELS VERTICAL **/
    for (let x=0; x<width(board); x++) {      
        let y = 0;
  
        while (y<height(board)) {
            let jewel = {x:x, y:y};
  
            if (verticalChainAt(board, jewel) >= 3) {
                return true;
            }
  
            y++;
        }
    }

    return false;
}

/****************************
    CHECK CHAIN IF SO SWAP
****************************/
function checkChainIfSwap(board, jewel1, jewel2) {
    swap(board, jewel1, jewel2);

    if (checkChains(board)) {
        swap(board, jewel1, jewel2);
    }

    return [jewel1, jewel2];
}

/******************
    CHECK SWAP
******************/
function checkSwap(board, jewel1, jewel2) {
    //if (mouseClick === true) {
        if (checkNextTo(jewel1, jewel2) === true) {
            checkChainIfSwap(board, jewel1, jewel2);
        }
    //}
}

/***************************
    CHECK EMPTY TOP ROW
***************************/
function checkEmptyTopRow(board) {
    for (let x=0; x<width(board); x++) {
        if (board[0][x] === 0) {
            // new Jewel(board[0][x]);
            // makeJewel(Jewel);
        }
    }
}