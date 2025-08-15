# Sistema de Persistência de Paginação - Loja Anilclean

## Visão Geral

Este sistema implementa a funcionalidade de manter o estado da paginação da loja, permitindo que os usuários retornem à mesma página após navegar para produtos individuais ou recarregar a página.

## Funcionalidades Implementadas

### 1. Persistência de Estado
- **localStorage**: Salva automaticamente a página atual, filtros de pesquisa e categoria selecionada
- **URL Parameters**: Atualiza a URL para incluir o estado atual (ex: `?page=2&search=ventilador&category=ventiladores`)
- **Navegação do Browser**: Suporta botões voltar/avançar do navegador

### 2. Restauração Automática
- Ao carregar a página, o sistema restaura automaticamente:
  - Página atual
  - Termo de pesquisa
  - Categoria selecionada
  - Filtros aplicados

### 3. Interface do Usuário
- **Botão "🔄 Voltar ao Início"**: Permite limpar o estado salvo e voltar à primeira página
- **Indicadores visuais**: Mostra claramente em qual página o usuário está

## Como Funciona

### Fluxo de Navegação
1. Usuário navega para a página 2 da loja
2. Sistema salva automaticamente: `page=2` no localStorage e URL
3. Usuário clica em um produto e vai para a página individual
4. Usuário clica em "Voltar" no navegador
5. Sistema restaura automaticamente a página 2 com todos os filtros

### Recarregamento da Página
1. Usuário está na página 3 com filtros aplicados
2. Usuário recarrega a página (F5 ou Ctrl+R)
3. Sistema restaura automaticamente:
   - Página 3
   - Termo de pesquisa
   - Categoria selecionada
   - Produtos filtrados

## Arquivos Modificados

### `loja.js`
- Adicionada classe `LojaPagination` com métodos de persistência
- Implementado `saveState()` para salvar estado no localStorage
- Implementado `restoreState()` para restaurar estado salvo
- Implementado `updateURL()` para atualizar parâmetros da URL
- Adicionado suporte para navegação do browser (popstate)

### `loja.html`
- Adicionado botão "🔄 Voltar ao Início" para limpar estado salvo

### `loja.css`
- Estilos para o novo botão de limpar estado
- Responsividade para dispositivos móveis

## Estrutura do Estado Salvo

```json
{
  "currentPage": 2,
  "searchTerm": "ventilador",
  "selectedCategory": "ventiladores"
}
```

## Parâmetros da URL

- `?page=2` - Página atual
- `?search=ventilador` - Termo de pesquisa
- `?category=ventiladores` - Categoria selecionada

## Métodos Principais

### `saveState()`
- Salva o estado atual no localStorage
- Atualiza a URL com parâmetros

### `restoreState()`
- Restaura estado da URL (prioridade)
- Restaura estado do localStorage (fallback)
- Aplica filtros e mostra página correta

### `clearSavedState()`
- Remove estado salvo do localStorage
- Limpa parâmetros da URL
- Volta para página 1

### `updateURL()`
- Atualiza URL sem recarregar página
- Mantém parâmetros de navegação

## Compatibilidade

- **Navegadores Modernos**: Suporte completo
- **localStorage**: Persistência entre sessões
- **History API**: Navegação com botões voltar/avançar
- **Responsivo**: Funciona em dispositivos móveis

## Casos de Uso

### Cenário 1: Navegação entre Páginas
1. Usuário vai para página 2
2. Clica em produto
3. Volta para loja
4. **Resultado**: Retorna para página 2

### Cenário 2: Recarregamento
1. Usuário está na página 3
2. Recarrega página
3. **Resultado**: Permanece na página 3

### Cenário 3: Filtros Aplicados
1. Usuário pesquisa "ventilador"
2. Seleciona categoria "ventiladores"
3. Vai para página 2 dos resultados
4. Navega para produto
5. Volta para loja
6. **Resultado**: Retorna para página 2 com filtros aplicados

## Limitações

- Estado é salvo por domínio (não compartilhado entre subdomínios)
- localStorage tem limite de ~5-10MB
- Não funciona com JavaScript desabilitado

## Manutenção

### Adicionar Novos Campos ao Estado
1. Modificar objeto em `saveState()`
2. Atualizar `restoreState()`
3. Adicionar validação se necessário

### Modificar Comportamento de Restauração
1. Ajustar prioridades em `restoreState()`
2. Modificar lógica de fallback
3. Atualizar validações

## Testes Recomendados

1. **Navegação básica**: Ir para página 2, voltar, verificar se retorna
2. **Recarregamento**: F5 na página 3, verificar se permanece
3. **Filtros**: Aplicar filtros, navegar, voltar, verificar se mantém
4. **Botão limpar**: Clicar em "Voltar ao Início", verificar se limpa
5. **URL**: Verificar se parâmetros são mantidos na navegação
6. **Mobile**: Testar em dispositivos móveis
7. **Browser**: Testar botões voltar/avançar

## Troubleshooting

### Estado não é restaurado
- Verificar se localStorage está habilitado
- Verificar console para erros JavaScript
- Verificar se parâmetros da URL estão corretos

### Página incorreta é mostrada
- Verificar se `totalPages` está sendo calculado corretamente
- Verificar se `currentPage` está dentro dos limites válidos
- Verificar se filtros estão sendo aplicados corretamente

### Filtros não são mantidos
- Verificar se `searchTerm` e `selectedCategory` estão sendo salvos
- Verificar se `applyFilters()` está sendo chamado
- Verificar se elementos DOM existem antes de restaurar valores
