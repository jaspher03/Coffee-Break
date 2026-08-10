// ========================================
// SHOW MENU PAGE
// ========================================

function showPage(pageId) {

    // Hide all coffee menu pages
    const coffeePages = document.querySelectorAll(".menu-container");

    coffeePages.forEach(page => {
        page.classList.remove("active");
    });

    // Hide all bakery pages
    const bakeryPages = document.querySelectorAll(".bakery-container");

    bakeryPages.forEach(page => {
        page.classList.remove("active");
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }
}


// ========================================
// CLOSE MENU PAGE
// ========================================

function closePage() {

    // Hide coffee menu
    const coffeePages = document.querySelectorAll(".menu-container");

    coffeePages.forEach(page => {
        page.classList.remove("active");
    });

    // Hide bakery menu
    const bakeryPages = document.querySelectorAll(".bakery-container");

    bakeryPages.forEach(page => {
        page.classList.remove("active");
    });

    // Show category cards again
    const cards = document.querySelector(".cards-main");

    if (cards) {
        cards.style.display = "grid";
    }
}


// ========================================
// COFFEE SEARCH BAR
// ========================================

const coffeeSearchInput = document.getElementById("searchInput");
const coffeeCards = document.querySelectorAll(".coffee-list");

if (coffeeSearchInput) {

    coffeeSearchInput.addEventListener("input", function () {

        // Get what user typed
        const searchValue = this.value.toLowerCase().trim();

        coffeeCards.forEach(card => {

            // Get coffee name
            const coffeeName = card
                .querySelector(".details h2")
                .textContent
                .toLowerCase();

            // Show if it matches
            if (coffeeName.includes(searchValue)) {
                card.style.display = "";
            } 
            else {
                card.style.display = "none";
            }

        });

    });

}


// ========================================
// BAKERY SEARCH BAR
// ========================================

const bakerySearchInput = document.getElementById("searchInputBakery");
const bakeryCards = document.querySelectorAll(".bakery-list");

if (bakerySearchInput) {

    bakerySearchInput.addEventListener("input", function () {

        // Get what user typed
        const searchValue = this.value.toLowerCase().trim();

        bakeryCards.forEach(card => {

            // Get bakery name
            const bakeryName = card
                .querySelector(".bakery-details h2")
                .textContent
                .toLowerCase();

            // Show if it matches
            if (bakeryName.includes(searchValue)) {
                card.style.display = "";
            } 
            else {
                card.style.display = "none";
            }

        });

    });

}

//BUY NOW BUTTONS
let cart = [];

function addToCart(name, price) {

    // Check if item already exists
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();

    // Open cart
    document.getElementById("cartMenu").classList.add("active");
}


function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>
        `;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}


function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();
}


function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

//THANK YOU POPUP
function closeCart() {

    document.getElementById("cartMenu").classList.remove("active");
}

function checkout() {

    // Don't checkout if cart is empty
    if (cart.length === 0) {
        return;
    }

    // Reset cart
    cart = [];

    // Update cart
    displayCart();

    // Close cart menu
    document.getElementById("cartMenu").classList.remove("active");

    // Show thank-you popup
    document.getElementById("thankYouPopup").classList.add("active");
}


function closeThankYou() {

    document.getElementById("thankYouPopup").classList.remove("active");
}