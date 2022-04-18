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
    while True:
        print("requesting status...")
        conn1.request("GET",'/status?_id='+_id)
        res = conn1.getresponse()
        msg = res.read().decode("utf-8") 
        print(msg)
        time.sleep(4)

_id = md5(str(random).encode()).hexdigest()
print("client _id = ", _id)

con = http.client.HTTPConnection('localhost', 5000, timeout=10)
headers = {'Content-type': 'application/json'}

data = {'motionDetected': True, "L1": False}
json_data = dumps(data)


format = "%(asctime)s: %(message)s"
logging.basicConfig(format=format, level=logging.INFO,
                    datefmt="%H:%M:%S")

x = threading.Thread(target=thread_function, args=(1,))
x.start()
con.request('POST', "/", json_data, headers)

print("sending request...")
res = con.getresponse()
msg = res.read().decode("utf-8") 
print(msg)
x.join()
logging.info("Main    : all done")