describe("ball", () => {
  const ball = new Ball({ x: 10, y: 10 }, 5, { x: 2, y: 2 });
  describe("move", () => {
    it("should return updated position of the paddle", () => {
      ball.move();
      chai.expect(ball.x).to.be.equal(8);
      chai.expect(ball.y).to.be.equal(12);
    });
  });
  describe('velocity', () => {
    it('should return updated velocity of the ball', () =>{
      const velocity = {x: 10, y: 10};
      ball.setVelocity(velocity);
      chai.assert.deepEqual(ball.velocity,velocity);
    })
  })
});
