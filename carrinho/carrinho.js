// Função utilitária para formatar preço
function formatPrice(price) {
    return 'R$ ' + price.toFixed(2).replace('.', ',');
}

// Carregar itens do carrinho do localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Seu carrinho está vazio.</div>';
        cartTotalDiv.textContent = '';
        return;
    }
    let total = 0;
    cartItemsDiv.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `<div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.img}" alt="${item.title}">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-item-qty">x${item.qty}</span>
            <span>${formatPrice(item.price * item.qty)}</span>
        </div>`;
    }).join('');
    cartTotalDiv.textContent = 'Total: ' + formatPrice(total);
}

// Inicializar carrinho ao carregar página
document.addEventListener('DOMContentLoaded', loadCart);

// Adicionar evento para limpar carrinho
document.getElementById('limpar-btn').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        localStorage.removeItem('cart');
        loadCart();
        if (window.updateCartBadge) window.updateCartBadge();
    }
});

// Função para adicionar item ao carrinho no localStorage
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(prod => prod.title === item.title);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({...item, qty: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = {
            title: this.getAttribute('data-title'),
            price: parseFloat(this.getAttribute('data-price')),
            img: this.getAttribute('data-img')
        };
        addToCart(item);
        this.textContent = 'Adicionado!';
        setTimeout(() => { this.textContent = 'Adicionar ao Carrinho'; }, 1200);
        if (window.updateCartBadge) window.updateCartBadge();
    });
});