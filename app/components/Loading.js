const React = require('react');
const PropTypes = require('prop-types');

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: props.speed,
      text: props.text,
    };
  }

  componentDidMount() {
    const stopper = this.props.text + '...';
    this.interval = window.setInterval(function() {
      if (this.state.text === stopper) {
        this.setState(function() {
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState(function(prevState) {
          return {
            text: prevState.text + '.'
          }
        })
      }
    }.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  speed: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

Loading.defaultProps = {
  speed: 300,
  text: 'Loading',
};

module.exports = Loading;