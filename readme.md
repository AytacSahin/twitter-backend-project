# Twitter Backend Projesi

<div style="display: flex; justify-content: center;">
  <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="Twitter Logo" style="width: 300px;">
</div>

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

- Node.js: <span style="color: lightgray;">JavaScript çalıştırmak için kullanılan bir çalıştırma zamanı ortamıdır.</span>
- Express.js: <span style="color: lightgray;">Web uygulamaları ve API'ler oluşturmak için kullanılan hafif bir Node.js web uygulama çerçevesidir.</span>
- Knex.js: <span style="color: lightgray;">SQL veritabanlarıyla etkileşim için kullanılan bir sorgu yapılandırıcısı ve ORM kütüphanesidir.</span>
- SQLite3: <span style="color: lightgray;">Gömülü bir SQL veritabanı yönetim sistemi olan SQLite'ın Node.js için bağlantı sürücüsüdür.</span>
- Redis: <span style="color: lightgray;">Açık kaynaklı bir anahtar-değer veritabanıdır ve hızlı veri depolama ve önbellekleme için kullanılır.</span>
- bcryptjs: <span style="color: lightgray;">Parolaları güvenli bir şekilde karmaşık bir yapıya dönüştürmek için kullanılan bir şifreleme kütüphanesidir.</span>
- cors: <span style="color: lightgray;">Tarayıcı güvenliği politikalarını etkileşimli web uygulamaları için geçerli hale getirmek için kullanılır.</span>
- dotenv: <span style="color: lightgray;">Uygulama yapılandırmasını tutmak için çevresel değişkenleri yönetmek için kullanılır.</span>
- helmet: <span style="color: lightgray;">HTTP başlık saldırılarına karşı güvenlik sağlamak için Express uygulamaları için bir orta yazılım kütüphanesidir.</span>
- jsonwebtoken: <span style="color: lightgray;">JSON tabanlı web tokenları oluşturmak ve doğrulamak için kullanılır.</span>
- morgan: <span style="color: lightgray;">HTTP isteklerini kaydetmek ve loglamak için kullanılan bir HTTP istemci logger'ıdır.</span>

## Hata Bildirimleri ve İletişim

Proje ile ilgili hatalar bildirmek veya diğer konularda iletişime geçmek için [GitHub Issues](https://github.com/AytacSahin/twitter-backend-project/issues) sayfasını kullanabilirsiniz.

## Proje Sahibi

Aytac Sahin - [GitHub](https://github.com/AytacSahin)

## Daha Fazlası

Proje hakkında daha fazla bilgi için [GitHub Proje Sayfası](https://github.com/AytacSahin/twitter-backend-project#readme) adresini ziyaret edebilirsiniz.

## Canlı Yayın

Proje canlı olarak [burada](https://aytacsahin-twitter-backend.onrender.com/) görüntülenebilir.

---

