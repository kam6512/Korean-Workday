
'use strict';

const path = require('path');

const isProduction = (() => {
    if (process.env.NODE_ENV) {
        return process.env.NODE_ENV === 'production';
    }
    return false;
})();

const isDevlopment = (() => {
    if (process.env.NODE_ENV) {
        return process.env.NODE_ENV === 'development';
    }
    return true;
})();

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