import os
import re

def fix_html_files():
    # Caminho para os arquivos HTML
    base_path = "categorias/pagina-individual-do-produto"
    
    # Percorrer todos os arquivos HTML
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                print(f"Processando: {file}")
                
                # Ler o arquivo
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Remover linha de preço
                content = re.sub(r'price: [0-9.]+,\s*// Preço do produto\s*', '', content)
                
                # Corrigir vírgula extra
                content = re.sub(r',\s*img:', ',\n            img:', content)
                
                # Remover linhas com Valor e TOTAL
                content = re.sub(r'message \+= `\s*Valor: Solicitar orçamento\\n`;\s*', '', content)
                content = re.sub(r'message \+= `💰 \*TOTAL: Solicitar orçamento\*\\n`;\s*', '', content)
                
                # Adicionar linha de total de itens se não existir
                if 'Total de itens: 1' not in content:
                    content = re.sub(
                        r'(message \+= `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n`;\s*)',
                        r'\1            message += `📋 *Total de itens: 1*\\n`;\n            ',
                        content
                    )
                
                # Atualizar mensagem personalizada
                content = content.replace(
                    'Por favor, entre em contato para confirmar os preços e finalizar o pedido.',
                    'Por favor, entre em contato para solicitar orçamento e finalizar o pedido.'
                )
                
                # Escrever o arquivo corrigido
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    fix_html_files()
    print("Processamento concluído!") 