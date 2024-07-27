document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Easily Changeable Variable e Objs
    const phoneNumber = "+258861350051",
        products = {
            "DuoNutri": {
                "img": "products/DuoNutri.webp",
                "p1": "O DuoNutri é composto por Óleo de Rícino, cravo-da-índia e algumas ervas essenciais.",
                "p2": "Ele hidrata e nutre o cabelo, estimula o crescimento, reduz o frizz, fortalece os fios, controla a oleosidade e dá um brilho natural ao cabelo."
            },
            "AmlaMix": {
                "img": "products/AmlaMix.webp",
                "p1": "O AmlaMix é composto por pó de Amla, ervas essências e alguns óleos.",
                "p2": "Ele estimula o crescimento capilar, previne a queda capilar, combate cabelos grisalhos precoces, condiciona e hidrata combate a caspa, fortalece o cabelo, melhora a circulação sanguínea no couro cabeludo e o pulo do gato, ajuda os cabelos a ficarem mais pretinhos."
            }
        }

    const typingSpeed = 80;
    const holdTimeBeforeErasing = 10000;
    const eraseSpeed = 40;
    const initialProduct = "DuoNutri";

    // Elements
    const buy_products = document.querySelector('#buy-products'),
        product_name = document.querySelector("#product-name"),
        product_desc1 = document.querySelector('#product-desc-1'),
        product_desc2 = document.querySelector('#product-desc-2'),
        product_img = document.querySelector('#product-image'),
        see_product_price = document.querySelector('#see-price'),
        buy_product_now = document.querySelector('#buy-product'),
        buy_duonutri = document.querySelector('#buy-duonutri'),
        buy_amlamix = document.querySelector('#buy-duonutri-10off'),
        buy_duonutri10off = document.querySelector('#buy-amlamix');

    // Events
    let currentProduct = initialProduct;
    displayProductDetails(currentProduct);

    buy_products.addEventListener('click', () => {
        redirectToWhatsApp("Olá Crespa Essence, estou interessada(o) em adquirir um dos seus produtos!");
    });

    buy_product_now.addEventListener('click', (event) => {
        const product = event.currentTarget.getAttribute('data-product');
        redirectToWhatsApp(`Olá Crespa Essence, estou interessada(o) em adquirir o ${product}!`);
    });

    buy_duonutri.addEventListener('click', () => {
        redirectToWhatsApp("Olá Crespa Essence, estou interessada(o) em adquirir o DuoNutri!");
    });

    buy_amlamix.addEventListener('click', () => {
        redirectToWhatsApp("Olá Crespa Essence, estou interessada(o) em adquirir o AmlaMix!");
    });

    buy_duonutri10off.addEventListener('click', () => {
        redirectToWhatsApp("Olá Crespa Essence, estou interessada(o) em adquirir mais de 8 frascos do produto DuoNutri!");
    });

    see_product_price.addEventListener('click', (event) => {
        const product = event.currentTarget.getAttribute('data-product');
        const priceSection = document.getElementById(`${product}-price`);
        if (priceSection) {
            priceSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Functions
    function displayProductDetails(product) {
        product_img.src = products[product].img;
        typeWriter(product_name, product, 0, () => {
            see_product_price.setAttribute('data-product', product);
            buy_product_now.setAttribute('data-product', product);
            product_img.classList.remove('remove_product_img');
            typeWriter(product_desc1, products[product].p1, 0, () => {
                see_product_price.classList.remove("remove_product_button");
                buy_product_now.classList.remove("remove_product_button");
                typeWriter(product_desc2, products[product].p2, 0, () => {
                    see_product_price.classList.add("remove_product_button");
                    buy_product_now.classList.add("remove_product_button");
                    eraseText(product_desc2, products[product].p2, 0, () => {
                        product_img.classList.add('remove_product_img');
                        eraseText(product_desc1, products[product].p1, 0, () => {
                            eraseText(product_name, product, 0, () => {
                                currentProduct = currentProduct === "DuoNutri" ? "AmlaMix" : "DuoNutri";
                                displayProductDetails(currentProduct);
                            }, 100);
                        }, 200);
                    }, 0);
                }, holdTimeBeforeErasing);
            }, 0);
        }, 200);
    }

    function typeWriter(element, text, textPos, callback, callback_delay) {
        element.innerHTML = text.substring(0, textPos) + (textPos < text.length ? '|' : '');

        if (textPos++ === text.length) {
            setTimeout(callback, callback_delay);
        } else {
            setTimeout(() => typeWriter(element, text, textPos, callback, callback_delay), typingSpeed);
        }
    }

    function eraseText(element, text, textPos, callback, callback_delay) {
        element.innerHTML = text.substring(0, text.length - textPos) + (textPos < text.length ? '|' : '');

        if (textPos++ === text.length) {
            setTimeout(callback, callback_delay);
        } else {
            setTimeout(() => eraseText(element, text, textPos, callback, callback_delay), eraseSpeed);
        }
    }

    function redirectToWhatsApp(message) {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
});

