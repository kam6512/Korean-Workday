'use strict';

const ctx = require('./context');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

const rootDir = (() => {
    let root = global['appRootPath'];
    if (!root) {
        if (ctx.isProduction) {
            root = path.join('', './res/');
        } else {
            // developer
            root = path.join(__dirname, '../res/');
        }
        root = path.normalize(root);
    }
    return root ? root : __dirname;
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
    console.log(absPath);
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

module.exports = {
    isJsonFileExist, readJsonData, writeJsonData
}
