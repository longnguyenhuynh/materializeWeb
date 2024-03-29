//Initialize var
const URL_INPUT = "http://192.168.1.251:8888";
var confirmPasswordElement = document.getElementById('rePassword');
var passwordElement = document.getElementById('password');
var emailElement = document.getElementById('email');
var userNameElement = document.getElementById('userName');
var nameElement = document.getElementById('name');
var submitElement = document.getElementById('submitButton');
//==============================================================

//catch event
//confirmPasswordElement.addEventListener("keyup", checkConfirmPassword); //start: user confirm password, active function check if users type wrong
submitElement.addEventListener("click", () => {submitAccount()});
userNameElement.addEventListener("focusin", function foo(event) { 
  addFocus();
  event.currentTarget.removeEventListener(event.type, foo);
});
nameElement.addEventListener("focusin", addFocus);
passwordElement.addEventListener("focusin", addFocus);
confirmPasswordElement.addEventListener("focusin", addFocus);
emailElement.addEventListener("focusin", function foo(event) { 
  addFocus(); 
  event.currentTarget.removeEventListener(event.type, foo);
});
//===============================================================

//Check and Valid function
function validData() {
  let check1 = validName();
  let check2 = validUserName();
  let check3 = checkPassword();
  let check4 = confirmPassword();
  let check5 = validEmail();
  return check1 * check2 * check3 * check4 * check5;
}

function validName() {
  var firstLetter = "[A-EGHIK-VXYÂĐỔÔÚỨ]".normalize("NFC"),
    otherLetters = "[a-eghik-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫]".normalize("NFC"),
    regexString = "^" +
    firstLetter + otherLetters + "+\\s" +
    "(" + firstLetter + otherLetters + "+\\s)*" +
    firstLetter + otherLetters + "+$",
    regexPattern = RegExp(regexString);
  if (regexPattern.test(nameElement.value.normalize("NFC")))
    return true;
  else
    return false;
}

function checkCheckBox() {
  return document.getElementById("checkBox").checked;
}

function checkPassword() {
  return (passwordElement.value.match(/\D/) && passwordElement.value.match(/\d/)) === null || passwordElement.value.length < 6 ? false : true;
}

function confirmPassword() {
  return confirmPasswordElement.value.localeCompare(passwordElement.value) === 0 ? true : false;
}

function validEmail() {
  let mail = emailElement.value;
  let checkmail = function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  let checkEmpty = () => {
    if (mail == '')
      return false;
    else
      return true;
  }
  let check1 = checkmail(mail);
  let check2 = checkEmpty();
  let check3 = sendUserDataGET(mail, URL_INPUT, "EMAIL")
  .then(function(result) {
    let responseServer = new response();
    responseServer.processCheck(result);
    return responseServer.check;
  })
  .then(function(value) {
    validEvent(check1 * check2 * value, "email");
  });
}

function validUserName() {
  let userNameInput = userNameElement.value;
  let checkEmpty = () => {
    if (userNameInput == '')
      return false;
    else
      return true;
  }
  let checkContainingWordAndNumber = () => {
    let text = userNameInput.split("");
    for (let i = 0; i < text.length; i++) {
      if (!((text[i].charCodeAt(0) > 47 && text[i].charCodeAt(0) < 58) || (text[i].charCodeAt(0) > 64 && text[i].charCodeAt(0) < 91) || (text[i].charCodeAt(0) > 96 && text[i].charCodeAt(0) < 123)))
        return false;
    }
    return true;
  }
  let check1 = checkEmpty();
  let check2 = checkContainingWordAndNumber();
  let check3 = sendUserDataGET(userNameInput, URL_INPUT, "USERNAME")
  .then(function(result) {
    let responseServer = new response();
    responseServer.processCheck(result);
    return responseServer.check;
  })
  .then(function(value) {
    validEvent(check1 * check2 * value, "userName");
  });
}

function getElement(string) {
  switch (string) {
    case "name":
      return nameElement;
      break;
    case "userName":
      return userNameElement;
      break;
    case "password":
      return passwordElement;
      break;
    case "rePassword":
      return confirmPasswordElement;
      break;
    case "email":
      return emailElement;
      break;
  }
}

function validEvent(check, field) {
  let element = getElement(field);
  if (check) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function addFocus() {
  switch (event.target.id) {
    case "password":
      passwordElement.addEventListener("focusout", function() {
        validEvent(checkPassword(), "password");
      });
      break;
    case "rePassword":
      confirmPasswordElement.addEventListener("focusout", function() {
        validEvent(confirmPassword(), "rePassword");
      });
      break;
    case "name":
      nameElement.addEventListener("focusout", function() {
        validEvent(validName(), "name");
      });
      break;
    case "userName":
      userNameElement.addEventListener("focusout", function() {
        validUserName();
      });
      break;
    case "email":
      emailElement.addEventListener("focusout", function() {
        validEmail();
      });
      break;
  }
}

function checkAllField() {
  validEvent(checkPassword(), "password");
  validEvent(confirmPassword(), "rePassword");
  validEvent(validName(), "name");
  validEvent(validUserName(), "userName");
  validEvent(validEmail(), "email");
}
//===================

function submitAccount() {
  let check = validData();
  if (check) {
    let userData = formInput();
    let responseServer = new response();
    sendUserData(userData, URL_INPUT, responseServer.processCheck);
  }
  else
    checkAllField();
}

function sendUserData(input, url, callback) {
  var Http = new XMLHttpRequest();
  let data = JSON.stringify(input);
  Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200)
      callback(this.responseText);
  }
  Http.open("POST", url, true);
  Http.send(data + '\n');
}

function sendUserDataGET(input, url, type) {
  return new Promise(function(resolve, reject) {
    var Http = new XMLHttpRequest();
    Http.onload = function() {
      resolve(this.responseText);
    };
    Http.open('GET', url + "?" + type + ':' + input, true);
    Http.send();
  });
}

function formInput() {
  let obj = {
    name: nameElement.value,
    userName: userNameElement.value,
    password: passwordElement.value,
    email: emailElement.value
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
