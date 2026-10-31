# Cebimde Gündem

Responsive haber portalı başlangıç sürümü.

- Kategori bazlı haber akışları
- Başlık arama ve otomatik 5 dakikalık yenileme
- RSS üzerinden başlık, yayıncı, tarih ve kaynak bağlantısı
- Haber metinleri kopyalanmaz; ayrıntı için kaynak siteye yönlendirilir

Vercel'e GitHub deposu olarak aktarın. `api/news.js` için `rss-parser` bağımlılığı `package.json` içindedir.

Bu başlangıç sürümünde editoryal onay paneli bulunmaz. Otomatik gelen haberleri kaynak bağlantılarıyla gösterir; yayın öncesi doğrulama/manuel onay isteniyorsa sonraki aşamada yönetim paneli eklenmelidir.
