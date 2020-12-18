import {
  LINE_CONTENT,
  SECTION_CONTENT,
  STATION_CONTENT,
  SECTION_TABLE_BODY,
  SECTION_MODIFY,
} from "./constants/skeleton.js";
import { addClickEventFromId } from "./utils/index.js";

const DELETE = "삭제";
const DELETE_AT_LINE = "노선에서 제거";

export default class View {
  clickStation = null;
  clickLine = null;
  clickSection = null;
  clickMap = null;
  addStation = null;
  removeStation = null;
  putOptionsFromId = null;
  addLine = null;
  deleteLine = null;
  addSectionEvent = null;
  removeSectionEvent = null;

  clickMenuEventListener() {
    addClickEventFromId("station-manager-button", this.clickStation);
    addClickEventFromId("line-manager-button", this.clickLine);
    addClickEventFromId("section-manager-button", this.clickSection);
    addClickEventFromId("map-print-manager-button", this.clickMap);
  }

  renderStation(stations) {
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = STATION_CONTENT;
    this.renderStationTable(stations);
    addClickEventFromId("station-add-button", () => {
      const stationInputValue = document.getElementById("station-name-input")
        .value;
      this.addStation(stationInputValue);
    });
  }

  renderStationTable(stations) {
    if (!stations) {
      return;
    }
    const stationTableBody = document.getElementById("station-table-body");
    stations.forEach((station) => {
      const tableRow = document.createElement("tr");
      const stationTableData = document.createElement("td");
      const tableSetData = document.createElement("td");
      const stationDeleteButton = document.createElement("button");
      stationTableData.innerText = station;
      stationDeleteButton.setAttribute("class", "station-delete-button");
      stationDeleteButton.dataset.station = station;
      stationDeleteButton.innerText = DELETE;
      stationDeleteButton.onclick = () => this.removeStation(station);
      tableRow.dataset.station = station;
      tableSetData.append(stationDeleteButton);
      tableRow.append(stationTableData, tableSetData);
      stationTableBody.append(tableRow);
    });
  }

  renderLine(lines) {
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = LINE_CONTENT;
    this.renderLineTable(lines);
    this.putOptionsFromId("line-start-station-selector");
    this.putOptionsFromId("line-end-station-selector");
    addClickEventFromId("line-add-button", () => {
      const lineNameValue = document.getElementById("line-name-input").value;
      const startValue = document.getElementById("line-start-station-selector")
        .value;
      const endValue = document.getElementById("line-end-station-selector")
        .value;
      this.addLine(lineNameValue, startValue, endValue);
    });
  }

  renderLineTable(lines) {
    if (!lines) {
      return;
    }
    const lineTableBody = document.getElementById("line-table-body");
    for (const key in lines) {
      const tableRow = document.createElement("tr");
      const nameEl = document.createElement("td");
      const startEl = document.createElement("td");
      const endEl = document.createElement("td");
      const setEl = document.createElement("td");
      const lineDeleteButton = document.createElement("button");
      nameEl.innerText = key;
      startEl.innerText = lines[key][0];
      endEl.innerText = lines[key].slice(-1)[0];
      lineDeleteButton.setAttribute("class", "line-delete-button");
      lineDeleteButton.innerText = DELETE;
      lineDeleteButton.dataset.line = key;
      lineDeleteButton.onclick = () => this.deleteLine(key);
      tableRow.dataset.line = key;
      setEl.append(lineDeleteButton);
      tableRow.append(nameEl, startEl, endEl, setEl);
      lineTableBody.append(tableRow);
    }
  }

  renderLineSelector(lines) {
    if (!lines) {
      return;
    }
    const sectionSelectorContainer = document.getElementById(
      "section-selector-container"
    );
    for (const key in lines) {
      const lineSelectorButton = document.createElement("button");
      lineSelectorButton.setAttribute("class", "section-line-menu-button");
      lineSelectorButton.style.marginRight = "8px";
      lineSelectorButton.onclick = () => {
        this.renderModifySectionContainer(key);
        this.renderSectionTable(key, lines[key]);
      };
      lineSelectorButton.dataset.line = key;
      lineSelectorButton.innerText = key;
      sectionSelectorContainer.appendChild(lineSelectorButton);
    }
  }

  renderSection(lines) {
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = SECTION_CONTENT;
    this.renderLineSelector(lines);
  }

  combineMap(acc, [line, section]) {
    return (
      acc +
      `<h2 data-line=${line}>${line}</h2><ul>${section.reduce(
        (a, c) => a + `<li data-station=${line}-${c}>${c}</li>`,
        ""
      )}</ul>`
    );
  }

  renderMap(lines) {
    const contentEl = document.getElementById("content");
    contentEl.innerHTML = null;
    if (!lines) {
      return;
    }
    const newEl = document.createElement("div");
    newEl.setAttribute("class", "map");
    newEl.innerHTML = Object.entries(lines).reduce(this.combineMap, "");
    contentEl.appendChild(newEl);
  }

  renderModifySectionContainer(lineName) {
    const sectionModifyContainer = document.getElementById(
      "section-modify-container"
    );
    sectionModifyContainer.innerHTML = SECTION_MODIFY;
    const sectionManageTitle = document.getElementById("section-manage-title");
    sectionManageTitle.innerText = `${lineName} 관리`;
    addClickEventFromId("section-add-button", () => {
      const station = document.getElementById("section-station-selector").value;
      const order = document.getElementById("section-order-input").value;
      this.addSectionEvent(lineName, station, order);
    });
    this.putOptionsFromId("section-station-selector");
  }

  resetSectionTable() {
    const sectionTableBody = document.getElementById("section-table-body");
    sectionTableBody.innerHTML = SECTION_TABLE_BODY;
  }

  renderSectionTable(lineName, selectedSection) {
    this.resetSectionTable();
    if (!selectedSection) return;
    const sectionTableBody = document.getElementById("section-table-body");
    selectedSection.forEach((station, i) => {
      const tableRow = document.createElement("tr");
      const orderEl = document.createElement("td");
      const nameEl = document.createElement("td");
      const setEl = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "section-delete-button");
      deleteButton.dataset.section = `${lineName}-${station}`;
      deleteButton.onclick = () => this.removeSectionEvent(lineName, station);
      orderEl.innerText = i;
      nameEl.innerText = station;
      deleteButton.innerText = DELETE_AT_LINE;
      tableRow.dataset.section = `${lineName}-${i}`;
      setEl.append(deleteButton);
      tableRow.append(orderEl, nameEl, setEl);
      sectionTableBody.append(tableRow);
    });
  }
}
