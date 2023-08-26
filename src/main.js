import * as crew from './crew/crew.js';
import { getLocalStorageData } from './shared/localStorage.js';

const crewTab = document.querySelector('#crew-tab');
const teamTab = document.querySelector('#team-tab');
const crewNameInput = document.querySelector('#crew-name-input');
const addCrewButton = document.querySelector('#add-crew-button');

//TODO: null로 변경해야 함
let currentTab = 'frontend';
let crewName = '';

crewTab.addEventListener('click', () => {
  if (currentTab === 'crew') {
    return;
  }

  currentTab = 'crew';

  const mainTag = document.querySelector('#main');

  mainTag.insertAdjacentHTML('afterbegin', crew.renderCourses);
});

crewNameInput.addEventListener('change', (e) => {
  crewName = e.target.value;
});

addCrewButton.addEventListener('click', () => {
  if (crewName.trim() === '') {
    return;
  }

  const tbody = document.querySelector('#tbody');
  tbody.insertAdjacentHTML('beforeend', crew.addCrew(currentTab, crewName));

  crewName = '';
  crew.resetCrewNameInput();
});


//TODO: 팀 매칭 관리 구현
teamTab.addEventListener('click', () => { });