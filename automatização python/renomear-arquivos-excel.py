import pyautogui as pa
import time

# Esse programa possibilita que você consiga criar arquivos em html com mais facilidade
# Ou seja, pega o nome no excel e cola no html

vezes = int(input("Quantas vezes você quer rodar o programa? "))

pa.PAUSE = 0.2

time.sleep(5)

for i in range(vezes):
    # deixar o programa no excel

    pa.press("f2")

    pa.hotkey("ctrl", "a")
    pa.hotkey("ctrl", "c")

    pa.press("esc")

    pa.press("right", presses=2)

    pa.press("f2")

    pa.press("home")

    pa.hotkey("ctrl", "v")

    pa.write("-")

    pa.press("end")

    pa.write(".html")

    pa.press("enter")

    pa.press("left", presses=2)