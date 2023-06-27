const canvas = document.getElementById('game-field');
const ctx = canvas.getContext('2d');

const bgImage = new Image();
bgImage.src = 'img/bg.png';

const foodImage = new Image();
foodImage.src = 'img/carrot.png';

const BOX = 32;

const DIRECTIONS = {
  LEFT: 'LEFT',
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
}


let foodCoord = {
  x: (Math.floor(Math.random() * 17) + 1) * BOX,
  y: (Math.floor(Math.random() * 15) + 3) * BOX,
}

let snakeCoord = [
  {
    x: 10 * BOX,
    y: 7 * BOX,
  }
]

let snakeDirection = DIRECTIONS.DOWN;


window.addEventListener('keydown', (evt) => {
  switch (evt.key) {
    case ('ArrowUp'):
      snakeDirection = DIRECTIONS.UP;
      break;
    case ('ArrowRight'):
      snakeDirection = DIRECTIONS.RIGHT;
      break;
    case ('ArrowDown'):
      snakeDirection = DIRECTIONS.DOWN;
      break;
    case ('ArrowLeft'):
      snakeDirection = DIRECTIONS.LEFT;
      break;
  }
})


function draw() {
  ctx.drawImage(bgImage, 0, 0);
  ctx.drawImage(foodImage, foodCoord.x, foodCoord.y);


  for (let i = 0; i < snakeCoord.length; i++) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakeCoord[i].x, snakeCoord[i].y, BOX, BOX);
  }


  for (let i = 1; i < snakeCoord.length; i++) {
    if (snakeCoord[i].x === snakeCoord[0].x && snakeCoord[i].y === snakeCoord[0].y) {
      clearInterval(game);
      console.log('Game Over!')
    }
  }


  let vremCoordDo = {
    x: 0,
    y: 0,
  }

  let vremCoordPosle = {
    x: 0,
    y: 0,
  }

  for (let i = 0; i < snakeCoord.length; i++) {
    if (i === 0) {
      vremCoordPosle.x = snakeCoord[i].x;
      vremCoordPosle.y = snakeCoord[i].y;
    } else if (i%2 !== 0) {
      vremCoordDo.x = snakeCoord[i].x;
      vremCoordDo.y = snakeCoord[i].y;

      snakeCoord[i].x = vremCoordPosle.x;
      snakeCoord[i].y = vremCoordPosle.y;
    } else if (i%2 === 0) {
      vremCoordPosle.x = snakeCoord[i].x;
      vremCoordPosle.y = snakeCoord[i].y;

      snakeCoord[i].x = vremCoordDo.x;
      snakeCoord[i].y = vremCoordDo.y;
    }
  }


  if (snakeCoord[0].x === foodCoord.x && snakeCoord[0].y === foodCoord.y) {
    snakeCoord.push({
      x: 0,
      y: 0,
    });

    refreshFoodCoord();
  }


  if (snakeDirection === DIRECTIONS.LEFT) {
    snakeCoord[0].x = snakeCoord[0].x - BOX;
  } else if (snakeDirection === DIRECTIONS.UP) {
    snakeCoord[0].y = snakeCoord[0].y - BOX;
  } else if (snakeDirection === DIRECTIONS.RIGHT) {
    snakeCoord[0].x = snakeCoord[0].x + BOX;
  } else {
    snakeCoord[0].y = snakeCoord[0].y + BOX;
  }
}


function refreshFoodCoord() {
  foodCoord.x = (Math.floor(Math.random() * 17) + 1) * BOX;
  foodCoord.y = (Math.floor(Math.random() * 15) + 3) * BOX;
  return;
}

let game = setInterval(draw , 100);

window.addEventListener('keydown', (evt) => {
  if (evt.key === ' ') {
    clearInterval(game);
  }
})
