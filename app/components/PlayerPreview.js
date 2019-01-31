const React = require('react');
const PropTypes = require('prop-types');

const PlayerPreview = ({ avatar, children, username }) => {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={avatar}
          alt={'Avatar for ' + username}
        />
        <h2 className='username'>@{username}</h2>
      </div>
      {/* expect user details from Profile.js, or Reset button from Battle.js */}
      {children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;