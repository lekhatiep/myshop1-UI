console.log("create.js");

var form = document.querySelector("#admin-product__form-create");
var redirectFrom = location.pathname;
var productApi = "https://localhost:5001/api/Products";

form.onsubmit = function(e){
    e.preventDefault();

}

function start(){
    autoRedirect();
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

        var data = {
            code : code,
            title: title,
            price: price,
            quantity: quantity,
            description: description,
            
        };
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
        body: formData
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

//Check Logged in
async function isLoggedIn () {
    const token = localStorage.getItem('access_token')
    if (token === null) return false
    else return true;
}
    

async function autoRedirect () {
    console.log(location.pathname);
    const validLogin = await isLoggedIn()

    console.log(validLogin);
    if (!validLogin && location.pathname !== '/pages/login/login.html')
        location.href='/pages/login/login.html?redirectFrom='+redirectFrom;
    if (validLogin && location.pathname === '/pages/login/login.html/')
        location.href= '/'
}