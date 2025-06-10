import socket
import threading

target = input("Enter target IP: ")
ports = range(1, 1025)
print_lock = threading.Lock()

def scan(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    try:
        s.connect((target, port))
        with print_lock:
            print(f"[+] Port {port} is open")
    except:
        pass
    finally:
        s.close()

print(f"Scanning {target}...")
for port in ports:
    t = threading.Thread(target=scan, args=(port,))
    t.start()
