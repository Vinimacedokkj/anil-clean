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
        this.updatePaginationInfo();
    }

    // Carrega todos os produtos da página
    loadAllProducts() {
        const productItems = document.querySelectorAll('.product-item');
        this.allProducts = Array.from(productItems);
        this.filteredProducts = [...this.allProducts];
        this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        // Mostra apenas os primeiros 20 produtos
        this.showPage(1);
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
        this.currentPage = 1;
        this.showPage(1);
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
