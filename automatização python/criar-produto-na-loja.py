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

for i in range(criar_produto):
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


