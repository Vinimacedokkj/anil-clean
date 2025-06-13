fetch('/categorias/menu-navegacao-entre-categorias/menu-navegacao-entre-categorias.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('menu-navegacao-entre-categorias').innerHTML = data;
});