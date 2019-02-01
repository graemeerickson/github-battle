const params = `?client_id=${
  process.env.REACT_APP_GITHUB_CLIENT_ID
}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`;

const getProfile = async username => {
  const response = await fetch(
    `https://api.github.com/users/${username}${params}`
  );
  return response.json();
};

const getRepos = async username => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );
  return response.json();
};

const getStarCount = repos => repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);

const calculateScore = ({ followers }, repos) => (followers * 3) + getStarCount(repos);

const handleError = error => {
  console.warn(error);
  return null;
};

const getUserData = async player => {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player),
  ]);

  return {
    profile,
    score: calculateScore(profile, repos),
  };
};

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export async function battle(players) {
  try {
    const results = await Promise.all(players.map(getUserData));
    return !results ? results : sortPlayers(results);
  } catch (err) {
    handleError(err);
  }
}

export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  try {
    const response = await fetch(encodedURI);
    const repos = await response.json();
    return repos.items;
  } catch (err) {
    handleError(err);
  }
}
