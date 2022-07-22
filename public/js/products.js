const productID = (id) => {
    const image = document.getElementById(id).querySelector('.product-img').getAttribute("src");
    const price = document.getElementById(id).querySelector('.product-price').getAttribute("price");
    const name = document.getElementById(id).getAttribute("name");

    let obj = { image, price, name };
    localStorage.setItem('productDetail', JSON.stringify(obj));
    location.href = '/product-detail';
}


