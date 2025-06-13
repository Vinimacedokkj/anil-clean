fetch ('/categorias/container-de-cada-produto/bandeirantes/triciclo-europa(vermelho).html')
    .then (res => res.text())
    .then (data => {
        document.getElementById('triciclo-europa(vermelho)').innerHTML = data;
    })