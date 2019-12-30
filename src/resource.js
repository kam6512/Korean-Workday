'use strict';

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;


const resourceDir = (() => {
    let resourcePath
    if (process.env.NODE_ENV === 'development') {
        resourcePath = path.join(__dirname, '../res/');
    } else {
        resourcePath = path.join(__dirname, '');
    }
    return resourcePath = path.normalize(resourcePath);
})();

const isJsonFileExist = async (fileName) => {
    let filePath = path.join(resourceDir, fileName);
    return fs.existsSync(filePath);
}

const readJsonData = async (fileName) => {
    let filePath = path.join(resourceDir, fileName);
    let data
    if (await isJsonFileExist(fileName)) {
        data = await fsp.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } else return Promise.resolve([]);
    
}


// JSON 파일로 캘린더 정보를 저장
const writeJsonData = async (fileName, data) => {
    let filePath = path.join(resourceDir, fileName);
    await fsp.writeFile(filePath, JSON.stringify(data), 'utf8');
}

module.exports = {
    isJsonFileExist, readJsonData, writeJsonData
}