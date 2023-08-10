export const getCurrentTime = () => {
  return new Date().toLocaleTimeString().substring(0, 5);
};

export const checkCurrentTime = (time: string, currentTime: string) => {
  return (
    time <= currentTime &&
    `${time.slice(0, -2) + (+time.slice(3) + 15)}` > currentTime
  );
};
