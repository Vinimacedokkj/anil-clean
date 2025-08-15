// Sistema de Paginação e Pesquisa para a Loja
class LojaPagination {
    constructor() {
        this.productsPerPage = 20;
        this.currentPage = 1;
        this.allProducts = [];
        this.filteredProducts = [];
        this.totalPages = 0;
        this.searchTerm = '';
        this.selectedCategory = 'all';
        this.init();
    }

    init() {
        this.loadAllProducts();
        this.setupEventListeners();
        this.restoreState();
        this.updatePaginationInfo();
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
        this.filteredProducts = this.allProducts.filter(product => {
            const matchesSearch = this.searchTerm === '' || 
                product.querySelector('h3').textContent.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                product.querySelector('p').textContent.toLowerCase().includes(this.searchTerm.toLowerCase());
            
            const matchesCategory = this.selectedCategory === 'all' || 
                product.querySelector('a').href.includes(this.selectedCategory);
            
            return matchesSearch && matchesCategory;
        });

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

        // Event listeners para pesquisa
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.applyFilters();
                this.toggleClearButton();
            });
        }

        // Event listener para botão limpar pesquisa
        const clearSearchBtn = document.getElementById('clear-search');
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Event listener para filtro de categoria
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.selectedCategory = e.target.value;
                this.applyFilters();
            });
        }

        // Event listener para botão resetar filtros
        const resetFiltersBtn = document.getElementById('reset-filters');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        // Event listener para botão limpar estado salvo
        const clearSavedStateBtn = document.getElementById('clear-saved-state');
        if (clearSavedStateBtn) {
            clearSavedStateBtn.addEventListener('click', () => {
                this.clearSavedState();
                this.showPage(1);
            });
        }
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
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        
        this.searchTerm = '';
        this.selectedCategory = 'all';
        this.currentPage = 1; // Volta para a primeira página ao resetar
        
        // Limpa o estado salvo
        localStorage.removeItem('lojaState');
        
        this.applyFilters();
        this.toggleClearButton();
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
        localStorage.removeItem('lojaState');
        this.currentPage = 1;
        this.searchTerm = '';
        this.selectedCategory = 'all';
        
        // Limpa a URL
        const url = new URL(window.location);
        url.searchParams.delete('page');
        url.searchParams.delete('search');
        url.searchParams.delete('category');
        window.history.replaceState({}, '', url);
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
