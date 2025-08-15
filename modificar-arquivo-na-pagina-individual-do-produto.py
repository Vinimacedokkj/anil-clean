import pyautogui as pa
import time

# PROGRAMA PARA MODIFICAR ARQUIVO NA PÁGINA INDIVIDUAL DO PRODUTO

vezes = int(input("Quantos produtos você quer modificar: "))

pa.PAUSE = 0.4

time.sleep(5)

for i in range(vezes):
    # deixar o programa no excel
    pa.press("f2")
    
    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "c")

    pa.press("esc")

    pa.press("down")

    pa.hotkey("win", "5")

    pa.press("f2")

    pa.hotkey("ctrl", "a")

    pa.hotkey("ctrl", "v")

    pa.press("enter")

    pa.press("down")

    pa.hotkey("win", "2")