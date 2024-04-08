console.log("create.js");
import {checkLogin, autoRedirect} from '../../checkLogged.js'
import {URL_SERVER_LOCAL} from '../../const.js'
import {getCookie} from '../../storeCookie.js';

var form = document.querySelector("#admin-product__form-create");
var redirectFrom = location.pathname;
var productApi = URL_SERVER_LOCAL + "/api/Products";
var access_token = getCookie('access_token');

form.onsubmit = function(e){
    e.preventDefault();

}

async function start(){
    var infoLog = await checkLogin();
    if(!infoLog.isLogged){
        //autoRedirect(redirectFrom);
    }
    handleCreateForm();

}

start();

//Function handle create form
function handleCreateForm(){
    var createBtn = document.querySelector("#admin-product__form-btn-create");

    createBtn.onclick = function(){
        var code = document.querySelector('input[name="code"]').value;
        var title = document.querySelector('input[name="title"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var quantity = document.querySelector('input[name="quantity"]').value;
        var description = document.querySelector('textarea[name="description"]').value;
        var image = document.querySelector('input[type="file"]').files[0];

        var formData = new FormData();
        formData.append("Code",code);
        formData.append("Title",title);
        formData.append("Price",price);
        formData.append("Quantity",quantity);
        formData.append("Description",description);
        formData.append("ThumbnailImage",image);
        

        createProduct(formData,function(products){
            console.log(products);
        });
    }

}

//Function create product
function createProduct(formData,callback){
    var options = {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": "Bearer " + access_token
        }
    };


    fetch(productApi,options)
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Bad status code from server.');
        }
        alert("Thêm mới sản phẩm thành công");
        form.reset();
        //return response.json();//because not response data in body
        return response.text();
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        })
        .catch((error) => {
            console.log(error);
        })
}