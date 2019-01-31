import axios from 'axios';

const params = `?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`;

const getProfile = async username => {
  const profile = await axios.get(`https://api.github.com/users/${username}${params}`);
  return profile.data;
}

const getRepos = username => axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);

const getStarCount = repos => {
  return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

const calculateScore = ({ followers }, repos) => {
  return (followers * 3) + getStarCount(repos);
}

const handleError = error => {
  console.warn(error);
  return null;
}

const getUserData = async player => {
  const [ profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])

  return {
    profile,
    score: calculateScore(profile, repos)
  }
}

const sortPlayers = players => players.sort((a,b) => b.score - a.score);

export async function battle(players) {
  try {
    const results = await Promise.all(players.map(getUserData));
    return !results
      ? results
      : sortPlayers(results);
  } catch (err) {
    handleError(err);
  }
}

export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  try {
    const repos = await axios.get(encodedURI);
    return repos.data.items;
  } catch (err) {
    handleError(err);
  }
}