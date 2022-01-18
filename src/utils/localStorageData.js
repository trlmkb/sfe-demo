import { localStorageKey } from "./constants";

export const checkLocalStorage = (savedDataArray, dataObject, setIconState) => {
  const localStorageData = JSON.parse(localStorage.getItem(localStorageKey));
  const savedData = localStorageData[savedDataArray];
  const storyIsSaved = savedData.find((data) => {
    return data.id === dataObject.id;
  });
  setIconState(!!storyIsSaved);
};

export const addLocalStorage = (savedDataArray, dataObject) => {
  const localStorageData = JSON.parse(localStorage.getItem(localStorageKey));
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({
      ...localStorageData,
      [savedDataArray]: [...localStorageData[savedDataArray], dataObject],
    })
  );
};

export const removeLocalStorage = (savedDataArray, dataObject) => {
  const localStorageData = JSON.parse(localStorage.getItem(localStorageKey));
  const filteredLocalStorageData = localStorageData[savedDataArray].filter(
    (data) => data.id !== dataObject.id
  );
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({
      ...localStorageData,
      [savedDataArray]: filteredLocalStorageData,
    })
  );
};
