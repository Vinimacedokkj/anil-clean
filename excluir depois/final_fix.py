import os
import re

def final_fix():
    base_path = "categorias/pagina-individual-do-produto"
    
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                print(f"Processando: {file}")
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Corrigir vírgula extra
                content = re.sub(r'"([^"]+)"img:', r'"\1",\n            img:', content)
                
                # Remover linhas com Valor e TOTAL
                content = re.sub(r'message \+= `\s*Valor: Solicitar orçamento\\n`;\s*', '', content)
                content = re.sub(r'message \+= `.*TOTAL: Solicitar orçamento.*\\n`;\s*', '', content)
                
                # Adicionar linha de total de itens se não existir
                if 'Total de itens: 1' not in content:
                    content = re.sub(
                        r'(message \+= `.*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━.*\\n`;\s*)',
                        r'\1            message += `📋 *Total de itens: 1*\\n`;\n            ',
                        content
                    )
                
                # Atualizar mensagem
                content = content.replace(
                    'confirmar os preços',
                    'solicitar orçamento'
                )
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    final_fix()
    print("Correção final concluída!") 