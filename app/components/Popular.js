import React from 'react';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';
import PropTypes from 'prop-types';

// stateless functional component
const SelectLanguage = ({ selectedLanguage, onSelect }) => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {languages.map(lang => {
        return (
          <li
            style={lang === selectedLanguage ? { color: '#d0021b' } : null}
            onClick={() => onSelect(lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

const RepoGrid = ({ repos }) => {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, owner, html_url, stargazers_count }, index) => {
        return (
          <li key={name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={owner.avatar_url}
                  alt={'Avatar for ' + owner.login}
                />
              </li>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired 
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  };

  componentDidMount = () => {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async lang => {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));

    try {
      const repos = await fetchPopularRepos(lang)
      this.setState(() => ({ repos }));
    } catch (err) {
      console.log('error:', err);
    }
  }

  render() {
    const { repos, selectedLanguage } = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos
          ? <Loading />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}

export default Popular;