'use strict';

const workday = require('./workday');
const moment = require('./moment');

let date
if (process.argv[2] && typeof process.argv[2] === 'string') {
    date = moment(process.argv[2]);
} else {
    date = moment();
}
workday.get(date).then((res) => {
    console.log(res);
})

