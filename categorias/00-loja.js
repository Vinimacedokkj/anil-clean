fetch('00-loja.html')
    .then(res => res.text())
    .then(data => {
    document.getElementById('loja').innerHTML = data;
});