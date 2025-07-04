# 🍽️ Aplikasi Pemesanan Makanan & Minuman

Aplikasi ini merupakan sistem pemesanan makanan dan minuman berbasis web untuk pengguna akhir (pelanggan). Pengguna dapat memilih menu makanan/minuman, menambahkan ke keranjang, menyelesaikan transaksi, serta melihat riwayat pesanan.

## 🎯 Tujuan

Membantu proses pemesanan makanan/minuman secara digital, efisien, dan terorganisir dengan tampilan modern yang ramah pengguna.

---

## 📌 Fitur Utama

### 🔹 Menu
- Menampilkan daftar makanan dan minuman yang tersedia.
- Setiap menu dilengkapi gambar, nama, harga, dan tombol pemesanan.
- Data menu tidak berasal dari server, langsung ditulis di `menuStore`.

### 🔹 Keranjang
- Pengguna dapat menambahkan banyak item dalam sekali transaksi.
- Menghitung total harga otomatis.
- Menyediakan opsi untuk menghapus item dari keranjang.
- Transaksi bersifat aktif (belum selesai) hingga dikonfirmasi.

### 🔹 Pesanan (Riwayat)
- Menampilkan daftar transaksi yang telah diselesaikan.
- Setiap transaksi menampilkan tanggal, jumlah item, dan total harga.

### 🔹 Profil
- Halaman dummy untuk profil pengguna, bisa dikembangkan lebih lanjut.

---

## 🏗️ Teknologi yang Digunakan

- **Vue 3** + **Vite**
- **Pinia** untuk manajemen state
- **Vue Router** untuk navigasi halaman
- **Tailwind CSS** untuk styling
- **json-server** sebagai backend mock API
- **Axios** untuk HTTP request

---

## Routingan
| Path         | Komponen            | Deskripsi Halaman       |
| ------------ | ------------------- | ----------------------- |
| `/`          | `MenuView.vue`      | Halaman daftar menu     |
| `/keranjang` | `KeranjangView.vue` | Halaman keranjang aktif |
| `/pesanan`   | `PesananView.vue`   | Halaman riwayat pesanan |
| `/profil`    | `ProfilView.vue`    | Halaman profil (dummy)  |


---

## Endpoint
| Method | Endpoint         | Deskripsi                                       |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | `/transaksi`     | Mengambil semua transaksi                       |
| POST   | `/transaksi`     | Menambahkan transaksi baru                      |
| PUT    | `/transaksi/:id` | Memperbarui transaksi (tambah item, selesaikan) |
| DELETE | `/transaksi/:id` | Menghapus transaksi (jika diaktifkan)           |
