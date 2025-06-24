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
    
    // Criar botão "voltar ao topo"
    createScrollToTopButton();
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

// Função para criar o botão "voltar ao topo"
function createScrollToTopButton() {
    // Verificar se o botão já existe
    if (document.getElementById('scroll-to-top-btn')) {
        return;
    }
    
    // Criar o botão
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top-btn';
    scrollToTopBtn.className = 'scroll-to-top-btn';
    scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo da página');
    scrollToTopBtn.innerHTML = `
        <span class="material-symbols-outlined" aria-hidden="true">keyboard_arrow_up</span>
    `;
    
    // Adicionar ao body
    document.body.appendChild(scrollToTopBtn);
    
    // Adicionar evento de clique
    scrollToTopBtn.addEventListener('click', function() {
        scrollToTop();
    });
    
    // Adicionar evento de teclado para acessibilidade
    scrollToTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
    
    // Controlar visibilidade do botão baseado no scroll
    function toggleScrollToTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldShow = scrollTop > 300; // Mostrar após 300px de scroll
        
        if (shouldShow) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    // Adicionar listener de scroll para o botão
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                toggleScrollToTopButton();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Verificar estado inicial
    toggleScrollToTopButton();
}

// Função para rolar ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Focar no header após rolar (para acessibilidade)
    setTimeout(() => {
        const header = document.querySelector('header');
        if (header) {
            header.focus();
        }
    }, 500);
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
