import pyautogui as pa
import time

# Esse programa cria o nome do produto na planilha, removendo os números na frente, deixando apenas o nome do arquivo

modificar_produto = int(input("Quantos produtos você quer modificar? "))

# numero_produto = int(input("Qual o número do primeiro produto? "))

time.sleep(5)

pa.PAUSE = 0.1

for i in range(modificar_produto):
    pa.press("f2")

    pa.press("home")

    pa.press("del", presses=6)

    pa.press("enter")