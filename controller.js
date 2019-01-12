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

const getMainDiv = function(document) {
  return document.getElementById("main_div");
};

const addPx = function(value) {
  return value + "px";
};

const createPaddle = function(document) {
  const paddleContainer = document.createElement("div");
  const main = getMainDiv(document);
  paddleContainer.className = "paddle";
  paddleContainer.id = "paddle_1";
  main.appendChild(paddleContainer);
};

const createBall = function(document) {
  const paddleContainer = document.createElement("div");
  const main = getMainDiv(document);
  paddleContainer.className = "ball";
  paddleContainer.id = "ball_1";
  main.appendChild(paddleContainer);
};

const createWall = function(document) {
  const main = document.getElementById("main");
  const wallDiv = document.createElement("div");
  wallDiv.id = "main_div";
  wallDiv.tabIndex = "0";
  wallDiv.className = "game_container";
  main.appendChild(wallDiv);
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

const moveBall = function(document, ball, paddle, wall) {
  const game = new Game(paddle, ball, wall);
  let velocity = new Velocity(ball.velocity.x, ball.velocity.y);
  const collisionCandidate = game.collidedWith();
  const collisionWith = Object.keys(collisionCandidate).filter(
    element => collisionCandidate[element]
  );
  velocity = game.getVelocity(collisionWith);
  ball.setVelocity(velocity);
  ball.move();
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

const createElements = function(document, ball, paddle, wall) {
  createWall(document);
  createBall(document);
  createPaddle(document);
  drawBall(document, ball);
  drawPaddle(document, paddle);
  drawWall(document, wall);
  setInterval(moveBall.bind(null, document, ball, paddle, wall), 10);
};

const initialize = function() {
  const paddle = new Paddle(405, 5, 150, 20);
  const ball = new Ball({ x: 470, y: 25 }, 10, { x: 2, y: 2 });
  const wall = new Wall(600, 960);
  createElements(document, ball, paddle, wall);
  const main_div = getMainDiv(document);
  main_div.focus();
  main_div.onkeydown = movePaddle.bind(null, document, paddle);
};

window.onload = initialize;
