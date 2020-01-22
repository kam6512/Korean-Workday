'use strict';

const ctx = require('./context');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

const rootDir = (() => {
    let root = global['appRootPath'];
    if (!root) {
        if (ctx.isProduction) {
            root = path.join('', '/');
        } else {
            // developer
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


// JSON 파일로 캘린더 정보를 저장
const writeJsonData = async (fileName, data) => {
    let filePath = getFileAbsPath(fileName);
    await fsp.writeFile(filePath, JSON.stringify(data), 'utf8');
}

const getGCalendarKey = async () => {
    let keyPath = getFileAbsPath('original_calendarKey.json');
    if (await isJsonFileExist(keyPath)) {
        let data = await fsp.readFile(keyPath, 'utf-8');
        return JSON.parse(data);
    } else {
        await createKeyFile();
        return Promise.resolve([]);
    }
}

const createKeyFile = async (keyFile) => {
    //create keyFile in root
    let defKeyFile = getFileAbsPath('keyFile.json');
    fs.createReadStream(defKeyFile).pipe(fs.createWriteStream(rootDir + './calendarKey.json'))
}

module.exports = {
    isJsonFileExist, readJsonData, writeJsonData, getGCalendarKey
}
