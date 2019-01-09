#GREEB LED
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(15, GPIO.OUT)

if(GPIO.input(15) == 1):
  GPIO.output(15, GPIO.LOW)
else:
  GPIO.output(15, GPIO.HIGH)  