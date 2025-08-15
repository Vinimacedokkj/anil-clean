import pyautogui as pa
import time

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