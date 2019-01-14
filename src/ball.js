class Ball{
  constructor(position, radius, velocity){
    this.x = position.x;
    this.y = position.y;
    this.radius = radius;
    this.velocity = velocity;
  }

  move(){
    this.x = this.x - this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

  setVelocity(velocity){
    this.velocity = velocity;
  }
}

class Velocity{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  negateX(){
    return {x: -this.x, y: this.y};
  }

  negateY(){
    return {x: this.x, y: -this.y};
  }
}