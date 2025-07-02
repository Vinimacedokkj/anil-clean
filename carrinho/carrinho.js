// Função utilitária para formatar preço
function formatPrice(price) {
    return 'R$ ' + price.toFixed(2).replace('.', ',');
}

// Carregar itens do carrinho do localStorage
function loadCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    
    if (!cartItemsDiv || !cartTotalDiv) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
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
    
    // Atualizar badge do carrinho
    updateCartBadge();
    
    // Mostrar feedback visual
    showAddToCartFeedback();
}

// Função para mostrar feedback visual quando item é adicionado
function showAddToCartFeedback() {
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.textContent = 'Item adicionado ao carrinho!';
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Adicionar animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(feedback);
    
    // Remover após 2 segundos
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 2000);
}

// Atualiza o badge do carrinho com o número de itens
function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (!badge) return;
    
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) { 
        cart = []; 
    }
    
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    
    if (totalQty > 0) {
        badge.textContent = totalQty;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Função para inicializar os botões de adicionar ao carrinho
function initializeAddToCartButtons() {
    // Remover event listeners existentes
    const existingButtons = document.querySelectorAll('.add-to-cart-btn');
    existingButtons.forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Adicionar novos event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const item = {
                title: this.getAttribute('data-title'),
                price: parseFloat(this.getAttribute('data-price')),
                img: this.getAttribute('data-img')
            };
            
            // Validar dados do item
            if (!item.title || !item.price || !item.img) {
                console.error('Dados do item inválidos:', item);
                return;
            }
            
            addToCart(item);
            
            // Feedback visual no botão
            const originalText = this.textContent;
            this.textContent = 'Adicionado!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1200);
        });
    });
}

// Função para limpar carrinho
function clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        localStorage.removeItem('cart');
        loadCart();
        updateCartBadge();
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrinho se estivermos na página do carrinho
    if (document.getElementById('cart-items')) {
        loadCart();
        
        // Adicionar evento para limpar carrinho
        const limparBtn = document.getElementById('limpar-btn');
        if (limparBtn) {
            limparBtn.addEventListener('click', clearCart);
        }
        
        // Adicionar evento para solicitar
        const solicitarBtn = document.getElementById('solicitar-btn');
        if (solicitarBtn) {
            solicitarBtn.addEventListener('click', function() {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                if (cart.length === 0) {
                    alert('Seu carrinho está vazio!');
                    return;
                }
                alert('Solicitação enviada! Em breve entraremos em contato.');
            });
        }
    }
    
    // Inicializar botões de adicionar ao carrinho
    initializeAddToCartButtons();
    
    // Atualizar badge do carrinho
    updateCartBadge();
});

// Exportar funções para uso global
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;
window.clearCart = clearCart;
window.loadCart = loadCart;
window.initializeAddToCartButtons = initializeAddToCartButtons; 