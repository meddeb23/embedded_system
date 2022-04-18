import RPi.GPIO as GPIO
import http.client
from json import dumps, loads

GPIO.setmode(GPIO.BCM)
GPIO.setup(23,GPIO.IN)      # pin du PIR configurée en entrée
GPIO.setup(24,GPIO.OUT)     # pin de la LED configurée en sortie

etatPrecedent = 0  # la dernière fois qu'on a vérifié...y avait-il du mouvement?

while True:
    mouvement = GPIO.input(23)
    if mouvement:      # mouvement détecté
        GPIO.output(24,GPIO.HIGH)  # on allume la LED
        if etatPrecedent == 0:
            print ("Detection d'un mouvement!")
            #when detecting a movment send a request to the server to update the admin (frontend application)
            con = http.client.HTTPConnection('localhost', 5000, timeout=10)
            # HTTP headers
            headers = {'Content-type': 'application/json'}
            # you can send an type of date (UPDATE the data Dict)
            data = {'motionDetected': True}
            # Change python dictionary to json format to be send to the server
            json_data = dumps(data)
            # send an HTTP POST request
            con.request('POST', '/', json_data, headers)
            res = con.getresponse()
            print(res.status)
    else:
        GPIO.output(24,GPIO.LOW)   # on éteint la LED
    etatPrecedent = mouvement