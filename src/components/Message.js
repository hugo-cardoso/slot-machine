import React, { Component} from "react";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as messageActions from '../actions/message';

import buzz from 'buzz';

class Message extends Component{

  constructor(props) {

    super(props);
	}
	
	setLevel( level ) {

    this.props.levelActions.setLevel( level );
  }

  render(){
    return(
    	<div className="game__message">{ this.props.message }</div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message
});

const mapDispatchToProps = dispatch => {
  return {
    messageActions: bindActionCreators(messageActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);