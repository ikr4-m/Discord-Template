<h1 align="center">Discord-Template</h1>

<p align="center">
  <a href="#">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/skymunn/Discord-Template.svg">
  </a>
  <a href='https://circleci.com/gh/skymunn/Discord-Template/'>
    <img src='https://circleci.com/gh/skymunn/Discord-Template.svg?style=svg' alt='CircleCI Status' />
  </a>
  <a href='https://github.com/skymunn/Discord-Template/blob/master/LICENSE.md'>
    <img alt="GitHub" src="https://img.shields.io/github/license/skymunn/Discord-Template.svg">
  </a>
  <a href='https://github.com/skymunn/Discord-Template/blob/master/package.json'>
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/skymunn/Discord-Template.svg">
  </a>
</p>

<p align="center">Discord Template that written in TypeScript, but you can make a command with ES6 too.</p>

# Apa ini?

Discord-Template ini kegunaannya untuk kalian yang ingin membangun Discord agar lebih mudah dikarenakan semua fungsi penting yang biasanya telah diatur di awal pembuatan bot telah disediakan sedemikian rupa seperti Command Handler dan Event Listener.

# Berkontribusi dalam Proyek Ini

Bebas, kami sangat terbuka untuk segala hal kontribusi. Kami juga sangat butuh bantuan yang membangun bagi kami, kalian, dan para pengguna template ini. Kami rasa proyek ini masih butuh beberapa hal fitur/perbaikan yang mungkin kami lewatkan.

Gunakan tab Issues untuk melaporkan/memberi ide kepada kami dan Pull request untuk memberikan beberapa sampel kalian agar kami uji coba sebagai fitur baru dari template ini.

# Cara Pemasangan
Sebelum menginstall template ini, kalian mesti mendownload tools di bawah ini:
1. NodeJS v14 or above
2. Python v3.7.x (If you want to using Database)
3. windows-build-tools in Windows or GCC in Windows (If you want to using Database)

Setelah itu, tancap gas ke cara penginstallannya!
1. Clone repo ini.
2. Rename `.env.example` menjadi `.env` dan ganti tokennya jadi token bot kamu.
3. Semisalnya, kamu gamau pake database, ikuti tutorial ini:
    1. Buka `package.json` dan hapus `umzug`, `sequelize`, `@types/umzug`, dan `sqlite3` dependency.
    2. Delete `Database` folder.
    3. Delete `src/App/Events/CheckDatabaseConnection.ts` file.
    4. Delete `src/App/Models` folder.
4. Rename `Database/database-example.db` menjadi `database.db`.
5. Eksekusi `npm install`
6. Finally, execute `npm start` and happy coding!

# Migrasi Database

Migrasi di template ini menggunakan `umzug` dan `sequelize` sebagai alat bantu untuk migrasinya. Kalian bisa cek di `Database/migrations` untuk melihat contoh migrasi simpel yang kami buat. Untuk eksekusinya dapat dilakukan dengan cara:

```shell
$ npm run migrate:up      # Migrasi ke atas
$ npm run migrate:down    # Migrasi ke bawah
```

# Ada kopi?
Template ini bukan buatan robot, tapi buatan manusia yang diciptakan dengan sepenuh hati dan sepenuh jiwa raga ini. [Kalau kasian liat gue ngoding sendiri, bolehlah kopinya segelas.](https://www.paypal.me/sirienz).

# License
This project using GNU Affero General Public License v3.0. If a violation is found in it, we'll crack down according to local legal regulations. This project was signed by `Ikramullah Latif <45F6D4DF8F571384>`.
