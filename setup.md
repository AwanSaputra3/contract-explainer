# 🛠️ Panduan Setup & Instalasi Proyek

Dokumen ini berisi langkah-langkah untuk menyiapkan *environment* lokal Anda agar bisa menjalankan aplikasi **Contract Explainer** yang terdiri dari *backend* (Laravel) dan *frontend* (React + Vite).

---

## 1. Persiapan Database (Backend Laravel)

Laravel membutuhkan database untuk menyimpan data aplikasi. 

1. Pastikan Anda sudah menginstal aplikasi database seperti **MySQL** atau **PostgreSQL** (Anda bisa menggunakan XAMPP, Laragon, PostgreSQL lokal, atau Docker).
2. Buat sebuah database kosong baru, misalnya dengan nama `contract_explainer`.
3. Buka folder `backend` dan cari file bernama `.env` (file ini otomatis terbuat saat instalasi Laravel). 
4. Buka file `.env` tersebut dan sesuaikan bagian koneksi database dengan pengaturan di komputer Anda:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=contract_explainer
   DB_USERNAME=root
   DB_PASSWORD=
   ```
   *(Ubah DB_USERNAME dan DB_PASSWORD sesuai dengan pengaturan database Anda).*
5. Buka terminal, masuk ke folder `backend`, dan jalankan perintah migrasi untuk membuat tabel-tabel bawaan:
   ```bash
   cd backend
   php artisan migrate
   ```

---

## 2. Menjalankan Server Backend (Laravel)

Setelah database siap, Anda bisa langsung menyalakan server lokal Laravel.

1. Buka terminal dan pastikan Anda berada di dalam folder `backend`:
   ```bash
   cd backend
   ```
2. *(Opsional)* Jika suatu saat Anda baru men-*clone* proyek ini dari GitHub, pastikan untuk menjalankan perintah instalasi paket:
   ```bash
   composer install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   php artisan serve
   ```
4. Backend (API) Anda sekarang berjalan dan bisa diakses di: **http://localhost:8000**

---

## 3. Menyiapkan dan Menjalankan Frontend (React.js)

Bagian antarmuka dibangun menggunakan React dengan bantuan *bundler* Vite yang sangat cepat.

1. Buka **terminal/tab baru** (biarkan terminal backend tetap menyala) dan masuk ke folder `frontend`:
   ```bash
   cd frontend
   ```
2. Instal semua dependensi (NPM modules) yang dibutuhkan:
   ```bash
   npm install
   ```
3. Setelah instalasi selesai, jalankan server pengembangan lokal untuk frontend:
   ```bash
   npm run dev
   ```
4. Frontend Anda sekarang berjalan. Klik atau buka tautan yang muncul di terminal (biasanya di **http://localhost:5173**).

---

## 🎯 Kesimpulan Alur Kerja (Workflow)
Saat Anda mengembangkan aplikasi ini setiap harinya, Anda akan selalu membutuhkan **dua terminal aktif**:
- **Terminal 1:** Membuka folder `backend` dan menjalankan `php artisan serve`
- **Terminal 2:** Membuka folder `frontend` dan menjalankan `npm run dev`
