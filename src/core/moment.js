'use strict';

const moment = require('moment');
moment.locale('kr');

const invalidErrorMessage = '전달받은 DATETIME 값이 유효하지 않습니다.';

const createMoment = (date) => {
    if (date === undefined) {
        return moment();
    }
    if (date instanceof moment) {
        if (date.isValid()) {
            return date.clone();
        } else throw (new Error(invalidErrorMessage));
    }
    if (typeof date === 'string') {
        let now = moment(date);
        if (now.isValid()) {
            return now;
        } else throw (new Error(`${invalidErrorMessage} [${date}]`));
    }
    return moment();
};

module.exports = createMoment;