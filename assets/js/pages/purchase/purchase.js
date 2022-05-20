import {URL_CLIENT_LOCAL, URL_SERVER_LOCAL} from '../../const.js'
import  {setCookie,getCookie} from '../../storeCookie.js';
import  {setSession,getSession} from '../../storeSession.js';


//Get variables
var orderApi = URL_SERVER_LOCAL + '/api/Orders';

// Variables 
const $ = document.querySelector.bind(document);//Query

var tabAll = $(".header__tabs-all");
var tabConfirm = $(".header__tabs-confirm");
var tabWaiting = $(".header__tabs-wait-receive");
var tabShip = $(".header__tabs-shipping");
var tabDelivery = $(".header__tabs-delivered");
var tabCancel = $(".header__tabs-cancel");
var tabDefault = $(".defaultOpen");



function start() {
     
    getListOrdered();
}

start();

//Hanlde click each tab
tabAll.addEventListener('click', e => openTab(e,'all'), false);
tabConfirm.addEventListener('click', e => openTab(e,'confirm'), false);
tabWaiting.addEventListener('click', e => openTab(e,'waiting'), false);
tabShip.addEventListener('click', e => openTab(e,'shipping'), false);
tabDelivery.addEventListener('click', e => openTab(e,'delivered'), false);
tabCancel.addEventListener('click', e => openTab(e,'cancel'), false);
tabDefault.click();


function openTab(event, tabName) {
    console.log(event);
    console.log(tabName);

    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.querySelectorAll(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";

    event.currentTarget.className += " active";    
  }


  //Handle get list ordered 

function getListOrdered(){

    fetch(cartApi + '/GetListCartItemChecked')
        .then(response=>{
            return response.json();
        })
        .then((res)=>{
            if(res.status === 404){
                
            }else{
                setCookie('listCart',JSON.stringify(res),30)
                renderListCartUser();
            }
            
            
            
        })
        .catch(er=>{
            console.log(er);
        })
}
