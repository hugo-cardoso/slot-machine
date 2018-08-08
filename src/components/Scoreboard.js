import React, { Component} from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as cashActions from '../actions/cash';

class Scoreboard extends Component{

  constructor(props) {

    super(props);
	}

  render(){
    return(
    	<div className="game__scoreboard">
        <div className="game__score-label">CASH</div>
        <div className="game__score" id="gameCash">${ this.props.cash }</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cash: state.cash
});

const mapDispatchToProps = dispatch => {
  return {
    cashActions: bindActionCreators(cashActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);