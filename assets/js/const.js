export {
    URL_CLIENT_LOCAL,
    URL_SERVER_LOCAL,
    PAGE_NUMBER_DEFAULT,
    PAGE_SIZE_DEFAULT,
    query,
    queryAll
};
//Query Selector
const getId = document.getElementById.bind(document);//Get ID
const query = document.querySelector.bind(document);//Query
const queryAll = document.querySelectorAll.bind(document);

//URL Dev
const URL_SERVER_LOCAL = "https://localhost:5001";
const URL_CLIENT_LOCAL = "http://127.0.0.1:5500";

//Product
const PAGE_NUMBER_DEFAULT = 1;
const PAGE_SIZE_DEFAULT = 5;