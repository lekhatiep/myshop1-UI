import {URL_SERVER_LOCAL} from './const.js'
var access_token = localStorage.getItem('access_token');
var userApi = URL_SERVER_LOCAL + "/api/Users/validateToken";
var infoLogged = {
    isLogged : false,
    isValidToken : '',
    accessToken : '',
}

async function checkLogin(){
    if(access_token === null){
        infoLogged.isLogged = false;
        return infoLogged;
    }

    var options ={
        method: 'POST',
        headers: { accessToken: access_token},
    };

    await fetch(userApi, options)
        .then(resp => {
            if(resp.status === 200){
                infoLogged.isLogged = true
                infoLogged.accessToken = access_token;
            }

        })
        .catch((err) => {
            console.log(err);
        })
    
    return infoLogged;
}

export default checkLogin;
