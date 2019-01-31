const React = require('react');
const PropTypes = require('prop-types');
const PlayerPreview = require('./PlayerPreview');

const Profile = ({ info }) => {
  const { avatar_url, blog, company, followers, following, location, login, name, public_repos } = info;
  return (
    <PlayerPreview
      avatar={avatar_url}
      username={login}
    >
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

module.exports = Profile;