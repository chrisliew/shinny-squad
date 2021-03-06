import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { toast } from 'react-toastify';

class Payments extends Component {
  handleOnSubmitBookGame = event => {
    this.props.sendEmailConfirm(event);
    toast.success(
      'You have registered for this game and payment was successful'
    );
    window.location.href = `/confirm-game/${this.props.selectedGame._id}`;
  };

  render() {
    const game = this.props.selectedGame;
    const auth = this.props.auth;

    const emailData = {
      email: auth.email,
      startDate: game.startDate,
      startTime: game.startTime,
      address: game.address,
      name: auth.firstName,
      position: this.props.position,
      arena: game.arena,
      gameId: game._id
    };

    return (
      <div>
        <StripeCheckout
          name='Shinny Squad'
          description='Payment for this game @'
          image='/images/puck.png'
          currency='CAD'
          amount={1800}
          allowRememberMe={false}
          email='service@shinnysquad.com'
          token={token =>
            this.props
              .handleToken({
                token: token,
                selectedGame: this.props.selectedGame,
                auth: this.props.auth,
                position: this.props.position
              })
              .then(
                document.cookie
                  ? this.handleOnSubmitBookGame(emailData)
                  : toast.error(
                      'Rejected Payment, You were logged out.  Please login again'
                    )((document.location.href = '/login'))
              )
          }
          allowRememberMe='true'
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className='book-game-button'>Pay For Game</button>
          <p className='payment-mandatory'>No cancellation 48 hours before </p>
        </StripeCheckout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { selectedGame: state.fetchOneGame, auth: state.auth };
};

export default connect(
  mapStateToProps,
  actions
)(Payments);
