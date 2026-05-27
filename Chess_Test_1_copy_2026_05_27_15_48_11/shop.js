function showShop() {
  shopButton.hide();
  escapeButton.position(windowWidth / 2 + 430, windowHeight / 2 - 180);
  escapeButton.show();
  slider.show();
  
  // Use the slider as a grayscale value.
  let g = slider.value();
  
  // 상점 UI 그리기
  push();
  fill(50, 220);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 2, 960, 300, 10); // 상점 배경판
  pop();
  
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("🏗️ 건물 상점", windowWidth / 2 - 350, windowHeight / 2 - 200);
  
  push();
  menuShop();
  pop();
}

function menuShop() {
  if (buildStateDecision()) {
    noTint();
  } else tint(50);
  image(pawnBuilding, windowWidth / 2 - 480 + g, windowHeight / 2 - 110, 100, 100);
  image(knightBuilding, windowWidth / 2 - 330 + g, windowHeight / 2 - 110, 100, 100);
  /*image(img, windowWidth / 2 - 180 + g, windowHeight / 2 - 110, 100, 100);
  image(img, windowWidth / 2 - 30 + g, windowHeight / 2 - 110, 100, 100);
  image(img, windowWidth / 2 + 120 + g, windowHeight / 2 - 110, 100, 100);
  image(img, windowWidth / 2 + 270 + g, windowHeight / 2 - 110, 100, 100);*/
}

function buildStateDecision() {
  // 자원 개수 판별 코드 삽입
  if (s === 3){
    return true;
  } else return false;
}

function mouseDragged() {
  if (isDragging) {
    // 드래그 중인 좌표 업데이트 (draw에서 이미지 그림)
    state = 'game';
    escapeButton.hide();
    slider.hide();
  }
}

function mouseReleased() {
  if (isDragging) {
    let tileX = floor(mouseX / 80);
    let tileY = floor(mouseY / 80);

    // 체스판 범위 내에 놓았을 때만 설치
    if (tileX >= 0 && tileX < 12 && tileY >= 0 && tileY < 12) {
      // 빈 공간(0) 혹은 지나간 길(10)에만 설치 가능하도록 설정
      if (chessBoard[tileY][tileX] === trailNum) {
        buildingInstall(tileY, tileX, buildNum);
      }
    }
    isDragging = false;
  }
}

function buildingDraw() {
  s = 0;
}

function buildingInstall() {
  let tileX = floor(mouseX / 80);
  let tileY = floor(mouseY / 80);
  
  
}