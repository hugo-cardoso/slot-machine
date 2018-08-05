import buzz from 'buzz';

const levels = {
  eazy: {
    maxNumber: 4,
    jackpot: 20,
    cost: 10
  },
  medium: {
    maxNumber: 7,
    jackpot: 40,
    cost: 20
  },
  hard: {
    maxNumber: 10,
    jackpot: 50,
    cost: 25
  }
}

let state = {
  cash: 50,
  level: 'medium'
};

const audios = {
  play: new buzz.sound("./dist/audio/play.mp3"),
  numberStop: new buzz.sound("./dist/audio/number-stop.mp3"),
  winner: new buzz.sound("./dist/audio/winner.mp3"),
  lose: new buzz.sound("./dist/audio/lose.mp3")
};

const gameNumbers = [
  document.getElementById('gameNumber1'),
  document.getElementById('gameNumber2'),
  document.getElementById('gameNumber3')
];

const gameElements = {
  startButton: document.getElementById('startGame'),
  messageBox: document.getElementById('gameMessage'),
  cash: document.getElementById('gameCash')
};

const generateNumber = () => Number(Math.floor(Math.random() * levels[state.level].maxNumber) + 1);

const setNumber = (index) => {
  
  let count = 0;
  
  return new Promise((resolve, reject) => {
    
    let interval = setInterval(() => {
          
      if(count === 3) {
        resolve(true);
        audios.numberStop.play();
        clearInterval(interval);
      };

      gameNumbers[index].innerHTML = generateNumber();
      count++;
    }, 150);
  });
}

const setNumbers = () => {
  
  return new Promise((resolve, reject) => {
    setNumber(0).then(() => setNumber(1).then(() => {
      setNumber(2).then(() => resolve(true));
    }));
  })
}

const clearNumbers = () => gameNumbers.map(elem => elem.innerHTML = '?');

const checkNumbers = () => {

  return new Promise(resolve => {

    if( gameNumbers[0].innerHTML === gameNumbers[1].innerHTML && gameNumbers[0].innerHTML === gameNumbers[2].innerHTML) {
      setMessage('YOU WIN!');
      state.cash += levels[state.level].jackpot;
      audios.winner.play();
      resolve(true);
    } else {
      setMessage('YOU LOSE!');
      audios.lose.play();
      resolve(false);
    }

    updateCash();
  });
};

const lockStartButton = () => {
  gameElements.startButton.innerHTML = '...';
  gameElements.startButton.setAttribute('disabled','disabled');
};

const unlockStartButton = () => {
  gameElements.startButton.innerHTML = 'START';
  gameElements.startButton.removeAttribute('disabled');
};

const setMessage = msg => gameElements.messageBox.innerHTML = msg;

const updateCash = () => gameElements.cash.innerHTML = state.cash <= 0 ? 0 : `$${ state.cash }`;

const getMachineCash = () => {

  state.cash -= levels[state.level].cost
  updateCash();
};

const changeLevel = level => {
  
  audios.play.play();
  state.level = level;
  document.querySelectorAll('.game__difficulty').forEach(button => button.getAttribute('data-level') === level ? button.classList.add('game__difficulty--active') : button.classList.remove('game__difficulty--active'));
};

const game = {
  start: () => {
    setMessage('GOOD LUCK!');
    buzz.all().stop();
    audios.play.play();
    clearNumbers();
    lockStartButton();
    getMachineCash();
    updateCash();
    setNumbers()
      .then(() => checkNumbers())
      .then(result => {

        if( !result && state.cash <= 0 ) {

          game.gameover();
          return;
        }
        unlockStartButton();
      })
  },
  gameover: () => {

    audios.lose.play();
    setMessage('GAME OVER!');
    setTimeout(() => clearNumbers(), 1500);
  }
}

gameElements.startButton.addEventListener('click', game.start);


document.querySelectorAll('.game__difficulty').forEach(button => {
  button.addEventListener('click', event => changeLevel(event.target.getAttribute('data-level')));
});
