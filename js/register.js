//Initialize var
const URL_INPUT = "http://192.168.1.251:8888";
var confirmPasswordElement = document.getElementById('rePassword');
var passwordElement = document.getElementById('password');
var emailElement = document.getElementById('email');
var userNameElement = document.getElementById('userName');
var nameElement = document.getElementById('name');
var submitElement = document.getElementById('submitButton');
//==============================================================

//catch event while login
confirmPasswordElement.addEventListener("keyup", checkConfirmPassword); //start: user confirm password, active function check if users type wrong
submitElement.addEventListener("click", submitAccount);
userNameElement.addEventListener("keydown", addFocus);
nameElement.addEventListener("focusin", addFocus);
passwordElement.addEventListener("keydown", addFocus);
confirmPasswordElement.addEventListener("keydown", addFocus);
emailElement.addEventListener("keydown", addFocus);
//===============================================================

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())



//Check and Valid function
  function validData() {
    let check1 = validName();
    let check2 = validUserName();
    let check3 = checkPassword();
    let check4 = checkConfirmPassword();
    let check5 = validEmail();
    return check1 * check2 * check3 * check4 * check5;
  }

  function validName() {
    let input = nameElement.value;
    if (input === '')
      return false;
    let text = input.split("");
    for (let i = 0; i < text.length; i++) {
      if (!((text[i].charCodeAt(0) > 64 && text[i].charCodeAt(0) < 91) || (text[i].charCodeAt(0) > 96 && text[i].charCodeAt(0) < 123)))
        return false;
    }
    return true;
  }

  function checkConfirmPassword() {
    confirmPasswordElement.addEventListener("focusout", comparePassword);
    function comparePassword() {
      let password = passwordElement.value;
      let confirmPassword = confirmPasswordElement.value;
      let alert = document.getElementById('rePasswordContainer').getElementsByClassName('invalid-feedback');
      if (confirmPassword != password)
        alert[0].style.display = 'block';
      else if (confirmPassword == password)
        alert[0].style.display = 'none';
    }
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
      if (userNameInput == '')
        return false;
      else
        return true;
    }
    let check1 = checkmail(mail);
    let check2 = checkEmpty();
    return (check1 * check2);
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
    let checkSameUserName = () => {
      sendUserData(userNameInput, URL_INPUT);
      let checkSameDataObjUserName = new checkSameData();
      receiveData(URL_INPUT, checkSameData.processCheck());
      return checkSameDataObjUserName.check;
    }
      let check1 = checkEmpty();
      let check2 = checkContainingWordAndNumber();
      let check3 = checkSameUserName();
    return (check1 * check2 * check3);
  }
function getElement(string) {
  switch(string) {
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
    }
    else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  }

  function addFocus() {
    switch (event.target.id) {
      case "password": 
        passwordElement.addEventListener("focusout", validEvent(checkPassword(),"password"));
        break;
      case "rePassword":
        confirmPasswordElement.addEventListener("focusout", validEvent(confirmPassword(), "rePassword"));
        break;
      case "name":
        nameElement.addEventListener("focusout", function () {
          console.log(1);
          validEvent(validName(),"name");
        });
        break;
      case "userName": 
        userNameElement.addEventListener("focusout", validEvent(validUserName(), "userName"));
        break;
      case "email": 
        emailElement.addEventListener("focusout", validEvent(validEmail(),"email"));
        break;
    }
  }

function checkAllField() {
  validEvent(checkPassword(),"password");
  validEvent(confirmPassword(), "rePassword");
  validEvent(validName(),"name");
  validEvent(validUserName(), "userName");
  validEvent(validEmail(),"email");
}
//===================

//
function submitAccount() {
  let check = validData();
  if (check) {
    let userData = formInput();
    sendUserData(userData, URL_INPUT);
  }
  else {
    checkAllField();
  }
}
function sendUserData(input, url) {
  let obj = new XMLHttpRequest();
  let data = JSON.stringify(input);
  obj.open('POST', url, true);
  obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  obj.onreadystatechange = () => {
    if (obj.readyStateChange === 4 && obj.status === 200) {
      //get response message after sending data 
      receiveData(URL_INPUT,);
    }
  }
  obj.send(data);
}

function receiveData(url, processCheck) {
  let obj = new XMLHttpRequest();
  obj.open('GET', url, true);
  obj.onreadystatechange = function () {
    if (this.readyStateChange === 4 && this.status === 200)
      processCheck(this.responseText);
  }
  obj.send();
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

function checkSameData() {
  this.check = false;
  this.type = type;
  this.processCheck = (response) => {
    if (response == 'OK')
      check: true;
  }
}
