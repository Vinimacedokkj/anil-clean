fetch('/categorias/00-loja.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('loja').innerHTML = data;
});

fetch('/categorias/container-de-cada-produto/triciclo-europa(vermelho).html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('triciclo-europa-vermelho').innerHTML = data;
    })