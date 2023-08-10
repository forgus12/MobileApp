export const getCurrentDate = () => {
  return new Date().toJSON().substring(0, 10);
};

export const transformDate = (localization: 'RU', date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
  const year = newDate.getFullYear();

  switch (localization) {
    case 'RU':
      return `${day}.${month}.${year}`;
    default:
      return date;
  }
};

export const decrementDays = (date: string, decrement: number) => {
  const newDate = new Date(date);
  const prevDate = newDate.setDate(newDate.getDate() - decrement);

  return new Date(prevDate).toJSON().substring(0, 10);
};
