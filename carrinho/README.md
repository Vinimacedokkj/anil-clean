# Sistema de Carrinho com WhatsApp

Este sistema permite que os clientes adicionem produtos ao carrinho e enviem pedidos diretamente para o WhatsApp, ideal para vitrines online onde os preços são negociados posteriormente.

## Funcionalidades

- ✅ Adicionar produtos ao carrinho
- ✅ Visualizar itens no carrinho
- ✅ Limpar carrinho
- ✅ Enviar pedido via WhatsApp
- ✅ Baixar lista em formato CSV
- ✅ Feedback visual para todas as ações
- ✅ Configuração personalizável

## Configuração

### 1. Configurar número do WhatsApp

Edite o arquivo `config.js` e altere o número do WhatsApp:

```javascript
const CART_CONFIG = {
    whatsappNumber: '5511999999999', // Substitua pelo seu número
    companyName: 'ANILCLEAN',
    customMessage: 'Por favor, entre em contato para confirmar os preços e finalizar o pedido.',
    // ...
};
```

**Formato do número:** código do país + DDD + número
- Brasil: `55` + DDD (ex: `11`) + número (ex: `999999999`)
- Exemplo: `5511999999999`

### 2. Personalizar mensagem

Você pode personalizar:
- Nome da empresa
- Mensagem final do pedido
- Cores dos feedbacks visuais
- Duração dos feedbacks

## Como usar

### Para o cliente:

1. **Adicionar produtos:** Clique em "Adicionar ao Carrinho" nos produtos
2. **Ver carrinho:** Acesse a página do carrinho
3. **Baixar lista:** Clique em "📊 Baixar Lista" para salvar em CSV
4. **Enviar pedido:** Clique em "Solicitar" para enviar via WhatsApp

### Para o desenvolvedor:

1. **Incluir scripts:** Adicione os arquivos JS e CSS nas páginas
2. **Configurar botões:** Use a classe `add-to-cart-btn` com os atributos:
   - `data-title`: Nome do produto
   - `data-price`: Preço do produto
   - `data-img`: URL da imagem

Exemplo:
```html
<button class="add-to-cart-btn" 
        data-title="Produto Exemplo" 
        data-price="29.90" 
        data-img="/img/produto.jpg">
    Adicionar ao Carrinho
</button>
```

## Estrutura de arquivos

```
carrinho/
├── carrinho.html          # Página do carrinho
├── carrinho.css           # Estilos do carrinho
├── carrinho.js            # Lógica principal
├── config.js              # Configurações
└── README.md              # Esta documentação
```

## Funcionalidades técnicas

### Armazenamento
- Usa `localStorage` para persistir dados do carrinho
- Dados são mantidos entre sessões do navegador

### WhatsApp
- Usa a API `wa.me` do WhatsApp
- Abre em nova aba/janela
- Mensagem pré-formatada com emojis e formatação

### CSV
- Gera arquivo CSV com timestamp
- Formato: `pedido-anilclean-DD-MM-YYYY-HH-MM.csv`
- Inclui produtos, quantidades e totais

### Feedback visual
- Notificações animadas
- Cores personalizáveis
- Duração configurável
- Posicionamento fixo no canto superior direito

## Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Personalização avançada

### Alterar cores dos botões

No arquivo `carrinho.css`:

```css
#solicitar-btn {
    background: #25D366 !important; /* Cor do WhatsApp */
}

#download-csv-btn {
    background: #ff9800 !important; /* Cor laranja */
}

#limpar-btn {
    background: #f44336 !important; /* Cor vermelha */
}
```

### Alterar mensagem do WhatsApp

No arquivo `config.js`:

```javascript
customMessage: 'Sua mensagem personalizada aqui...'
```

## Suporte

Para dúvidas ou problemas, verifique:
1. Se o número do WhatsApp está no formato correto
2. Se todos os arquivos JS e CSS estão sendo carregados
3. Se os atributos `data-*` estão configurados nos botões
4. Console do navegador para erros JavaScript 