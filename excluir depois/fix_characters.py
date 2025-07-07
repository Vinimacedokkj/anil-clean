#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corrigir caracteres especiais nos arquivos HTML
Substitui:
- INFORMAÝ‡Ý•ES -> INFORMAÇÕES
- DESCRIÝ‡ÝƒO -> DESCRIÇÃO  
- ORÝ‡AMENTO -> ORÇAMENTO
"""

import os
import glob
import re

def fix_characters_in_file(file_path):
    """Corrige caracteres especiais em um arquivo HTML"""
    try:
        # Lê o arquivo com encoding UTF-8
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Conta quantas substituições foram feitas
        original_content = content
        
        # Faz as substituições
        content = content.replace('INFORMAÝ‡Ý•ES', 'INFORMAÇÕES')
        content = content.replace('DESCRIÝ‡ÝƒO', 'DESCRIÇÃO')
        content = content.replace('ORÝ‡AMENTO', 'ORÇAMENTO')
        
        # Se houve mudanças, salva o arquivo
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"Erro ao processar {file_path}: {e}")
        return False

def main():
    """Função principal"""
    # Diretório base onde estão os arquivos HTML
    base_dir = "categorias/pagina-individual-do-produto"
    
    # Encontra todos os arquivos HTML recursivamente
    html_files = []
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"Encontrados {len(html_files)} arquivos HTML para processar...")
    
    # Contadores
    processed_files = 0
    modified_files = 0
    
    # Processa cada arquivo
    for file_path in html_files:
        processed_files += 1
        if fix_characters_in_file(file_path):
            modified_files += 1
            print(f"✓ Corrigido: {file_path}")
        
        # Mostra progresso a cada 10 arquivos
        if processed_files % 10 == 0:
            print(f"Processados: {processed_files}/{len(html_files)} arquivos...")
    
    print(f"\n=== RESUMO ===")
    print(f"Total de arquivos processados: {processed_files}")
    print(f"Arquivos modificados: {modified_files}")
    print(f"Arquivos sem alterações: {processed_files - modified_files}")

if __name__ == "__main__":
    main() 