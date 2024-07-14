document.addEventListener('DOMContentLoaded', (event) => {
    // Handle dynamic message for the homepage
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        const today = new Date();
        const hours = today.getHours();
        let greeting;

        if (hours < 12) {
            greeting = "Good Morning! Discover amazing crafts to start your day!";
        } else if (hours < 18) {
            greeting = "Good Afternoon! Unwind with our beautiful handmade crafts.";
        } else {
            greeting = "Good Evening! Explore our unique craft collection tonight.";
        }

        const greetingElement = document.createElement('p');
        greetingElement.textContent = greeting;
        heroSection.appendChild(greetingElement);
    }

    // Handle "Shop Now" button click
    const shopNowButton = document.querySelector('#hero button');
    if (shopNowButton) {
        shopNowButton.addEventListener('click', () => {
            window.location.href = 'shop.html';
        });
    }

    // Simple cart functionality (for demonstration purposes)
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartPage = document.querySelector('#cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const product = button.closest('.pro');
            const productName = product.querySelector('.des h5').textContent;
            const productPrice = product.querySelector('.des h4').textContent;
            const productImg = product.querySelector('img').src;

            const cartItem = {
                name: productName,
                price: productPrice,
                img: productImg
            };

            cartItems.push(cartItem);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert(`${productName} has been added to your cart.`);
            updateCart();
        });
    });

    function updateCart() {
        console.log('Updating cart');
        if (cartPage) {
            const cartContent = cartPage.querySelector('section');
            cartContent.innerHTML = '<h2>Shopping Cart</h2>';

            if (cartItems.length === 0) {
                cartContent.innerHTML += '<p>Your cart is currently empty.</p>';
                return;
            }

            const cartList = document.createElement('ul');
            cartItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${item.img}" alt="${item.name}" width="50">
                    <span>${item.name}</span>
                    <span>${item.price}</span>
                `;
                cartList.appendChild(listItem);
            });

            cartContent.appendChild(cartList);
        }
    }

    updateCart();
});
