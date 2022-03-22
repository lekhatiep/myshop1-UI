import { URL_CLIENT_LOCAL,query } from "./const.js";



var btnRegister = query(".header__navbar-register");
var btnLogin = query(".header__navbar-item-login");


function logOut(){
    localStorage.removeItem('access_token');
    window.location.href = URL_CLIENT_LOCAL;

    btnLogin.classList.remove('hide');
    btnRegister.classList.remove('hide');

}

export default logOut;