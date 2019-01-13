class Game {
  constructor(paddle, ball, wall, bricks) {
    this.paddle = paddle;
    this.ball = ball;
    this.wall = wall;
    this.bricks = bricks;
  }

  collidedWith() {
    return {
      bottomWall: this.ball.y == 1,
      horizontalWall: this.ball.x == 0 || this.ball.x == this.wall.width - 20,
      verticalWall: this.ball.y >= this.wall.height - 20,
      paddle:
        this.ball.y <= this.paddle.bottom + 15 &&
        isBetween(this.ball.x - this.paddle.left, 0, this.paddle.width)
    };
  }

  getVelocity([collisionWith]) {
    let newVelocity = this.bricks.checkCollision(this.ball);
    const getVelocityFrom = {
      horizontalWall: this.wall.updateVelocity.bind(
        this.wall,
        "horizontalWall",
        newVelocity.x,
        newVelocity.y
      ),
      verticalWall: this.wall.updateVelocity.bind(
        this.wall,
        "verticalWall",
        newVelocity.x,
        newVelocity.y
      ),
      bottomWall: this.wall.updateVelocity.bind(
        this.wall,
        "bottomWall",
        newVelocity.x,
        newVelocity.y
      ),
      paddle: this.paddle.updateVelocity.bind(
        this.paddle,
        newVelocity.x,
        newVelocity.y
      ),
      undefined: this.wall.updateVelocity.bind(
        this.wall,
        "undefined",
        newVelocity.x,
        newVelocity.y
      )
    };
    newVelocity = getVelocityFrom[collisionWith]();
    const velocity = new Velocity(newVelocity.x, newVelocity.y);
    return velocity;
  }
}
