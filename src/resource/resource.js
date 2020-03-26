'use strict';

const { rootDir } = require('../core/context');
const path = require('path');

const fs = require('fs');
const fsp = fs.promises;

const resourceDir = (() => {
    let resourcePath = path.join(rootDir, './res/');
    return resourcePath = path.normalize(resourcePath);
})();

const getFileAbsPath = (fileName) => {
    let absPath
    if (path.isAbsolute(fileName)) {
        absPath = fileName;
    } else {
        absPath = path.join(resourceDir, fileName);
    }
    return path.normalize(absPath);
}

const isJsonFileExist = async (fileName) => {
    let filePath = getFileAbsPath(fileName);
    return fs.existsSync(filePath);
}

const readJsonData = async (fileName) => {
    let filePath = getFileAbsPath(fileName);
    if (await isJsonFileExist(fileName)) {
        let data = await fsp.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } else {
        return Promise.resolve([]);
    }
}

const writeJsonData = async (fileName, data) => {
    let filePath = getFileAbsPath(fileName);
    await fsp.writeFile(filePath, JSON.stringify(data), 'utf-8');
}

module.exports = {
    isJsonFileExist, readJsonData, writeJsonData, getFileAbsPath
}
