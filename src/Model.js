import { LINES, STATIONS } from "./constants/storageKey.js";

const getStateFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setStateToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));

  return data;
};

export default class Model {
  getStations() {
    return getStateFromStorage(STATIONS);
  }

  addStation(name) {
    const prevStations = getStateFromStorage(STATIONS);

    return setStateToStorage(
      STATIONS,
      prevStations ? [...prevStations, name] : [name]
    );
  }

  removeStation(name) {
    const prevStations = getStateFromStorage(STATIONS);

    return setStateToStorage(
      STATIONS,
      prevStations.filter((el) => el !== name)
    );
  }

  getLines() {
    return getStateFromStorage(LINES);
  }

  addLine(name, section) {
    const lines = getStateFromStorage(LINES);

    return setStateToStorage(LINES, { ...lines, [name]: section });
  }

  removeLine(lineName) {
    const lines = getStateFromStorage(LINES);
    delete lines[lineName];

    return setStateToStorage(LINES, lines);
  }

  addSection(line, station, order) {
    const lines = getStateFromStorage(LINES);
    const section = lines[line];
    section.splice(order, 0, station);

    return setStateToStorage(LINES, { ...lines, [line]: section });
  }

  removeSection(line, station) {
    const lines = getStateFromStorage(LINES);

    return setStateToStorage(LINES, {
      ...lines,
      [line]: lines[line].filter((el) => el !== station),
    });
  }
}
