const React = require('react');
const PropTypes = require('prop-types');
const PlayerInput = require('./PlayerInput');
const PlayerPreview = require('./PlayerPreview');
const Link = require('react-router-dom').Link;

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {
      const newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      const newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }

  render() {
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {!playerOneName
            ? <PlayerInput
                id='playerOne'
                label='Player One'
                onSubmit={this.handleSubmit}
              />
            : <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}
              >
                <button
                  className='reset'
                  onClick={this.handleReset.bind(null, 'playerOne')}>
                    Reset
                </button>
              </PlayerPreview>
          }

          {!playerTwoName
            ? <PlayerInput
                id='playerTwo'
                label='Player Two'
                onSubmit={this.handleSubmit}
              />
            : <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}
              >
                <button
                  className='reset'
                  onClick={this.handleReset.bind(null, 'playerTwo')}>
                    Reset
                </button>
              </PlayerPreview>
          }
        </div>
        {playerOneName && playerTwoName && 
          <Link
            className='button'
            to={{
              pathname: this.props.match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle;