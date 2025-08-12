// Sistema de Paginação para a Loja
class LojaPagination {
    constructor() {
        this.productsPerPage = 20;
        this.currentPage = 1;
        this.allProducts = [];
        this.totalPages = 0;
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
        this.totalPages = Math.ceil(this.allProducts.length / this.productsPerPage);
        
        // Mostra apenas os primeiros 20 produtos
        this.showPage(1);
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

        // Mostra apenas os produtos da página atual
        this.allProducts.slice(startIndex, endIndex).forEach(product => {
            product.style.display = 'block';
        });

        this.updatePaginationInfo();
        this.updatePaginationButtons();
    }

    // Atualiza as informações de paginação
    updatePaginationInfo() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.productsPerPage, this.allProducts.length);
        const totalProducts = this.allProducts.length;

        const paginationInfo = document.querySelector('.pagination-info span');
        if (paginationInfo) {
            paginationInfo.textContent = `Mostrando ${startIndex}-${endIndex} de ${totalProducts} produtos`;
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
    }

    // Configura os event listeners
    setupEventListeners() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

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
