//클릭 시 해당 타일의 기물 판정
function mousePressed(){
  let tileX = floor((mouseX-posX)/ 80 - 1); 
  let tileY = floor((mouseY-posY)/ 80 - 1);
  let clickedPiece;

  //---------------------------------------------------------------------------------
  // 상점 모드에서 이미지 클릭 시 드래그 시작
  if (state === 'shop' && mouseY > windowHeight / 2 - 110 && buildStateDecision()) {
    // 슬라이더 값(g)이 적용된 이미지 위치 계산 (첫 번째 이미지 예시)
    if (mouseX > windowWidth / 2 - 480 + g && mouseX < windowWidth / 2 - 380 + g && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      isDragging = true;
      imgBuilding = pawnBuilding;
    } else if (mouseX > windowWidth / 2 - 330 + g && mouseX < windowWidth / 2 - 230 + g && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      isDragging = true;
      imgBuilding = knightBuilding;
    } /*else if (mouseX > windowWidth / 2 - 180 + g && mouseX < windowWidth / 2 - 80 + g && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      isDragging = true;
    } else if (mouseX > windowWidth / 2 - 30 + g && mouseX < windowWidth / 2 + 70 + g && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      isDragging = true;
    } else if (mouseX > windowWidth / 2 + 120 + g && mouseX < windowWidth / 2 + 220 + g && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      isDragging = true;
    } else if (mouseX > windowWidth / 2 + 270 + g && mouseX < windowWidth / 2 + 370 + g && mouseY > windowHeight / 2 - 110 && mouseY < windowHeight / 2 - 10) {
      isDragging = true;
    }*/
    return;
  }
  if (state === 'game'){
    shopButton.hide();
    escapeButton.hide();
    slider.hide();
  }
  
  if(tileX >= 0 && tileX <= 15 && tileY >= 0 && tileY <= 15){
    clickedPiece = chessBoard[tileY][tileX];
  }
  // 흔적 있을 시 무시하고 기물 판정
  if(clickedPiece >= trailNum){
    clickedPiece -= trailNum;
  }
  else if(clickedPiece <= -trailNum){
    clickedPiece += trailNum;
  }
  
  // 본격적 기물 판정: 고유번호와 해당 2차원 배열의 저장 값을 비교하기
  if((clickedPiece >= pioneerNum && turn == 1) || (clickedPiece <= -pioneerNum && turn == -1)){
    clearSelection();
    clickedPiece = abs(clickedPiece);
    selected[clickedPiece] = true;
    selectedPiece = clickedPiece;
    selectedX = tileX;
    selectedY = tileY;

    movableTiles = [];
    enemyTile = [];

    // 개척자
    if(clickedPiece == pioneerNum){
      checkTile(tileX + 1, tileY);
      checkTile(tileX - 1, tileY);
      checkTile(tileX, tileY + 1);
      checkTile(tileX, tileY - 1);
      // 이동, 건물 상점 버튼 
      shopButton.position((tileX + 1) * 80 + posX -70, (tileY +1) * 80  + posY -70);
      shopButton.show();
    }

    // 킹
    if(clickedPiece == kingNum){
      checkTile(tileX + 1, tileY);
      checkTile(tileX - 1, tileY);
      checkTile(tileX, tileY + 1);
      checkTile(tileX, tileY - 1);
      checkTile(tileX + 1, tileY + 1);
      checkTile(tileX + 1, tileY - 1);
      checkTile(tileX - 1, tileY + 1);
      checkTile(tileX - 1, tileY - 1);
      
      checkEnemy(tileX + 1, tileY);
      checkEnemy(tileX - 1, tileY);
      checkEnemy(tileX, tileY + 1);
      checkEnemy(tileX, tileY - 1);
      checkEnemy(tileX + 1, tileY + 1);
      checkEnemy(tileX + 1, tileY - 1);
      checkEnemy(tileX - 1, tileY + 1);
      checkEnemy(tileX - 1, tileY - 1);
    }
    
    // 폰
    if(clickedPiece == pawnNum){
      checkTile(tileX + 1, tileY);
      checkTile(tileX - 1, tileY);
      checkTile(tileX, tileY + 1);
      checkTile(tileX, tileY - 1);
      
      checkEnemy(tileX + 1, tileY + 1);
      checkEnemy(tileX - 1, tileY - 1);
      checkEnemy(tileX - 1, tileY + 1);
      checkEnemy(tileX + 1, tileY - 1);
    }
    
    //나이트
    if(clickedPiece == knightNum){
      checkTile(tileX + 1, tileY + 2);
      checkTile(tileX - 1, tileY + 2);
      checkTile(tileX + 1, tileY - 2);
      checkTile(tileX - 1, tileY - 2);
      checkTile(tileX + 2, tileY + 1);
      checkTile(tileX - 2, tileY + 1);
      checkTile(tileX + 2, tileY - 1);
      
      checkEnemy(tileX - 2, tileY - 1);
      checkEnemy(tileX + 1, tileY + 2);
      checkEnemy(tileX - 1, tileY + 2);
      checkEnemy(tileX + 1, tileY - 2);
      checkEnemy(tileX - 1, tileY - 2);
      checkEnemy(tileX + 2, tileY + 1);
      checkEnemy(tileX - 2, tileY + 1);
      checkEnemy(tileX + 2, tileY - 1);
      checkEnemy(tileX - 2, tileY - 1);
    }
    
    //룩
    if(clickedPiece == rookNum){
      let temp;
      if(tileX != 15){
        temp = constrain(tileX + 4,0,15);
        for(let i = tileX+1 ; i <= temp ; i++){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if(abs(chessBoard[tileY][i])  % 10 !== 0) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileX - 4,0,15);
        for(let i = tileX-1 ; i >= temp; i--){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if(abs(chessBoard[tileY][i])  % 10 !== 0) break;
        } 
      }
      if(tileY != 15){
        temp = constrain(tileY + 4,0,15);
        for(let i = tileY+1 ; i <= temp; i++){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileY - 4,0,15);
        for(let i = tileY-1 ; i >= temp; i--){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0) break;
        }
      }
    }
    
    //비숍
    if(clickedPiece == bishopNum){
      let temp;
      if(tileX != 15 && tileY != 15){
        temp = min(constrain(15-tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY+i);
          checkEnemy(tileX+i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX+i])  % 10 != 0) break;
        }
      }
      if(tileX != 0 && tileY != 0){
        temp = min(constrain(tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY-i);
          checkEnemy(tileX-i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX-i])  % 10 != 0) break;
        }
      }
      if(tileX != 15 && tileY != 0){
        temp = min(constrain(15-tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY-i);
          checkEnemy(tileX+i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX+i])  % 10 != 0) break;
        }
      }
      if(tileX != 0 && tileY != 15){
        temp = min(constrain(tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY+i);
          checkEnemy(tileX-i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX-i])  % 10 != 0) break;
        }
      }
    }
    
    //퀸
    if(clickedPiece == queenNum){
      let temp;
      if(tileX != 15){
        temp = constrain(tileX + 4,0,15);
        for(let i = tileX+1 ; i <= temp ; i++){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if(abs(chessBoard[tileY][i])  % 10 !== 0) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileX - 4,0,15);
        for(let i = tileX-1 ; i >= temp; i--){
          checkTile(i, tileY);
          checkEnemy(i, tileY);
          if(abs(chessBoard[tileY][i])  % 10 !== 0) break;
        } 
      }
      if(tileY != 15){
        temp = constrain(tileY + 4,0,15);
        for(let i = tileY+1 ; i <= temp; i++){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0) break;
        }
      }
      if(tileX != 0){
        temp = constrain(tileY - 4,0,15);
        for(let i = tileY-1 ; i >= temp; i--){
          checkTile(tileX, i);
          checkEnemy(tileX, i);
          if(abs(chessBoard[i][tileX])  % 10 !== 0) break;
        }
      }
      if(tileX != 15 && tileY != 15){
        temp = min(constrain(15-tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY+i);
          checkEnemy(tileX+i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX+i])  % 10 != 0) break;
        }
      }
      if(tileX != 0 && tileY != 0){
        temp = min(constrain(tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY-i);
          checkEnemy(tileX-i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX-i])  % 10 != 0) break;
        }
      }
      if(tileX != 15 && tileY != 0){
        temp = min(constrain(15-tileX,1,4),constrain(tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX+i, tileY-i);
          checkEnemy(tileX+i, tileY-i);
          if(abs(chessBoard[tileY-i][tileX+i])  % 10 != 0) break;
        }
      }
      if(tileX != 0 && tileY != 15){
        temp = min(constrain(tileX,1,4),constrain(15-tileY,1,4))
        for(let i = 1 ; i <= temp ; i++){
          checkTile(tileX-i, tileY+i);
          checkEnemy(tileX-i, tileY+i);
          if(abs(chessBoard[tileY+i][tileX-i])  % 10 != 0) break;
        }
      }
    }
    
    return;
  }

  movePiece(tileX, tileY);
}

//특정 타일이 비어있는 타일인지를 체크하고 맞다면 movableTiles에 해당 좌표 추가
function checkTile(x,y){
  if(x >= 0 && x < 16 && y >= 0 && y < 16){
    let tile = chessBoard[y][x];

    // 나의 기물이 없는가?
    if(abs(tile) == 10 || tile == 0){
      movableTiles.push([x,y]);
    }
  }
}

//특정 타일이 적이 있는 타일인지를 체크하고 맞다면 enemyTile에 해당 좌표 추가
function checkEnemy(x,y){
  if(x >= 0 && x < 16 && y >= 0 && y < 16){
    let tile = chessBoard[y][x];
    
    if(turn == -1 && tile > 0 && abs(tile) % 10 != 0){
      enemyTile.push([x,y]);
    }
    else if(turn == 1 && tile < 0 && abs(tile) % 10 != 0){
      enemyTile.push([x,y]);
    }
  }
}

//클릭한 기물 종류 판정을 위한 배열과 고유번호 측정 변수 재초기화
function clearSelection(){
  for(let i = 0 ; i < selected.length ; i++){
    selected[i] = false;
  }
  selectedPiece = 0;
}