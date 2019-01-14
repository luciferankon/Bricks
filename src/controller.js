const ROW_COUNT = 5;
const COLUMN_COUNT = 12;

const setPaddlePosition = function(paddle, paddleContainer) {
  paddleContainer.style.height = addPx(paddle.height);
  paddleContainer.style.width = addPx(paddle.width);
  paddleContainer.style.left = addPx(paddle.left);
  paddleContainer.style.bottom = addPx(paddle.bottom);
};

const setBallPosition = function(ball, ballContainer) {
  ballContainer.style.height = addPx(ball.radius * 2);
  ballContainer.style.width = addPx(ball.radius * 2);
  ballContainer.style.left = addPx(ball.x);
  ballContainer.style.bottom = addPx(ball.y);
};

const setBrickPosition = function(brick, brickContainer) {
  brickContainer.style.height = addPx(brick.height);
  brickContainer.style.width = addPx(brick.width);
  brickContainer.style.left = addPx(brick.position.x);
  brickContainer.style.bottom = addPx(brick.position.y);
};

const getMainDiv = function(document) {
  return document.getElementById("main_div");
};

const addPx = function(value) {
  return value + "px";
};

const createWall = function(document) {
  const main = document.getElementById("main");
  const wallDiv = document.createElement("div");
  wallDiv.id = "main_div";
  wallDiv.tabIndex = "0";
  wallDiv.className = "game_container";
  main.appendChild(wallDiv);
};

const createPaddle = function(document) {
  const paddleContainer = document.createElement("div");
  const main = getMainDiv(document);
  paddleContainer.className = "paddle";
  paddleContainer.id = "paddle_1";
  main.appendChild(paddleContainer);
};

const createBall = function(document) {
  const ballContainer = document.createElement("div");
  const main = getMainDiv(document);
  ballContainer.className = "ball";
  ballContainer.id = "ball_1";
  main.appendChild(ballContainer);
};

const createBricks = function(document) {
  for (let brickCount = 0; brickCount < ROW_COUNT*COLUMN_COUNT; brickCount++) {
    const brickContainer = document.createElement("div");
    const main = getMainDiv(document);
    brickContainer.className = "brick";
    brickContainer.id = `brick_${brickCount + 1}`;
    main.appendChild(brickContainer);
  }
};

const drawWall = function(document, wall) {
  const main = getMainDiv(document);
  main.style.height = addPx(wall.height);
  main.style.width = addPx(wall.width);
};

const drawPaddle = function(document, paddle) {
  const paddleContainer = document.getElementById("paddle_1");
  setPaddlePosition(paddle, paddleContainer);
};

const drawBall = function(document, ball) {
  const ballContainer = document.getElementById("ball_1");
  setBallPosition(ball, ballContainer);
};

const drawBricks = function(document, bricks) {
  const removedBrickIds = bricks.removedBrickIds;
  const brickIds = Object.keys(bricks.bricks);
  removedBrickIds.forEach(id => document.getElementById(`brick_${id}`).className = 'empty');
  for (let brickCount = 0; brickCount < brickIds.length; brickCount++) {
    let brickId = brickIds[brickCount]
    const brickContainer = document.getElementById(`brick_${brickId}`);
    setBrickPosition(bricks.bricks[brickId], brickContainer);
  }
};

const moveBall = function(document, ball, paddle, wall, bricks) {
  const game = new Game(paddle, ball, wall, bricks);
  game.updateState();
  drawBricks(document, bricks);
  drawBall(document, ball);
};

const movePaddle = function(document, paddle) {
  if (event.keyCode == 37) {
    paddle.moveLeft();
  }
  if (event.keyCode == 39) {
    paddle.moveRight();
  }
  drawPaddle(document, paddle);
};

const createElements = function(document, ball, paddle, wall, bricks) {
  createWall(document);
  createBall(document);
  createPaddle(document);
  createBricks(document);
  drawWall(document, wall);
  drawBall(document, ball);
  drawPaddle(document, paddle);
  drawBricks(document, bricks);
  setInterval(moveBall.bind(null, document, ball, paddle, wall, bricks), 10);
};

const initialize = function() {
  const paddle = new Paddle(405, 5, 150, 20);
  const ball = new Ball({ x: 470, y: 25 }, 10, { x: 2, y: 2 });
  const wall = new Wall(600, 960);
  const allBricks = {};
  for (let rowCount = 0; rowCount < ROW_COUNT; rowCount++) {
    for (let columnCount = 0; columnCount < COLUMN_COUNT; columnCount++) {
      const brick = new Brick(20, 80, { x: columnCount * 80, y: 580 - rowCount * 20 });
      allBricks[rowCount*COLUMN_COUNT + columnCount +1]=brick;
    }
  }
  const bricks = new Bricks(allBricks);
  createElements(document, ball, paddle, wall, bricks);
  const main_div = getMainDiv(document);
  main_div.focus();
  main_div.onkeydown = movePaddle.bind(null, document, paddle);
};

window.onload = initialize;
