import React, { Component } from 'react';
import LoginForm from './LoginForm';
import UpcomingGamesList from './UpcomingGamesList';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <div className='home-welcome'>
          <div className='box business-description'>
            Join a Drop In Shinny In Vancouver
            <br />
            <div className='welcome-button'>View Games Now</div>
          </div>
          <div className='box'>
            <LoginForm />
          </div>
        </div>
        <UpcomingGamesList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Home);
