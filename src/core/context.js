
'use strict';

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

module.exports = { isProduction, isDevlopment }