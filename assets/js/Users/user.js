import {URL_SERVER_LOCAL} from '../const.js'
var userApi = URL_SERVER_LOCAL + "/api/Users";

//  //Check user login  
// var infoLog =  await checkLogin();

// if(infoLog.isLogged) {
//     getUserInfo(infoLog.accessToken);
//     console.log("Login")
// }else{
//     console.log("not yet");
// }


async function getUserInfo(accessToken){
    var response = await fetch(userApi +'/GetInfo', {
                headers: {
                    'Authorization' : `Bearer ${accessToken}`
                },
            })
            .then(response => response.json())
            .then((data)=>{
                return data;
            })
    return await response;
    
}

export default getUserInfo;