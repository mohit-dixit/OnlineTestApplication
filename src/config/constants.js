"use strict";

//export const BASE_URL = 'http://192.168.4.19:3013/';
const BASE_URL = 'http://180.151.103.85:3013/';
const DEFAULT_PASSWORD = '123456';
const Active = 1;
const Inactive = 2;

const STATUS_CODES = {
    ERROR: 400,
    SUCCESS: 200,
    SERVER_ERROR: 500,
    UNAUTHORIZED: 401
};

//========================== Export Module Start ===========================

module.exports = {
    STATUS_CODES,
    BASE_URL,
    DEFAULT_PASSWORD,
    Active,
    Inactive
};

//========================== Export Module END ===========================
