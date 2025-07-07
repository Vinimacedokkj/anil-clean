# Script para remover preços de todos os arquivos HTML de produtos
$files = Get-ChildItem -Path "categorias/pagina-individual-do-produto" -Recurse -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remover linha com price
    $content = $content -replace "^\s*price: [0-9.]+,\s*// Preço do produto\s*$", ""
    
    # Remover vírgula extra se houver
    $content = $content -replace ",\s*img:", "img:"
    
    # Atualizar mensagem personalizada
    $content = $content -replace "Por favor, entre em contato para confirmar os preços e finalizar o pedido\.", "Por favor, entre em contato para solicitar orçamento e finalizar o pedido."
    
    # Remover linhas com Valor e TOTAL na função solicitarOrcamento
    $content = $content -replace "message \+= `"   Valor: Solicitar orçamento\\n`";", ""
    $content = $content -replace "message \+= `"💰 \*TOTAL: Solicitar orçamento\*\\n`";", ""
    $content = $content -replace "message \+= `"   Quantidade: 1x\\n`";\s*message \+= `"   Valor: Solicitar orçamento\\n`";", "message += `"   Quantidade: 1x\\n`";"
    $content = $content -replace "message \+= `"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`";\s*message \+= `"💰 \*TOTAL: Solicitar orçamento\*\\n`";", "message += `"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`";"
    
    # Adicionar linha de total de itens se não existir
    if ($content -notmatch "Total de itens: 1") {
        $content = $content -replace "message \+= `"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`";", "message += `"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`";`n            message += `"📋 *Total de itens: 1*\\n`";"
    }
    
    Set-Content $file.FullName $content -Encoding UTF8
    Write-Host "Processado: $($file.Name)"
}

Write-Host "Processamento concluído!" 