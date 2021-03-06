import React from 'react';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Player from './Player';
import queryString from 'query-string';

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  async componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);

    try {
      const players = await battle([ playerOneName, playerTwoName]);
      if (!players) {
        return this.setState(() => ({
          error: 'Looks like there was an error. Check that both users exist on GitHub.',
          loading: false
        }));
      }
          
      this.setState(() => ({
        error: null,
        winner: players[0],
        loser: players[1],
        loading: false
      }));
    } catch (err) {
      console.log('error:', err);
    }
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results;