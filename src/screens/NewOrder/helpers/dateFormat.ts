export const getCurrentDate = () => {
  return new Date().toJSON().substring(0, 10);
};

export const getDay = (date: string) => {
  return new Date(date).getUTCDate();
};

export const comparisonOfDays = (date1: string, date2: string) => {
  return Date.parse(date1) === Date.parse(date2);
};
