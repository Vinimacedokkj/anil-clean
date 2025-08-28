// ****************** COLETE INFANTIL PERSONALIZADO ******************
document.querySelector("#colete-infantil-personalizado").addEventListener("click", function () {
    // Format: https://wa.me/PHONE?text=MESSAGE
    const phoneNumber = "5511930145556"; // Replace with your number (country code + area code + number)
    const message = "Olá, vim através do site e gostaria de solicitar um orçamento de um colete infantil personalizado";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp in a new tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
});

// ****************** WHATSAPP REQ ORÇAMENTO ******************
document.querySelector(".whatsapp-req-orcamento").addEventListener("click", function () {
    // Format: https://wa.me/PHONE?text=MESSAGE
    const phoneNumber = "5511930145556"; // Replace with your number (country code + area code + number)
    const message = "Olá, vim através do site e gostaria de solicitar um orçamento de um produto";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp in a new tab
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
});

// ****************** BARRA DE PESQUISA E FILTROS ******************
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchResultsCount = document.getElementById('search-results-count');
    const productItems = document.querySelectorAll('.product-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'todos';
    let currentSearchTerm = '';
    
    // Função para realizar a pesquisa e filtros
    function performSearchAndFilter(searchTerm, filterCategory) {
        const searchTermLower = searchTerm.toLowerCase().trim();
        let visibleCount = 0;
        
        productItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            // Verificar se o termo de pesquisa está no título ou descrição
            const matchesSearch = searchTermLower === '' || title.includes(searchTermLower) || description.includes(searchTermLower);
            
            // Verificar se o produto corresponde ao filtro selecionado
            const matchesFilter = filterCategory === 'todos' || item.dataset.category === filterCategory;
            
            if (matchesSearch && matchesFilter) {
                item.style.display = 'flex';
                visibleCount++;
                // Adicionar destaque visual
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Atualizar contador de resultados
        if (searchTermLower.length > 0 || filterCategory !== 'todos') {
            searchResultsCount.textContent = `${visibleCount} produto(s) encontrado(s)`;
            searchResultsCount.style.display = 'inline-block';
        } else {
            searchResultsCount.style.display = 'none';
        }
        
        // Mostrar/ocultar botão de limpar
        clearSearchBtn.style.display = (searchTermLower.length > 0 || filterCategory !== 'todos') ? 'block' : 'none';
    }
    
    // Event listener para input de pesquisa
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value;
        currentSearchTerm = searchTerm;
        performSearchAndFilter(searchTerm, currentFilter);
    });
    
    // Event listener para botão de limpar
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentSearchTerm = '';
        performSearchAndFilter('', currentFilter);
        searchInput.focus();
    });
    
    // Event listener para tecla Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Focar no primeiro produto visível
            const firstVisibleProduct = Array.from(productItems).find(item => 
                item.style.display !== 'none'
            );
            if (firstVisibleProduct) {
                firstVisibleProduct.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    });
    
    // Event listener para clicar na caixa de pesquisa
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('click', function() {
        searchInput.focus();
    });
    
    // Event listener para foco no input
    searchInput.addEventListener('focus', function() {
        searchBox.classList.add('search-focused');
    });
    
    // Event listener para perder foco
    searchInput.addEventListener('blur', function() {
        // Pequeno delay para permitir cliques no botão de limpar
        setTimeout(() => {
            if (!searchInput.matches(':focus') && !searchBox.matches(':hover')) {
                searchBox.classList.remove('search-focused');
            }
        }, 100);
    });
    
    // Event listeners para os filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Atualizar filtro atual
            currentFilter = this.dataset.category;
            
            // Aplicar filtro e pesquisa
            performSearchAndFilter(currentSearchTerm, currentFilter);
        });
    });
    
    // Pesquisa em tempo real com debounce para melhor performance
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearchTerm = e.target.value;
            performSearchAndFilter(currentSearchTerm, currentFilter);
        }, 300);
    });
    
    // Focar no campo de pesquisa quando a página carrega
    searchInput.focus();
});
