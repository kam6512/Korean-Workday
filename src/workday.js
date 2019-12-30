'use strict';

const holiday = require('./holiday');
const moment = require('./moment');

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

holiday().then((result) => {
    this.holidayList = result;
    let date = moment('2019-12-31');
    if (date.isValid()) {
        console.log('isWorkday : ' + isWorkday(date));
        console.log('isHoliday : ' + isHoliday(date));
        console.log('workDayOfYear : ' + workDayOfYear(date));
        console.log('workWeekOfYear : ' + workWeekOfYear(date));
        console.log('workDayOfMonth : ' + workDayOfMonth(date));
        console.log('workDayOfWeek : ' + workDayOfWeek(date));
    } else {
        console.log(date)
    }
})




