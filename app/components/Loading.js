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
      text: props.text
    };
  }

  componentDidMount = () => {
    const { text, speed } = this.props;
    const stopper = text + '...';

    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text }))
        : this.setState(prevState => ({ text: prevState.text + '.' }))
    }, speed);
  }

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  }

  render() {
    const { text } = this.state;
    return (
      <p style={styles.content}>
        {text}
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