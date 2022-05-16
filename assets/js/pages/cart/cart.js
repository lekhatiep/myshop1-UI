import {URL_SERVER_LOCAL} from '../../const.js'
import  {setSession, getSession} from '../../storeSession.js';

//Get variables
var divCartList = document.querySelector(".content__cart-list-wrap");
const $ = document.querySelector.bind(document);//Query
var cartApi = URL_SERVER_LOCAL + '/api/Carts';
async function start(){

    await getListCart()
    renderListCartUser();
    UpdateData();
}

start();

//getListCart
 async function getListCart(){

    console.log('aaa');

     await fetch(cartApi + '/GetListCart')
        .then(response=>{
            return response.json();
        })
        .then((res)=>{
            setSession('listCart',JSON.stringify(res))
            //renderListCartUser(res)
        })
        .catch(er=>{
            console.log(er);
        })
}


//Hanlde render list cart user

function renderListCartUser(){

    var data = JSON.parse(getSession('listCart'));
  
   
    var cartNoticeNumber = document.querySelector('.header__cart-notice');
    
    console.log(data);
    
    if(data === null || data.length === 0){
        
        console.log('no cart')
       
    }else{
       
        var html = '';
        var index = 0;
         data.forEach(item=>{
            html+= `<div class="content__cart-list-item">
            <input type="checkbox" class="content__cart-item-checkbox">
            <div class="content__cart-item-info">
                <a href="">
                    <div class="content__cart-item-info-img" style="background-image: url(${URL_SERVER_LOCAL+ item.imgPath});"></div>
                </a>
                <div class="content__cart-wrap-title">
                    <a href="" class="content__cart-item-info-title">                  
                        ${item.title}                   
                    </a>
                    
                </div>
            </div>
            <div class="content__cart-item-price">${numberWithCommas(item.price)} đ</div>
            <div class="content__cart-item-quantity">
                <div class="content__cart-warp-quantity">
                    <div class="content__cart-warp-minus minus-item-${index}" data-id='${item.id}'>
                        <i class="content__cart-minus fa-solid fa-minus"></i>
                    </div>
                    <div class="content__cart-warp-current">
                        <input type="text" class="product__quantity-current product__quantity-${item.id}"  value="${item.quantity}">
                    </div>
                    <div class="content__cart-warp-plus plus-item-${index}" data-id='${item.id}'">
                        <i class="content__cart-plus fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
            <div class="content__cart-item-total">${numberWithCommas(item.total)} đ</div>
            <div class="content__cart-item-action">
                <div class="content__cart-item-remove" onclick=removeFromCart('${item.id}')>Xóa</div>
            </div>
        </div>
            `
            index++;
        });
    
        divCartList.innerHTML = html;
    }
  
}

window.removeFromCart = async function(){

    console.log('del')
    var listCartTemp = JSON.parse(getSession('listCart'));

    for (let i = 0; i < listCartTemp.length; i++) {
        if (listCartTemp[i].id === id) {
            listCartTemp.splice(i, 1);
        }
    }

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listCartTemp)
    }
    
    await fetch(cartApi+'/UpdateOrRemoveCartItem', options)
        .then(response => 
            response.json()
        )
        .then( async response =>{
            setSession("listCart",JSON.stringify(response));
            renderListCart();
        })
        .catch((error) => {
            console.log(error);
        })
            
}

 function UpdateData() {  
    
    var listCartItemsEl = document.querySelectorAll('.content__cart-list-item');
    
    listCartItemsEl.forEach((element,index) => {
        var plusItem = $('.plus-item-'+index);
        var minusItem = $('.minus-item-'+index);
        //Handle btn (+)
        plusItem.addEventListener("click", function(){
            var inputQuantity = $('.product__quantity-'+ plusItem.dataset.id )
            var currentValue = parseInt( inputQuantity.value);

            inputQuantity.value = currentValue + 1;
            
            UpdateItem(plusItem.dataset.id, inputQuantity.value);
            
        })
        //Handle btn (-)
        minusItem.onclick =  function(){

            var inputQuantity = $('.product__quantity-'+ plusItem.dataset.id )
            var currentValue = parseInt(inputQuantity.value);

            inputQuantity.value = currentValue - 1;

            if(inputQuantity.value <= 1){
                inputQuantity.value = 1;
            }
           
            UpdateItem(plusItem.dataset.id, inputQuantity.value)
        }
        
    });
   
}


  function UpdateItem(id, quantity) {

    var data = {
        id : id,
        quantity: quantity
    }

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    fetch(cartApi+'/UpdateItem', options)
        .then(function(response)   
            {
                console.log(response.status); 
                if(response.status === 200){
                    getListCart();
                }
                return response.json();
            }           
        )
        .then( async () =>{   
            //await getListCart();          
        })
        .catch((error) => {
            
        })
        
        
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}