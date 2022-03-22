import {
    URL_SERVER_LOCAL
} from './const.js';

console.log("Login js");
const url = new URL(window.location.href);
var previousURL = url.searchParams.get("redirectFrom");
const get = document.getElementById.bind(document);//Get ID
const query = document.querySelector.bind(document);//Query
const queryAll = document.querySelectorAll.bind(document);
var authAPI = URL_SERVER_LOCAL + "/api/Users/login"

//Variables
var loginEL = query(".header__navbar-item-login");
var btnRegister = query(".header__navbar-item-register");
var btnLogin = query(".auth-form__controls-login");

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

btnLogin.addEventListener('click', handleLoginClick);

function handleLoginClick(){


    var email = query(".auth-form__email").value;
    var password = query(".auth-form__password").value;
    
    var data = {
        email: email,
        password: password
    }

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    fetch(authAPI, options)
        .then(response => 
            response.json()
        )
        .then((response)=>{
            localStorage.setItem('access_token', response.access_token)
            modalEL.classList.remove('open')

            window.sessionStorage.accessToken = response.access_token
            console.log(response);

            if(previousURL!==null){
                location.href = previousURL;
            }
            location.href = "/";
        })
        .catch((error) => {
            console.log(error);
        })
            
}