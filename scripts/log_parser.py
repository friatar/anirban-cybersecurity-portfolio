from collections import Counter

log_file = "access.log"

ip_list = []

with open(log_file, 'r') as file:
    for line in file:
        parts = line.split()
        if len(parts) > 0:
            ip = parts[0]
            ip_list.append(ip)

counter = Counter(ip_list)

print("\nTop 10 Suspicious IPs (by request count):\n")
for ip, count in counter.most_common(10):
    print(f"{ip} => {count} requests")
