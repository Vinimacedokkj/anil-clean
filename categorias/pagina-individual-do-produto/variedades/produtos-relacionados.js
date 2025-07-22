// Script para exibir 3 produtos relacionados aleatórios na página de produto da categoria 'variedades'

    const produtosVariedades = [
        { nome: "Cone", arquivo: "0182-cone.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/182 - Cone.png" },
        { nome: "Piso Molhado", arquivo: "0183-piso-molhado.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/183 - Piso molhado.png" },
        { nome: "Dispenser para Café e Água", arquivo: "0184-dispenser-para-cafe-e-agua.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/184 - Dispenser para copo de água e café.png" },
        { nome: "Dispensers1", arquivo: "0185-dispensers1.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/185 - Dispensers1.png" },
        { nome: "Dispensers2", arquivo: "0186-dispensers2.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/186 - Dispensers2.png" },
        { nome: "Fita Demarcação", arquivo: "0187-fita-demarcacao.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/187 - Fita demarcação.png" },
        { nome: "Canecas Personalizadas", arquivo: "0188-canecas-personalizadas.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/188 - Canecas Personalizadas.png" },
        { nome: "Garrafas Personalizadas", arquivo: "0189-garrafas-personalizadas.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/189 - Garrafa Personalizada.jpg" },
        { nome: "Necessaire Dia dos Professores", arquivo: "0190-necessaire-dia-dos-professores.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/190 - Necessaires.jpg" },
        { nome: "Taça Personalizada", arquivo: "0191-taca-personalizada.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/191 - Taças Personalizadas.png" },
        { nome: "Pedestal Unitário e em Correntes Plástica", arquivo: "0192-pedestal-unitario-e-em-correntes-plastica.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/192 - Pedestal unitario e em corrente plastica.png" },
        { nome: "Suporte para Copo de Água e Café", arquivo: "0193-suporte-para-copo-de-agua-e-cafe.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/193 - Suporte para copos de água e café.png" },
        { nome: "Tapete Sanitizante", arquivo: "0194-tapete-sanitizante.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/194 - Tapete Sanitizante.png" },
        { nome: "Totens para Álcool em Gel", arquivo: "0195-totens-para-alcool-em-gel.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/195 - Totens para alcool em gel.png" },
        { nome: "Totem para Dispenser de Álcool em Gel e Termômetro por Sensor", arquivo: "0196-totem-para-dispenser-de-alcool-em-gel-e-termometro-por-sensor.html", img: "/img/imagens-dos-produtos/categorias/01-variedades/196 - Totem dispenser de alcool em gel e termometro por sensor.png" },
];

    const produtosRedesDeDescanso = [
        { nome: "Rede Cadeira Balanço Descanso Teto Suspensa Luxo Varanda", arquivo: "206-rede-cadeira-balanco-descanso-teto-suspensa-luxo-varanda.html", img: "../../img/imagens-dos-produtos/categorias/21-redes-de-descanso/206 - Rede Cadeira Balanço Descanso Teto Suspensa Luxo Varanda.webp" },
        { nome: "Rede De Berço Baby 100% Algodão", arquivo: "207-rede-de-berco-baby-100porcento-algodao.html", img: "../../img/imagens-dos-produtos/categorias/21-redes-de-descanso/207 - Rede De Berço Baby 100 por cento algodão.webp" },
        { nome: "Rede De Descanso Infantil 1,50m Azul", arquivo: "208-rede-de-descanso-infantil-1.50m-azul.html", img: "../../img/imagens-dos-produtos/categorias/21-redes-de-descanso/208 - Rede De Descanso Infantil 1,50m  Azul.webp" },
        { nome: "Rede De Dormir Descanso Grande Artesanal Varias Cores", arquivo: "209-rede-de-dormir-descanso-grande-artesanal-varias-cores.html", img: "../../img/imagens-dos-produtos/categorias/21-redes-de-descanso/209 - Rede De Dormir Descanso Grande Artesanal Varias Cores.webp" },
        { nome: "Rede De Dormir Descanso Grande Resistente", arquivo: "210-rede-de-dormir-descanso-grande-resistente.html", img: "../../img/imagens-dos-produtos/categorias/21-redes-de-descanso/210 - Rede De Dormir Descanso Grande Resistente.webp" },
];

(function exibirProdutosRelacionados() {
    const pathAtual = window.location.pathname.split('/').pop();
    const relacionados = produtosVariedades.filter(p => p.arquivo !== pathAtual);
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
    const selecionados = shuffle([...relacionados]).slice(0, 3);
    const container = document.getElementById('produtos-relacionados');
    if (container) {
        container.innerHTML = `
        <h2 style="text-align: center; margin-bottom: 10px;">OUTROS PRODUTOS</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            ${selecionados.map(prod => `
            <a href="${prod.arquivo}" style="text-align:center; width: 120px; text-decoration:none; color:inherit;">
                <img src="${prod.img}" alt="${prod.nome}" style="width:100px; height:100px; object-fit:contain; border-radius:8px; box-shadow:0 2px 8px #0001;">
                <div style="margin-top:8px; font-size:0.95em;">${prod.nome}</div>
            </a>
            `).join('')}
        </div>
        `;
    }
    })(); 

    // Basta adicionar o script e a div onde você deseja exibir os produtos relacionados
    // <div id="produtos-relacionados"></div>
    // <script src="produtos-relacionados.js"></script>