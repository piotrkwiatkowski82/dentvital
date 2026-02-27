# Deploy Dentvital z Traefikiem

Na serwerze możesz dołożyć Dentvital do istniejącego Traefika (np. przy innej stronie). Jedyna wspólna rzecz to Traefik – tamtej apki nie ruszasz.

## Jedna komenda na serwerze

Po sklonowaniu repozytorium i ustawieniu `.env` (patrz niżej):

```bash
./deploy.sh
```

Deploy z konkretnego taga (np. po release):

```bash
./deploy.sh v1.0.0
```

Skrypt robi: opcjonalnie checkout na tag, potem `docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build`. Bez tagu deployuje z aktualnego commita.

---

## Założenia

- Na serwerze działa **Traefik** (np. z innego projektu) z entrypointami `web` / `websecure`.
- Frontend Dentvital musi być w **tej samej sieci Docker** co Traefik (konfiguracja przez `.env`).

---

## Kroki (jednorazowo)

### 1. Sieć wspólna z Traefikiem

Traefik musi być w sieci, do której dołączy kontener frontendu.

**Opcja A – osobna sieć `traefik_public` (zalecane, bez zmian w tamtej apce):**

```bash
docker network create traefik_public
docker network connect traefik_public <nazwa_kontenera_traefik>
```

Nazwę kontenera Traefik zobaczysz przez `docker ps`. W `.env` **nie** ustawiasz `TRAEFIK_NETWORK` (domyślnie używana jest `traefik_public`).

**Opcja B – Traefik jest w sieci innego projektu:**

Jeśli Traefik działa w tym samym compose co inna strona, jego sieć ma nazwę typu `<katalog_projektu>_default`. Sprawdź: `docker network ls`, znajdź sieć, w której jest Traefik. W `.env` ustaw:

```bash
TRAEFIK_NETWORK=apartament340_default   # przykład – wstaw swoją nazwę
```

Wtedy Dentvital dołączy do tej sieci i nie trzeba zmieniać nic w tamtym systemie.

### 2. Konfiguracja `.env` na serwerze

W katalogu projektu (tam gdzie `docker-compose.yml`):

```bash
cp .env.example .env
```

W `.env` ustaw m.in.:

- **TRAEFIK_DOMAIN** – domena pod którą ma być Dentvital, np. `dentvital.dotfusion.pl`.
- **CORS_ORIGINS** – adresy z jakich front może wołać API (HTTPS + Twoja domena), np.  
  `https://dentvital.dotfusion.pl`
- **VITE_API_URL** – zostaw **puste** (frontend używa `/api/` względem tej samej domeny).
- **TRAEFIK_CERT_RESOLVER** – opcjonalnie. Jeśli Traefik ma resolver certyfikatów (np. Let’s Encrypt), ustaw np. `myresolver` lub `letsencrypt`. Domyślnie używane jest `myresolver` (zgodne z typowym Traefikiem obok innych projektów).
- Baza, SMTP, hasła itd. – według potrzeb (produkcja).

### 3. Uruchomienie

```bash
./deploy.sh
```

albo bez skryptu:

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

Traefik po wykryciu kontenera skieruje ruch na domenę z `TRAEFIK_DOMAIN` do frontendu (port 80). Nginx w kontenerze przekieruje `/api/` do backendu – nic nie wystawiasz na świat poza Traefikiem.

### 4. Inne entrypointy / certyfikaty

- Entrypointy: domyślnie `web` i `websecure`. Inne – edytuj etykiety w `docker-compose.traefik.yml`.
- Certyfikaty: ustaw `TRAEFIK_CERT_RESOLVER` w `.env` na nazwę resolvera z Traefika (np. `myresolver`).

### 5. Deploy obok istniejącej apki

- **Dentvital:** `./deploy.sh` (lub powyższa komenda compose).  
- **Tamta apka:** uruchamiasz jak dotąd, bez zmian.  
Ruch jest rozdzielany po **domenie** (Host), więc obie mogą stać za tym samym Traefikiem.

---

## Podsumowanie

| Co | Gdzie |
|----|--------|
| Jedna komenda | `./deploy.sh` lub `./deploy.sh v1.0.0` |
| Domena | `TRAEFIK_DOMAIN` w `.env` (domyślnie `dentvital.dotfusion.pl`) |
| Sieć Traefika | Domyślnie `traefik_public`; albo `TRAEFIK_NETWORK` w `.env` (np. sieć z tamtego projektu) |
| CORS | `CORS_ORIGINS` w `.env` (https + Twoja domena) |
| Resolver certyfikatów | `TRAEFIK_CERT_RESOLVER` w `.env` (domyślnie `myresolver`) |

Po deployu ustaw DNS (A/CNAME) na serwer z Traefikiem.
