import pyautogui as pa
import time

vezes = int(input("Quantas vezes você quer abrir o programa: "))

pa.PAUSE = 0.5

time.sleep(5)

for i in range(vezes):
    # deixar o programa no excel
    pa.hotkey("win", "2")
    
    pa.press("f2")
    pa.hotkey("ctrl", "c")

    pa.press("esc")
    pa.press("down")

    pa.hotkey("alt", "tab")

    pa.hotkey("ctrl", "v")

    pa.press("enter")