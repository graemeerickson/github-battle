const React = require('react');
const PropTypes = require('prop-types');
const PlayerInput = require('./PlayerInput');
const PlayerPreview = require('./PlayerPreview');
const { Link } = require('react-router-dom');

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }
  }

  handleSubmit(id, username) {
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`,
    }));
  }

  handleReset(id) {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null,
    }));
  }

  render() {
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
    const { match } = this.props;

    return (
      <div>
        <div className="row">
          {!playerOneImage
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
                  onClick={() => this.handleReset('playerOne')}>
                    Reset
                </button>
              </PlayerPreview>
          }

          {!playerTwoImage
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
                  onClick={() => this.handleReset('playerTwo')}>
                    Reset
                </button>
              </PlayerPreview>
          }
        </div>
        {playerOneImage && playerTwoImage && 
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle;