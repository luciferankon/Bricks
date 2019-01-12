class Game {
  constructor(paddle, ball, wall) {
    this.paddle = paddle;
    this.ball = ball;
    this.wall = wall;
  }

  collidedWith() {
    return {
      bottomWall: this.ball.y == 1,
      horizontalWall: this.ball.x == 0 || this.ball.x == this.wall.width - 20,
      verticalWall: this.ball.y >= this.wall.height - 20,
      paddle:
        this.ball.y <= this.paddle.bottom + 15 &&
        this.ball.x > this.paddle.left &&
        this.ball.x < this.paddle.left + this.paddle.width,
    };
  }

  getVelocity([collisionWith]) {
    const newVelocity = this.wall.updateVelocity(collisionWith, this.ball.velocity.x, this.ball.velocity.y);
    const velocity = new Velocity(newVelocity.x, newVelocity.y);
    return velocity;
  }
}
