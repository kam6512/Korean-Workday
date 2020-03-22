'use strict';

const path = require('path');

// pkg 로 빌드 시 
const isProduction = (() => {
    if (process.env.NODE_ENV) {
        return process.env.NODE_ENV === 'production';
    }
    return false;
})();

// Dev 모드
const isDevlopment = (() => {
    if (process.env.NODE_ENV) {
        return process.env.NODE_ENV === 'development';
    }
    return true;
})();


// 최상위 경로
const rootDir = (() => {
    let root = global['appRootPath'];
    if (!root) {
        if (isProduction) {
            root = '/';
        } else {
            root = path.join(__dirname, '../../res/');
        }
    } else root += '/';
    return root ? root = path.normalize(root) : __dirname;
})();

module.exports = { isProduction, isDevlopment, rootDir }