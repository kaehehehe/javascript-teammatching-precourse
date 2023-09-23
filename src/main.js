import * as crew from './crew/crew.js';
import { removeElement } from './shared/resetDom.js';
import * as team from './team/team.js';

const crewTab = document.querySelector('#crew-tab');
const teamTab = document.querySelector('#team-tab');

let currentTab = null;
let currentCourse = null;
let crewName = '';

crewTab.addEventListener('click', () => {
  if (currentTab === 'crew') {
    return;
  }

  currentTab = 'crew';

  const mainTag = document.querySelector('#main');

  removeElement(mainTag);

  crew.renderCourses();
  crew.setCrewSection();
  crew.changeCourse(currentCourse, crewName);
});



//TODO: 팀 매칭 관리 구현
teamTab.addEventListener('click', () => {
  if (currentTab === 'team') {
    return;
  }

  currentTab = 'team';

  const mainTag = document.querySelector('#main');

  removeElement(mainTag); 

  team.renderSelectBox();

  const section = `<section id="team-section"></section>`;
  mainTag.insertAdjacentHTML('beforeend', section);
});

// console.log(MissionUtils.Random.pickNumberInList([1, 2, 3]));