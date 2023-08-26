import * as crew from './crew/crew.js';

const crewTab = document.querySelector('#crew-tab');
const teamTab = document.querySelector('#team-tab');

let currentTab = null;

crewTab.addEventListener('click', () => {
  if (currentTab === 'crew') {
    return;
  }

  currentTab = 'crew';

  const mainTag = document.querySelector('#main');

  mainTag.insertAdjacentHTML('afterbegin', crew.renderCourses);
});

//TODO: 팀 매칭 관리 구현
teamTab.addEventListener('click', () => { });