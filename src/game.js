class Game {
  constructor(paddle, ball, wall, brick) {
    this.paddle = paddle;
    this.ball = ball;
    this.wall = wall;
    this.brick = brick;
  }

  collidedWith() {
    return {
      bottomWall: this.ball.y == 1,
      horizontalWall: this.ball.x == 0 || this.ball.x == this.wall.width - 20,
      verticalWall: this.ball.y >= this.wall.height - 20,
      paddle:
        this.ball.y <= this.paddle.bottom + 15 &&
        Math.abs(this.ball.x - this.paddle.left) < this.paddle.width,
      brick:
        this.ball.y >= this.wall.height - this.brick.position.y - 50 &&
        Math.abs(this.ball.x - this.brick.position.x) < 80
    };
  }

  getVelocity([collisionWith]) {
    const getVelocityFrom = {
      horizontalWall: this.wall.updateVelocity.bind(this.wall,
        'horizontalWall',
        this.ball.velocity.x,
        this.ball.velocity.y
      ),
      verticalWall: this.wall.updateVelocity.bind(this.wall,
        'verticalWall',
        this.ball.velocity.x,
        this.ball.velocity.y
      ),
      bottomWall: this.wall.updateVelocity.bind(this.wall,
        'bottomWall',
        this.ball.velocity.x,
        this.ball.velocity.y
      ),
      paddle: this.paddle.updateVelocity.bind(this.paddle,
        this.ball.velocity.x,
        this.ball.velocity.y
      ),
      brick: this.brick.collided.bind(this.brick,
        this.ball.velocity.x,
        this.ball.velocity.y
      ),
      undefined: this.wall.updateVelocity.bind(this.wall,
        'undefined',
        this.ball.velocity.x,
        this.ball.velocity.y
      )
    }
    const newVelocity = getVelocityFrom[collisionWith]();
    const velocity = new Velocity(newVelocity.x, newVelocity.y);
    return velocity;
  }
}
