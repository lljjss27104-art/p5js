//체스판 그리기
function chessdraw(){
  if(turn == -1) image(chessBoardWhite,posX,posY);
  else if(turn == 1) image(chessBoardBlack,posX,posY);
  
  for(let i = 0 ; i < 16 ; i++){
    for(let j = 0 ; j < 16 ; j++){
      // 흔적 타일
      if(chessBoard[i][j] >= trailNum || chessBoard[i][j] == 2){
        image(blackTile,(j+1) * 80 + posX, (i+1) * 80 + posY, 80);
      }
      else if(chessBoard[i][j] <= -trailNum || chessBoard[i][j] == -2){
        fill(255);
        image(whiteTile,(j+1) * 80 + posX, (i+1) * 80 + posY, 80);
      }
    }
  }

  // 체스판 위의 기물 판정 후 그리기
  for(let i = 0 ; i < 16 ; i++){
    for(let j = 0 ; j < 16 ; j++){
      let piece = chessBoard[i][j];
      //기물이 놓인 타일에 흔적이 있을 시 흔적을 무시하고 기물 판정
      if(piece >= trailNum) piece -= trailNum;
      else if(piece <= -trailNum) piece += trailNum;
      if(piece >= pioneerNum || piece <= -pioneerNum){
        drawPiece(
          (j+1) * 80 + 40 + posX,
          (i+1) * 80 + 40 + posY,
          piece
        );
      }
    }
  }
  
  drawMovableTiles();
  drawKillableEnemy();
}

//타일 색 교대
function tileColor(c){
  if(c == 165) c = 105;
  else c = 165;
  return c;
}

function drawPiece(x,y,a){
  push();
  if(a == pioneerNum){
    image(pioneerSpriteB, x-40, y-90);
  }
  if(a == kingNum){
    image(kingSpriteB, x-40, y-90);
  }
  if(a == pawnNum){
    image(pawnSpriteB, x-40, y-90);
  }
  if(a == knightNum){
    image(knightSpriteB, x-40, y-90);
  }
  if(a == rookNum){
    image(rookSpriteB, x-40, y-90);
  }
  if(a == bishopNum){
    image(bishopSpriteB, x-40, y-90);
  }
  if(a == queenNum){
    image(queenSpriteB, x-40, y-90);
  }
  
  if(a == -pioneerNum){
    image(pioneerSpriteW, x-40, y-90);
  }
  if(a == -kingNum){
    image(kingSpriteW, x-40, y-90);
  }
  if(a == -pawnNum){
    image(pawnSpriteW, x-40, y-90);
  }
  if(a == -knightNum){
    image(knightSpriteW, x-40, y-90);
  }
  if(a == -rookNum){
    image(rookSpriteW, x-40, y-90);
  }
  if(a == -bishopNum){
    image(bishopSpriteW, x-40, y-90);
  }
  if(a == -queenNum){
    image(queenSpriteW, x-40, y-90);
  }
  pop();
}

//이동범위를 초록색 점으로 표시
function drawMovableTiles(){
  for(let tile of movableTiles){
    let x = tile[0];
    let y = tile[1];
    push();
    noStroke();
    fill(0,255,0);
    circle((x+1) * 80 + 40 + posX,(y+1) * 80 + 40 + posY,20);
    pop();
  }
}

function drawKillableEnemy(){
  for(let tile of enemyTile){
    let x = tile[0];
    let y = tile[1];
    push();
    noStroke();
    fill(0,255,0);
    if(turn == -1){
      let piece = chessBoard[y][x];
      if(piece > 10) piece -= 10;
      blackPieceInDanger((x+1) * 80 + 40 + posX,
          (y+1) * 80 + 40 + posY,
          piece);
    }
    else if(turn == 1){
      let piece = chessBoard[y][x];
      if(piece < -10) piece += 10;
      whitePieceInDanger((x+1) * 80 + 40 + posX,
          (y+1) * 80 + 40 + posY,
          piece);
    }
    pop();
  }
}

function blackPieceInDanger(x,y,a){
  push();
  if(a == pioneerNum){
    image(pioneerSpriteBRed, x-40, y-90);
  }
  if(a == kingNum){
    image(kingSpriteBRed, x-40, y-90);
  }
  if(a == pawnNum){
    image(pawnSpriteBRed, x-40, y-90);
  }
  if(a == knightNum){
    image(knightSpriteBRed, x-40, y-90);
  }
  if(a == rookNum){
    image(rookSpriteBRed, x-40, y-90);
  }
  if(a == bishopNum){
    image(bishopSpriteBRed, x-40, y-90);
  }
  if(a == queenNum){
    image(queenSpriteBRed, x-40, y-90);
  }
  pop();
}

function whitePieceInDanger(x,y,a){
  push();
  if(a == -pioneerNum){
    image(pioneerSpriteWRed, x-40, y-90);
  }
  if(a == -kingNum){
    image(kingSpriteWRed, x-40, y-90);
  }
  if(a == -pawnNum){
    image(pawnSpriteWRed, x-40, y-90);
  }
  if(a == -knightNum){
    image(knightSpriteWRed, x-40, y-90);
  }
  if(a == -rookNum){
    image(rookSpriteWRed, x-40, y-90);
  }
  if(a == -bishopNum){
    image(bishopSpriteWRed, x-40, y-90);
  }
  if(a == -queenNum){
    image(queenSpriteWRed, x-40, y-90);
  }
  pop();
}