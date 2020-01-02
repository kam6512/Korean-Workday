'use strict';

const workday = require('./src/workday');
const moment = require('./src/moment');
const fs = require('fs');
const path = require('path');

let date
if (process.argv[2] && typeof process.argv[2] === 'string') {
    date = moment(process.argv[2]);
} else {
    date = moment();
}

workday.get(date).then((res) => {
    console.info(res);
})

