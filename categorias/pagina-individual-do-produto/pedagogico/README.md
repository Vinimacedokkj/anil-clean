# Página do Produto - Anda Cavalinho Azul

## Funcionalidades Implementadas

### 1. Botão "SOLICITAR ORÇAMENTO"
- **Funcionalidade**: Envia apenas este produto específico para o WhatsApp
- **Comportamento**: 
  - Gera uma mensagem personalizada com os dados do produto
  - Abre o WhatsApp Web/App em nova aba
  - Mostra feedback visual de confirmação
- **Mensagem enviada**:
  ```
  🛒 PEDIDO - ANILCLEAN
  📅 Data: [data atual] às [hora atual]
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  1. Anda Cavalinho Com Som Azul - Xalingo
     Quantidade: 1x
     Valor: Solicitar orçamento
  
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  💰 TOTAL: Solicitar orçamento
  
  Por favor, entre em contato para confirmar os preços e finalizar o pedido.
  ```

### 2. Botão "ADICIONAR AO CARRINHO"
- **Funcionalidade**: Adiciona o produto ao carrinho de compras
- **Comportamento**:
  - Adiciona o produto ao localStorage
  - Atualiza o badge do carrinho no header
  - Mostra feedback visual no botão ("Adicionado!")
  - Mostra notificação de confirmação

## Configurações

### Número do WhatsApp
Para alterar o número do WhatsApp, edite o arquivo `/carrinho/config.js`:

```javascript
whatsappNumber: '5511999999999', // Altere para o número real
```

### Dados do Produto
Os dados do produto estão definidos no JavaScript da página:

```javascript
const produtoAtual = {
    title: "Anda Cavalinho Com Som Azul - Xalingo",
    price: 89.90, // Preço do produto
    img: "../../../../img/imagens-dos-produtos/categorias/08-pedagogico/001 - Anda Cavalinho Com Som Azul - Xalingo SITE.webp"
};
```

## Como Testar

1. Abra a página no navegador
2. Clique em "SOLICITAR ORÇAMENTO" para testar o envio para WhatsApp
3. Clique em "ADICIONAR AO CARRINHO" para testar a adição ao carrinho
4. Verifique se o badge do carrinho no header foi atualizado
5. Acesse a página do carrinho para ver o produto adicionado

## Arquivos Relacionados

- `0001-anda-cavalinho-azul.html` - Página principal do produto
- `/carrinho/config.js` - Configurações do carrinho e WhatsApp
- `/carrinho/carrinho.js` - Funcionalidades do carrinho
- `/header/header.js` - Funcionalidades do header (incluindo badge do carrinho)

## Observações

- O número do WhatsApp está configurado como exemplo (5511999999999)
- Altere o número no arquivo de configuração para o número real da empresa
- O preço do produto está definido como R$ 89,90 (pode ser alterado conforme necessário)
- Todas as funcionalidades estão integradas com o sistema de carrinho existente 