export const parseStringToDate = (str) => {
  if (str) {
    const parts = str.split(".");
    const parsedStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return new Date(parsedStr);
  }
}
