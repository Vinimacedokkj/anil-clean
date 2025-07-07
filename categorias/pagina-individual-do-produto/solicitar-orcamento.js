// Função para solicitar orçamento (envia apenas este produto para WhatsApp)
function solicitarOrcamento() {
    const config = window.CART_CONFIG || {
        whatsappNumber: '5511999999999',
        companyName: 'ANILCLEAN',
        customMessage: 'Por favor, entre em contato para solicitar orçamento e finalizar o pedido.'
    };

    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    let message = `🛒 *PEDIDO - ${config.companyName}*\n`;
    message += `📅 Data: ${dateStr} às ${timeStr}\n`;
    message += `──────────────────────────────\n\n`;
    message += `1. *${produtoAtual.title}*\n`;
    message += `   Quantidade: 1x\n`;
    message += `   Valor: Solicitar orçamento\n\n`;
    message += `──────────────────────────────\n`;
    message += `💰 *TOTAL: Solicitar orçamento*\n\n`;
    message += config.customMessage;
    
    const phoneNumber = config.whatsappNumber;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappURL, '_blank');
    
    // Mostrar feedback visual
    showFeedback('Pedido enviado para o WhatsApp!', '#25D366');
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho() {
    // Adicionar o produto ao carrinho
    addToCart(produtoAtual);
    
    // Feedback visual no botão
    const btn = document.querySelector('.add-to-cart');
    const originalText = btn.textContent;
    btn.textContent = 'Adicionado!';
    btn.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
    }, 1200);
}

// Função para mostrar feedback visual
function showFeedback(message, color) {
    const feedback = document.createElement('div');
    feedback.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">ðŸ“±</span>
            <span>${message}</span>
        </div>
    `;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
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
    
    // Remover após 3 segundos
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Adicionar animações CSS
document.addEventListener('DOMContentLoaded', function() {
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
});