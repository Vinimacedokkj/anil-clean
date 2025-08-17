import pyautogui as pa
import time

# O programa possibilita que você entre em uma pasta e crie quantos arquivos quiser já com a extensão .html, adicionando novos produtos

criar_produto = int(input("Quantos produtos você quer criar? "))

numero_produto = int(input("Qual o número do primeiro produto? "))

time.sleep(5)

for i in range(criar_produto):
    pa.PAUSE = 0.7
    
    pa.hotkey("ctrl", "shift", "alt", "n")

    pa.write(f"{numero_produto + i}.html")

    pa.press("enter")

