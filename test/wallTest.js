describe('wall',() => {
  const wall = new Wall(100,100);
  describe('updateVelocity', () => {
    it('should return updated velocity for horizontalWall',() => {
      const actualOutput = wall.updateVelocity('horizontalWall',10, 10);
      const expectedOutput = {x: -10, y: 10};
      chai.assert.deepEqual(expectedOutput, actualOutput);
    });

    it('should return updated velocity for verticalWall', () => {
      const actualOutput = wall.updateVelocity('verticalWall', 10, 10);
      const expectedOutput = {x: 10, y: -10};
      chai.assert.deepEqual(expectedOutput, actualOutput);
    });

    it('should return updated velocity for bottomWall', () => {
      const actualOutput = wall.updateVelocity('bottomWall', 10, 10);
      const expectedOutput = {x: 0, y: 0};
      chai.assert.deepEqual(expectedOutput, actualOutput);
    });
  })
});