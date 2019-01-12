class Paddle {
  constructor(left, bottom, width, height){
    this.left = left;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
  }

  moveLeft(){
    this.left = this.left - 20;
  }

  moveRight(){
    this.left = this.left + 20;
  }
}

