# webPrisma

Ini adalah tugas Web Programming Lanjut. 

Untuk menjalankannya pertama kalian harus menginstall yarn menggunakan command-command berikut secara berurutan 

1. `npm install yarn --g`

2. `yarn install`

3. `cd packages/server`

4. `npx prisma generate`

5. `cd ../../`

6. `yarn start`


Untuk mengakses frontend cukup masuk ke url berikut : `http://localhost:5173`

Untuk mengakses backend : `http://localhost:5173/api`

Berikut adalah list-endpointnya : 

| URL  | Method | query |  require body |
| ------------- | ------------- | -------- | ------ |
| /api/all  | GET  | none | false|
| /api/search  | GET  | search:string, limit : number, page : number | false |
| /api/tambah-mahasiswa | POST | none | true |
| /api/delete-mahasiswa/:nim | DELETE | none | false |
| /api/update-mahasiswa/:nim | PUT | none | true |
