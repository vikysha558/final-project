function req(url) {
    return fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}
let response;
const products = document.querySelector('.main-products');
const minPrice = document.querySelector('.min-price');
const maxPrice = document.querySelector('.max-price');



function getMinElement(response) {
    let minElement = 999999999999;
    for (let res in response) {
        if (minElement > response[res].price) {
            minElement = response[res].price;
        }
    }
    return minElement * 90;
}
function getMaxElement(response) {
    let maxElement = -1;
    for (let res in response) {
        if (maxElement < response[res].price) {
            maxElement = response[res].price;
        }
    }
    return maxElement * 90;
}
window.addEventListener('load', async () => {
    const URL = "https://odinkeane.github.io/web-developer/data.json";
    response = await req(URL);
    const min = getMinElement(response);
    const max = getMaxElement(response);
    minPrice.value = min;
    maxPrice.value = max;
    generate(response, "");
});


const countBtn = document.querySelectorAll('.count-btn');
function changeBtnColor() {
    for (let btn of countBtn) {
        if (btn.innerHTML == counter) {
            btn.style.color = "white";
            btn.style.backgroundColor = "var(--btn-color)";
        } else {
            btn.style.color = "var(--text-color)";
            btn.style.backgroundColor = "white";
        }
    }
}


const filterCategory = document.querySelectorAll('.filter-category');
const filterBrand = document.querySelectorAll('.filter-brand');

function generate(response, search) {

    changeBtnColor();

    products.innerHTML = "";
    let i = 0;
    for (res in response) {

        let brandOn = false;
        for (brand of filterBrand) {
            if (brand.checked && brand.value == response[res].brand) {
                brandOn = true;
            }
        }
        if (!brandOn) {
            continue;
        }


        let categoryOn = false;
        for (let cat of filterCategory) {
            if (cat.checked && cat.value == response[res].category) {
                categoryOn = true;
            }
        }
        if (!categoryOn) {
            continue;
        }

        if (response[res].price * 90 < minPrice.value || response[res].price * 90 > maxPrice.value) {
            continue;
        }


        if (search != "") { 
            if (!(response[res].name.toLowerCase().includes(search.toLowerCase()))){
                continue;
            }
        }
        products.innerHTML += `
            <figure class='main-product'>
                <img class='product-img' src='${response[res].imageURL}'>
                <figcaption>
                    <h3>${response[res].name}</h3>
                    <p class='product-id'>Артикул: ${response[res].id}</p>
                    <p class='product-price'>${response[res].price * 90} ₽</p>
                    <button class='product-basket' onclick='addProduct(this)'>
                        <img src='images/basket-product.svg'>
                    </button>
                </figcaption>
            </figure>
        `;
        i++;
        if (i == counter) {
            break;
        }
    }
}
let counterProduct = 0;
let basket = {}
function addProduct(element){
    counterProduct++;
    document.querySelector(".counter-product").innerHTML = counterProduct;
}

const sortSelect = document.querySelector('.sort-select');

function sorted(response) {
    if (sortSelect.value == "default") {
        return defaultSort(response);
    }
    if (sortSelect.value == "cheap") {
        return cheapSort(response);
    }
    if (sortSelect.value == "expensive") {
        return expensiveSort(response);
    }
}

function cheapSort(response) {
    let newArray = []
    for (let res in response) {
        newArray.push(response[res]);
    }
    for (let j = 0; j < newArray.length - 1; j++) {
        for (let i = 0; i < newArray.length - 1; i++) {
            if (newArray[i].price > newArray[i + 1].price) {
                const temp = newArray[i];
                newArray[i] = newArray[i + 1];
                newArray[i + 1] = temp;
            }
        }
    }
    return newArray;
}
function expensiveSort(response) {
    let newArray = []
    for (let res in response) {
        newArray.push(response[res]);
    }
    for (let j = 0; j < newArray.length - 1; j++) {
        for (let i = 0; i < newArray.length - 1; i++) {
            if (newArray[i].price < newArray[i + 1].price) {
                const temp = newArray[i];
                newArray[i] = newArray[i + 1];
                newArray[i + 1] = temp;
            }
        }
    }
    return newArray;
}

function defaultSort(response) {
    let newArray = []
    for (let res in response) {
        newArray.push(response[res]);
    }
    for (let j = 0; j < newArray.length - 1; j++) {
        for (let i = 0; i < newArray.length - 1; i++) {
            if (newArray[i].id > newArray[i + 1].id) {
                const temp = newArray[i];
                newArray[i] = newArray[i + 1];
                newArray[i + 1] = temp;
            }
        }
    }
    return newArray;
}

let counter = 18;
function showProducts(value = "", search = "") {
    if (Number(minPrice.value) > Number(maxPrice.value)) {
        maxPrice.value = minPrice.value;
    }
    const maxElement = getMaxElement(response);
    if (Number(minPrice.value) > maxElement) {
        minPrice.value = maxElement;
    }
    if (Number(maxPrice.value) > maxElement) {
        maxPrice.value = maxElement;
    }
    response = sorted(response);
    if (value != "") {
        counter = value;
    }
    generate(response, search);
}

function replace(element) {
    element.value = element.value.replace(/[^0-9]/g, '');
}

const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');
 
btnSearch.addEventListener('click', () => {
    const search = inputSearch.value;
    showProducts("", search);
})

inputSearch.addEventListener('keydown', (event)=>{
    if (event.which == 13){
        const search = inputSearch.value;
        showProducts("", search);
    }
    const search = inputSearch.value;
    showProducts("", search);
})
