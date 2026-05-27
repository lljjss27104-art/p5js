function preload() {
  img = loadImage('assets/ChessPieces.png');
  chessBoardWhite = loadImage('assets/ChessBoardImageWhite.png');
  chessBoardBlack = loadImage('assets/ChessBoardImageBlack.png');
  fillTile = loadImage('assets/FillTile.png');
  chessuBuilding = loadImage('assets/chessuBuilding.png');
}


let posX;
let posY;

function setup() {
  //캔버스
  createCanvas(windowWidth,windowHeight);
  //개별 기물 스프라이트 로드
  img.resize(640,480);
  fillTile.resize(360,360);
  
  posX = windowWidth/2 - 720;
  posY = windowHeight/2 - 720;
  
  pioneerSpriteB = img.get(0,0,80,120);
  pawnSpriteB = img.get(80,0,80,120);
  knightSpriteB = img.get(160,0,80,120);
  rookSpriteB = img.get(240,0,80,120);
  bishopSpriteB = img.get(0,120,80,120);
  queenSpriteB = img.get(80,120,80,120);
  kingSpriteB = img.get(160,120,80,120);
  pioneerSpriteW = img.get(320,0,80,120);
  pawnSpriteW = img.get(400,0,80,120);
  knightSpriteW = img.get(480,0,80,120);
  rookSpriteW = img.get(560,0,80,120);
  bishopSpriteW = img.get(320,120,80,120);
  queenSpriteW = img.get(400,120,80,120);
  kingSpriteW = img.get(480,120,80,120);
  
  pioneerSpriteBRed = img.get(0,240,80,120);
  pawnSpriteBRed = img.get(80,240,80,120);
  knightSpriteBRed = img.get(160,240,80,120);
  rookSpriteBRed = img.get(240,240,80,120);
  bishopSpriteBRed = img.get(0,360,80,120);
  queenSpriteBRed = img.get(80,360,80,120);
  kingSpriteBRed = img.get(160,360,80,120);
  pioneerSpriteWRed = img.get(320,240,80,120);
  pawnSpriteWRed = img.get(400,240,80,120);
  knightSpriteWRed = img.get(480,240,80,120);
  rookSpriteWRed = img.get(560,240,80,120);
  bishopSpriteWRed = img.get(320,360,80,120);
  queenSpriteWRed = img.get(400,360,80,120);
  kingSpriteWRed = img.get(480,360,80,120);
  blackTile = fillTile.get(0,0,80,80)
  whiteTile = fillTile.get(80,0,80,80);
  
  //기물 초기 위치 선정
  chessBoard[14][1] = pioneerNum;
  chessBoard[15][0] = kingNum + trailNum;
  chessBoard[15][1] = pioneerNum;
  chessBoard[14][0] = pioneerNum;
  chessBoard[15][3] = queenNum;
  chessBoard[15][5] = pawnNum;
  
  chessBoard[1][14] = -pioneerNum;
  chessBoard[0][15] = -kingNum - trailNum;
  chessBoard[0][14] = -pioneerNum;
  chessBoard[1][15] = -pioneerNum;
  chessBoard[3][15] = -rookNum;
  chessBoard[5][15] = -queenNum;
  
  //selected 배열 초기화
  for(let i = 0 ; i < 30 ; i++){
    selected[i] = false;
  }
  //-----------------------------------------------------------------------------------------
  // 1. 건물 상점 이동 버튼
  shopButton = createButton('건물 상점');
  shopButton.mousePressed(() => state = 'shop');
  shopButton.size(80, 40);

  // 3. 상점나가기 버튼
  escapeButton = createButton('X');
  escapeButton.mousePressed(() => state = 'game');
  escapeButton.size(30, 30);
  
  // Create a slider and place it at the top of the canvas.
  slider = createSlider(0, 255);
  slider.position(windowWidth / 2, windowHeight / 2 + 100);
  slider.size(80);
  
  shopButton.hide();
  escapeButton.hide();
  slider.hide();
  
  // 건물 이미지
  let chessuBuildingWidth = chessuBuilding.width;
  let chessuBuildingHeight = chessuBuilding.height;
  
  // 첫 번째 건물 영역 잘라내기 (x: 0, y: 0, 너비: 전체의 약 20%, 높이: 전체 높이)
  pawnBuilding = chessuBuilding.get(0, 0, chessuBuildingWidth * 0.2, chessuBuildingHeight);
  knightBuilding = chessuBuilding.get(chessuBuildingWidth * 0.2,0,chessuBuildingWidth * 0.4,chessuBuildingHeight);
}

function draw() {
  background(100);
  chessdraw();
  //----------------------------------------------------------------------------------------
  if (state === 'shop') {
    showShop();
  }
  
  // 드래그 중인 이미지 표시
  if (isDragging) {
    if (imgBuilding === pawnBuilding){
      image(imgBuilding, mouseX - 40, mouseY - 40, 80, 80);
    } else {
      image(imgBuilding, mouseX - 40, mouseY - 40, 160, 160);
    }
  }
  
   // Use the slider as a grayscale value.
  g = slider.value();
  
  //건물 그리기 
  buildingDraw();
}




