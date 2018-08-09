import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as numbersActions from './actions/numbers';
import * as messageActions from './actions/message';
import * as cashActions from './actions/cash';

import Numbers from './components/Numbers';
import LevelButtons from './components/LevelButtons';
import Message from './components/Message';
import Scoreboard from './components/Scoreboard';

import Sounds from './Sounds';
import Options from './Options';

import './App.scss';

class App extends Component{

  constructor(props) {
    super(props);
  }

  generateNumber() {
    return Number(Math.floor(Math.random() * Options.levels[this.props.level].maxNumber) + 1);
  }

  start() {
    Sounds.play.play();
    if( this.props.cash < Options.levels[this.props.level].cost ) {
      this.props.messageActions.setMessage('INSUFFICIENT CASH!');
      return;
    }
    this.props.numbersActions.setNumbers(this.props.numbers.map(number => this.generateNumber()));
    this.props.cashActions.removeCash(Options.levels[this.props.level].cost);
  }

  render() {

    return(
      <div className="App">
        <div className="game">
          <div className="game__content">
            <Message />
            <div className="game__machine">
              <Numbers />
            </div>
            <LevelButtons />
            <div className="game__bottom-content">
              <Scoreboard />
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

const mapStateToProps = state => ({
  level: state.level,
  cash: state.cash,
  numbers: state.numbers
});

const mapDispatchToProps = dispatch => {
  return {
    numbersActions: bindActionCreators(numbersActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch),
    cashActions: bindActionCreators(cashActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);