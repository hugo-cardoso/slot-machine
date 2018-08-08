import React, { Component} from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as levelActions from '../actions/level';

import buzz from 'buzz';

class LevelButtons extends Component{

  constructor(props) {

    super(props);
	}
	
	setLevel( level ) {

    this.props.levelActions.setLevel( level );
  }

  render(){
    return(
    	<div className="game__difficulties">
				<div className={"game__difficulty " + ( this.props.level === 'easy' ? 'game__difficulty--active' : '' ) } onClick={() => this.setLevel('easy') }>EASY</div>
				<div className={"game__difficulty " + ( this.props.level === 'medium' ? 'game__difficulty--active' : '' ) } onClick={() => this.setLevel('medium') }>MEDIUM</div>
				<div className={"game__difficulty " + ( this.props.level === 'hard' ? 'game__difficulty--active' : '' ) } onClick={() => this.setLevel('hard') }>HARD</div>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  level: state.level
});

const mapDispatchToProps = dispatch => {
  return {
    levelActions: bindActionCreators(levelActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelButtons);