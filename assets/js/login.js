import {
    URL_CLIENT_LOCAL,
    URL_SERVER_LOCAL
} from './const.js';
import {setCookie} from './storeCookie.js';
import  getUserInfo from './Users/user.js';
import {setSession} from './storeSession.js';
import {checkLogin} from '../js/checkLogged.js';


console.log("Login js");
const url = new URL(window.location.href);
var previousURL = sessionStorage.getItem("pageNotLoggedPath");
const get = document.getElementById.bind(document);//Get ID
const query = document.querySelector.bind(document);//Query
const queryAll = document.querySelectorAll.bind(document);
var authAPI = URL_SERVER_LOCAL + "/api/Users/login"

//Variables
var loginEL = query(".header__navbar-item-login");
var btnRegister = query(".header__navbar-item-register");
var btnLogin = query(".auth-form__controls-login");
var btnBack = query(".auth-form__controls-back");

var email = query(".auth-form__email");
var password = query(".auth-form__password");


async function start(){
    var infoLog =  await checkLogin();

    if(infoLog.isLogged) {
        var pathname = window.location.pathname;
        if(pathname === "/pages/login/login.html"){
            window.location.href = URL_CLIENT_LOCAL;
        }
        
    }else{
        
        console.log("not yet");
    }
}

start();




//LOGIN

var authForm = query(".auth-form");
var modalEL = query(".modal");

loginEL.onclick = function() {
    modalEL.classList.add('open')
}

modalEL.addEventListener("click", modalClick)
authForm.addEventListener('click', function(e) {
    e.stopPropagation();
    return false;
})
function modalClick(){
    modalEL.classList.remove('open')
}


async function handleLoginClick(){

    
    var user = {};
    var data = {
        email: email.value,
        password: password.value
    }

    var isValid = validateForm(data);

    if(isValid){
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        await fetch(authAPI, options)
            .then(response => {
                if(response.ok) return  response.json()
                else{
                    alert("Kiểm tra lại thông tin đăng nhập")
                }
               
            }
            )
            .then( async response =>{
                console.log(response);
                setCookie("access_token", response.access_token, 30);
                modalEL.classList.remove('open')
    
                if(previousURL!==null){
                    location.href = previousURL;
                }else{
                    location.href = "/";
                }
                var user = await  getUserInfo(response.access_token);
                setCookie("userId", user.id);
            })
            .catch((error) => {
                console.log(error);
            })
    }
   
            
}

btnLogin.addEventListener("click",handleLoginClick);

password.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleLoginClick();
    }
  });


  //Handle back button

  btnBack.onclick = ()=>{
      window.location.href = URL_CLIENT_LOCAL;
  }

  function validateForm(data){
    if(data.email === "" || data.password == ""){
        alert("Vui lòng không để trống thông tin !!!");
        return false;
    }
    return true
  }