export interface CustomDateTime {
    timestamp: Date;
    year: number;
    month: number;
    monthName: string;
    day: number;
    pretty: string;
  }
  
  export const getDate = (periodStartedAt: number | Date): CustomDateTime => {
    const date = new Date(periodStartedAt);
    return {
      timestamp: date,
      year: date.getFullYear(),
      month: date.getMonth(),
      monthName: date.toLocaleString("default", { month: "short" }),
      day: date.getDate(),
      pretty: getFormattedDate(date)
    };
  };

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}