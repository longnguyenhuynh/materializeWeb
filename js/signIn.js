const URL_INPUT = "http://192.168.1.251:8888";
var passwordElement = document.getElementById('password');
var userNameElement = document.getElementById('userName');
var submitElement = document.getElementById('submitButton');

submitElement.addEventListener("click", submitAccount);

function formInput() {
    let obj = {
      userName: userNameElement.value,
      password: passwordElement.value,
    }
    return obj;
  }
  

  function response() {
    this.check = false;
    this.processCheck = (responseText) => {
      if (responseText == 'OK')
        this.check = true;
    }
  }

function submitAccount() {
    let userData = formInput();
    let responseServer = new response();
    sendUserData(userData, URL_INPUT, responseServer.processCheck);
}

function sendUserData(input, url, callback) {
    const Http = new XMLHttpRequest();
    let data = JSON.stringify(input);
    Http.open("POST", url);
    Http.send(data + '\n');
    Http.onreadystatechange = (e) => {
      callback(this.responseText);
    }
  }