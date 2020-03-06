'use strict';

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const extra = require('fs-extra');

const { getFileAbsPath } = require('../core/resource')
const { rootDir } = require('../core/context')

const keyName = 'key.json';

const getGCalendarKey = async () => {
    let keyPath = path.normalize(keyName);
    if (!fs.existsSync(keyPath)) createKeyFile(keyPath);
    let data = await fsp.readFile(keyPath, 'utf-8');
    return JSON.parse(data);
}

const createKeyFile = (keyPath) => {
    let sourceKeyFile = getFileAbsPath(keyName);
    let destKeyFile = rootDir + keyPath;
    extra.copyFileSync(sourceKeyFile, destKeyFile);
}

module.exports = {
    getGCalendarKey, createKeyFile
}