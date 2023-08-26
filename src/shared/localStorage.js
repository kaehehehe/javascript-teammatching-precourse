const initTeamMatchingData = {
  frontend: [],
  backend: []
};


export const getLocalStorageData = () => {
  const teamMatchingData = localStorage.getItem('teamMatching');
  return teamMatchingData ? JSON.parse(teamMatchingData) : initTeamMatchingData;
};

export const setLocalStorageData = (data) => {
  localStorage.setItem('teamMatching', JSON.stringify(data));
};