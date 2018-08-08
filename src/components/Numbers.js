import React, { Component} from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as numbersActions from '../actions/numbers';
import * as messageActions from '../actions/message';
import * as cashActions from '../actions/cash';

import Options from '../Options';

class Numbers extends Component{

  constructor(props) {

    super(props);
  }

  generateNumber() {

    return Number(Math.floor(Math.random() * this.levels[this.state.level].maxNumber) + 1);
  }

  checkNumbers( numbers ) {

    const resultFiltered = new Set(numbers);

    switch ( resultFiltered.size ) {

      case 3:
        this.props.messageActions.setMessage('YOU LOSE!');
        break;
      case 2:
        this.props.messageActions.setMessage('ALMOST!');
        this.props.cashActions.addCash( Options.levels[this.props.level].jackpotTwo );
        break;
      case 1:
        this.props.messageActions.setMessage('YOU WIN!');
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