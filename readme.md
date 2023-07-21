# Twitter Backend Projesi

![Booby Image](https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png)

Bu proje, Twitter benzeri bir sosyal medya platformunun backend kısmını oluşturan bir Node.js uygulamasıdır.

## Başlangıç

Bu adımları projeyi kendi bilgisayarınızda çalıştırmak için izleyebilirsiniz.

1. Depoyu klonlayın:

git clone https://github.com/AytacSahin/twitter-backend-project.git

cd twitter-backend-project

2. Gerekli bağımlılıkları yükleyin:
```bash
npm install
```

3. Veritabanını oluşturun ve örnek verileri ekleyin:
```bash
npm run resetdb
```

4. Uygulamayı başlatın:
```bash
npm start
```
Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## Komutlar

Proje içinde kullanabileceğiniz bazı komutlar:

- Uygulamayı başlatmak için:

```bash
npm start
```

- Geliştirme modunda uygulamayı başlatmak için (nodemon kullanarak):
```bash
npm run server
```

- Veritabanını oluşturmak için:
```bash
npm run migrate
```

- Veritabanını geri almak için:
```bash
npm run rollback
```

- Örnek verileri veritabanına eklemek için:
```bash
npm run seed
```

- Veritabanını sıfırlamak için (geri alma, oluşturma ve veri ekleme):
```bash
npm run resetdb
```

- Testleri çalıştırmak için:

```bash
npm test
```

## Kullanılan Teknolojiler ve Kütüphaneler

- Node.js
- Express.js
- Knex.js
- SQLite3
- Redis
- bcryptjs
- cors
- dotenv
- helmet
- jsonwebtoken
- morgan

## Hata Bildirimleri ve İletişim

Proje ile ilgili hatalar bildirmek veya diğer konularda iletişime geçmek için [GitHub Issues](https://github.com/AytacSahin/twitter-backend-project/issues) sayfasını kullanabilirsiniz.

## Proje Sahibi

Aytac Sahin - [GitHub](https://github.com/AytacSahin)

## Daha Fazlası

Proje hakkında daha fazla bilgi için [GitHub Proje Sayfası](https://github.com/AytacSahin/twitter-backend-project#readme) adresini ziyaret edebilirsiniz.

## Canlı Yayın

Proje canlı olarak [burada](https://aytacsahin-twitter-backend.onrender.com/) görüntülenebilir.

---