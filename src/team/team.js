import { renderCourseName } from '../shared/renderCourseName.js';
import { removeElement } from '../shared/resetDom.js';

export const renderMissionName = (mission) => {
  switch (mission) {
    case 'baseball-game':
      return '숫자 야구 게임';
  }
};

export const renderSelectBox = () => {
  const mainTag = document.querySelector('#main');

  const section = `<section>
  <h3>팀 매칭을 관리할 코스, 미션을 선택하세요.</h3>
    <div>
      <select id="select-course" name="course">
        <option value="frontend">
          프론트엔드
        </option>
        <option value="backend">
          백엔드
        </option>
      </select>
      <select id="select-mission" name="mission">
        <option value="baseball-game">
          숫자 야구 게임
        </option>
      </select>
      <button id="select-mission-button" type="button">확인</button>
    </div>
  </section>`;

  mainTag.insertAdjacentHTML('beforeend', section);

  clickConfirmButton();
};

const clickConfirmButton = () => {
  const confirmButton = document.getElementById('select-mission-button');

  confirmButton.addEventListener('click', () => {

    const teamSection = document.getElementById('team-section');
    removeElement(teamSection);

    const selectCourse = document.getElementById('select-course');
    const selectMission = document.getElementById('select-mission');
    renderDefaultMatchingSection(selectCourse.value, selectMission.value);
  });
};

const renderDefaultMatchingSection = (course, mission) => {
  const section = document.querySelector('#team-section');

  const elements = `
    <h3>${renderCourseName(course)} ${renderMissionName(mission)} 미션의 팀 매칭</h3>
    <p>아직 매칭된 팀이 없습니다. 팀을 매칭하겠습니까?</p>
      <form>
        <label>1팀당 인원 수</label>
        <input type="number"/>
        <button type="button">팀 매칭</button>
        <ul id="crew-list">크루 목록</ul>
      </form>
  `;

  section.insertAdjacentHTML('beforeend', elements);
};
