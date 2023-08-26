import { getLocalStorageData, setLocalStorageData } from '../shared/localStorage.js';

const crewNameInput = document.querySelector('#crew-name-input');

export const getFrontendCrews = () => {
  const crews = getLocalStorageData();

  return crews.frontend;
};

export const getBackendCrews = () => {
  const crews = getLocalStorageData();

  return crews.backend;
};

export const setFrontendCrew = (newCrew) => {
  const crews = getLocalStorageData();

  const updateCrews = {
    ...crews,
    frontend: [
      ...crews.frontend,
      newCrew
    ]
  };

  setLocalStorageData(updateCrews);
};

export const setBackendCrew = (newCrew) => {
  const crews = getLocalStorageData();

  const updateCrews = {
    ...crews,
    backend: [
      ...crews.backend,
      newCrew
    ]
  };

  setLocalStorageData(updateCrews);
};

export const frontendCrewCount = () => {
  return getFrontendCrews().length;
};

export const backendCrewCount = () => {
  return getBackendCrews().length;
};

export const renderCourses = `<section>
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

export const addCrew = (course, crewName) => {
  const id = Date.now();

  switch (course) {
    case 'frontend':
      setFrontendCrew({
        id,
        name: crewName,
      });
    case 'backend':
      setBackendCrew({
        id,
        name: crewName,
      });
  }

  return `
  <tr>
    <td>${course === 'frontend' ? frontendCrewCount() : backendCrewCount()}</td>
    <td>${crewName}</td>
    <td>
      <button class="delete-crew-button">삭제</button>
    </td>
  </tr>`;
};

export const renderCrews = (crews) => {
  crews.forEach(({ name }, index) => {
    const crew = `
  <tr>
    <td>${index + 1}</td>
    <td>${name}</td>
    <td>
      <button class="delete-crew-button">삭제</button>
    </td>
  </tr>`;

    const tbody = document.querySelector('#tbody');
    tbody.insertAdjacentHTML('beforeend', crew);
  });
};

export const resetCrewNameInput = () => {
  crewNameInput.value = '';
};
