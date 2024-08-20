const emptyInputChecker = (toCheck) => {
  for (let value of toCheck) {
    if (value.trim() === "") {
      return true;
    }
  }
  return false;
};

export default emptyInputChecker;
