const formatOne = (value: number) => {
  return value.toString().padStart(2, "0");
};

export const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 100);
  const minutes = Math.floor(seconds / 60);

  const formattedMinutes = formatOne(minutes);
  const formattedSeconds = formatOne(seconds - minutes * 60);
  const formattedMilliseconds = formatOne(milliseconds - seconds * 100);

  return `${formattedMinutes} : ${formattedSeconds} : ${formattedMilliseconds}`;
};
