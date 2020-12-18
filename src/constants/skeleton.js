export const STATION_CONTENT = `
  <div>역 이름</div>
  <input type="text" id="station-name-input" />
  <button id="station-add-button">역 추가</button>
  <h2>🚉 지하철 역 목록</h2>
  <table id="station-table">
    <tbody id="station-table-body">
      <tr>
        <th>역 이름</th>
        <th>설정</th>
      </tr>
    </tbody>
  </table>
`;

export const LINE_CONTENT = `
  <div>노선 이름</div>
  <input
    type="text"
    placeholder="노선 이름을 입력해주세요"
    id="line-name-input"
  />
  <div id="end-point-container">
    상행 종점
    <select id="line-start-station-selector"></select>
    <br />
    하행 종점
    <select id="line-end-station-selector"></select>
  </div>
  <button id="line-add-button">노선 추가</button>
  <h2>🚉 지하철 노선 목록</h2>
  <table>
    <tbody id="line-table-body">
      <tr>
        <th>노선 이름</th>
        <th>상행 종점역</th>
        <th>하행 종점역</th>
        <th>설정</th>
      </tr> 
    </tbody>
  </table>
`;

export const SECTION_CONTENT = `
  <h2>구간을 수정할 노선을 선택해주세요.</h2>
  <div id="section-selector-container"></div>
  <div id="section-modify-container"></div>
`;

export const SECTION_MODIFY = `
  <h3 id="section-manage-title"></h3>
  <h4>구간 등록</h4>
  <select id="section-station-selector"></select>
  <input type="number" id="section-order-input" />
  <button id="section-add-button">등록</button>
  <table id="section-table">
    <tbody id="section-table-body">
      <tr>
        <th>순서</th>
        <th>이름</th>
        <th>설정</th>
      </tr>
    </tbody>
  </table>
`;

export const SECTION_TABLE_BODY = `
  <tr>
    <th>순서</th>
    <th>이름</th>
    <th>설정</th>
  </tr>
`;
