import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/LoginActions';

const mapStateToProps = state => {
  return {
    token: state.login.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryToLogin: (options) => {
      dispatch(login({login: options.login, password: options.password}))
    }
  }
}


class Loader extends Component {

  constructor (props) {
    super(props);
    this.state = {yalogin: '', yapassword: ''};
  }

  onLoginInput(e) {
    this.setState({yalogin: e.target.value});
  }

  onPassInput(e) {
    this.setState({yapassword: e.target.value});
  }

  tryLogin () {
    this.props.tryToLogin({login: this.state.yalogin, password: this.state.yapassword});
  }

  componentDidUpdate() {
    if(this.props.token){
      this.props.callback(this.props.token)
    }
  }

  render() {
    return (
      <div className="shadow-container">
        {
          this.props.login
          ? <div className="login-form">
              <input onInput={this.onLoginInput.bind(this)} type="text"/>
              <input onInput={this.onPassInput.bind(this)} type="password"/>
              <button type="button" name="button" onClick={this.tryLogin.bind(this)}>Login</button>
            </div>
          : null
        }
      </div>
    );
  }
}

const LoaderComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader)
export default LoaderComp;
