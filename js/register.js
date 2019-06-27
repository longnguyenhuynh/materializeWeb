//Initialize var
var confirmPasswordElement = document.getElementById('rePassword');
var passwordElement = document.getElementById('password');
var emailElement = document.getElementById('email');
var userNameElement = document.getElementById('userName');
var nameElement = document.getElementById('name');
var submitElement = document.getElementById('submitButton');

//===============================

//event listener
confirmPasswordElement.addEventListener("keydown", checkConfirmPassword); //start: user confirm password, active function check if users type wrong
userNameElement.addEventListener("keyup", checkUserName);
submitElement.addEventListener("click", submitAccount);

//================================

// Example starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//     'use strict'

//     window.addEventListener('load', function () {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation')

//       // Loop over them and prevent submission
//       Array.prototype.filter.call(forms, function (form) {
//         form.addEventListener('submit', function (event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault()
//             event.stopPropagation()
//           }
//           form.classList.add('was-validated')
//         }, false)
//       })
//     }, false)
//   }())

  function checkConfirmPassword() {
    confirmPasswordElement.addEventListener("keyup", comparePassword);
    function comparePassword() {
    let password = passwordElement.value;
    let confirmPassword = confirmPasswordElement.value;
    let alert = document.getElementById('rePasswordContainer').getElementsByClassName('invalid-feedback');
  }

  function sendUserData(input, url) {
    let obj = new XMLHttpRequest();
    let data = JSON.stringify(input);
    obj.open('POST', url, true);
    obj.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
  obj.send(data);
}
function receiveCheckingUserName() {
  let obj = new XMLHttpRequest();
  let data = JSON.parse();
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

function submitAccount () {
  let userData = formInput();
  sendUserData(userData, "http://192.168.1.251:0");
}


//long

function checkCheckBox () {
  return document.getElementById("checkBox").checked;
}

function checkPassword () {
  return (passwordElement.value.match(/\D/) && passwordElement.value.match(/\d/)) === null || passwordElement.value.length < 6 ? false : true;
}

function checkConfirmPassword() {
  return confirmPasswordElement.value.localeCompare(passwordElement.value) === 0 ? true : false;
}