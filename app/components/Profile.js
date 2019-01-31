import React from 'react';
import PlayerPreview from './PlayerPreview';
import PropTypes from 'prop-types';

export default function Profile({ info }) {
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