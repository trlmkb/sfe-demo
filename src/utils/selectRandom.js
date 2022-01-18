export const selectRandom = (setOfElements, number) => {
  if (setOfElements.length < number) return;
  const randomElements = [];
  for (let i = 0; i < number; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * setOfElements.length);
    } while (randomElements.includes(setOfElements[randomIndex]));

    randomElements.push(setOfElements[randomIndex]);
  }
  return randomElements;
};
