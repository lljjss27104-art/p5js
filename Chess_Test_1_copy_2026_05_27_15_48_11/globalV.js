let chessBoard = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

//고유번호
const trailNum = 10;
const pioneerNum = 2;
const pawnNum = 3;
const knightNum = 4;
const rookNum = 5;
const bishopNum = 6;
const queenNum = 7;
const kingNum = 8;

//클릭한 기물 종류 판정을 위한 배열과 고유번호 측정 변수
let selected = [];
let selectedPiece = 0;
//클릭한 기물 위치
let selectedX = -1;
let selectedY = -1;

//기물 이동범위
let movableTiles = [];
let enemyTile = [];

//전체 스프라이트 로드
let img;
let pioneerSpriteB;
let kingSpriteB;
let pawnSpriteB;
let knightSpriteB;
let rookSpriteB;
let bishopSpriteB;
let queenSpriteB;
let pioneerSpriteW;
let kingSpriteW;
let pawnSpriteW;
let knightSpriteW;
let rookSpriteW;
let bishopSpriteW;
let queenSpriteW;

let pioneerSpriteBRed;
let kingSpriteBRed;
let pawnSpriteBRed;
let knightSpriteBRed;
let rookSpriteBRed;
let bishopSpriteBRed;
let queenSpriteBRed;
let pioneerSpriteWRed;
let kingSpriteWRed;
let pawnSpriteWRed;
let knightSpriteWRed;
let rookSpriteWRed;
let bishopSpriteWRed;
let queenSpriteWRed;

let chessBoardWhite;
let ChessBoardBlack;

let whiteTile;
let blackTile;

//턴
let turn = -1;
//---------------------------------------------------------------------------------------
// 건물 상점 버튼과 상태
let state = 'game'; // 현재 화면 상태 ('game' 또는 'shop')
let shopButton;
let escapeButton;

let imgBuilding;
let pawnBuilding;
let knightBuilding;

// --- 드래그 관련 변수 추가 ---
let isDragging = false;
const buildNum = 100;
let s = 0;