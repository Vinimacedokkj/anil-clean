import pyautogui as pa
import time

vezes = int(input("Quantas vezes você quer abrir o programa: "))

pa.PAUSE = 0.5

time.sleep(5)

for i in range(vezes):
    # deixar o programa no excel

    pa.press("f2")

    pa.press("home")

    