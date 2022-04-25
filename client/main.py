# # HTTP version
import http.client
from json import dumps, loads
from hashlib import md5
from random import random
import logging
import threading
import time

def thread_function(name):
    conn1 = http.client.HTTPConnection('localhost', 5000, timeout=10)
    i = 1
    while True:
        i += 1
        if i%5:
            cmd = input("should i continue [yes/no] : ")
            if cmd=="no":
                exit(0)
        print("requesting status...")
        conn1.request("GET",'/status?_id='+_id)
        res = conn1.getresponse()
        msg = res.read().decode("utf-8") 
        print(msg)
        time.sleep(4)

_id = md5(str(random).encode()).hexdigest()
print("client _id = ", _id)


def sendData(_id,data):
    con = http.client.HTTPConnection('localhost', 5000, timeout=10)
    headers = {'Content-type': 'application/json'}
    json_data = dumps(data)
    con.request('POST', "/"+_id, json_data, headers)
    print("sending request...")
    res = con.getresponse()
    msg = res.read().decode("utf-8") 
    print(msg)

format = "%(asctime)s: %(message)s"
logging.basicConfig(format=format, level=logging.INFO,
                    datefmt="%H:%M:%S")

x = threading.Thread(target=thread_function, args=(1,))
x.start()

while True:
    _id = input("Enter device _id: ")
    if _id == "exit":
            exit(0)
    status = input("Enter device new status [on/off]: ")
    active = bool(input("Toggle device activity [True/False]: "))
    data = {
        "status": status,
        "isActive": active 
        }
    sendData(_id, data)
    
