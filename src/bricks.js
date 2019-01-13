class Bricks {
  constructor(bricks) {
    this.bricks = bricks;
  }

  hasCollided(ball, brick) {
    return (
      ball.y >= brick.position.y - brick.height &&
      isBetween(ball.x - brick.position.x, 0, brick.width)
    );
  }

  checkCollision(ball) {
    const collisionBrick = this.bricks.filter(
      this.hasCollided.bind(null, ball)
    );
    if (collisionBrick.length != 0) {
      collisionBrick.filter(brick => brick.removeBrick());
      return { x: ball.velocity.x, y: -ball.velocity.y };
    }
    return { x: ball.velocity.x, y: ball.velocity.y };
  }
}

const isBetween = function(number,lowerRange, upperRange){
  return number>lowerRange && number<upperRange;
}