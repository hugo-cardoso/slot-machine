import buzz from 'buzz';

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
  messageBox: document.querySelector('.game__message')
};

const generateNumber = () => {
  return Number(Math.floor(Math.random() * 10) + 1);
}

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
  
  setTimeout(() => {
    if( gameNumbers[0].innerHTML === gameNumbers[1].innerHTML && gameNumbers[0].innerHTML === gameNumbers[2].innerHTML) {
      setMessage('YOU WIN!');
      audios.winner.play();
    } else {
      setMessage('YOU LOSE!');
      audios.lose.play();
    }
  }, 250);
};

const lockStartButton = () => {
  gameElements.startButton.innerHTML = '...';
  gameElements.startButton.setAttribute('disabled','disabled');
};

const unlockStartButton = () => {
  gameElements.startButton.innerHTML = 'START';
  gameElements.startButton.removeAttribute('disabled');
}

const setMessage = (msg) => gameElements.messageBox.innerHTML = msg;

const game = {
  start: () => {
    setMessage('GOOD LUCK!');
    audios.play.play();
    clearNumbers();
    lockStartButton();
    setNumbers().then(() => {
      unlockStartButton();
      checkNumbers();
    });
  }
}

gameElements.startButton.addEventListener('click', game.start);
