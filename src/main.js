import * as crew from './crew/crew.js';
import { getLocalStorageData } from './shared/localStorage.js';

const crewTab = document.querySelector('#crew-tab');
const teamTab = document.querySelector('#team-tab');
const crewNameInput = document.querySelector('#crew-name-input');
const addCrewButton = document.querySelector('#add-crew-button');

let currentTab = null;
let currentCourse = 'frontend';
let crewName = '';

crewTab.addEventListener('click', () => {
  if (currentTab === 'crew') {
    return;
  }

  currentTab = 'crew';

  const mainTag = document.querySelector('#main');

  mainTag.insertAdjacentHTML('afterbegin', crew.renderCourses);

  //TODO: radio 버튼을 눌렀을 시 보이도록 수정해야 함
  crew.renderCrews(crew.getFrontendCrews());
});

crewNameInput.addEventListener('change', (e) => {
  crewName = e.target.value;
});

addCrewButton.addEventListener('click', () => {
  if (crewName.trim() === '') {
    return;
  }

  const tbody = document.querySelector('#tbody');
  tbody.insertAdjacentHTML('beforeend', crew.addCrew(currentCourse, crewName));

  crewName = '';
  crew.resetCrewNameInput();
});


//TODO: 팀 매칭 관리 구현
teamTab.addEventListener('click', () => { });