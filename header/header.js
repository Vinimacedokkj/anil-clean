// Carregar o header
fetch('/header/header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        initializeHeader();
    })
    .catch(error => {
        console.error('Erro ao carregar o header:', error);
    });

// Variáveis para controle do header auto-hide
let lastScrollTop = 0;
let scrollThreshold = 10; // Quantidade mínima de scroll para ativar
let headerHeight = 80; // Altura do header (ajuste conforme necessário)
let isMobile = false; // Flag para detectar se é mobile

// Inicializar funcionalidades do header
function initializeHeader() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const menu = document.querySelector('.menu');
    
    if (hamburgerBtn && menu) {
        // Toggle do menu mobile
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
        
        // Fechar menu ao redimensionar a tela para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
        
        // Navegação por teclado no menu mobile
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                    closeMenu();
                }
            });
        });
    }
    
    // Inicializar auto-hide do header (apenas desktop)
    initializeHeaderAutoHide();
    
    // Atualizar badge do carrinho após o header ser inicializado
    setTimeout(() => {
        updateCartBadge();
    }, 200);
}

// Função para detectar se é mobile
function checkIfMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Função para inicializar o auto-hide do header (apenas desktop)
function initializeHeaderAutoHide() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Ajustar altura do header baseado no tamanho da tela
    function updateHeaderHeight() {
        if (window.innerWidth <= 480) {
            headerHeight = 60;
        } else if (window.innerWidth <= 768) {
            headerHeight = 70;
        } else {
            headerHeight = 80;
        }
    }
    
    // Atualizar altura inicial
    updateHeaderHeight();
    
    // Atualizar altura ao redimensionar
    window.addEventListener('resize', function() {
        updateHeaderHeight();
        checkIfMobile();
    });
    
    // Função para controlar a visibilidade do header
    function handleScroll() {
        // Se for mobile, não aplicar auto-hide
        if (isMobile) {
            return;
        }
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Verificar se o scroll é significativo o suficiente
        if (Math.abs(currentScrollTop - lastScrollTop) < scrollThreshold) {
            return;
        }
        
        // Determinar direção do scroll
        const isScrollingDown = currentScrollTop > lastScrollTop;
        const isScrollingUp = currentScrollTop < lastScrollTop;
        const isAtTop = currentScrollTop <= scrollThreshold;
        
        // Mostrar header no topo da página
        if (isAtTop) {
            showHeader();
        }
        // Esconder header quando rola para baixo
        else if (isScrollingDown && currentScrollTop > headerHeight) {
            hideHeader();
        }
        // Mostrar header quando rola para cima
        else if (isScrollingUp) {
            showHeader();
        }
        
        lastScrollTop = currentScrollTop;
    }
    
    // Adicionar listener de scroll com throttling para performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Mostrar header ao fazer hover no topo da página (apenas desktop)
    document.addEventListener('mouseenter', function(e) {
        if (!isMobile && e.clientY <= 50) { // Área de 50px no topo
            showHeader();
        }
    });
    
    // Mostrar header ao focar em elementos de navegação (apenas desktop)
    document.addEventListener('focusin', function(e) {
        if (!isMobile && (e.target.closest('header') || e.target.closest('nav'))) {
            showHeader();
        }
    });
}



// Função para esconder o header
function hideHeader() {
    const header = document.querySelector('header');
    if (header && !header.classList.contains('header-hidden')) {
        header.classList.remove('header-visible', 'header-slide-in');
        header.classList.add('header-hidden', 'header-slide-out');
    }
}

// Função para mostrar o header
function showHeader() {
    const header = document.querySelector('header');
    if (header && !header.classList.contains('header-visible')) {
        header.classList.remove('header-hidden', 'header-slide-out');
        header.classList.add('header-visible', 'header-slide-in');
    }
}

// Função para abrir/fechar o menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    if (menu && hamburgerBtn) {
        const isOpen = menu.classList.contains('open');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
}

// Função para abrir o menu
function openMenu() {
    const menu = document.querySelector('.menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    if (menu && hamburgerBtn) {
        menu.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerBtn.setAttribute('aria-label', 'Fechar menu');
        
        // Focar no primeiro item do menu para acessibilidade
        const firstLink = menu.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
    }
}

// Função para fechar o menu
function closeMenu() {
    const menu = document.querySelector('.menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    if (menu && hamburgerBtn) {
        menu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
        
        // Retornar foco para o botão hamburger
        hamburgerBtn.focus();
    }
}

// Inicializar quando o DOM estiver pronto (fallback)
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se é mobile inicialmente
    checkIfMobile();
    
    // Se o header já foi carregado, inicializar
    if (document.querySelector('.header-container')) {
        initializeHeader();
    }
});

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

// Função para inicializar o badge do carrinho após o header ser carregado
function initializeCartBadge() {
    // Aguardar um pouco para garantir que o header foi carregado
    setTimeout(() => {
        updateCartBadge();
    }, 100);
}

// Chama updateCartBadge ao carregar o header
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCartBadge);
} else {
    initializeCartBadge();
}

// Também exporta para ser chamado de outras páginas
window.updateCartBadge = updateCartBadge;
