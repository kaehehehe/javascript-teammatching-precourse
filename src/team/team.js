export const renderCourses = `<section>
  <h3>팀 매칭을 관리할 코ㄷ스, 미션을 선택하세요.</h3 >
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
      <button id="select-mission-button" type="button">확인</button>
    </div>
  </section>`;