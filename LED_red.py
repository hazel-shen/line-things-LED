#RED LED
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)

if(GPIO.input(11) == 1):
  GPIO.output(11, GPIO.LOW)
else:
  GPIO.output(11, GPIO.HIGH)  
