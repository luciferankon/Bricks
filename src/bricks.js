class Bricks {
  constructor(bricks) {
    this.bricks = bricks;
    this.removedBrickIds = [];
  }


  removeBrickId(id) {
    let bricks = {};
    Object.keys(this.bricks).filter(ID => ID !== id).forEach(id => (bricks[id] = this.bricks[id]));
    this.bricks = bricks;
  }

  recordRemovedBricks(ids){
    this.removedBrickIds = this.removedBrickIds.concat(ids);
  }

  checkCollision(ball) {
    const collisionBrickIds = Object.keys(this.bricks).filter(brickId =>
      this.bricks[brickId].hasCollided(ball)
    );
    this.recordRemovedBricks(collisionBrickIds);
    let velocity = new Velocity(ball.velocity.x, ball.velocity.y);
    if (collisionBrickIds.length != 0) {
      collisionBrickIds.forEach(id => this.removeBrickId(id));
      velocity = velocity.negateY();
    }
    return velocity;
  }
}