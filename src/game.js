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

  updateState() {
    let velocity = new Velocity(this.ball.velocity.x, this.ball.velocity.y);
    const collisionCandidate = this.collidedWith();
    const collisionWith = Object.keys(collisionCandidate).filter(
      element => collisionCandidate[element]
    );
    velocity = this.getVelocity(collisionWith);
    this.ball.setVelocity(velocity);
    this.ball.move();
  }

  getVelocity([collisionWith]) {
    let velocity = this.bricks.checkCollision(this.ball);
    const getVelocityFrom = {
      horizontalWall: this.wall.updateVelocity.bind(
        this.wall,
        "horizontalWall",
        velocity.x,
        velocity.y
      ),
      verticalWall: this.wall.updateVelocity.bind(
        this.wall,
        "verticalWall",
        velocity.x,
        velocity.y
      ),
      bottomWall: this.wall.updateVelocity.bind(
        this.wall,
        "bottomWall",
        velocity.x,
        velocity.y
      ),
      paddle: this.paddle.updateVelocity.bind(
        this.paddle,
        velocity
      ),
      undefined: this.wall.updateVelocity.bind(
        this.wall,
        "undefined",
        velocity.x,
        velocity.y
      )
    };
    velocity = getVelocityFrom[collisionWith]();
    return velocity;
  }
}
