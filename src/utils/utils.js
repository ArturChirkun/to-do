import moment from "moment";

const date = new Date();
const currentYear = date.getFullYear();
const currentDay = date.getDate();
const currentMonth = moment().format("MMMM");
export const currentDate = `${currentMonth} ${currentDay}, ${currentYear}`;