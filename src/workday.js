'use strict';

const holiday = require('./holiday');
const moment = require('./core/moment');

const isWorkday = (date) => {
    date = moment(date);
    if (date.day() % 6 === 0 || isHoliday(date)) return false;
    else return true;
}

const isHoliday = (date) => {
    date = moment(date);
    for (let holiday of this.holidayList) {
        if (date.isSame(holiday['eventDate'])) return true;
    };
    return false;
}

const workWeekOfYear = (date) => {
    date = moment(date);
    let weekOfYear = date.week();
    if (weekOfYear === 1 && date.month() === 11) { // ISO 기준 외 53주 계산 시
        weekOfYear = date.subtract(1, 'week').week() + 1;
    }
    return weekOfYear;
}
const workWeekOfYearISO = (date) => {
    date = moment(date);
    let weekOfYear = date.week();
    return weekOfYear;
}

const workDayOfYear = (date) => {
    date = moment(date);
    return workdayDiff(date, date.dayOfYear())
}

const workDayOfMonth = (date) => {
    date = moment(date);
    return workdayDiff(date, date.date())
}

const workDayOfWeek = (date) => {
    date = moment(date);
    return workdayDiff(date, date.day())
}

const workdayDiff = (date, days) => {
    let countDay = 0;
    for (let i = 0; i < days; i++) {
        date.subtract(i === 0 ? 0 : 1, 'days');
        if (isWorkday(date))++countDay
    }
    return countDay;
}

const getWorkDay = async (source) => {
    this.holidayList = await holiday();
    let date = moment(source).startOf('day');
    if (date.isValid()) {
        let full = {
            date: date.format('YYYYMMDD'),
            isWorkday: isWorkday(date),
            isHoliday: isHoliday(date),
            workDayOfYear: workDayOfYear(date),
            workWeekOfYear: workWeekOfYear(date),
            workDayOfMonth: workDayOfMonth(date),
            workDayOfWeek: workDayOfWeek(date)
        };
        return {
            status: "success",
            full,
            onlyValue: `${full.date},${full.isWorkday},${full.isHoliday},${full.workDayOfYear},${full.workWeekOfYear},${full.workDayOfMonth},${full.workDayOfWeek}`
        }
    } else {
        return {
            status: "fail",
            full: {},
            onlyValue: ""
        };
    }
}

module.exports.get = getWorkDay;