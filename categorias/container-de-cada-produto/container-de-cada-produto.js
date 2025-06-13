// BANDEIRANTES
fetch ('/categorias/container-de-cada-produto/bandeirantes/triciclo-europa(vermelho).html')
    .then (res => res.text())
    .then (data => {
        document.getElementById('triciclo-europa(vermelho)').innerHTML = data;
    })

// PEDAGÓGICOS

// Anda cavalinho azul
fetch ('/categorias/container-de-cada-produto/pedagogico/0001-anda-cavalinho-azul.html')
    .then (res => res.text())
    .then (data => {
        document.getElementById('anda-cavalinho-azul').innerHTML = data;
    })