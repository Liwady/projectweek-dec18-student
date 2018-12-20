var color;
var shape;
var positionX;
var positionY;

class Jewel{
     Jewel(arrayJewel) {
        setColor();
        setShape();
        setPositionX(arrayJewel);
        setPositionY(arrayJewel);
    }
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
function setPositionX(arrayJewel){
    try {
        arrayJewel[0] > 0 && arrayJewel[0] < arrayJewel.length - 1
      }
      catch(err) {
        return null;
      }
    this.positionX = arrayJewel[0];
}
function setPositionY(arrayJewel){
    try {
        arrayJewel[1] > 0 && arrayJewel[1] < arrayJewel.length - 1
      }
      catch(err) {
        return null;
      }
    this.positionY = arrayJewel[1];
}
