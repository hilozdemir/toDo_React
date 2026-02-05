## React To-Do (Frontend)

Bu proje, verilen gereksinimlere uygun basit ama düzenli bir React To-Do uygulamasıdır. Functional component yapısı, `useState` ve `props` kullanımı ile App → TodoInput → TodoList → TodoItem hiyerarşisi kurulmuştur.

### Özellikler
- Görev ekleme (boş giriş engellenir)
- Görevleri listeleme
- Tamamlama (checkbox) ve üstü çizili görünüm
- Silme
- Arama butonu ile filtreleme
- Ortalanmış kart tasarımı, farklı tamamlanma stili

### Projeyi çalıştırma
```bash
npm install
npm run dev
```
Vite varsayılan olarak `http://localhost:5173` adresinde ayağa kalkar.

### Kullanılan React yapıları
- Functional components
- `useState` hook
- Props ile veri ve olay paylaşımı
- Basit `useMemo` ile filtreleme

### Component açıklamaları
- `App`: Durum yönetimi (todo listesi, arama), filtreleme ve genel düzen.
- `TodoInput`: Yeni görev ekleme formu ve arama alanı (boş giriş kontrolü içerir).
- `TodoList`: Filtrelenmiş görevleri listeler, boş state mesajını gösterir.
- `TodoItem`: Tekil görev satırı; tamamlama ve silme aksiyonları.
