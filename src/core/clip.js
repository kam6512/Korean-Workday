"use strict"
const clipboardy = require('clipboardy');

const writeToClip = (source) => {
    clipboardy.writeSync(JSON.stringify(source));
    return source;
}

module.exports = {
    writeToClip
}