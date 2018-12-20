var color;
var shape;

class Jewel{
    setColor();
    setShape();
}
function setShape(){
    this.shape = "circle";
}

function setColor(){
    
   var number = Math.random(3);
    switch(number){
        case 0:
            this.color = "Yellow";
            break;
        case 1:
            this.color = "Red";
            break;
        case 2:
            this.color = "Blue";
            break;
        case 3:
            this.color = "Green"
            break;
    }
}
