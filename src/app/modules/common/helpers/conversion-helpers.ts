export const convertFSTimestampToJSDate = (
  firestoreTimestampSeconds: number,
  firestoreTimestampNanoseconds: number,
): Date => {
  return new Date(firestoreTimestampSeconds * 1000 + firestoreTimestampNanoseconds / 1000000);
};

export const convertJSDateToFSTimestamp = (jsDate: Date): { seconds: number; nanoseconds: number } => {
  return {
    seconds: Math.floor(jsDate.getTime() / 1000),
    nanoseconds: jsDate.getMilliseconds() * 1000000,
  };
};
export const getDuration = (startDate: Date, endDate: Date): number => {
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
};

export const getTripPanelMonthDay = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthString = months[date.getMonth()];
  const dayNumber = date.getDate();
  return `${monthString} ${dayNumber}`;
};
