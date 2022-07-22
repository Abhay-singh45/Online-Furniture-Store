let obj2 = JSON.parse(localStorage.getItem('productDetail'));

let productSection = document.querySelector('.product-section');

productSection.innerHTML += `
    <img src="${obj2.image}" alt="" class="product-image">
    <div class="product-detail">
        <h1 class="product-title">${obj2.name}</h1>
        <p class="product-des">High quality, durable, reliable furniture won’t need constant repairs, touch-ups or maintenance.</p>
        <div class="rating">
            <img src="img/fill star.png" alt="" class="star">
            <img src="img/fill star.png" alt="" class="star">
            <img src="img/fill star.png" alt="" class="star">
            <img src="img/fill star.png" alt="" class="star">
            <img src="img/no fill star.png" alt="" class="star">
            <span class="rating-count">4023 reviews</span>
        </div>
        <p class="price">$${obj2.price}</p>
        <div class="btn-container">
            <button class="product-btn buy-btn">buy now</button>
            <button class="product-btn cart-btn">add to cart</button>
        </div>
    </div>
`

let ratingStarInput = [...document.querySelectorAll('.rating-star')];

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                ratingStarInput[i].src = './img/fill star.png';
            } else {
                ratingStarInput[i].src = './img/no fill star.png';
            }
        }
    })
})


//adding product to cart
let cartBtn = document.querySelector('.cart-btn');

cartBtn.addEventListener('click', () => {
    cartBtn.innerHTML = add_product_to_cart(obj2);
})