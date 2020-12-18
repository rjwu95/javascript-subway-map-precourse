import { LINES, STATIONS } from "./constants/storageKey.js";

const getStateFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setStateToStorage = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export default class Model {
  getStations() {
    return getStateFromStorage(STATIONS);
  }

  addStation(name) {
    const prevStations = getStateFromStorage(STATIONS);
    const newStations = prevStations ? [...prevStations, name] : [name];
    setStateToStorage(STATIONS, newStations);

    return newStations;
  }

  removeStation(name) {
    const prevStations = getStateFromStorage(STATIONS);
    const newStations = prevStations.filter((el) => el !== name);
    setStateToStorage(STATIONS, newStations);

    return newStations;
  }

  getLines() {
    return getStateFromStorage(LINES);
  }

  addLine(name, section) {
    const lines = getStateFromStorage(LINES);
    const newLines = { ...lines, [name]: section };
    setStateToStorage(LINES, newLines);

    return newLines;
  }

  removeLine(lineName) {
    const lines = getStateFromStorage(LINES);
    delete lines[lineName];
    setStateToStorage(LINES, lines);

    return lines;
  }

  addSection(line, station, order) {
    const lines = getStateFromStorage(LINES);
    const section = lines[line];
    section.splice(order, 0, station);
    const newLines = { ...lines, [line]: section };
    setStateToStorage(LINES, newLines);

    return newLines;
  }

  removeSection(line, station) {
    const lines = getStateFromStorage(LINES);
    const newLines = {
      ...lines,
      [line]: lines[line].filter((el) => el !== station),
    };
    setStateToStorage(LINES, newLines);

    return newLines;
  }
}
