import pyautogui as pa
import time

# Esse programa faz com que você consiga modificar os produtos vazios, 
# os que você acabou de criar, modificando as imagens da página individual do produto 
# e também os links, já que estão todos na planilha

# PARA GARANTIR QUE O PROGRAMA RODE:
# A planilha tem que estar no 2
# O bloco de notes tem que estar no 4 (apenas 1 aba aberta e com o arquivo inteiro selecionado)
# O IDE de código tem que estar no 9

modificar_produto = int(input("Quantos produtos você quer modificar? "))

time.sleep(5)

pa.PAUSE = 1

for i in range(modificar_produto):
    # Para rodar o programa, deixe a planilha aberta na planilha com o nome do arquivo .HTML

    # Trabalhando com o arquivo .html
    pa.press("f2")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.press("esc")

    # Abre o IDE de código
    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "p")

    pa.hotkey("ctrl", "v")

    pa.press("enter")

    # Bloco de notas
    pa.hotkey("win", "4")

    pa.hotkey("ctrl", "c")

    # Abre o IDE de código
    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "v")


    # --------------------------- LOCALIZAÇÃO DOS ARQUIVOS E SUBSTITUIÇÃO DAS IMAGENS E ARQUIVOS ---------------------------
    # LOCALIZAR ONDE TEM O ARQUIVO HTML PARA SUBSTITUIR
    pa.hotkey("ctrl", "f")

    pa.write('<a href="/categorias/pagina-individual-do-produto/banners-educativos')

    pa.press("esc")

    pa.press("right")

    pa.write("/")

    pa.hotkey("win", "2")

    pa.press("f2")
    
    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.press("esc")

    pa.press("right")

    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "v")

    # LOCALIZAR TÍTULO
    pa.hotkey("ctrl", "f")

    pa.write("Banner | Produtos Anilclean")

    pa.press("esc")

    pa.press("left")

    pa.hotkey("ctrl", "shift", "right")

    # Trabalhando com o nome da imagem (acentuação e espaços)
    # Abre a planilha
    pa.hotkey("win", "2")
    
    # Pegar o nome do produto na planilha
    pa.press("f2")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.press("esc")

    pa.press("left", presses=2)

    # Abre o IDE de código
    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "v")

    # LOCALIZAR O ALT DA PRIMEIRA IMAGEM 
    pa.press("down", presses=7)

    pa.press("end")

    pa.press("left", presses=2)

    pa.hotkey("ctrl", "v")

    # LOCALIZAR O PRIMEIRO H1 PARA ALTERAR
    pa.press("down", presses=8)

    pa.press("left", presses=5)

    pa.hotkey("ctrl", "v")

    # LOCALIZAR O <a> ONDE ESTARÁ ESCRITO O NOME DO PRODUTO
    pa.press("up", presses=2)

    pa.press("end")

    pa.press("left", presses=4)

    pa.hotkey("ctrl", "v")

    # LOCALIZAR O TITLE DO JAVASCRIPT
    pa.hotkey("ctrl", "f")

    pa.write("</html>")

    pa.press("esc")

    pa.press("up", presses=5)

    pa.press("end")

    pa.press("left", presses=2)

    pa.hotkey("ctrl", "v")

    # LOCALIZAR A PRIMEIRA IMAGEM - Trabalhando com o arquivo de imagem (jpg, png ou webp)

    # Primeiro copiar o arquivo da imagem
    # Abre a planilha
    pa.hotkey("win", "2")

    pa.press("f2")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.hotkey("esc")

    pa.press("down")

    pa.press("right")

    # Abre o IDE de código
    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "f")

    pa.write('product-image')

    pa.press("esc")

    pa.press("down")

    pa.press("right", presses=47)
    
    pa.write("/")

    pa.hotkey("ctrl", "v")

    # LOCALIZAR A SEGUNDA IMAGEM (NO CÓDIGO DO JAVASCRIPT)
    pa.hotkey("ctrl", "f")

    pa.write("</html>")

    pa.press("esc")

    pa.press("up", presses=4)

    pa.press("end")

    pa.press("left")

    pa.write("/")

    pa.hotkey("ctrl", "v")







