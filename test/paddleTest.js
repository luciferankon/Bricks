describe("paddle", () => {
  const paddle = new Paddle(100, 100, 100, 100);
  describe("moveLeft", () => {
    it("should return updated position of the paddle", () => {
      paddle.moveLeft();
      chai.expect(paddle.left).to.be.equal(80);
    });
  });
  describe("moveRight", () => {
    it("should return updated postion of the paddle", () => {
      paddle.moveRight();
      chai.expect(paddle.left).to.be.equal(100);
    });
  });
});
