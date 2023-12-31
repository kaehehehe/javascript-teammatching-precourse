import { getCrews, getCrewsCount } from '../crew/crew.js';
import { renderCourseName } from '../shared/renderCourseName.js';
import { removeElement } from '../shared/resetDom.js';


export const renderMissionName = (mission) => {
  switch (mission) {
    case 'baseball':
      return '숫자 야구 게임';
    case 'racingcar':
      return '자동차 경주';
    case 'lotto':
      return '로또';
    case 'shopping-cart':
      return '장바구니';
    case 'payments':
      return '결제';
    case 'subway':
      return '지하철노선도';
    case 'performance':
      return '성능개선';
    case 'deploy':
      return '배포';
  }
};

export const renderSelectBox = () => {
  const mainTag = document.querySelector('#main');

  const section = `
    <section>
      <h3>팀 매칭을 관리할 코스, 미션을 선택하세요.</h3>
      <form>
        <select id="course-select">
          <option value="frontend">프론트엔드</option>
          <option value="backend">백엔드</option>
        </select>
        <select id="mission-select">
          <option value="baseball">숫자야구게임</option>
          <option value="racingcar">자동차경주</option>
          <option value="lotto">로또</option>
          <option value="shopping-cart">장바구니</option>
          <option value="payments">결제</option>
          <option value="subway">지하철노선도</option>
          <option value="performance">성능개선</option>
          <option value="deploy">배포</option>
        </select>
        <button id="show-team-matcher-button" type="button">확인</button>
      </form>
    </section>
  `;  

  mainTag.insertAdjacentHTML('beforeend', section);

  clickConfirmButton();
};

const clickConfirmButton = () => {
  const matcherButton = document.getElementById('show-team-matcher-button');

  matcherButton.addEventListener('click', () => {

    const teamSection = document.getElementById('team-section');
    removeElement(teamSection);

    const selectCourse = document.getElementById('course-select');
    const selectMission = document.getElementById('mission-select');

    renderDefaultMatchingSection(selectCourse.value, selectMission.value);
  });
};

const findCrewName = (course, index) => {
  const crews = getCrews(course);

  return crews[index].name;
};

//=============
let teamMemberCount = null;
//=============

const teamMatching = (course) => {
  const crewsCount = getCrewsCount(course);

  const teams = [];

  const indexArray = Array.from({ length: crewsCount }, (_, idx) => idx);

  MissionUtils.Random.shuffle(indexArray);

  while (indexArray.length > 0) {
    const team = indexArray.splice(0, teamMemberCount);

    let teamMember = [];

    for (let i of team) {
      teamMember.push(findCrewName(course, i));
    }
    teams.push(teamMember.toString());
  }

  return teams;
};


const clickMatchTeamButton = (course, mission) => {
  const matchTeamButton = document.getElementById('match-team-button');

  matchTeamButton.addEventListener('click', () => {
    const teamMemberCountInput = document.getElementById('team-member-count-input');
    teamMemberCount = teamMemberCountInput.value;

    const teams = teamMatching(course);

    renderResultSection(course, mission, teams);
  });
};


const clickRematchTeamButton = (course, mission) => {
  const rematchTeamButton = document.getElementById('rematch-team-button');

  rematchTeamButton.addEventListener('click', () => {
    const teams = teamMatching(course);
    renderResultSection(course, mission, teams);
  });
}

const renderResultSection = (course, mission, teams) => {
  const section = document.getElementById('team-section');

  removeElement(section);

  const elements = `
  <h3>${renderCourseName(course)} ${renderMissionName(mission)}게임 조회</h3>
    <p>팀이 매칭되었습니다.</p>
    <ul id="team-match-result">
    </ul>
    <p>
      팀을 재매칭 하시겠습니까?
      <button id="rematch-team-button">재매칭</button>
    </p>
  `;

  section.insertAdjacentHTML('beforeend', elements);

  const teamMatchResult = document.getElementById('team-match-result');

  const teamList = teams.reduce((prev, member) => prev + `<li>${member}</li>`, '');

  teamMatchResult.insertAdjacentHTML('beforeend', teamList);

  clickRematchTeamButton(course, mission);
};


const renderDefaultMatchingSection = (course, mission) => {
  const section = document.querySelector('#team-section');

  const elements = `
      <h3>${renderCourseName(course)} ${renderMissionName(mission)} 미션의 팀 매칭</h3>
      <div>
        <div>
          <p>아직 매칭된 팀이 없습니다. 팀을 매칭하겠습니까?</p>
          <form>
            <label>1팀당 인원 수</label>
            <input
              id="team-member-count-input"
              type="number"
              min="1"
              max=${getCrewsCount(course)}
              value="1"
              />
            <button id="match-team-button" type="button">팀 매칭</button>
          </form>
        </div>
        <h4>크루 목록</h4>
        <ul id="crew-list">
        </ul>
      </div>
  `;

  section.insertAdjacentHTML('beforeend', elements);

  const ul = document.getElementById('crew-list');
  const crews = getCrews(course);

  const crewList = crews.reduce((prev, crew) => prev + `<li>${crew.name}</li>`, '');

  ul.insertAdjacentHTML('beforeend', crewList);

  clickMatchTeamButton(course, mission);
};
