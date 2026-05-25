let xPos, xDir;
let yPos, yDir;
let diam;
let speed;
let ballcolor;
let life;
let padX;
let padWidth;

let score = 0;
let currentLevel = 1;

let bricks = [
  [1, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1]
  ];
let brickColors = [];

let viewAngle = 0;
let rotationSpeed = 0.0005;

function setup() {
  createCanvas(600, 600);
  variableInitiallization();
}

function draw() {
  background(128);
  
  if (currentLevel === 1){
    bricksDrawing();
    ballDrawingMovement();
    padDrawingMovement();
    ballBouncing();
    lifeColorSystem();
    bricksBallCollision();
    checkLevelUp();
  } else {
    screenRotating();
    bricksDrawing();
    ballDrawingMovement();
    padDrawingMovement();
    ballBouncing();
    lifeColorSystem();
    bricksBallCollision();
    checkLevelUp();
  }
  
  informationDrawing();
}

function padDrawingMovement() {
  push();
  rectMode(CENTER);
  padX = constrain(mouseX, padWidth / 2 - 100, width - padWidth / 2 + 100);
  fill(0, 255, 0);
  rect(padX, height - 15, padWidth, 30);
  pop();
}

function bricksDrawing() {
  stroke(0);
  
  for (let r = 0; r < bricks.length; r++){
    for (let c = 0; c < bricks[r].length; c++) {
      if (bricks[r][c] === 1) {
        fill(brickColors[r]);
        rect(c * 100, r * 50, 100, 50, 20);
      }
    }
  }
}

function ballDrawingMovement() {
  fill(ballcolor, 0, 0);
  ellipse(xPos, yPos, diam, diam);
  xPos += xDir;
  yPos += yDir;
}

function bricksBallCollision() {
  let col = int(xPos / 100);
  let row = int(yPos / 50);

  if (row >= 0 && row < bricks.length && col >= 0 && col < bricks[row].length) {
    if (bricks[row][col] === 1) {
      
      let prevX = xPos - xDir;
      let brickLeft = col * 100;
      let brickRight = brickLeft + 100;
      let brickTop = row * 50;
      let brickBottom = brickTop + 50;

      if (prevX < brickLeft || prevX > brickRight) {
        xDir *= -1; 
        xPos = (prevX < brickLeft) ? brickLeft - diam/2 : brickRight + diam/2; // 옆면 밀어내기
      } else {
        yDir *= -1; 
        yPos = (yDir > 0) ? brickBottom + diam/2 : brickTop - diam/2; // 상하단 밀어내기
      }

      bricks[row][col] = 0; // 블록 깨뜨리기
      score += 100;         // 점수 증가
      
      yDir *= 1.1;   // 속도 증가
      xDir *= 1.1;
    }
  }
}

function variableInitiallization() {
  speed = 4;
  xPos = width / 2;
  xDir = speed;
  yPos = height / 2;
  yDir = speed;
  diam = 50;
  ballcolor = 255;
  life = 5;
  padWidth = 200;
  
  for (let i = 0; i < bricks.length; i++) {
    brickColors[i] = color(random(100, 255), random(100, 255), random(100, 255));
  }
}

function ballBouncing() {
  if (xPos - diam/2 < 0 || xPos + diam/2 > width) xDir *= -1;
  if (yPos - diam/2 < 0 || yPos + diam/2 > height) yDir *= -1;
  
  if (xPos > padX - padWidth / 2 && xPos < padX + padWidth / 2 && yPos > height - 30 - diam/2 && yDir > 0){
    yDir *= -1;
  }
}

function lifeColorSystem() {
  if (yPos + diam/2 > height) {
    ballcolor -= 51;
    
    if (life !== 0) {
      life -= 1;
      yDir *= 1.1;
      xDir *= 1.1;
    }
  }
  if (ballcolor === 0 && life === 0) {
    xDir = 0;
    yDir = 0;
    console.log('game over');
  }
}

function checkLevelUp() {
  let activeBricks = 0;
  
  for (let r = 0; r < bricks.length; r++) {
    for (let c = 0; c < bricks[r].length; c++) {
      if (bricks[r][c] === 1) {
        activeBricks++;
      }
    }
  }
  
  if (activeBricks === 0 && currentLevel === 1) {
    currentLevel = 2;
    
    bricks = [
      [1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1],
      [1, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1]
    ]
    
    variableInitiallization();
    console.log('level 2 start!');
  }
  
  if (score === 3600 && currentLevel === 2) {
    xDir = 0;
    yDir = 0;
    console.log('game clear');
  }
}

function screenRotating() {
  translate(width / 2, height / 2);
  
  // 매 프레임마다 각도를 조금씩 더하고 일정 각도가 되었을 때 멈춤.
  viewAngle += rotationSpeed;
  if (viewAngle >= 0.1){
    rotationSpeed = 0;
  }
  rotate(viewAngle);
  
  translate(-width / 2, -height / 2);

}

function informationDrawing() {
  push();
  resetMatrix();
  
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  
  text("LEVEL : " + currentLevel, 20, 20);
  text("SCORE : " + score, 20, 45);
  text("LIFE : " + life, 20, 70);
  pop();
}