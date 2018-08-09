import React, { Component} from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as numbersActions from '../actions/numbers';
import * as messageActions from '../actions/message';
import * as cashActions from '../actions/cash';

import Options from '../Options';
import Sounds from '../Sounds';

class Numbers extends Component{

  constructor(props) {
    super(props);
  }

  checkNumbers( numbers ) {

    switch ( new Set(numbers).size ) {

      case 3:
        this.props.messageActions.setMessage('YOU LOSE!');
        Sounds.lose.play();
        break;
      case 2:
        this.props.messageActions.setMessage('ALMOST!');
        Sounds.lose.play();
        this.props.cashActions.addCash( Options.levels[this.props.level].jackpotTwo );
        break;
      case 1:
        this.props.messageActions.setMessage('YOU WIN!');
        Sounds.winner.play();
        this.props.cashActions.addCash( Options.levels[this.props.level].jackpot );
        break;
    }
  }

  componentWillReceiveProps(props) {
    if(props.numbers != this.props.numbers ) {
      this.checkNumbers(props.numbers);     
    }
  }

  render(){
    return(
    	<div className="game__numbers">
				{ this.props.numbers.map((number,index) => <div className="game__number" key={index}>{ number }</div>) }
			</div>
    );
  }
}

const mapStateToProps = state => ({
  numbers: state.numbers,
  level: state.level
});

const mapDispatchToProps = dispatch => {
  return {
    numbersActions: bindActionCreators(numbersActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch),
    cashActions: bindActionCreators(cashActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Numbers);