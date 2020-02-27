'use strict';

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const extra = require('fs-extra');

const { rootDir } = require('../core/context')


const isKeyExist = () =>{
    let keyPath = path.normalize('calendarKey.json');
    return fs.existsSync(keyPath);
}

const getGCalendarKey = async () => {
    if (!isKeyExist()) createKeyFile(keyPath);
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