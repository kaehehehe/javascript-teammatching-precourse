const crewNameInput = document.querySelector('#crew-name-input');

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

export const renderCrew = (crewName) => {
  return `
  <tr>
    <td>1</td>
    <td>${crewName}</td>
    <td>
      <button class="delete-crew-button">삭제</button>
    </td>
  </tr>`;
};

export const resetCrewNameInput = () => {
  crewNameInput.value = '';
};
