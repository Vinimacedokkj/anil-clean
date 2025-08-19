import pyautogui as pa
import time

# O programa adiciona produtos na loja.html, com base no modelo

#       <div class="product-item">
#             <div class="image-container">
#                 <a href="/categorias/pagina-individual-do-produto/CATEGORIA/nome-do-produto.html">
#                     <img src="/caminho/para/imagem.jpg" alt="Nome do Produto">
#                 </a>
#             </div>
#             <div class="product-info">
#                 <h3>Nome do Produto</h3>
#                 <p>Descrição do produto para aparecer na busca</p>
#                 <button class="add-to-cart-btn" data-title="Nome do Produto" data-price="99.90" data-img="/caminho/para/imagem.jpg">Adicionar ao Carrinho</button>
#             </div>
#         </div>

criar_produto = int(input("Quantos produtos você quer criar? "))

# Para o programa funcionar:
# O bloco de notas tem que estar com este código de html acima, na barra de tarefas no número 4, e ele precisa estar selecionado
# O IDE de código no 9

time.sleep(5)

pa.PAUSE = 1

for i in range(criar_produto):
    # Para o código funcionar, deixar aberto na aba da loja.html, no espaço em branco onde vai ser inserido o produto
    # E na planilha, deixar em cima da célula com o nome da pasta.
    pa.hotkey("win", "4")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "v")

    pa.press("up", presses=9)

    pa.press("end")

    pa.press("left", presses=2)

    pa.keyDown("shift")

    pa.press("left", presses=31)

    pa.keyUp("shift")

    pa.write("/")

    pa.hotkey("win", "2")

    pa.press("f2")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.press("esc")

    # Aqui vai deixar em cima da célula que possui o código em html do produto
    pa.press("left", presses=3)

    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "v")

    pa.write("/")

    # Vai copiar o código em html do produto
    pa.hotkey("win", "2")

    pa.press("f2")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.press("esc")

    pa.press("left")

    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "v")

    pa.press("down")

    pa.press("home")

    pa.press("right", presses=10)

    pa.keyDown("shift")

    pa.press("right", presses=24)
    
    pa.keyUp("shift")

    pa.press("backspace")

    pa.write("/img/imagens-dos-produtos/todos-os-produtos/")

    pa.hotkey("win", "2")

    pa.press("f2")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.press("esc")

    pa.press("right", presses=4)

    pa.hotkey("win", "9")

    pa.hotkey("ctrl", "v")

    pa.keyDown("shift")

    pa.press("home")

    pa.press("right", presses=10)
    
    pa.keyUp("shift")

    pa.hotkey("ctrl", "c")

    pa.press("down", presses=6)

    pa.press("end")

    pa.press("left", presses=32)

    pa.keyDown("shift")

    pa.press("left", presses=24)

    pa.keyUp("shift")

    pa.hotkey("ctrl", "v")

    pa.press("down", presses=3)

    pa.press("enter", presses=2)

    pa.press("enter")

    pa.press("tab")