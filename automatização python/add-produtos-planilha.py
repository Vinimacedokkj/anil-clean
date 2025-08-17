import pyautogui as pa
import time

# O programa faz com que você pegue os produtos que estão escritos na pasta e renomeia na planilha, tanto para arquivos em html quanto para as imagens
# Então ele primeiro vai até a pasta, dá um ctrl+a, ctrl+c, volta para a planilha, dá um f2, ctrl+a, ctrl+v, e depois adiciona o - e .html ou imagem
# Serve para preencher a planilha com exatamente o mesmo nome que está na pasta

vezes = int(input("Quantos produtos você quer adicionar: "))

pa.PAUSE = 0.2

time.sleep(5)

for i in range(vezes):
    # deixar o programa no excel
    pa.hotkey("win", "5")
    
    pa.press("f2")

    pa.hotkey("ctrl", "a")
    pa.hotkey("ctrl", "c")

    pa.press("esc")
    pa.press("down")

    pa.hotkey("win", "2")

    pa.press("f2")

    pa.hotkey("ctrl", "a")
    pa.hotkey("ctrl", "v")

    pa.press("enter")