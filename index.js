'use strict';

global.appRootPath = __dirname;

const clip = require('./src/core/clip');
const workday = require('./src/workday.js');
const moment = require('./src/core/moment.js');

let date
if (process.argv[2] && typeof process.argv[2] === 'string') {
    date = moment(process.argv[2]);
} else {
    date = moment();
}

workday.get(date).then((res) => {
    console.info(res);
    clip.writeToClip(JSON.stringify(res));
})