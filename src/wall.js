class Wall {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  updateVelocity(collidedWith, x, y){
    const velocity = { 
      horizontalWall: () => ({x: -x, y: y}),
      verticalWall: () => ({x: x, y: -y}),
      bottomWall: () => ({x: 0, y: 0}),
      undefined: () => ({x,y})
    }
    return velocity[collidedWith]();
  }
}