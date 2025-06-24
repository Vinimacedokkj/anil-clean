// Adiciona o CSS específico do menu se ainda não existir
if (!document.querySelector('link[href*="menu-navegacao-entre-categorias.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/categorias/menu-navegacao-entre-categorias/menu-navegacao-entre-categorias.css';
    document.head.appendChild(link);
}

fetch('/categorias/menu-navegacao-entre-categorias/menu-navegacao-entre-categorias.html')
    .then(res => res.text())
    .then(data => {
        const container = document.getElementById('menu-navegacao-entre-categorias');
        const parser = new DOMParser();
        const doc = parser.parseFromString('<div>' + data + '</div>', 'text/html');
        const links = Array.from(doc.body.firstChild.children);
        const allLink = links[0];
        const otherLinks = links.slice(1);

        function renderMenu(isMobile, expanded) {
            container.innerHTML = '';
            // Sempre mostra o link principal
            container.appendChild(allLink.cloneNode(true));
            if (isMobile) {
                const btn = document.createElement('button');
                btn.className = 'expand-categories-btn';
                btn.textContent = expanded ? 'Recolher categorias' : 'Expandir categorias';
                btn.onclick = () => renderMenu(true, !expanded);
                container.appendChild(btn);
                if (expanded) {
                    const list = document.createElement('div');
                    list.className = 'categories-list-mobile';
                    otherLinks.forEach(link => list.appendChild(link.cloneNode(true)));
                    container.appendChild(list);
                }
            } else {
                otherLinks.forEach(link => container.appendChild(link.cloneNode(true)));
            }
        }

        function checkAndRender() {
            const isMobile = window.innerWidth <= 480;
            renderMenu(isMobile, false);
        }

        window.addEventListener('resize', checkAndRender);
        checkAndRender();
    });
