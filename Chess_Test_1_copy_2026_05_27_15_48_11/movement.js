

//기물 이동 위치 확인
function movePiece(tileX, tileY){
  let temp1, temp2;
  for(let tile of movableTiles){
    temp1 = pieceReboot(tile,tileX, tileY);
    if(temp1 == 1) break;
  }
  
  for(let tile of enemyTile){
    temp2 = pieceReboot(tile,tileX, tileY);
    if(temp1 == 1 || temp2 == 1) break;
  }
}

//기물 이동을 위한 위치 재설
function pieceReboot(tile,tileX,tileY){
  if(tile[0] == tileX && tile[1] == tileY){
      // 이전 위치 처리
      // 흔적 위 기물이었는가? ==> 맞다면 흔적 무시
      if(chessBoard[selectedY][selectedX] >= trailNum)
        chessBoard[selectedY][selectedX] -= selectedPiece;
      else if(chessBoard[selectedY][selectedX] <= -trailNum)
        chessBoard[selectedY][selectedX] += selectedPiece;
      else{
        // 개척자가 떠나면 흔적 생성
        if(selectedPiece == pioneerNum){
          chessBoard[selectedY][selectedX] = trailNum*turn;
        }
        else{
          chessBoard[selectedY][selectedX] = 0;
        }
      }

      // 새 위치 처리
      // 흔적 위로 이동
      if(abs(chessBoard[tileY][tileX]) >= trailNum){
        chessBoard[tileY][tileX] = (selectedPiece + trailNum)*turn;
      }
      else{
        chessBoard[tileY][tileX] = selectedPiece*turn;
      }
      clearSelection();
      movableTiles = [];
      enemyTile = [];
      turn *= -1;
    return 1;
    }
  return 0;
}

