// Funcionalidade de Zoom para Imagens dos Produtos
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar ícone de lupa sobre a imagem do produto
    const productImageContainer = document.querySelector('.product-image');
    if (productImageContainer) {
        const zoomIcon = document.createElement('div');
        zoomIcon.className = 'zoom-icon';
        zoomIcon.innerHTML = '🔍';
        zoomIcon.title = 'Clique para ampliar a imagem';
        
        productImageContainer.appendChild(zoomIcon);
        
        // Adicionar evento de clique para abrir o modal
        zoomIcon.addEventListener('click', function() {
            openZoomModal();
        });
    }
    
    // Adicionar evento de clique na imagem também
    const productImage = document.querySelector('.product-image img');
    if (productImage) {
        productImage.addEventListener('click', function() {
            openZoomModal();
        });
    }
});

function openZoomModal() {
    const productImage = document.querySelector('.product-image img');
    if (!productImage) return;
    
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.innerHTML = `
        <div class="zoom-modal-content">
            <div class="zoom-modal-header">
                <span class="close-zoom">&times;</span>
            </div>
            <div class="zoom-modal-body">
                <img src="${productImage.src}" alt="${productImage.alt}" class="zoomed-image">
            </div>
        </div>
    `;
    
    // Adicionar ao body
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar no X
    const closeBtn = modal.querySelector('.close-zoom');
    closeBtn.addEventListener('click', function() {
        closeZoomModal();
    });
    
    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeZoomModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeZoomModal();
        }
    });
    
    // Mostrar modal com animação
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeZoomModal() {
    const modal = document.querySelector('.zoom-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// // Funcionalidade de zoom nas imagens dos produtos relacionados
// document.addEventListener('DOMContentLoaded', function() {
//     const relatedProductImages = document.querySelectorAll('.product-item img');
    
//     relatedProductImages.forEach(img => {
//         // Adicionar ícone de lupa sobre cada imagem relacionada
//         const imageContainer = img.closest('.image-container');
//         if (imageContainer) {
//             const zoomIcon = document.createElement('div');
//             zoomIcon.className = 'zoom-icon-related';
//             zoomIcon.innerHTML = '🔍';
//             zoomIcon.title = 'Clique para ampliar a imagem';
            
//             imageContainer.appendChild(zoomIcon);
            
//             // Adicionar evento de clique para abrir o modal
//             zoomIcon.addEventListener('click', function(e) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 openRelatedProductZoom(img);
//             });
//         }
        
//         // Adicionar evento de clique na imagem também
//         img.addEventListener('click', function(e) {
//             e.preventDefault();
//             openRelatedProductZoom(img);
//         });
//     });
// });

// function openRelatedProductZoom(img) {
//     // Criar modal para produto relacionado
//     const modal = document.createElement('div');
//     modal.className = 'zoom-modal';
//     modal.innerHTML = `
//         <div class="zoom-modal-content">
//             <div class="zoom-modal-header">
//                 <span class="close-zoom">&times;</span>
//             </div>
//             <div class="zoom-modal-body">
//                 <img src="${img.src}" alt="${img.alt}" class="zoomed-image">
//             </div>
//         </div>
//     `;
    
//     // Adicionar ao body
//     document.body.appendChild(modal);
    
//     // Fechar modal ao clicar no X
//     const closeBtn = modal.querySelector('.close-zoom');
//     closeBtn.addEventListener('click', function() {
//         closeZoomModal();
//     });
    
//     // Fechar modal ao clicar fora da imagem
//     modal.addEventListener('click', function(e) {
//         if (e.target === modal) {
//             closeZoomModal();
//         }
//     });
    
//     // Fechar modal com ESC
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape') {
//             closeZoomModal();
//         }
//     });
    
//     // Mostrar modal com animação
//     setTimeout(() => {
//         modal.classList.add('show');
//     }, 10);
// }
