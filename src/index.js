'use strict';

const workday = require('./workday').get;
const moment = require('./moment');

console.dir(process.argv);
if (process.argv[2] && typeof process.argv[2] === 'string') {
    let date = moment(process.argv[2]);
    console.log(date.isValid());
} else {
    console.log(moment());
}

