console.log('sss');

import {URL_SERVER_LOCAL} from '../../const.js'
import {getSession, setSession} from '../../storeSession.js';
//Variables
const currentUserId = 1; //Admin
const url = new URL(window.location.href);
var title = document.querySelector('.product__detail-title');
var price = document.querySelector('.product__detail-price-current');
var imgList = document.querySelector('.product__box-list-item-img'); 
var imageDetail = document.querySelector('.product__box-left-img'); 
var btnPlus = document.querySelector('.product__quantity-warp-plus');
var btnMinus = document.querySelector('.product__quantity-warp-minus');
var inputQuantity = document.querySelector('.product__quantity-current');
var btnAddToCart = document.querySelector('.product__detail-btn-add-cart');
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
    var priceProduct = document.querySelector('.product__detail-price-current');
    console.log(priceProduct.innerText)
    var data = {
        productId: paramId,
        price: parseInt(priceProduct.innerText),
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

//Handle show list cart item

function renderListCart(){

    var listCartTemp = JSON.parse(getSession('listCart'));
    var cartListItem = document.querySelector('.header__cart-list-item');
    var noCartList = document.querySelector('.header__cart-no-car-img')
    var noCartListMsg = document.querySelector('.header__cart-list-no-cart-msg')
    var headerCartList = document.querySelector('.header__cart-list-heading')
   
    console.log(listCartTemp)
    if(listCartTemp === null || listCartTemp.length === 0){
        
        console.log('no cart')
        headerCartList.style.display = 'none';
        cartListItem.style.display = 'none';

        noCartList.style.display = 'block';
        noCartListMsg.style.display = 'block';

        cartNoticeNumber.innerText = listCartTemp.length;

    }else{
        noCartList.style.display = 'none';
        noCartListMsg.style.display = 'none';

        headerCartList.style.display = 'block';
        cartListItem.style.display = 'block';

        cartNoticeNumber.innerText = listCartTemp.length;
        var html = listCartTemp.map((item) =>{
            return `
            <li class="header__cart-item">
            <img src="${URL_SERVER_LOCAL + item.imgPath}" alt="" class="header__cart-item-img">
            <div class="header__cart-item-info">
                <div class="header__cart-item-head">
                    <h5 class="header__cart-item-name">${item.title}</h5>
                    <div class="header__cart-item-price-warp">
                        <span class="header__cart-item-price">${item.price} đ</span>
                        <span class="header__cart-item-head-multiply">x</span>
                        <span class="header__cart-item-qty">${item.quantity}</span>
                    </div>
                </div>
                <div class="header__cart-item-body">
                    <span class="header__cart-item-desc">
                        Phân loại: Bạc
                    </span>
                    <span class="header__cart-item-remove" onclick=removeFromCart('${item.id}')>Xóa</span>
                </div>
            </div>
        </li>
            `;
            
        })
        listCartUl.innerHTML = html.join(' ')
    }
}

window.removeFromCart = function(id){

    console.log('del')
    var listCartTemp = JSON.parse(getSession('listCart'));

    for (let i = 0; i < listCartTemp.length; i++) {
        if (listCartTemp[i].id === id) {
            listCartTemp.splice(i, 1);
        }
    }
    setSession("listCart",JSON.stringify(listCartTemp));
    renderListCart();
 
}