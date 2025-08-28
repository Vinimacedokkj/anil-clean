# 📋 Classificação dos Produtos por Categoria

Para que os filtros funcionem corretamente, você precisa adicionar o atributo `data-category` em cada produto no HTML. Aqui está como fazer:

## 🎯 Categorias Disponíveis

- **`infantil`** - Produtos para crianças
- **`personalizavel`** - Produtos que podem ser personalizados
- **`escritorio`** - Produtos para escritório/empresas
- **`escolar`** - Produtos para escolas/educação
- **`esportivo`** - Produtos esportivos
- **`decorativo`** - Produtos decorativos/festas

## 📝 Como Aplicar as Categorias

Adicione o atributo `data-category` em cada `<div class="product-item">`. Exemplo:

```html
<!-- Produto Infantil -->
<div class="product-item" data-category="infantil">
    <div class="image-container">
        <a href="/PDF's de catálogos/Bonecos - Diversidade.pdf" download>
            <img src="/img/imagens-dos-produtos/bonecas-diversidade.png" alt="Bonecas - Diversidade">
        </a>
    </div>
    <div class="product-info">
        <h3>Catálogo de Bonecas - Diversidade</h3>
        <p>Catálogo com bonecas de diversas etnias...</p>
    </div>
</div>

<!-- Produto Personalizável -->
<div class="product-item" data-category="personalizavel">
    <div class="image-container">
        <a href="/PDF's de catálogos/Catálogo Presentes.pdf" download>
            <img src="/img/imagens-dos-produtos/Img Taças Personalizadas.png" alt="Ideias de presentes">
        </a>
    </div>
    <div class="product-info">
        <h3>Catálogo Presentes</h3>
        <p>Descubra nosso catálogo de sugestões para presentear...</p>
    </div>
</div>

<!-- Produto para Escritório -->
<div class="product-item" data-category="escritorio">
    <div class="image-container">
        <a href="/PDF's de catálogos/Cadeiras de Escritório.pdf" download>
            <img src="/img/imagens-dos-produtos/cadeira-de-escritorio.png" alt="Cadeiras de Escritório">
        </a>
    </div>
    <div class="product-info">
        <h3>Catálogo de Cadeiras de Escritório</h3>
        <p>Catálogo com uma ampla variedade de cadeiras...</p>
    </div>
</div>
```

## 🔍 Sugestões de Classificação

### Infantil (`infantil`)
- Bonecas - Diversidade
- Brinquedos e pedagógicos
- Fantasias
- Fantoches
- Pelúcias
- Playground
- Material Heurístico
- Pikler

### Personalizáveis (`personalizavel`)
- Colete Infantil Personalizado
- Catálogo Presentes
- Banners Educativos

### Escritório (`escritorio`)
- Cadeiras de Escritório
- Estantes
- Lixeiras e caixas organizadoras

### Escolar (`escolar`)
- Materiais Escolares
- Móveis Escolares
- Laboratório
- Pedagogicos e Materiais escolares

### Esportivo (`esportivo`)
- Educação Física
- Colete Infantil Personalizado

### Decorativo (`decorativo`)
- Festa Junina
- Páscoa
- Tecidos
- Redes de Descanso

## ⚠️ Produtos que podem ter múltiplas categorias

Alguns produtos podem se encaixar em mais de uma categoria. Nesse caso, escolha a categoria principal ou use a que melhor representa o produto.

## 🚀 Após a Classificação

Depois de adicionar os atributos `data-category` em todos os produtos:

1. Os filtros funcionarão automaticamente
2. Os usuários poderão filtrar por categoria
3. A pesquisa funcionará em conjunto com os filtros
4. O contador mostrará quantos produtos estão visíveis

## 💡 Dica

Se quiser adicionar mais categorias no futuro, basta:
1. Adicionar o botão no HTML
2. Adicionar os estilos CSS
3. Atualizar o JavaScript
4. Classificar os produtos com a nova categoria
