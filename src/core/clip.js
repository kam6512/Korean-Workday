"use strict"
const clipboardy = require('clipboardy');

const writeToClip = (source) => {
    clipboardy.writeSync(JSON.stringify(source));
    return source;
}


const readFromClip = (source) => {
    return clipboardy.readSync();
}

module.exports = {
    writeToClip, readFromClip
}