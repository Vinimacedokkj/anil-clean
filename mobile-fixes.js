// ===== CORREÇÕES DE MOBILE APLICADAS VIA JAVASCRIPT =====

(function() {
    'use strict';
    
    // Função para aplicar estilos de correção mobile
    function applyMobileFixes() {
        // Verificar se estamos em um dispositivo móvel ou tablet
        const isMobile = window.innerWidth <= 1023;
        
        if (!isMobile) return;
        
        // Criar estilos dinâmicos para corrigir problemas de mobile
        const style = document.createElement('style');
        style.textContent = `
            /* Correções específicas para mobile aplicadas via JavaScript */
            * {
                -webkit-tap-highlight-color: transparent !important;
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -khtml-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            
            /* Permitir seleção de texto em campos de input e textarea */
            input, textarea, [contenteditable="true"] {
                -webkit-user-select: text !important;
                -khtml-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
            
            /* Remover outlines padrão em botões e links */
            button, a, input, select, textarea {
                outline: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            
            /* Estilo para estado ativo em botões */
            button:active {
                transform: scale(0.98) !important;
                transition: transform 0.1s ease !important;
            }
            
            /* Estilo para estado ativo em links */
            a:active {
                opacity: 0.8 !important;
                transition: opacity 0.1s ease !important;
            }
            
            /* Melhorar feedback visual para elementos clicáveis */
            .clickable, button, a {
                cursor: pointer !important;
                transition: all 0.2s ease !important;
            }
            
            .clickable:active, button:active, a:active {
                transform: scale(0.95) !important;
                opacity: 0.9 !important;
            }
            
            /* Remover bordas pretas do menu hambúrguer */
            #hamburger-btn {
                border: none !important;
                outline: none !important;
                -webkit-tap-highlight-color: transparent !important;
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -khtml-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                background: transparent !important;
            }
            
            /* Remover bordas pretas do menu mobile */
            .menu {
                border: none !important;
                outline: none !important;
            }
            
            .menu ul li a {
                border: none !important;
                outline: none !important;
                -webkit-tap-highlight-color: transparent !important;
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -khtml-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }
            
            /* Melhorar feedback visual para botões específicos */
            .add-to-cart-btn:active {
                transform: scale(0.95) !important;
                background-color: var(--secondary-color) !important;
                transition: all 0.1s ease !important;
            }
            
            .all-products-container button:active {
                transform: translateY(0) !important;
                background-color: #003d5a !important;
                transition: all 0.1s ease !important;
            }
            
            button:active {
                transform: scale(0.98) !important;
                transition: all 0.1s ease !important;
            }
            
            .reset-filters-btn:active,
            .clear-saved-state-btn:active {
                transform: scale(0.98) !important;
                transition: all 0.1s ease !important;
            }
            
            /* Garantir área de toque adequada em mobile pequeno */
            @media (max-width: 767px) {
                button, a, input, select, textarea {
                    min-height: 44px !important;
                    min-width: 44px !important;
                }
            }
            
            /* Manter foco visível apenas quando necessário */
            button:focus,
            a:focus,
            input:focus,
            select:focus,
            textarea:focus {
                outline: 2px solid var(--primary-color) !important;
                outline-offset: 2px !important;
            }
        `;
        
        // Aplicar os estilos ao head
        document.head.appendChild(style);
        
        console.log('Correções de mobile aplicadas via JavaScript');
    }
    
    // Aplicar correções quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyMobileFixes);
    } else {
        applyMobileFixes();
    }
    
    // Aplicar correções quando a janela for redimensionada
    window.addEventListener('resize', applyMobileFixes);
    
    // Aplicar correções quando a orientação da tela mudar
    window.addEventListener('orientationchange', function() {
        setTimeout(applyMobileFixes, 100);
    });
    
})();
