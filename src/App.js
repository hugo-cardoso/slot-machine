import React, { Component} from "react";
import {hot} from "react-hot-loader";

import buzz from 'buzz';
import Options from './Options';

import "./App.scss";

class App extends Component{

  constructor() {

    super();
    this.levels = Options.levels;
    this.state = {
      cash: 50,
      level: 'medium',
      numbers: ['?','?','?'],
      message: 'GOOD LUCK!'
    };
    this.audios = {
      play: new buzz.sound("./audio/play.mp3"),
      numberStop: new buzz.sound("./audio/number-stop.mp3"),
      winner: new buzz.sound("./audio/winner.mp3"),
      lose: new buzz.sound("./audio/lose.mp3")
    };
  }

  generateNumber() {

    return Number(Math.floor(Math.random() * this.levels[this.state.level].maxNumber) + 1);
  }

  setNumbers() {

    return new Promise(resolve => {
      
      this.setState({
        numbers: this.state.numbers.map(() => this.generateNumber())
      }, () => resolve(true));
    });
  }

  checkNumbers() {

    const resultFiltered = new Set(this.state.numbers);

    switch ( resultFiltered.size ) {

      case 3:
        this.setState({
          message: 'YOU LOSE!'
        });
        this.audios.lose.play();
        break;
      case 2:
        this.setState({
          cash: (this.state.cash += this.levels[this.state.level].jackpotTwo),
          message: 'ALMOST!'
        });
        this.audios.lose.play();
        break;
      case 1:
        this.setState({
          cash: (this.state.cash += this.levels[this.state.level].jackpot),
          message: 'YOU WINNER!'
        });
        this.audios.winner.play();
        break;
    }
  }

  setLevel( level ) {

    this.audios.play.play();
    this.setState({level: level});
  }

  start() {

    this.audios.play.play();
    if( this.state.cash < this.levels[this.state.level].cost ) {

      this.setState({message: 'INSUFFICIENT CASH!'});
      return;
    }
    this.setState({cash: (this.state.cash -= this.levels[this.state.level].cost)});
    this.setNumbers().then(() => this.checkNumbers())
  }

  render(){
    return(
      <div className="App">
        <div className="game">
          <div className="game__content">
          <div className="game__message">{ this.state.message }</div>
            <div className="game__machine">
              <div className="game__numbers">
                { this.state.numbers.map((number,index) => <div className="game__number" key={index}>{ number }</div>) }
              </div>
            </div>
            <div className="game__difficulties">
              <div className={"game__difficulty " + ( this.state.level === 'easy' ? 'game__difficulty--active' : '' ) } onClick={() => this.setLevel('easy') }>EASY</div>
              <div className={"game__difficulty " + ( this.state.level === 'medium' ? 'game__difficulty--active' : '' ) } onClick={() => this.setLevel('medium') }>MEDIUM</div>
              <div className={"game__difficulty " + ( this.state.level === 'hard' ? 'game__difficulty--active' : '' ) } onClick={() => this.setLevel('hard') }>HARD</div>
            </div>
            <div className="game__bottom-content">
              <div className="game__scoreboard">
                <div className="game__score-label">CASH</div>
                <div className="game__score" id="gameCash">${ this.state.cash }</div>
              </div>
              <button className="game__button" onClick={() => this.start() }>START</button>
            </div>
            <div className="game__credits">
              Developed by HUGO CARDOSO
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);