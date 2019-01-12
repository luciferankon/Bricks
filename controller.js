const addPx = function(value){
  return value + 'px';
}

const createPaddle = function(document){
  const paddleContainer = document.createElement('div');
  paddleContainer.className = 'paddle';
  paddleContainer.id = 'paddle_1';
  return paddleContainer;
}

const createBall = function(document){
  const paddleContainer = document.createElement('div');
  paddleContainer.className = 'ball';
  paddleContainer.id = 'ball_1';
  return paddleContainer;
}

const setPaddlePosition = function(paddle, paddleContainer){
  paddleContainer.style.height = addPx(paddle.height);
  paddleContainer.style.width = addPx(paddle.width);
  paddleContainer.style.left = addPx(paddle.left);
  paddleContainer.style.bottom = addPx(paddle.bottom);
}

const setBallPosition = function(ball, ballContainer){
  ballContainer.style.height = addPx(ball.radius * 2);
  ballContainer.style.width = addPx(ball.radius * 2);
  ballContainer.style.left = addPx(ball.x);
  ballContainer.style.bottom = addPx(ball.y);
}

const getMainDiv = function(document){
  return document.getElementById('main_div');
}

const drawPaddle = function(document, paddle, paddleContainer){
  const main = getMainDiv(document);
  setPaddlePosition(paddle, paddleContainer);
  main.appendChild(paddleContainer);
}

const drawBall = function(document, ball, ballContainer){
  const main = getMainDiv(document);
  setBallPosition(ball, ballContainer);
  main.appendChild(ballContainer);
}

const moveBall = function(document, ball, ballContainer){
  if(ball.x == 0 || ball.x == 960){
    velocity = new Velocity(-ball.velocity.x,ball.velocity.y);
    ball.setVelocity(velocity);
    ball.move();
    drawBall(document, ball, ballContainer);
  }
  if(ball.y >= 600){
    velocity = new Velocity(ball.velocity.x, -ball.velocity.y);
    ball.setVelocity(velocity);
    ball.move();
    drawBall(document, ball, ballContainer);
  }
  ball.move();
  drawBall(document, ball, ballContainer);
}

const movePaddle = function(document, paddle, paddleContainer){
  if(event.keyCode == 37){
    paddle.moveLeft();
  }
  if(event.keyCode == 39){
    paddle.moveRight();
  }
  drawPaddle(document, paddle, paddleContainer);
}

const game = function(){
  const paddle = new Paddle(405,5,150,20);
  const ball = new Ball({x:470, y:25}, 10, {x:2, y:2});
  const main_div = getMainDiv(document);
  main_div.focus();
  const ballContainer = createBall(document);
  const paddleContainer = createPaddle(document);
  drawBall(document, ball, ballContainer);
  drawPaddle(document, paddle, paddleContainer);
  setInterval(moveBall.bind(null, document, ball, ballContainer),10);
  main_div.onkeydown = movePaddle.bind(null, document, paddle, paddleContainer);
}

window.onload = game;