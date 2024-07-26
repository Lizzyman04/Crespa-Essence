document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const phoneNumber = "+258861350051",
        buyItNow = document.querySelector('.buy-it-now'),
        buyNow = document.querySelector('.buy-now');

    buyItNow.addEventListener('click', () => {
        redirectToWhatsApp("Olá Crespa Essence, estou interessada(o) em adquirir o DuoNutri");
    });

    buyNow.addEventListener('click', () => {
        redirectToWhatsApp("Olá Crespa Essence");
    });

    function redirectToWhatsApp(message) {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
});

