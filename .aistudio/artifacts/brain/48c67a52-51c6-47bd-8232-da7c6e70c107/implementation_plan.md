# Rencana Implementasi: Fitur Perbandingan Kamar Kost (Kost Comparison)

Fitur ini dirancang untuk memudahkan mahasiswa dan calon penghuni memilih hunian terbaik dengan membandingkan 2–3 pilihan kamar secara objektif dan mendalam.

---

## 1. Analisis Kebutuhan & Hasil Konfirmasi Pengguna
- **Interaksi Pemilihan**: Menggunakan **Floating Action Bar** melayang di bawah layar yang muncul secara dinamis begitu pengguna memilih kamar pertama.
- **Kedalaman Komparasi**: Menampilkan **seluruh spesifikasi lengkap** secara komprehensif, dilengkapi penanda visual keunggulan dan perbedaan fitur antar kamar yang dibandingkan.
- **Kapasitas Perbandingan**: Maksimal **3 kamar kost** secara bersamaan agar tetap proporsional dan mudah dibaca baik di layar desktop maupun mobile/tablet.

---

## 2. Struktur Komponen & Alur Data

### A. `src/components/CompareFloatingBar.tsx` (Komponen Baru)
- **Fungsi**: Panel melayang di bagian bawah layar (*fixed bottom*) saat `selectedKostsForCompare.length > 0`.
- **Fitur Utama**:
  - Menampilkan thumbnail, nama singkat, dan tarif per bulan untuk setiap kamar yang dipilih (1, 2, atau 3 kamar).
  - Tombol silang kecil (*remove icon*) pada masing-masing item untuk membatalkan pilihan.
  - Slot kosong (*empty placeholder slot*) yang mengajak pengguna memilih kamar berikutnya jika baru memilih 1 atau 2 kamar (misal: *"+ Tambah Kamar Lain"*).
  - Tombol utama **"Bandingkan Sekarang (X/3)"** dengan badge status (di-disable jika baru 1 kamar, aktif dengan animasi saat 2–3 kamar).
  - Tombol **"Reset Semua"** untuk mengosongkan pilihan dalam satu klik.
  - Penyesuaian layout agar harmonis dan tidak bertumpuk dengan *Sticky Mobile CTA* di layar smartphone.

### B. `src/components/CompareModal.tsx` (Komponen Baru)
- **Fungsi**: Modal dialog interaktif layar penuh / *wide overlay* (`max-w-5xl`) dengan tabel perbandingan berdampingan (*side-by-side*).
- **Struktur Baris Komparasi**:
  1. **Header Kolom Kamar**:
     - Foto utama kamar & badge kategori (Putra / Putri / Campur).
     - Nama kost dan area lokasi di Bojongsoang.
     - Harga sewa bulanan & status ketersediaan.
     - Tombol aksi langsung: *"Booking Sekarang"* (membuka `BookingModal`) dan *"Lihat Detail"* (membuka `KostDetailModal`).
  2. **Kategori: Dimensi & Aksesibilitas**:
     - Ukuran kamar (misal: 3x4 m²).
     - Jarak ke gerbang Telkom University (km & waktu tempuh motor/jalan kaki).
  3. **Kategori: Fasilitas Inti Kamar**:
     - Kamar Mandi (Kamar Mandi Dalam vs Luar).
     - **Water Heater** (Ada / Tidak Ada — dengan badge kontras).
     - Pendingin Udara (AC hemat energi vs Kipas angin).
     - Wi-Fi (Kecepatan & ketersediaan).
     - Perabot utama (Kasur springbed, lemari pakaian, meja & kursi belajar).
  4. **Kategori: Dapur Bersama & Kebijakan Gas**:
     - Fasilitas dapur bersama (kompor, wastafel cuci piring, kulkas bersama, dispenser).
     - **Kebijakan Gas** (Gas gratis disediakan pengelola vs Iuran/beli tabung gas sendiri).
  5. **Kategori: Kelistrikan & Parkir**:
     - Kebijakan listrik (Termasuk listrik vs Token mandiri per kamar).
     - Fasilitas parkir (Motor luas / Mobil beratap).
     - Keamanan (CCTV 24 Jam, pagar akses kartu/kunci bebas 24 jam).
  6. **Kategori: Transparansi Kekurangan (Drawbacks)**:
     - Daftar poin kekurangan yang jujur (misal: *WC di luar kamar*, *Gas beli sendiri*, *Tidak ada AC*, *Parkir mobil terbatas*).
     - Membantu calon penyewa mengambil keputusan tanpa kekecewaan saat survei langsung.
  7. **Fitur Tambahan**:
     - Tombol toggle filter *"Sorot Perbedaan Saja"* untuk mempercepat evaluasi poin yang berbeda.

### C. Pembaruan `src/components/KostCard.tsx`
- Menambahkan tombol interaktif **"+ Bandingkan"** pada setiap kartu kamar kost.
- Indikator status visual:
  - Default: Tombol abu-abu/outline dengan ikon timbangan/panah perbandingan.
  - Terpilih: Tombol aktif dengan warna primer biru laut (`bg-sky-600 text-white`) dan tanda centang.
- Feedback ketika pengguna mencoba memilih lebih dari 3 kamar (menampilkan *warning tooltip* atau toast bahwa maksimal 3 kamar).

### D. Pembaruan `src/App.tsx`
- Menambahkan state:
  - `selectedKostsForCompare: string[]` (menyimpan array ID kost yang dipilih, maks 3).
  - `isCompareModalOpen: boolean`.
- Handler fungsi:
  - `handleToggleCompare(id: string)`: menambah atau menghapus kost dari daftar komparasi.
  - `handleRemoveFromCompare(id: string)`: menghapus kost tertentu.
  - `handleClearCompare()`: mereset semua pilihan.
  - `handleOpenCompareModal()`: membuka modal komparasi.
  - `handleBookFromCompare(kost: KostProperty)`: memicu pemesanan langsung dari tabel perbandingan.
  - `handleViewDetailFromCompare(kost: KostProperty)`: membuka modal detail lengkap dari tabel perbandingan.

---

## 3. Langkah-Langkah Pengerjaan (Step-by-Step)
1. **Langkah 1**: Buat komponen `src/components/CompareFloatingBar.tsx` dengan transisi animasi halus (slide up) saat item dipilih.
2. **Langkah 2**: Buat komponen `src/components/CompareModal.tsx` dengan tabel perbandingan responsif, badge visual untuk Water Heater, Dapur, Gas, dan highlight kekurangan.
3. **Langkah 3**: Integrasikan tombol komparasi pada `src/components/KostCard.tsx`.
4. **Langkah 4**: Hubungkan seluruh state dan event handler di `src/App.tsx`.
5. **Langkah 5**: Lakukan verifikasi kompilasi melalui `compile_applet` dan pemindaian syntax/lint melalui `lint_applet`.

---

## 4. Kriteria Keberhasilan (Acceptance Criteria)
- [x] Pengguna dapat menandai 2 atau 3 kamar kost untuk dibandingkan.
- [x] Floating bar muncul melayang di bawah layar secara intuitif saat kamar dipilih.
- [x] Modal perbandingan menampilkan tabel komparasi lengkap termasuk status Water Heater (Ada/Tidak Ada), Dapur Bersama & Kebijakan Gas, serta Kekurangan Kamar.
- [x] Calon penyewa dapat langsung klik "Booking" atau "Lihat Detail" dari dalam modal komparasi.
- [x] Kompilasi `npm run build` dan `npm run lint` berjalan 100% bebas error.
