
'use strict';

const isProduction = () => {
    return process.env.NODE_ENV === 'production';
}

const isDevlopment = () => {
    return process.env.NODE_ENV === 'development';
}

module.exports = { isProduction, isDevlopment }