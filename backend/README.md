## Backend - Task Manager API


Bu klasör, React ile yazılmış Task Manager uygulaması için **Node.js + Express + SQLite (Knex ile)** backend API'si içerir.

### Özellikler

- **SQLite** üzerinde `todos` tablosu (ilk çalıştırmada otomatik oluşur)
- Aşağıdaki CRUD endpoint'leri:
  - `GET /api/todos` – Tüm görevleri listele
  - `POST /api/todos` – Yeni görev oluştur
  - `PUT /api/todos/:id` – Mevcut görevi güncelle
  - `DELETE /api/todos/:id` – Görev sil

### Kurulum

1. Bu klasöre geç:

```bash
cd backend
```

2. Bağımlılıkları yükle:

```bash
npm install
```


3. Backend sunucusunu başlat:

```bash
node src/index.js
```

Sunucu ilk çalıştırıldığında aynı dizinde `todo.sqlite3` dosyası otomatik oluşur. Varsayılan olarak `http://localhost:4000` adresinde çalışır.

### Notlar

- Frontend, `id` alanını number olarak kullanıyor. Backend de aynı alanı saklıyor, böylece tipleri değiştirmene gerek kalmıyor.
- CORS açıktır, bu yüzden Vite dev server (`http://localhost:5173`) üzerinden istek atabilirsin.
- Artık .env dosyasına gerek yoktur. Tüm veriler SQLite veritabanında saklanır.

