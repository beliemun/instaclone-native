import moment from "moment";
import "moment/locale/ko";

const year = (timeStamp: number) => new Date(timeStamp).getFullYear();
const month = (timeStamp: number) => new Date(timeStamp).getMonth();
const date = (timeStamp: number) => new Date(timeStamp).getDate();
const hours = (timeStamp: number) => new Date(timeStamp).getHours();
const minute = (timeStamp: number) => new Date(timeStamp).getMinutes();
const second = (timeStamp: number) => new Date(timeStamp).getSeconds();

export const getMomentFromNow = (timeStamp: number) =>
  moment([
    year(timeStamp),
    month(timeStamp),
    date(timeStamp),
    hours(timeStamp),
    minute(timeStamp),
    second(timeStamp),
  ]).fromNow();
