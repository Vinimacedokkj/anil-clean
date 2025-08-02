// Configurações do carrinho
const CART_CONFIG = {
    // Número do WhatsApp (formato: código do país + DDD + número)
    // Exemplo: '5511999999999' para Brasil, DDD 11, número 99999-9999
    // whatsappNumber: '551126429801',
    whatsappNumber: '5511930145556',
    
    // Nome da empresa para aparecer na mensagem
    companyName: 'ANILCLEAN',
    
    // Mensagem personalizada no final do pedido
    customMessage: 'Olá, gostaria de solicitar o orçamento deste pedido. Obrigado(a)!',
    
    // Configurações de feedback visual
    feedback: {
        whatsappColor: '#25D366',
        csvColor: '#ff9800',
        duration: 3000 // duração em milissegundos
    }
};

// Exportar configurações
window.CART_CONFIG = CART_CONFIG; 