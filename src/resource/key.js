"use strict"

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const extra = require('fs-extra');

const { rootDir } = require('../core/context')

const getGCalendarKey = async () => {
    let keyPath = path.normalize('calendarKey.json');
    if (!fs.existsSync(keyPath)) createKeyFile(keyPath);
    let data = await fsp.readFile(keyPath, 'utf-8');
    return JSON.parse(data);
}

const createKeyFile = (keyPath) => {
    let sourceKeyFile = getFileAbsPath('keyFile.json');
    let destKeyFile = rootDir + keyPath;
    extra.copyFileSync(sourceKeyFile, destKeyFile);
}

module.exports = {
    getGCalendarKey, createKeyFile
}