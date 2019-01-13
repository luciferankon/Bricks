class Brick{
  constructor(height, width, position){
    this.height = height;
    this.width = width;
    this.position = position;
  }

  collided(x,y){
   this.removeBrick();
    return {x: x, y: -y};
  }

  removeBrick(){
    this.height=0;
    this.width=0;
    this.position={x:0, y:0};
  }
}