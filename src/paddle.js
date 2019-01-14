class Paddle {
  constructor(left, bottom, width, height){
    this.left = left;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
  }

  updateVelocity(velocity){
    const newVelocity = new Velocity(velocity.x, velocity.y);
    return newVelocity.negateY();
  }

  moveLeft(){
    this.left = this.left - 20;
  }

  moveRight(){
    this.left = this.left + 20;
  }
}