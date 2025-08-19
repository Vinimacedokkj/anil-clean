// Sistema de Paginação e Pesquisa para a Loja
class LojaPagination {
    constructor() {
        this.currentPage = 1;
        this.productsPerPage = 20;
        this.allProducts = [];
        this.filteredProducts = [];
        this.totalPages = 1;
        this.searchTerm = '';
        this.selectedCategory = 'all';
        
        // Detecção de dispositivo móvel
        this.isMobile = this.detectMobile();
        console.log('Dispositivo móvel detectado:', this.isMobile);
        
        this.init();
    }

    // Detecta se é um dispositivo móvel
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 768);
    }

    init() {
        console.log('Inicializando LojaPagination...');
        console.log('DOM carregado:', document.readyState);
        
        // Aguarda o DOM estar completamente carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('DOM carregado via event listener');
                this.initializeAfterDOM();
            });
        } else {
            console.log('DOM já carregado, inicializando imediatamente');
            this.initializeAfterDOM();
        }
    }

    initializeAfterDOM() {
        console.log('Inicializando após DOM carregado...');
        
        // Carrega todos os produtos
        this.loadAllProducts();
        console.log('Produtos carregados:', this.allProducts.length);
        
        // Configura os event listeners
        this.setupEventListeners();
        
        // Adiciona suporte adicional para dispositivos móveis
        this.addMobileSupport();
        
        // Restaura o estado salvo
        this.restoreState();
        
        console.log('LojaPagination inicializada com sucesso!');
    }

    // Carrega todos os produtos da página
    loadAllProducts() {
        const productItems = document.querySelectorAll('.product-item');
        this.allProducts = Array.from(productItems);
        this.filteredProducts = [...this.allProducts];
        this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        // Não mostra a página 1 automaticamente, aguarda restoreState()
    }

    // Salva o estado atual no localStorage
    saveState() {
        const state = {
            currentPage: this.currentPage,
            searchTerm: this.searchTerm,
            selectedCategory: this.selectedCategory
        };
        localStorage.setItem('lojaState', JSON.stringify(state));
        
        // Atualiza a URL para incluir a página atual
        this.updateURL();
    }

    // Restaura o estado salvo do localStorage
    restoreState() {
        // Primeiro tenta restaurar da URL (prioridade)
        this.restoreFromURL();
        
        // Depois tenta restaurar do localStorage
        const savedState = localStorage.getItem('lojaState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                
                // Restaura a página atual se for válida e não foi definida pela URL
                if (!this.currentPage && state.currentPage && state.currentPage >= 1 && state.currentPage <= this.totalPages) {
                    this.currentPage = state.currentPage;
                }
                
                // Restaura os filtros se não foram definidos pela URL
                if (!this.searchTerm && state.searchTerm) {
                    this.searchTerm = state.searchTerm;
                    const searchInput = document.getElementById('search-input');
                    if (searchInput) {
                        searchInput.value = this.searchTerm;
                    }
                }
                
                if (this.selectedCategory === 'all' && state.selectedCategory) {
                    this.selectedCategory = state.selectedCategory;
                    const categoryFilter = document.getElementById('category-filter');
                    if (categoryFilter) {
                        categoryFilter.value = this.selectedCategory;
                    }
                }
                
            } catch (error) {
                console.error('Erro ao restaurar estado do localStorage:', error);
            }
        }
        
        // Se não há estado definido, usa valores padrão
        if (!this.currentPage) {
            this.currentPage = 1;
        }
        
        // Aplica os filtros e mostra a página restaurada
        this.applyFilters();
        this.showPage(this.currentPage);
    }

    // Atualiza a URL para incluir a página atual
    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('page', this.currentPage);
        
        if (this.searchTerm) {
            url.searchParams.set('search', this.searchTerm);
        }
        
        if (this.selectedCategory !== 'all') {
            url.searchParams.set('category', this.selectedCategory);
        }
        
        // Atualiza a URL sem recarregar a página
        window.history.replaceState({}, '', url);
    }

    // Restaura o estado da URL quando a página carrega
    restoreFromURL() {
        const url = new URL(window.location);
        const pageFromURL = url.searchParams.get('page');
        const searchFromURL = url.searchParams.get('search');
        const categoryFromURL = url.searchParams.get('category');
        
        if (pageFromURL) {
            const page = parseInt(pageFromURL);
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
        
        if (searchFromURL) {
            this.searchTerm = searchFromURL;
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = this.searchTerm;
            }
        }
        
        if (categoryFromURL) {
            this.selectedCategory = categoryFromURL;
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter) {
                categoryFilter.value = this.selectedCategory;
            }
        }
    }

    // Aplica filtros de pesquisa e categoria
    applyFilters() {
        console.log('Aplicando filtros...');
        console.log('Termo de pesquisa:', this.searchTerm);
        console.log('Categoria selecionada:', this.selectedCategory);
        console.log('Total de produtos antes da filtragem:', this.allProducts.length);
        
        this.filteredProducts = this.allProducts.filter(product => {
            const productTitle = product.querySelector('h3').textContent.toLowerCase();
            const productDescription = product.querySelector('p').textContent.toLowerCase();
            const productLink = product.querySelector('a').href;
            
            const matchesSearch = this.searchTerm === '' || 
                productTitle.includes(this.searchTerm.toLowerCase()) ||
                productDescription.includes(this.searchTerm.toLowerCase());
            
            const matchesCategory = this.selectedCategory === 'all' || 
                productLink.includes(this.selectedCategory);
            
            console.log(`Produto: ${productTitle}`);
            console.log(`  - Link: ${productLink}`);
            console.log(`  - Matches search: ${matchesSearch}`);
            console.log(`  - Matches category: ${matchesCategory}`);
            console.log(`  - Final result: ${matchesSearch && matchesCategory}`);
            
            return matchesSearch && matchesCategory;
        });

        console.log('Total de produtos após filtragem:', this.filteredProducts.length);

        this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        // Valida o estado atual
        this.validateState();
        
        // Ajusta a página atual se ela exceder o total de páginas após filtrar
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
        }
        
        this.showPage(this.currentPage);
        this.updateResultsCount();
        this.updatePaginationButtons();
    }

    // Mostra produtos de uma página específica
    showPage(pageNumber) {
        this.currentPage = pageNumber;
        const startIndex = (pageNumber - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;

        // Esconde todos os produtos
        this.allProducts.forEach(product => {
            product.style.display = 'none';
        });

        // Mostra apenas os produtos filtrados da página atual
        this.filteredProducts.slice(startIndex, endIndex).forEach(product => {
            product.style.display = 'block';
        });

        this.updatePaginationInfo();
        this.updatePaginationButtons();
        
        // Salva o estado e atualiza a URL
        this.saveState();
    }

    // Atualiza as informações de paginação
    updatePaginationInfo() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.productsPerPage, this.filteredProducts.length);
        const totalProducts = this.filteredProducts.length;

        const paginationInfo = document.querySelector('.pagination-info span');
        if (paginationInfo) {
            paginationInfo.textContent = `Mostrando ${startIndex}-${endIndex} de ${totalProducts} produtos`;
        }
    }

    // Atualiza o contador de resultados
    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const totalProducts = this.filteredProducts.length;
            if (this.searchTerm || this.selectedCategory !== 'all') {
                resultsCount.textContent = `${totalProducts} produtos encontrados`;
            } else {
                resultsCount.textContent = `${totalProducts} produtos encontrados`;
            }
        }
    }

    // Atualiza os botões de paginação
    updatePaginationButtons() {
        const pageButtons = document.querySelectorAll('.page-btn');
        
        pageButtons.forEach(btn => {
            btn.classList.remove('active');
            
            if (btn.dataset.page === this.currentPage.toString()) {
                btn.classList.add('active');
            }
        });

        // Atualiza botão next
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            if (this.currentPage >= this.totalPages) {
                nextBtn.disabled = true;
            } else {
                nextBtn.disabled = false;
            }
        }

        // Atualiza número de páginas baseado nos resultados filtrados
        this.updatePaginationNumbers();
    }

    // Atualiza os números das páginas baseado nos resultados filtrados
    updatePaginationNumbers() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        // Remove botões de página existentes (exceto o next)
        const nextBtn = pagination.querySelector('.next-btn');
        pagination.innerHTML = '';
        if (nextBtn) {
            pagination.appendChild(nextBtn);
        }

        // Adiciona botões de página baseado no total de páginas
        for (let i = 1; i <= this.totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn';
            pageBtn.dataset.page = i;
            pageBtn.textContent = i;
            
            if (i === this.currentPage) {
                pageBtn.classList.add('active');
            }
            
            pagination.insertBefore(pageBtn, nextBtn);
        }
    }

    // Configura os event listeners
    setupEventListeners() {
        console.log('Configurando event listeners...');
        
        // Event listeners para paginação
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.addEventListener('click', (e) => {
                if (e.target.classList.contains('page-btn')) {
                    const pageNumber = e.target.dataset.page;
                    
                    if (pageNumber === 'next') {
                        if (this.currentPage < this.totalPages) {
                            this.showPage(this.currentPage + 1);
                        }
                    } else {
                        this.showPage(parseInt(pageNumber));
                    }
                }
            });
        }

        // Event listener para navegação do browser (voltar/avançar)
        window.addEventListener('popstate', () => {
            this.restoreFromURL();
            this.applyFilters();
        });

        // Event listeners para pesquisa - com suporte para touch e click
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            console.log('Search input encontrado, configurando eventos...');
            
            // Evento input para pesquisa em tempo real
            searchInput.addEventListener('input', (e) => {
                console.log('Pesquisa digitada:', e.target.value);
                this.searchTerm = e.target.value;
                this.applyFilters();
                this.toggleClearButton();
            });
            
            // Eventos específicos para dispositivos móveis
            if (this.isMobile) {
                console.log('Configurando eventos específicos para mobile...');
                
                // Evento touchstart para dispositivos móveis
                searchInput.addEventListener('touchstart', (e) => {
                    console.log('Touch no campo de pesquisa');
                });
                
                // Evento focus para garantir que funcione em mobile
                searchInput.addEventListener('focus', (e) => {
                    console.log('Campo de pesquisa focado');
                    // Força o teclado virtual em dispositivos móveis
                    searchInput.setAttribute('readonly', 'readonly');
                    setTimeout(() => {
                        searchInput.removeAttribute('readonly');
                    }, 100);
                });
                
                // Evento touchend para melhor resposta em mobile
                searchInput.addEventListener('touchend', (e) => {
                    console.log('Touch terminou no campo de pesquisa');
                });
            }
        } else {
            console.error('Search input não encontrado!');
        }

        // Event listener para botão limpar pesquisa
        const clearSearchBtn = document.getElementById('clear-search');
        if (clearSearchBtn) {
            console.log('Botão limpar pesquisa encontrado, configurando eventos...');
            
            // Evento click
            clearSearchBtn.addEventListener('click', (e) => {
                console.log('Botão limpar clicado');
                this.clearSearch();
            });
            
            // Eventos específicos para dispositivos móveis
            if (this.isMobile) {
                console.log('Configurando eventos específicos para mobile no botão limpar...');
                
                // Evento touchstart para dispositivos móveis
                clearSearchBtn.addEventListener('touchstart', (e) => {
                    console.log('Touch no botão limpar');
                    e.preventDefault(); // Previne comportamento padrão do touch
                    this.clearSearch();
                });
                
                // Evento touchend para melhor resposta em mobile
                clearSearchBtn.addEventListener('touchend', (e) => {
                    console.log('Touch terminou no botão limpar');
                });
            }
        } else {
            console.error('Botão limpar pesquisa não encontrado!');
        }

        // Event listener para filtro de categoria
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            console.log('Filtro de categoria encontrado, configurando eventos...');
            
            // Evento change
            categoryFilter.addEventListener('change', (e) => {
                console.log('Categoria selecionada:', e.target.value);
                this.selectedCategory = e.target.value;
                this.applyFilters();
            });
            
            // Eventos específicos para dispositivos móveis
            if (this.isMobile) {
                console.log('Configurando eventos específicos para mobile no filtro...');
                
                // Evento touchstart para dispositivos móveis
                categoryFilter.addEventListener('touchstart', (e) => {
                    console.log('Touch no filtro de categoria');
                });
                
                // Evento focus para garantir que funcione em mobile
                categoryFilter.addEventListener('focus', (e) => {
                    console.log('Filtro de categoria focado');
                });
                
                // Evento touchend para melhor resposta em mobile
                categoryFilter.addEventListener('touchend', (e) => {
                    console.log('Touch terminou no filtro de categoria');
                });
                
                // Evento click para garantir compatibilidade
                categoryFilter.addEventListener('click', (e) => {
                    console.log('Click no filtro de categoria');
                });
            }
        } else {
            console.error('Filtro de categoria não encontrado!');
        }

        // Event listener para botão resetar filtros
        const resetFiltersBtn = document.getElementById('reset-filters');
        if (resetFiltersBtn) {
            console.log('Botão resetar filtros encontrado, configurando eventos...');
            
            // Evento click
            resetFiltersBtn.addEventListener('click', (e) => {
                console.log('Botão resetar clicado');
                if (confirm('Limpar os filtros?')) {
                    this.resetFilters();
                }
            });
            
            // Eventos específicos para dispositivos móveis
            if (this.isMobile) {
                console.log('Configurando eventos específicos para mobile no botão resetar...');
                
                // Evento touchstart para dispositivos móveis
                resetFiltersBtn.addEventListener('touchstart', (e) => {
                    console.log('Touch no botão resetar');
                    e.preventDefault(); // Previne comportamento padrão do touch
                    if (confirm('Limpar os filtros?')) {
                        this.resetFilters();
                    }
                });
                
                // Evento touchend para melhor resposta em mobile
                resetFiltersBtn.addEventListener('touchend', (e) => {
                    console.log('Touch terminou no botão resetar');
                });
            }
        } else {
            console.error('Botão resetar filtros não encontrado!');
        }

        // Event listener para botão limpar estado salvo
        // const clearSavedStateBtn = document.getElementById('clear-saved-state');
        // if (clearSavedStateBtn) {
        //     clearSavedStateBtn.addEventListener('click', (e) => {
        //         if (confirm('Tem certeza que deseja limpar o estado salvo e voltar ao início da loja?')) {
        //             this.clearSavedState();
        //         }
        //     });
        // }
        
        console.log('Event listeners configurados com sucesso!');
    }

    // Limpa a pesquisa
    clearSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        this.searchTerm = '';
        this.applyFilters();
        this.toggleClearButton();
    }

    // Resetar todos os filtros
    resetFilters() {
        // Limpa completamente o estado salvo
        localStorage.removeItem('lojaState');
        
        // Redireciona para a loja principal (sem parâmetros na URL)
        window.location.href = '/categorias/loja/loja.html';
    }

    // Mostra/esconde botão de limpar pesquisa
    toggleClearButton() {
        const clearSearchBtn = document.getElementById('clear-search');
        if (clearSearchBtn) {
            clearSearchBtn.style.display = this.searchTerm ? 'block' : 'none';
        }
    }

    // Navega para a próxima página
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }

    // Navega para a página anterior
    previousPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }

    // Vai para uma página específica
    goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            this.showPage(pageNumber);
        }
    }

    // Limpa o estado salvo (útil para resetar completamente)
    clearSavedState() {
        // Limpa completamente o estado salvo
        localStorage.removeItem('lojaState');
        
        // Redireciona para a loja principal (sem parâmetros na URL)
        window.location.href = '/categorias/loja/loja.html';
    }

    // Verifica se o estado atual é válido
    validateState() {
        if (this.currentPage < 1 || this.currentPage > this.totalPages) {
            this.currentPage = 1;
        }
        
        if (this.totalPages === 0) {
            this.currentPage = 1;
        }
    }

    // Força a atualização dos filtros (útil para dispositivos móveis)
    forceUpdateFilters() {
        console.log('Forçando atualização dos filtros...');
        
        // Atualiza os valores dos campos
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        
        if (searchInput) {
            this.searchTerm = searchInput.value;
        }
        
        if (categoryFilter) {
            this.selectedCategory = categoryFilter.value;
        }
        
        // Aplica os filtros
        this.applyFilters();
    }

    // Adiciona suporte adicional para dispositivos móveis
    addMobileSupport() {
        if (!this.isMobile) return;
        
        console.log('Adicionando suporte adicional para dispositivos móveis...');
        
        // Força o foco no campo de pesquisa quando tocado
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('touchstart', (e) => {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            });
        }
        
        // Melhora a resposta do filtro de categoria em mobile
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('touchstart', (e) => {
                // Adiciona uma classe visual para feedback
                categoryFilter.classList.add('mobile-active');
                setTimeout(() => {
                    categoryFilter.classList.remove('mobile-active');
                }, 200);
            });
        }
        
        // Adiciona suporte para swipe gestures (opcional)
        this.addSwipeSupport();
    }

    // Adiciona suporte para gestos de swipe (opcional)
    addSwipeSupport() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Swipe horizontal para navegar entre páginas
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0 && this.currentPage < this.totalPages) {
                    // Swipe para esquerda - próxima página
                    this.nextPage();
                } else if (diffX < 0 && this.currentPage > 1) {
                    // Swipe para direita - página anterior
                    this.previousPage();
                }
            }
        });
    }
}

// Inicializa a paginação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new LojaPagination();
});

// Função para adicionar produtos dinamicamente (para futuras implementações)
function addProductToPage(productData) {
    const productsContainer = document.querySelector('.products-container');
    if (!productsContainer) return;

    const productHTML = `
        <div class="product-item">
            <div class="image-container">
                <a href="${productData.link}">
                    <img src="${productData.image}" alt="${productData.title}">
                </a>
            </div>
            <div class="product-info">
                <h3>${productData.title}</h3>
                <p>${productData.description}</p>
                <button class="add-to-cart-btn" 
                        data-title="${productData.title}" 
                        data-price="${productData.price}" 
                        data-img="${productData.image}">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;

    productsContainer.insertAdjacentHTML('beforeend', productHTML);
}

// Função para filtrar produtos por categoria (para futuras implementações)
function filterProductsByCategory(category) {
    const allProducts = document.querySelectorAll('.product-item');
    
    allProducts.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Função para buscar produtos (para futuras implementações)
function searchProducts(query) {
    const allProducts = document.querySelectorAll('.product-item');
    const searchTerm = query.toLowerCase();
    
    allProducts.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
