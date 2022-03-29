import {
    URL_SERVER_LOCAL
} from './const.js';
import {setCookie} from './storeCookie.js';
import  getUserInfo from './Users/user.js';
import {setSession} from './storeSession.js';

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

var email = query(".auth-form__email");
var password = query(".auth-form__password");


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

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    await fetch(authAPI, options)
        .then(response => 
            response.json()
        )
        .then( async response =>{
            localStorage.setItem('access_token', response.access_token)
            setCookie("access_token", response.access_token, 30);
            modalEL.classList.remove('open')

            window.sessionStorage.accessToken = response.access_token
            console.log(response);

            // if(previousURL!==null){
            //     location.href = previousURL;
            // }else{
            //     location.href = "/";
            // }
            var user = await  getUserInfo(response.access_token);
            setSession("userId", user.id);
        })
        .catch((error) => {
            console.log(error);
        })
            
}

btnLogin.addEventListener("click",handleLoginClick);


//Handle enter after input
// var inputPassword = query(".auth-form__password");
// inputPassword.addEventListener("keyup", (event) => {
//     if (event.keyCode === 13) {
//         console.log(email.value);
//         console.log(password.value);
//         // Cancel the default action, if needed
//         event.preventDefault();
//         // Trigger the button element with a click
//         //handleLoginClick();
//     }
// })