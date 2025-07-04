// Função para gerar mensagem do pedido (sem preços)
function generateOrderMessage(cart) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const config = window.CART_CONFIG || {
        companyName: 'ANILCLEAN',
        customMessage: 'Por favor, entre em contato para confirmar os preços e finalizar o pedido.'
    };
    
    let message = `🛒 *PEDIDO - ${config.companyName}*\n`;
    message += `📅 Data: ${dateStr} às ${timeStr}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.title}*\n`;
        message += `   Quantidade: ${item.qty}x\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📋 *Total de itens: ${cart.length}*\n\n`;
    message += config.customMessage;
    
    return message;
}

// Função para enviar pedido via WhatsApp
function sendOrderToWhatsApp(cart) {
    const message = generateOrderMessage(cart);
    const config = window.CART_CONFIG || { whatsappNumber: '5511999999999' };
    const phoneNumber = config.whatsappNumber;
    const encodedMessage = encodeURIComponent(message);
    
    // URL do WhatsApp Web/App
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappURL, '_blank');
    
    // Mostrar feedback visual
    showWhatsAppFeedback();
}

// Função para mostrar feedback visual do envio
function showWhatsAppFeedback() {
    const config = window.CART_CONFIG || { 
        feedback: { whatsappColor: '#25D366', duration: 3000 } 
    };
    
    const feedback = document.createElement('div');
    feedback.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">📱</span>
            <span>Pedido enviado para o WhatsApp!</span>
        </div>
    `;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${config.feedback.whatsappColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(feedback);
    
    // Remover após o tempo configurado
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, config.feedback.duration);
}

// Função para gerar e baixar CSV do pedido (sem preços)
function downloadOrderCSV(cart) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }).replace(/:/g, '-');
    
    // Cabeçalho do CSV
    let csvContent = "Produto,Quantidade\n";
    
    cart.forEach(item => {
        // Escapar aspas duplas no título
        const title = item.title.replace(/"/g, '""');
        csvContent += `"${title}",${item.qty}\n`;
    });
    
    // Criar blob e download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `pedido-anilclean-${dateStr}-${timeStr}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar feedback
    showCSVFeedback();
}

// Função para mostrar feedback do download CSV
function showCSVFeedback() {
    const config = window.CART_CONFIG || { 
        feedback: { csvColor: '#ff9800', duration: 3000 } 
    };
    
    const feedback = document.createElement('div');
    feedback.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">📊</span>
            <span>Lista baixada com sucesso!</span>
        </div>
    `;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${config.feedback.csvColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(feedback);
    
    // Remover após o tempo configurado
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, config.feedback.duration);
}

// Carregar itens do carrinho do localStorage (sem preços)
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
    
    cartItemsDiv.innerHTML = cart.map(item => {
        return `<div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.img}" alt="${item.title}">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-item-qty">x${item.qty}</span>
        </div>`;
    }).join('');
    
    cartTotalDiv.textContent = `Total de itens: ${cart.length}`;
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
        
        // Adicionar evento para baixar CSV
        const downloadCsvBtn = document.getElementById('download-csv-btn');
        if (downloadCsvBtn) {
            downloadCsvBtn.addEventListener('click', function() {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                if (cart.length === 0) {
                    alert('Seu carrinho está vazio!');
                    return;
                }
                downloadOrderCSV(cart);
            });
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
                sendOrderToWhatsApp(cart);
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
window.sendOrderToWhatsApp = sendOrderToWhatsApp;
window.generateOrderMessage = generateOrderMessage;
window.downloadOrderCSV = downloadOrderCSV; 