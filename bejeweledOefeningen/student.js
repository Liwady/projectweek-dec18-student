function width(grid) {
    return grid[0].length;
}



function height(grid) {
    return grid.length;
}



function isInside(grid, position) {
    if (position.x>=0 && position.y>=0) {
        if (position.x <= grid[0].length-1 && position.y <= grid.length-1) {
            return true;
        }
    }
    
    return false;
}



function swap(grid, p, q) {    
    let pp = grid[p.y][p.x];

    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = pp;
}



function horizontalChainAt(grid, position) {
    let acc = 1;
    let color = grid[position.y][position.x];
    
    let i = 1;
    while (position.x-i >= 0 && grid[position.y][(position.x)-i] === color) {
        acc++;
        i++;
    }

    let j = 1;
    while (position.x+j < width(grid) && grid[position.y][(position.x)+j] === color) {
        acc++;
        j++;
    }

    return acc;
}



function verticalChainAt(grid, position) {
    let acc = 1;
    let color = grid[position.y][position.x];
    let i = 1;
    let j = 1;

    while (position.y-i >= 0 && grid[(position.y)-i][position.x] === color) {
        acc++;
        i++;
    }

    while (position.y+j < height(grid) && grid[(position.y)+j][position.x] === color) {
        acc++;
        j++;
    }

    return acc;
}



function removeChains(grid) {
    let red = 0;
    let green = 0;
    let blue = 0;
    let remove = [];

    for (let yposition=0; yposition<height(grid); yposition++) {      
        let xposition = 0;

        while (xposition<width(grid)) {
            let position = { x:xposition, y:yposition };

            if (horizontalChainAt(grid, position) >= 3) {
                if (grid[yposition][xposition] === "red") {
                    red++;
                    remove.push({x: xposition, y: yposition});
                }
                if (grid[yposition][xposition] === "green") {
                    green++;
                    remove.push({x: xposition, y: yposition});
                }
                if (grid[yposition][xposition] === "blue") {
                    blue++;
                    remove.push({x: xposition, y: yposition});
                }
            }

            xposition++;
        }
    }

    for (let xposition=0; xposition<width(grid); xposition++) {      
        let yposition = 0;

        while (yposition<height(grid)) {
            let position = {x:xposition, y:yposition};

            if (verticalChainAt(grid, position) >= 3) {
                if (grid[yposition][xposition] === "red") {
                    red++;
                    remove.push({x: xposition, y: yposition});
                }
                if (grid[yposition][xposition] === "green") {
                    green++;
                    remove.push({x: xposition, y: yposition});
                }
                if (grid[yposition][xposition] === "blue") {
                    blue++;
                    remove.push({x: xposition, y: yposition});
                }
            }

            yposition++;
        }
    }

    for (let i=0; i<remove.length; i++) {
        let position = remove[i];
        grid[position.y][position.x] = "";
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



function collapse(grid) {
    for (let x=0; x<width(grid); x++) {
        let last = height(grid)-1;

        for (let y=last; y>=0; y--) {
            if (grid[y][x] === "") {    
                let element = grid[y][x];
                let xyelement2 = checkHigherElement(grid, x, y);
    
                grid[y][x] = grid[xyelement2.y][xyelement2.x];
                grid[xyelement2.y][xyelement2.x] = element;
            }
        }
    }

    function checkHigherElement(grid, xelement, yelement) {
        let element = {x:xelement, y:yelement};

        for (let y=element.y; y>=0; y--) {
            if (grid[element.y][element.x] === "") {
                element = {x:xelement, y:y};
            }
        }
        
        return element;
    }
}

