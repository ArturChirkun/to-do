const storage = window.localStorage;

export const preTheme = () => {
  const isExist = JSON.parse(storage.getItem("theme"))
    ? JSON.parse(storage.getItem("theme"))
    : storage.setItem("theme", JSON.stringify("dark"));

  return isExist;
};

export const switchTheme = () => {
  const theme = JSON.parse(storage.getItem("theme"));
  const newTheme = theme === "dark" ? "light" : "dark";
  storage.setItem("theme", JSON.stringify(newTheme));
  return JSON.parse(storage.getItem("theme"));
};

export const getTasksFromLocalStorage = () => {
  return JSON.parse(storage.getItem("tasks"))
    ? JSON.parse(storage.getItem("tasks"))
    : [];
};

export const setTasksInLocalStorage = (tasks) => {
  storage.setItem("tasks", JSON.stringify(tasks));
};
