console.log('sss');

import {URL_SERVER_LOCAL} from '../../const.js'
import  {setSession} from '../../storeSession.js';
import  renderListCart from '../cart/listCart.js'

//Variables
const currentUserId = 1; //Admin
const url = new URL(window.location.href);

var infoProduct = {

}

var title = document.querySelector('.product__detail-title');
var price = document.querySelector('.product__detail-price-current');
var imgList = document.querySelector('.product__box-list-item-img'); 
var imageDetail = document.querySelector('.product__box-left-img'); 
var btnPlus = document.querySelector('.product__quantity-warp-plus');
var btnMinus = document.querySelector('.product__quantity-warp-minus');
var inputQuantity = document.querySelector('.product__quantity-current');
var btnAddToCart = document.querySelector('.product__detail-add-cart');
var cartNoticeNumber = document.querySelector('.header__cart-notice');
var paramId = url.searchParams.get("id");
var productApi = "https://localhost:5001/api/Products";
var cartApi = "https://localhost:5001/api/Carts";
var listCartUl = document.querySelector('.header__cart-list-item');

function start() {
    handleGetInfoProduct();
    renderListCart();

}

start();


//Hande get info product

function handleGetInfoProduct(){

    fetch(productApi + '/' + paramId)
        .then(function(response){
            if(response.status !== 200){
                console.log('ERROR');
            }
            return response.json();
        }).then((response)=>{
            title.innerText = response.title;
            price.innerText = response.price;
            var link =  `url('${URL_SERVER_LOCAL + response.imagePath}')`;
            imageDetail.style.backgroundImage = link;
            imgList.style.backgroundImage = link;

            infoProduct.title = response.title;
            infoProduct.price = response.price;
            infoProduct.id = response.id;
            inputQuantity.value = 1;

        })
}

//Handle buttn plus

btnPlus.onclick = ()=>{
    var currentValue = parseInt( inputQuantity.value);

    inputQuantity.value = currentValue + 1;
}

//Handle buttn minus

btnMinus.onclick = ()=>{
    var currentValue = parseInt( inputQuantity.value);
    currentValue--;
    
    if(currentValue <= 1){
        inputQuantity.value = 1;
    }else{
        inputQuantity.value = currentValue;
    }
    
}

inputQuantity.onblur = ()=>{

    var currentValue = parseInt(inputQuantity.value);
    if (typeof(currentValue) === 'number') {
        inputQuantity.value = currentValue;
    }else{
        inputQuantity.value = 1;
    }
}
// Handle add to cart temp

btnAddToCart.onclick = ()=>{
    
    var data = {
        productId: infoProduct.id,
        price: infoProduct.price,
        quantity: inputQuantity.value,
        userId: currentUserId,
    }

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    fetch(cartApi, options)
        .then(response => 
            response.json()
        )
        .then( async response =>{
            console.log(response);
            setSession("listCart",JSON.stringify(response));
            renderListCart();
        })
        .catch((error) => {
            console.log(error);
        })
            
}


