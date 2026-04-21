let handPose;
let video;
let hands = [];
let targets = []; // 공들의 배열
let score = 0;

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPose.detectStart(video, gotHands);
  
  // 2초마다 새로운 목표물 생성
  setInterval(spawnTarget, 2000);
}

function draw() {
  // 거울 모드
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  // 1. 목표물(공) 표시 및 관리
  for (let i = targets.length - 1; i >= 0; i--) {
    let t = targets[i];
    fill(255, 200, 0, 150);
    noStroke();
    circle(t.x, t.y, t.r * 2);
    
    // 2. 손과의 충돌 감지
    if (hands.length > 0) {
      let index = hands[0].index_finger_tip;
      let d = dist(index.x, index.y, t.x, t.y);
      
      if (d < t.r) {
        targets.splice(i, 1); // 터치 시 제거
        score++;
      }
    }
  }

  // 3. 점수 표시 (글자는 반전되지 않도록 처리)
  push();
  scale(-1, 1);
  fill(255);
  textSize(32);
  textAlign(RIGHT);
  text(`Score: ${score}`, -20, 40);
  pop();

  // 검지 손가락 끝 위치 표시
  if (hands.length > 0) {
    let index = hands[0].index_finger_tip;
    fill(0, 255, 0);
    circle(index.x, index.y, 10);
  }
}

function spawnTarget() {
  targets.push({
    x: random(50, width - 50),
    y: random(50, height - 50),
    r: 30
  });
}

function gotHands(results) {
  hands = results;
}