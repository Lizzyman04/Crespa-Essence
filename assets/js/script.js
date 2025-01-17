/*
 * Crespa Essence - Landing Page
 * Programado por: Arlindo Abdul
 * Email: admin@tudocomlizzyman.com
 * Repositório: https://github.com/Lizzyman04/Crespa-Essence
 * Licença: MIT
 * 
 * Esta é uma simples landing page para vender produtos cosméticos a partir do WhatsApp
 * Você pode baixar, editar ou alterar qualquer parte deste código para fins pessoais ou comerciais
 */

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
        },
        tutorial = {
            "Como colocar o AmlaMix no cabelo com tranças?": "tutorial/amlamix-com-trancas.mp4",
            "Quais são os benefícios do óleo DuoNutri?": "tutorial/beneficios-duonutri.mp4",
            "Quais são os benefícios do óleo AmlaMix?": "tutorial/beneficios-amlamix.mp4"
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
        buy_amlamix = document.querySelector('#buy-amlamix'),
        buy_duonutri10off = document.querySelector('#buy-duonutri-10off'),
        slider = document.querySelector('#slider'),
        video_title = document.querySelector('.video-title'),
        left_slide = document.querySelector('.left-slide'),
        right_slide = document.querySelector('.right-slide'),
        message = document.querySelector('#message'),
        send_whatsapp_message = document.querySelector('.send-whatsapp-message'),
        send_sms = document.querySelector('.send-sms');

    // Events
    let currentProduct = initialProduct, index = 0;

    displayProductDetails(currentProduct);
    displayVideoSlider(tutorial);

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

    send_whatsapp_message.addEventListener('click', () => {
        redirectToWhatsApp(message.value);
    });

    send_sms.addEventListener('click', () => {
        sendSMS(message.value);
    });

    see_product_price.addEventListener('click', (event) => {
        const product = event.currentTarget.getAttribute('data-product');
        const priceSection = document.getElementById(`${product}-price`);
        if (priceSection) {
            priceSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    left_slide.addEventListener('click', () => {
        moveToSlide(tutorial, index - 1);
    });

    right_slide.addEventListener('click', () => {
        moveToSlide(tutorial, index + 1);
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

    function displayVideoSlider(tutorials) {
        const titles = Object.keys(tutorials);

        titles.forEach(title => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const video = document.createElement('video');
            video.src = tutorials[title];
            video.controls = true;

            slide.appendChild(video);
            slider.appendChild(slide);
        });

        video_title.textContent = titles[0];
    }

    function moveToSlide(tutorials, i) {
        const slider = document.querySelector('#slider');
        const slides = document.querySelectorAll('.slide');
        const titles = Object.keys(tutorials);

        if (i >= slides.length) {
            i = 0;
        } else if (i < 0) {
            i = slides.length - 1;
        }

        video_title.textContent = titles[i];
        slider.style.transform = `translateX(${-i * 100}%)`;
        index = i;
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

    function sendSMS(message) {
        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
});

