import {getCookie, setCookie} from '../../storeCookie.js';
import {URL_SERVER_LOCAL, URL_CLIENT_LOCAL} from '../../const.js'

var cartApi = "https://localhost:5001/api/Carts";
var viewCartBtn = document.querySelector('.header__cart-view-cart');

export default function renderListCart(){

    var listCartTemp = JSON.parse(getCookie('listCart'));
    var cartListItem = document.querySelector('.header__cart-list-item');
    var noCartList = document.querySelector('.header__cart-no-car-img')
    var noCartListMsg = document.querySelector('.header__cart-list-no-cart-msg')
    var headerCartList = document.querySelector('.header__cart-list-heading')
    var cartNoticeNumber = document.querySelector('.header__cart-notice');
    var listCartUl = document.querySelector('.header__cart-list-item');
    

    
    if(listCartTemp === null || listCartTemp.length === 0){
        
        console.log('no cart')
        headerCartList.style.display = 'none';
        cartListItem.style.display = 'none';

        noCartList.style.display = 'block';
        noCartListMsg.style.display = 'block';

        cartNoticeNumber.innerText = 0;

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

window.removeFromCart = async function(id){

    console.log('del')
    var listCartTemp = JSON.parse(getCookie('listCart'));

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
            setCookie("listCart",JSON.stringify(response),30);
            renderListCart();
        })
        .catch((error) => {
            console.log(error);
        })
            
}

viewCartBtn.onclick = ()=>{
    window.location.href = `${URL_CLIENT_LOCAL}/pages/cart`;
}