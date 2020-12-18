export const addClickEventFromId = (id, event) => {
  const element = document.getElementById(id);
  element.addEventListener("click", event);
};
