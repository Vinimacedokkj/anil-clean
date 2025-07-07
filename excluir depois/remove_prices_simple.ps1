# Script simples para remover preços de todos os arquivos HTML de produtos
$files = Get-ChildItem -Path "categorias/pagina-individual-do-produto" -Recurse -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remover linha com price
    $content = $content -replace "price: [0-9.]+,\s*// Preço do produto", ""
    
    # Remover vírgula extra se houver
    $content = $content -replace ",\s*img:", "img:"
    
    # Atualizar mensagem personalizada
    $content = $content -replace "confirmar os preços", "solicitar orçamento"
    
    Set-Content $file.FullName $content -Encoding UTF8
    Write-Host "Processado: $($file.Name)"
}

Write-Host "Processamento concluido!" 