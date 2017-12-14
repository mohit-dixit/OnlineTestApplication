import Vue from 'vue'
export {
  GetRequest,
  PostRequest,
  LoginAuthentication,
  NumberKeyValidation
};

import Router from '../router';
import constants from '../config/constants';

function GetRequest(url, data) {
    return Vue.http.get(url)
      .then(response => {
          return response.data
      })
      .catch(error => {
        // debugger;
        if(error.status === constants.STATUS_CODES.UNAUTHORIZED) {
          Router.push('/');
        } 
        return error;
      })
}
function PostRequest(url, postdata) {
    return Vue.http.post(url, postdata)
      .then(
        response => {
          if (response.body.status) {
             return {status : response.body.status, statustext : response.statusText, body : response.body.result};
          }
          else{
            return {status : response.body.status, statustext : response.body.error.msg};
          }
        })
      .catch(error => {
        if(error.status === constants.STATUS_CODES.UNAUTHORIZED) {
          Router.push('/');
        } 
        return error;
      })
}

function LoginAuthentication(url, data) {
    return Vue.http.post(url, data)
      .then(response => {
        if (response) {
          let responseData = response.data;
          if (responseData.status == 0) {
            return {
              requestcode: responseData.status,
              responsedata: responseData.error.msg
            };
          }
          return {
            requestcode: responseData.status,
            responsedata: responseData.result.message
          };
        }
      })
      .catch(error => {
        console.log('Error   :   ' + error.message);
      })
}
function NumberKeyValidation(event) {
    let returnValue = (event.keyCode >= 48 && event.keyCode <= 57);
    return returnValue;
}
