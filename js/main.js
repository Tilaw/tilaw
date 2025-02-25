(function ($) {
    "use strict";

    jQuery(document).on("ready", function () {
        /*PRELOADER JS*/
        $(window).on("load", function () {
            $(".preloader").fadeOut();
            $(".status-mes").delay(350).fadeOut("slow");
        });
        /*END PRELOADER JS*/

        /*DROPDOWN JS*/

        /*Start Search JS*/
        window.REMODAL_GLOBALS = {
            NAMESPACE: "modal",
            DEFAULTS: {
                hashTracking: false,
            },
        };

        /*	Mobile Menu
	------------------------*/
        $(".mobile-menu nav").meanmenu({
            meanScreenWidth: "767",
            meanMenuContainer: ".header_btm_area .col-xs-12.col-sm-12.col-md-7",
        });

        // jQuery Lightbox
        jQuery(".lightbox").venobox({
            numeratio: true,
            infinigall: true,
        });

        $(".venobox").venobox();

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $("#header").addClass("menu-shrink");
            } else {
                $("#header").removeClass("menu-shrink");
            }
        });

        $("a").on("click", function (e) {
            var anchor = $(this);
            $("html, body")
                .stop()
                .animate(
                    {
                        scrollTop: $(anchor.attr("href")).offset().top - 50,
                    },
                    1500
                );
            e.preventDefault();
        });

        // Declare Carousel jquery object
        var slider_active = $(".slider_active");
        slider_active.owlCarousel({
            loop: true,
            navText: [
                '<i class="fa fa-long-arrow-left"></i>',
                '<i class="fa fa-long-arrow-right"></i>',
            ],
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            smartSpeed: 450,
            autoplay: true,
            autoplayTimeout: 9000,
            mouseDrag: false,
            nav: true,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
        });

        // Countdown

        $("#countdown").countdown("2020/3/10", function (event) {
            var $this = $(this).html(
                event.strftime(
                    "" +
                        "<div><strong>%D</strong> <br />Days </div>" +
                        "<div><strong>%H</strong> <br />Hours </div>" +
                        "<div><strong>%M</strong> <br />Minutes </div>" +
                        "<div><strong>%S</strong> <br />Seconds</div>"
                )
            );
        });

        // Testimonials slider
        $("#testimonial-slider").owlCarousel({
            items: 2,
            navText: [
                '<i class="ti-arrow-left"></i>',
                '<i class="ti-arrow-right"></i>',
            ],
            smartSpeed: 450,
            autoplay: true,
            autoplayTimeout: 6000,
            mouseDrag: true,
            nav: true,
            dots: false,
            loop: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
        });

        // brand slider
        $(".brand_slide").owlCarousel({
            loop: true,
            dots: true,
            autoplay: true,
            responsiveClass: true,
            items: 6, //10 items above 1000px browser width
            responsive: {
                0: {
                    items: 2,
                    nav: false,
                },
                400: {
                    items: 2,
                    nav: false,
                },
                600: {
                    items: 3,
                    nav: false,
                },
                1000: {
                    items: 6,
                    nav: false,
                    loop: true,
                },
            },
        });

        // testimonial slider
        $(".test_slide").owlCarousel({
            autoplay: false,
            responsiveClass: true,
            items: 1, //10 items above 1000px browser width
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                },
                600: {
                    items: 1,
                    nav: false,
                },
                1000: {
                    items: 1,
                    nav: false,
                },
            },
        });

        // Counter
        $(".counter").counterUp({
            delay: 10,
            time: 1000,
        });

        // jQuery MixItUp
        $(".product_item").mixItUp();

        // Vide Section
        $("#video").simplePlayer();
    });

    new WOW().init();
})(jQuery);

// Utility functions for localStorage handling
function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function addToWishlist(product) {
    const wishlist = getWishlist();
    if (!wishlist.find((item) => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        showSnackbar(`${product.name} added to wishlist`);
    }
}

function addToCart(product) {
    const cart = getCart();
    if (!cart.find((item) => item.id === product.id)) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        showSnackbar(`${product.name} added to cart`);
        updateCartBadge();
        updateMiniCart();
    }
}

function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.classList.add("show");
    setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
}

// On DOM load, add click handlers to wishlist and cart buttons
document.addEventListener("DOMContentLoaded", function () {
    // Initialize cart UI elements
    updateCartBadge();
    updateMiniCart();

    const products = document.querySelectorAll(".product-grid");
    products.forEach((product) => {
        // Prepare product data (adjust selectors as needed)
        const productData = {
            id:
                product.getAttribute("data-id") ||
                Math.random().toString(36).substr(2, 9),
            name: product.querySelector(".title a").textContent,
            price: product
                .querySelector(".price")
                .childNodes[0].textContent.trim(),
            image: product.querySelector(".pic-1").src,
        };

        const wishlistBtn = product.querySelector(
            '[data-tip="Add to Wishlist"]'
        );
        const cartBtn = product.querySelector('[data-tip="Add to Cart"]');

        if (wishlistBtn) {
            wishlistBtn.addEventListener("click", (e) => {
                e.preventDefault();
                addToWishlist(productData);
            });
        }

        if (cartBtn) {
            cartBtn.addEventListener("click", (e) => {
                e.preventDefault();
                addToCart(productData);
            });
        }
    });

    // If current page is cart.html or wishlist.html, render the saved items
    if (window.location.pathname.indexOf("cart.html") !== -1) {
        displayCartItems();
    }
    if (window.location.pathname.indexOf("wishlist.html") !== -1) {
        displayWishlistItems();
    }
});

function displayCartItems() {
    const cart = getCart();
    const cartTable = document.querySelector(".cart_prdct_table tbody");
    if (!cartTable) return;
    cartTable.innerHTML = cart
        .map(
            (item, index) => `
        <tr>
            <td><span class="cp_no">${index + 1}</span></td>
            <td><a href="#" class="cp_img"><img src="${item.image}" alt="${
                item.name
            }" /></a></td>
            <td><a href="#" class="cp_title">${item.name}</a></td>
            <td>
                <div class="cp_quntty">
                    <input name="quantity" value="1" size="2" type="number">
                </div>
            </td>
            <td><p class="cp_price">${item.price}</p></td>
            <td><p class="cpp_total">${item.price}</p></td>
            <td><a class="btn btn-default cp_remove" onclick="removeFromCart('${
                item.id
            }')"><i class="fa fa-trash"></i></a></td>
        </tr>
    `
        )
        .join("");
}

function displayWishlistItems() {
    const wishlist = getWishlist();
    const wishlistTable = document.querySelector(".cart_prdct_table tbody");
    if (!wishlistTable) return;
    wishlistTable.innerHTML = wishlist
        .map(
            (item, index) => `
        <tr>
            <td><span class="cart-number">${index + 1}</span></td>
            <td><a href="#" class="cp_img"><img src="${item.image}" alt="${
                item.name
            }" /></a></td>
            <td><a href="#" class="cart-pro-title">${item.name}</a></td>
            <td><p class="stock in-stock">In stock</p></td>
            <td><p class="cart-pro-price">${item.price}</p></td>
            <td><a href="#" class="btn border-btn" onclick="moveToCart('${
                item.id
            }')">add to cart</a></td>
            <td><a class="cp_remove" onclick="removeFromWishlist('${
                item.id
            }')"><i class="fa fa-trash"></i></a></td>
        </tr>
    `
        )
        .join("");
}

function removeFromCart(id) {
    const cart = getCart().filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    if (window.location.pathname.indexOf("cart.html") !== -1) {
        displayCartItems();
    }
    updateCartBadge();
    updateMiniCart();
    showSnackbar("Item removed from cart");
}

function removeFromWishlist(id) {
    const wishlist = getWishlist().filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displayWishlistItems();
    showSnackbar("Item removed from wishlist");
}

function moveToCart(id) {
    const wishlist = getWishlist();
    const item = wishlist.find((item) => item.id === id);
    if (item) {
        addToCart(item);
        removeFromWishlist(id);
        showSnackbar("Item moved to cart");
    }
}

function calculateCartTotal(cart) {
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + price;
    }, 0);
}

function updateCartBadge() {
    const cart = getCart();
    const cartBadge = document.querySelector(".cart_number");
    if (cartBadge) {
        cartBadge.textContent = cart.length;
        cartBadge.setAttribute("data-cart-count", cart.length);
    }
}

function updateMiniCart() {
    const cart = getCart();
    const miniCartList = document.querySelector(
        ".mini-cart-wrapper .mc-pro-list"
    );
    const subtotalElement = document.querySelector(".mc-subtotal h4 span");

    if (miniCartList) {
        miniCartList.innerHTML = cart
            .map(
                (item) => `
            <li>
                <div class="mc-pro-detail">
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="mc-pro-title">
                        <h5>${item.name}</h5>
                        <p class="price">${item.price}</p>
                    </div>
                    <a href="javascript:void(0)" onclick="removeFromCart('${item.id}')" class="mc-remove"><i class="fa fa-trash"></i></a>
                </div>
            </li>
        `
            )
            .join("");
    }

    if (subtotalElement) {
        const total = calculateCartTotal(cart);
        subtotalElement.textContent = `$${total.toFixed(2)}`;
    }
}
