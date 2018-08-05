import buzz from 'buzz';

const options = {
  maxNumber: 7,
  jackpot: 50,

};

let state = {
  cash: 50
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

const generateNumber = () => Number(Math.floor(Math.random() * options.maxNumber) + 1);

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
      state.cash += 50;
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

  state.cash -= 10
  updateCash();
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

    clearNumbers();
    audios.lose.play();
    setMessage('GAME OVER!');
  }
}

gameElements.startButton.addEventListener('click', game.start);
