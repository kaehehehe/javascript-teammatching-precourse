import { getLocalStorageData, setLocalStorageData } from '../shared/localStorage.js';
import { removeElement } from '../shared/resetDom.js';

export const renderCrews = (crews) => {
  crews.forEach(({ name, id }, index) => {
    const crew = `
  <tr id=${id}>
    <td>${index + 1}</td>
    <td>${name}</td>
    <td>
      <button class="delete-crew-button" data-id=${id}>삭제</button>
    </td>
  </tr>`;

    const tbody = document.querySelector('#tbody');
    tbody.insertAdjacentHTML('beforeend', crew);
  });
};

const renderCourseName = (course) => {
  switch (course) {
    case 'frontend':
      return '프론트엔드';
    case 'backend':
      return '백엔드';
    default:
      break;
  }
};

export const setCrewSection = () => {
  const mainTag = document.querySelector('#main');

  const crewManagementSection = `
  <section id="crew-management-section"></section>
  `;
  mainTag.insertAdjacentHTML('beforeend', crewManagementSection);

  const crewTableListSection = `
  <section id="crew-table-list-section"></section>
  `;
  mainTag.insertAdjacentHTML('beforeend', crewTableListSection);
};

export const renderCrewManagementSection = (course) => {
  const sectionTag = document.querySelector('#crew-management-section');

  const element = `
  <h3>${renderCourseName(course)} 크루 관리</h3>
  <form>
    <label>크루 이름</label>
    <input id="crew-name-input" type="text"/>
    <button id="add-crew-button" type="button">확인</button>
  </form>
  `;

  sectionTag.insertAdjacentHTML('beforeend', element);
};

export const renderCrewList = (course) => {
  const sectionTag = document.querySelector('#crew-table-list-section');

  const element = `
  <h3>${renderCourseName(course)} 크루 목록</h3>
  <table id="crew-table" border="1">
    <thead>
      <tr>
        <th></th>
        <th>크루</th>
        <th>관리</th>
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
  </table>
  `;

  sectionTag.insertAdjacentHTML('beforeend', element);
};

export const getCrews = (course) => {
  const crews = getLocalStorageData();

  switch (course) {
    case 'frontend':
      return crews.frontend;
    case 'backend':
      return crews.backend;

    default:
      break;
  }
};

export const setNewCrew = (course, newCrew) => {
  const crews = getLocalStorageData();
  let updateCrews = {};

  switch (course) {
    case 'frontend':
      updateCrews = {
        ...crews,
        frontend: [
          ...crews.frontend,
          newCrew
        ]
      };
      break;
    case 'backend':
      updateCrews = {
        ...crews,
        backend: [
          ...crews.backend,
          newCrew
        ]
      };
      break;
  }
  setLocalStorageData(updateCrews);
};

export const frontendCrewCount = () => {
  return getCrews('frontend').length;
};

export const backendCrewCount = () => {
  return getCrews('backend').length;
};

export const renderCourses = () => {
  const mainTag = document.querySelector('#main');

  const section = `<section>
    <h3> 크루를 관리할 코스를 선택해주세요</h3 >
      <div>
        <input
          id="frontend-course"
          type="radio"
          name="course"
          value="frontend"
        />
        <label for="frontend">프론트엔드</label>
        <input
          id="backend-course"
          type="radio"
          name="course"
          value="backend"
        />
        <label for="backend">백엔드</label>
      </div>
    </section>`;

  mainTag.insertAdjacentHTML('beforeend', section);
};

export const updateCrewTable = (course, crewName) => {
  const id = String(Date.now());
  const newCrew = { id, name: crewName };

  setNewCrew(course, newCrew);

  const tr = `
  <tr id=${id}>
    <td>${course === 'frontend' ? frontendCrewCount() : backendCrewCount()}</td>
    <td>${crewName}</td>
    <td>
      <button class="delete-crew-button" data-id=${id}>삭제</button>
    </td>
  </tr>`;

  const tbody = document.querySelector('#tbody');
  tbody.insertAdjacentHTML('beforeend', tr);
};

export const resetCrewNameInput = () => {
  const crewNameInput = document.querySelector('#crew-name-input');

  crewNameInput.value = null;
};

export const changeCrewNameInput = () => {
  const crewNameInput = document.querySelector('#crew-name-input');

  crewNameInput.addEventListener('change', (e) => {
    return e.target.value;
  });
};


export const addCrew = (currentCourse) => {
  const addCrewButton = document.querySelector('#add-crew-button');
  const crewNameInput = document.querySelector('#crew-name-input');

  addCrewButton.addEventListener('click', () => {
    const crewName = crewNameInput.value;

    if (crewName.trim() === '') {
      return;
    }

    updateCrewTable(currentCourse, crewName);
    resetCrewNameInput();
  });
};

export const updateLocalStorageData = (course, updateCrews) => {
  const crews = getLocalStorageData();

  switch (course) {
    case 'frontend':
      localStorage.setItem('teamMatching', JSON.stringify({
        ...crews,
        'frontend': updateCrews,
      }));
      break;
    case 'backend':
      localStorage.setItem('teamMatching', JSON.stringify({
        ...crews,
        'backend': updateCrews,
      }));
      break;
  }
};


export const deleteCrew = (course) => {
  const crewTbody = document.querySelector('#tbody');

  crewTbody.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    const crews = getCrews(course);

    if (confirm('정말로 삭제하시겠습니까?')) {
      const updateCrews = crews.filter(crew => crew.id !== id);
      updateLocalStorageData(course, updateCrews);

      const tr = document.getElementById(id);
      tr.remove();
    }
  });
};


export const changeCourse = (currentCourse, crewName) => {
  const radioInput = document.querySelectorAll('input[type="radio"]');

  radioInput.forEach((element) => {
    element.addEventListener('change', (e) => {
      const course = e.target.value;

      if (currentCourse == course) {
        return;
      }

      currentCourse = course;

      const managementSectionTag = document.querySelector('#crew-management-section');
      const tableListSectionTag = document.querySelector('#crew-table-list-section');
      const crews = getCrews(course);

      removeElement(managementSectionTag);
      removeElement(tableListSectionTag);

      renderCrewManagementSection(course);
      renderCrewList(course);
      renderCrews(crews);

      changeCrewNameInput(crewName);
      addCrew(currentCourse, crewName);
      deleteCrew(currentCourse);
    });
  });
};
