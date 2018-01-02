"use strict";

//export const BASE_URL = 'http://192.168.4.19:3013/';
//const BASE_URL = 'http://127.0.0.1:3013/';
const BASE_URL = 'http://18.217.126.78:3013/';
const DEFAULT_PASSWORD = '123456';
const Active = 1;
const Inactive = 0;

const STATUS_CODES = {
    ERROR: 400,
    SUCCESS: 200,
    SERVER_ERROR: 500,
    UNAUTHORIZED: 401
};

const CRUD_CODES = {
  BATCH       : 1,
  INSTITUTE   : 2,
  QUESTION    : 3,
  SCALE       : 4,
  SUBJECT     : 5,
  TEST        : 6,
  USER        : 7,
  TOPIC       : 8,
  STUDENT     : 9,
  TEACHER     : 10
};

//========================== Export Module Start ===========================

module.exports = {
    STATUS_CODES,
    BASE_URL,
    DEFAULT_PASSWORD,
    Active,
    Inactive,
    CRUD_CODES
};

//========================== Export Module END ===========================
