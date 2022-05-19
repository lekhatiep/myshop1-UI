import {URL_CLIENT_LOCAL, URL_SERVER_LOCAL} from '../../const.js'
import  {setCookie,getCookie} from '../../storeCookie.js';
import  {setSession,getSession} from '../../storeSession.js';


//Get variables

const $ = document.querySelector.bind(document);//Query
const currentUserId = 1; //Admin
var divCartList = $(".order__wrap-item");
var sumTotal = $(".order__total-sum");
var shipTotal = $(".order__total-ship");
var promotionTotal = $(".order__total-promotion");
var grandTotal = $(".order__total-grand");
var btnSubmitOrder = $(".order__total-checkout-btn");

var cartApi = URL_SERVER_LOCAL + '/api/Carts';
var orderApi = URL_SERVER_LOCAL + '/api/Orders';

async function start(){

    await getListCartItemChecked()
   
}

start();

// document.addEventListener("visibilitychange", function() {
//     if (document.visibilityState === 'visible') {
//         start();
//     } 
// });

//getListCart
 async function getListCartItemChecked(){

     await fetch(cartApi + '/GetListCartItemChecked')
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

function renderListCartUser(){

    var data = JSON.parse(getCookie('listCart'));

    if(data === null || data.length === 0){
        console.log('no cart')
        
    }else{

        var html = '';
        var sumPrice = 0;
        var sumShipFee = 0;
        var sumPromotion = 0;
        data.forEach((item,index)=>{

            sumPrice+=item.price;

            html+= `<div class="order__item">
            <div class="order__item-supplier">
                <i class="fa-solid fa-comments-question"></i>
                <div class="order__item-supplier-name">
                    <i class="fa-solid fa-store order__item-shop-icon" ></i>
                    <i class="fa-solid fa-message-pen"></i>
                     Whoo
                </div>
                <a href="#" class="order__item-supplier-chatbox"><i class="fa-solid fa-comments order__item-shop-msg-icon"></i> Chat ngay</a>
            </div>
            <div class="order__item-info-wrap">
                <div class="order__item-info">
                    <div class="order__item-info-img" style="background-image: url('${URL_SERVER_LOCAL + item.imgPath}')">
                    </div>
                    <div class="order__item-info-title">
                        <span class="order__item-info-title-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                        </span>
                    </div>
                </div>
                <div class="order__item-info-type">Phân loại</div>
                <div class="order__item-info-price"> ${numberWithCommas(item.price)} <span>đ</span></div>
                <div class="order__item-info-quantity"> ${item.quantity} </div>
                <div class="order__item-info-total"> ${numberWithCommas(item.total)} <span>đ</span></div>    
            </div>
            
            <div class="order__item-voucher">    
                <div class="order__item-voucher-no">
                    <i class="fa-solid fa-ticket order__item-voucher-no-icon"></i>
                    <span>Voucher của Shop</span>
                </div>
                <div class="order__item-voucher-choose">
                    <div class="order__item-voucher-btn">
                        Chọn Voucher
                    </div>
                </div>    
                <div class="order__item-voucher-list"></div>
            </div>
        
            <div class="order__item-message-ship-wrap">
                <div class="order__item-message">
                    <div class="order__item-message-wrap">
                        <span>Lời nhắn : </span>
                        <div class="order__message-input-box">
                            <input type="text" class="order__item-message-input" placeholder="Lưu ý cho người bán ...">
                        </div>
                    </div>  
                </div>
                <div class="order__item-ship-info">
                    <span>Đơn vị vận chuyển: </span>
                    <div class="order__item-ship-wrap">
                        <div class="order__ship-warp-row">
                            <div class="order__item-ship-method">
                                <span>Vận chuyển nhanh quốc tế</span>
                                <div class="order__item-ship-name">
                                    Standard Express
                                </div>
                            </div>
                            <div class="order__item-ship-btn-change">
                                Thay đổi
                            </div>
                            <div class="order__item-ship-price">
                                0 <span>đ</span>
                            </div>
                        </div>
                        <div class="order__ship-warp-row">
                            <div class="order__item-ship-time">
                                
                            </div>
                            
                        </div>
                        <div class="order__ship-warp-row">
                            <div class="order__item-ship-reason">
                                (Do ảnh hưởng bởi Covid19, thời gian giao hàng quốc tế có thể kéo dài hơn dự kiến)
                            </div>
                            
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="order__item-info-sum-total">
                Tổng số tiền (<span class="cart__purchase-quantity-total"> ${item.quantity} </span> sản phẩm ): 
                <span class="cart__purchase-price-total text-primary-color">${numberWithCommas(item.total)}  </span><span class="text-primary-color"> đ</span>
            </div>
        </div>
            `
            
        });
    
        divCartList.innerHTML = html;
        sumTotal.innerText = numberWithCommas(sumPrice) + ' đ';
        shipTotal.innerText = numberWithCommas(sumShipFee)+ ' đ';
        promotionTotal.innerText = numberWithCommas(sumPromotion)+ ' đ';
        grandTotal.innerText = numberWithCommas(sumPrice + sumShipFee + sumPromotion)+ ' đ';
        


    }
   
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//Handle submit order 

btnSubmitOrder.onclick = function(){
    var data = {
        userId: currentUserId,
    }

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    fetch(orderApi +'/checkout', options)
        .then(response => {
            if(response.status === 200){
                deleteCookie("listCart");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}