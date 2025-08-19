# Sistema de Carrinho - Anilclean

## 🆕 Funcionalidades Implementadas

### 1. Carrinho Único por Sessão
- **Problema anterior**: O carrinho era compartilhado entre dispositivos usando `localStorage`
- **Solução**: Agora usa `sessionStorage` - cada sessão do navegador tem seu próprio carrinho
- **Benefício**: Cada pessoa que acessa o site terá seu carrinho independente

### 2. Preservação no Reload
- **Recarregamento seguro**: Os itens são mantidos quando a página é recarregada
- **Navegação interna**: Carrinho preservado ao navegar entre páginas do site
- **Perda apenas ao fechar**: Itens perdidos apenas quando o navegador é fechado

### 3. Banner Informativo
- **Aviso claro**: Banner na página do carrinho explica o funcionamento
- **Design atrativo**: Interface moderna e responsiva
- **Informações úteis**: Orientações sobre como preservar os itens

## 🔧 Como Funciona

### Armazenamento
```javascript
// Antes (localStorage - compartilhado)
localStorage.setItem('cart', JSON.stringify(cart));

// Agora (sessionStorage - único por sessão)
sessionStorage.setItem('cart', JSON.stringify(cart));
```

### Funções Principais
```javascript
// Obter carrinho
function getCart() {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
}

// Salvar carrinho
function saveCart(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}
```

## 📱 Funcionalidades

### Botões do Carrinho
1. **Limpar Carrinho**: Remove todos os itens
2. **📊 Baixar Lista**: Gera arquivo CSV com os itens
3. **Solicitar**: Envia pedido via WhatsApp

### Teste de Responsividade
- **Arquivo de teste**: `test-responsive-buttons.html` para verificar alinhamento
- **Breakpoints**: Desktop (1200px+), Tablet (768px-1023px), Mobile (480px-767px), Mobile Pequeno (<480px)
- **Ferramentas**: Use F12 (DevTools) para simular diferentes tamanhos de tela

### Banner Informativo
- Explicação clara sobre o sistema de sessão
- Design atrativo com gradiente azul
- Responsivo para mobile

## 🎨 Interface

### Banner Informativo
- Explicação clara sobre o sistema de sessão
- Design atrativo com gradiente azul
- Responsivo para mobile

### Botões Responsivos
- **Desktop**: Botões alinhados à direita em linha horizontal
- **Tablet**: Botões centralizados com espaçamento otimizado
- **Mobile**: Botões empilhados verticalmente com largura total
- **Mobile Pequeno**: Botões compactos com padding reduzido

### Feedback Visual
- Notificações ao adicionar/remover itens
- Badge do carrinho atualizado em tempo real
- Animações suaves e profissionais

## 🔒 Segurança e Privacidade

- **Dados locais**: Tudo fica no navegador do usuário
- **Sem rastreamento**: Não há coleta de dados pessoais
- **Sessão isolada**: Cada usuário tem sua própria sessão

## 📋 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🚀 Benefícios para o Usuário

1. **Privacidade**: Carrinho único para cada pessoa
2. **Conveniência**: Itens preservados durante navegação
3. **Flexibilidade**: Múltiplas opções para salvar itens
4. **Transparência**: Informações claras sobre o funcionamento

## 🔄 Migração

O sistema é compatível com o anterior. Usuários existentes:
- Perderão itens ao recarregar (migração para sessionStorage)
- Receberão informações sobre o novo sistema via banner
- Terão melhor experiência com feedback visual

## 📞 Suporte

Para dúvidas ou problemas:
- Verificar console do navegador para erros
- Testar em diferentes navegadores
- Verificar se sessionStorage está habilitado

## Funcionalidades

### Adicionar ao Carrinho
- Clique no botão "Adicionar ao Carrinho" em qualquer produto
- Feedback visual imediato
- Badge do carrinho atualizado automaticamente

### Gerenciar Carrinho
- Visualizar itens na página do carrinho
- Remover itens individuais
- Limpar todo o carrinho
- Ajustar quantidades

### Finalizar Pedido
- Baixar lista em CSV
- Enviar pedido via WhatsApp
- Mensagem formatada automaticamente

### Configuração
- Número do WhatsApp configurável
- Mensagem personalizada
- Cores e estilos customizáveis

## Estrutura de Arquivos

```
carrinho/
├── carrinho.js          # Lógica principal do carrinho
├── carrinho.html        # Página do carrinho
├── carrinho.css         # Estilos do carrinho
├── config.js            # Configurações (WhatsApp, etc.)
├── botao-add-to-cart.css # Estilos dos botões
├── test-cart.html       # Página de teste
└── README.md            # Documentação
```

## Configuração

### config.js
```javascript
window.CART_CONFIG = {
    whatsappNumber: '5511999999999',
    companyName: 'ANILCLEAN',
    customMessage: 'Por favor, entre em contato para confirmar os preços e finalizar o pedido.',
    feedback: {
        whatsappColor: '#25D366',
        csvColor: '#ff9800',
        duration: 3000
    }
};
```

## Uso

### 1. Incluir Scripts
```html
<script src="/carrinho/config.js"></script>
<script src="/carrinho/carrinho.js"></script>
```

### 2. Adicionar Botões
```html
<button class="add-to-cart-btn" 
        data-title="Nome do Produto" 
        data-price="99.90" 
        data-img="/caminho/para/imagem.jpg">
    Adicionar ao Carrinho
</button>
```

### 3. Badge do Carrinho
```html
<div id="cart-count-badge" style="display: none;">0</div>
```

## Testes

Acesse `/carrinho/test-cart.html` para testar todas as funcionalidades:
- Adicionar itens
- Verificar status
- Testar download CSV
- Testar WhatsApp
- Verificar navegação 