import Vue from 'vue'
export {
  GetRequest,
  PostRequest,
  LoginAuthentication,
  NumberKeyValidation
};

function GetRequest(url, data) {
  return Vue.http.get(url)
    .then(
      response => {
        return response.data
      })
    .catch(error => {
      return error;
    })
}

function PostRequest(url, data) {
  return Vue.http.post(url, data)
    .then(
      response => {
        debugger;
        return response.data
      })
    .catch(error => error)
}

function LoginAuthentication(username, password, url) {
  return Vue.http.get(url)
    .then(response => {
      if (response) {
        let isCredentialsFound = false;
        let responseData = response.data;
        let loginUserData = [];
        responseData.forEach(function (element) {
          let user = element.username;
          let pass = element.password;
          if (user == username && pass == password) {
            isCredentialsFound = true;
            loginUserData.push(element);
          }
        }, this);
        if (isCredentialsFound) {
          return loginUserData;
        }
      } else {
        return null;
      }
    })
    .catch(error => {
      //debugger;
      return error;
    })
}

function NumberKeyValidation(event) {
  let returnValue = (event.keyCode >= 48 && event.keyCode <= 57);
  return returnValue;
}
