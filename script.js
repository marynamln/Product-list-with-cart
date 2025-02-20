document.addEventListener('DOMContentLoaded', function () {

    loadMenu();

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            addToCart(event.target);
        }

        if (event.target.classList.contains("delete-from-order")) {
            removeFromCart(event.target);
        }

        if (event.target.classList.contains("confirm-order")) {
            orderConfirmation();
        }

        if (event.target.classList.contains("start-new-order")) {
            startNewOrder();
        }
    });

    function startNewOrder() {
        const orderConfSection = document.querySelector(".order-confirmation-section");
        const overlay = document.querySelector(".modal-overlay");

        orderConfSection.remove();
        overlay.remove();

        const deleteFromOrder = document.querySelectorAll(".delete-from-order");
        deleteFromOrder.forEach((button) => {
            removeFromCart(button);
        });
    }

    function orderConfirmation() {
        const page = document.querySelector(".main");

        const totalPrice = document.querySelector(".order-total-price").textContent;
        const orderItems = document.querySelectorAll(".order-item");

        let orderItemsHTML = "";
        orderItems.forEach(item => {
            const productName = item.querySelector(".order-item-name").textContent;
            const productQuantity = item.querySelector(".quantity-order").textContent;
            const productPrice = item.querySelector(".item-price").textContent;
            const productPriceAll = item.querySelector(".item-price-all").textContent;

            let imagSrc;
            menuData.forEach((menuItem) => {
                if (menuItem.name === productName) {
                    imagSrc = menuItem.image.thumbnail;
                }
            });
    
            orderItemsHTML += `
                <div class="order-conf-item">
                    <img class="img-thumbnail" src=${imagSrc} />
                    <div class="img-thumbnail-right-section">
                        <div class="order-conf-item-stat">
                            <h5 class="order-item-name">${productName}</h5>
                            <div class="order-conf-item-qp">
                                <span class="order-conf-item-quantity">${productQuantity}</span>
                                <span class="order-conf-item-price">${productPrice}</span>
                            </div>    
                        </div>
                        <h4 class="conf-item-price-all">${productPriceAll}</h4>
                    </div>    
                </div>
            `;
        });

        const orderConfDiv = document.createElement("div");
        orderConfDiv.classList.add("order-confirmation-section");
        orderConfDiv.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
            <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
            </svg>

            <h2 class="order-conf-title">Order Confirmed</h2>
            <div class="order-conf-desc">We hope you enjoy your food!</div>

            <div class="order-conf-items">
                ${orderItemsHTML}
                <div class="order-conf-total-section">
                    Order Total <p class="order-conf-total-price">${totalPrice}</p>
                </div>
            </div>

            <button class="start-new-order">Start New Order</button>
        `;

        const modal = document.createElement("div");
        modal.classList.add("modal-overlay");

        page.appendChild(modal);
        page.appendChild(orderConfDiv);
    }

    function addToCart(button) {
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);

        const imgSection = button.closest(".image-section");
        const imgItem = imgSection.querySelector(".item-image");
        imgItem.style.border = "2px solid hsl(14, 86%, 42%)";

        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.dataset.name = productName;
        orderItem.dataset.price = productPrice;
        orderItem.innerHTML = `
            <div class="order-item-information">
                <h4 class="order-item-name">${productName}</h4>
                <div class="order-item-stat">
                    <p class="quantity-order">1x</p>
                    <p class="item-price">@ $${productPrice.toFixed(2)}</p>
                    <p class="item-price-all">$${productPrice.toFixed(2)}</p>
                </div>
            </div>
            <button class="delete-from-order">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </button>
        `;
        cartItemsContainer.appendChild(orderItem);

        updateCartTotal();
        transformToQuantitySelector(button, productName, productPrice);
    }

    const cartSection = document.querySelector(".cart-section");
    const cartItemsContainer = document.createElement("div");
    cartItemsContainer.classList.add("cart-items");
    cartSection.appendChild(cartItemsContainer);

    const orderTotal = document.createElement("div");
    orderTotal.classList.add("order-total");
    orderTotal.innerHTML = `
        <p class="order-total-title">Order Total</p>
        <p class="order-total-price">$</p>
    `;
    cartSection.appendChild(orderTotal);

    const deliveryInformation = document.createElement("div");
    deliveryInformation.classList.add("delivery-info");
    deliveryInformation.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
        This is a  <strong>carbon-neutral</strong>  delivery
    `;
    cartSection.appendChild(deliveryInformation);
    deliveryInformation.style.display = "none";

    const confirmOrderButton = document.createElement("button");
    confirmOrderButton.classList.add("confirm-order");
    confirmOrderButton.textContent = "Confirm Order";
    cartSection.appendChild(confirmOrderButton);

    orderTotal.style.display = "none";
    confirmOrderButton.style.display = "none";

    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll(".order-item .item-price-all").forEach(item => {
            total += parseFloat(item.textContent.replace("$", ""));
        });

        let totalProducts = 0;
        document.querySelectorAll(".order-item .quantity-order").forEach(item => {
            totalProducts += parseFloat(item.textContent.replace("x", ""));
        });
    
        document.querySelector(".order-total-price").textContent = "$" + total.toFixed(2);
        document.querySelector(".cart-title").textContent = "Your Cart (" + totalProducts + ")";

        const cartSectionEmpty = document.querySelector(".your-cart-empty");
    
        if (total === 0) {
            orderTotal.style.display = "none";
            confirmOrderButton.style.display = "none";
            deliveryInformation.style.display = "none";
            cartSectionEmpty.style.display = "flex";
        } else {
            orderTotal.style.display = "flex";
            confirmOrderButton.style.display = "block";
            deliveryInformation.style.display = "flex";
            cartSectionEmpty.style.display = "none";
        }
    }

    function removeFromCart(button) {
        const cartItem = button.closest(".order-item");
        const productName = cartItem.dataset.name;
        const productPrice = cartItem.dataset.price;

        cartItem.remove();

        const menuItem = document.querySelector(`.quantity-selector[data-name="${productName}"]`);

        const imgSection = menuItem.closest(".image-section");
        const imgItem = imgSection.querySelector(".item-image");
        imgItem.style.border = "none";

        if (menuItem) {
            const quantityElement = menuItem.querySelector(".quantity");
            quantityElement.textContent = "0";

            const addToCartButton = document.createElement("button");
            addToCartButton.classList.add("add-to-cart");
            addToCartButton.dataset.name = productName;
            addToCartButton.dataset.price = productPrice;
            addToCartButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                Add to cart
            `;
            menuItem.replaceWith(addToCartButton);
        }

        updateCartTotal();
    }

    function updateCartItem(productName, quantity) {
        const orderItem = document.querySelector(`.order-item[data-name="${productName}"]`);

        if (orderItem) {
            const itemPrice = parseFloat(orderItem.dataset.price);
            const totalPrice = itemPrice * quantity;
            
            orderItem.querySelector(".quantity-order").textContent = `${quantity}x`;
            orderItem.querySelector(".item-price-all").textContent = `$${totalPrice.toFixed(2)}`;
        }
    }

    function transformToQuantitySelector(button, productName, productPrice) {
        const container = document.createElement("div");
        container.classList.add("quantity-selector");
        container.dataset.name = productName;
        container.dataset.price = productPrice;
    
        const minusButton = document.createElement("button");
        minusButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
        `;
        minusButton.classList.add("minus");
    
        const quantitySpan = document.createElement("span");
        quantitySpan.textContent = "1";
        quantitySpan.classList.add("quantity");
    
        const plusButton = document.createElement("button");
        plusButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
        `;
        plusButton.classList.add("plus");
    
        container.appendChild(minusButton);
        container.appendChild(quantitySpan);
        container.appendChild(plusButton);
    
        button.replaceWith(container);

        plusButton.addEventListener("click", () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;

            updateCartItem(productName, quantity);
            updateCartTotal();
        });
    
        minusButton.addEventListener("click", () => {

            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;

                updateCartItem(productName, quantity);
            } else {
                container.replaceWith(button);

                const imgSection = button.closest(".image-section");
                const imgItem = imgSection.querySelector(".item-image");
                imgItem.style.border = "none";

                const orderItem = document.querySelector(`.order-item[data-name="${productName}"]`);
                orderItem.remove();
            }
            updateCartTotal();
        });
    }

    function createMenuItem(item) {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        menuItem.innerHTML = `
            <div class="image-section">
                <img class="item-image" src="${item.image.desktop}" />

                <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                    Add to cart
                </button>
            </div>

            <div class="description">
                <p class="category">${item.category}</p>
                <p class="item-name">${item.name}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
        `;
    
        return menuItem;
    }

    let menuData;
    
    async function loadMenu() {
        try {
            const response = await fetch("data.json");
            menuData = await response.json();
    
            const menuContainer = document.getElementById("menu");
    
            menuData.forEach((item) => {
                const menuItemElement = createMenuItem(item);
                menuContainer.appendChild(menuItemElement);
            });
        } catch (error) {
            console.error("Помилка завантаження меню:", error);
        }
    }

});