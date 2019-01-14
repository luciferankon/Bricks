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
    let velocity = new Velocity(ball.velocity.x, ball.velocity.y);
    if (collisionBrick.length != 0) {
      collisionBrick.filter(brick => brick.removeBrick());
      // this.bricks = this.bricks.filter(brick => collisionBrick.some(collidedBrick => !isEqual(collidedBrick,brick)));
      velocity = velocity.negateY();
    }
    return velocity;
  }
}

const isEqual = function(first,second){
  const matchedKeys = Object.keys(first).filter((key)=>first[key]==second[key])
  return matchedKeys.length == Object.keys(first).length;
}

const isBetween = function(number, lowerRange, upperRange) {
  return number > lowerRange && number < upperRange;
};
