class Brick{
  constructor(height, width, position){
    this.height = height;
    this.width = width;
    this.position = position;
  }
 
  hasCollided(ball) {
    return (
      ball.y >= this.position.y - this.height &&
      isBetween(ball.x - this.position.x, 0, this.width)
    );
  }
}

const isBetween = function(number, lowerRange, upperRange) {
  return number > lowerRange && number < upperRange;
};