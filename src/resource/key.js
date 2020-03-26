'use strict';

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const extra = require('fs-extra');

const { getFileAbsPath } = require('./resource')
const { rootDir } = require('../core/context')

const keyName = 'key.json';
const keyPath = path.normalize(keyName);

const getGCalendarKey = async () => {
    if (!isKeyFileExist()) createKeyFile(keyPath);
    let data = await fsp.readFile(keyPath, 'utf-8');
    return JSON.parse(data);
}

const createKeyFile = () => {
    let sourceKeyFile = getFileAbsPath(keyName);
    let destKeyFile = rootDir + keyPath;
    extra.copyFileSync(sourceKeyFile, destKeyFile);
}

const isKeyFileExist = () => {
    return fs.existsSync(keyPath);
}

module.exports = {
    getGCalendarKey, createKeyFile, isKeyFileExist
}