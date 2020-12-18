import * as message from "./constants/message.js";

export default class Controller {
  constructor(Model, View) {
    this.Model = Model;
    this.View = View;
    this.initialize();
    this.View.clickMenuEventListener();
  }

  initialize() {
    this.View.clickStation = this.clickStation.bind(this);
    this.View.clickLine = this.clickLine.bind(this);
    this.View.clickSection = this.clickSection.bind(this);
    this.View.clickMap = this.clickMap.bind(this);
    this.View.addStation = this.addStation.bind(this);
    this.View.removeStation = this.removeStation.bind(this);
    this.View.putOptionsFromId = this.putOptionsFromId.bind(this);
    this.View.addLine = this.addLine.bind(this);
    this.View.deleteLine = this.deleteLine.bind(this);
    this.View.addSectionEvent = this.addSectionEvent.bind(this);
    this.View.removeSectionEvent = this.removeSectionEvent.bind(this);
  }

  clickStation() {
    this.View.renderStation(this.Model.getStations());
  }

  clickLine() {
    this.View.renderLine(this.Model.getLines());
  }

  clickSection() {
    this.View.renderSection(this.Model.getLines());
  }

  clickMap() {
    this.View.renderMap(this.Model.getLines());
  }

  existStationName(name) {
    const stations = this.Model.getStations();
    if (!stations) {
      return false;
    }
    return stations.indexOf(name) > -1;
  }

  addStation(stationInputValue) {
    if (stationInputValue.length < 2) {
      alert(message.MORE_THAN_2_STATION_NAME);
      return;
    }
    const isExistStationName = this.existStationName(stationInputValue);
    if (isExistStationName) {
      alert(message.ALREADY_EXIST_STATION_NAME);
      return;
    }
    const newStations = this.Model.addStation(stationInputValue);
    this.View.renderStation(newStations);
  }

  removeStation(station) {
    const newStations = this.Model.removeStation(station);
    this.View.renderStation(newStations);
  }

  addLine(lineName, start, end) {
    if (!lineName) {
      alert(message.MUST_INPUT_LINE_NAME);
      return;
    }
    if (this.existLineName(lineName)) {
      alert(message.ALREADY_EXIST_LINE_NAME);
      return;
    }
    if (start === end) {
      alert(message.CANT_SAME_START_AND_END);
      return;
    }
    if (this.existLineSameEndPoints([start, end])) {
      alert(message.ALREAY_EXIST_SAME_END_POINTS);
      return;
    }
    const newLines = this.Model.addLine(lineName, [start, end]);
    this.View.renderLine(newLines);
  }

  deleteLine(line) {
    const newLines = this.Model.removeLine(line);
    this.View.renderLine(newLines);
  }

  existLineName(name) {
    const lines = this.Model.getLines();
    if (!lines) {
      return false;
    }
    return Object.keys(lines).indexOf(name) > -1;
  }

  existLineSameEndPoints([start, end]) {
    const lines = this.Model.getLines();
    if (!lines) {
      return false;
    }
    for (const key in lines) {
      const section = lines[key];
      if (section[0] === start && section.slice(-1)[0] === end) {
        return true;
      }
    }
    return false;
  }

  getStationOptions() {
    const stations = this.Model.getStations();
    if (!stations) {
      return null;
    }
    return stations
      .map((el) => `<option value="${el}">${el}</option>`)
      .join("");
  }

  putOptionsFromId(id) {
    const element = document.getElementById(id);
    element.innerHTML = this.getStationOptions();
  }

  addSectionEvent(line, station, order) {
    const lines = this.Model.getLines();
    const section = lines[line];
    if (section.indexOf(station) > -1) {
      alert(message.ALREADY_EXIST_STATION_IN_LINE);
      return;
    }
    const newLines = this.Model.addSection(line, station, order);
    this.View.renderSectionTable(line, newLines[line]);
  }

  removeSectionEvent(line, station) {
    const lines = this.Model.getLines();
    if (lines[line].length < 3) {
      alert(message.LESS_THAN_2_LINE_SECTION);
      return;
    }
    const newSections = this.Model.removeSection(line, station);
    this.View.renderSectionTable(line, newSections[line]);
  }
}
