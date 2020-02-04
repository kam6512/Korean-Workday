'use strict';

const ctx = require('./context');
const path = require('path');

const fs = require('fs');
const fsp = fs.promises;

const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

const rootDir = (() => {
    let root = global['appRootPath'];
    if (!root) {
        if (ctx.isProduction) {
            root = path.join('', '/');
        } else {
            root = path.join(__dirname, '../res/');
        }
    } else root += '/';
    return root ? root = path.normalize(root) : __dirname;
})();

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
    await fsp.writeFile(filePath, JSON.stringify(data), 'utf8');
}

const getGCalendarKey = async () => {
    let keyPath = './calendarKey.json';
    if (!fs.existsSync(keyPath)) await createKeyFile(keyPath);
    let data = await fsp.readFile(keyPath, 'utf-8');
    console.log(data)
    return JSON.parse(data);
}

const createKeyFile = async keyPath => {
    //create keyFile in root
    let defKeyFile = getFileAbsPath('keyFile.json');
    await pipeline(fs.createReadStream(defKeyFile)
        .pipe(fs.createWriteStream(rootDir + keyPath)));
}

module.exports = {
    isJsonFileExist, readJsonData, writeJsonData, getGCalendarKey
}
