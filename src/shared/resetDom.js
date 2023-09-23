export const removeElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};