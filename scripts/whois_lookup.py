import whois

domain = input("Enter domain name (e.g. example.com): ")

try:
    w = whois.whois(domain)
    print("\nWHOIS Information:")
    print(f"Domain Name: {w.domain_name}")
    print(f"Registrar: {w.registrar}")
    print(f"Creation Date: {w.creation_date}")
    print(f"Expiration Date: {w.expiration_date}")
    print(f"Name Servers: {w.name_servers}")
except Exception as e:
    print(f"Error: {e}")
