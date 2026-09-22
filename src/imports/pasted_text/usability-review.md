1. Visibility of System Status

Penjelasan: Kotak unggah "Bukti Pendukung" di FormulirPage menampilkan teks "Klik untuk pilih file atau seret ke sini", tapi di kode tidak ada handler onDrop / onDragOver sama sekali — hanya tombol onClick. Kalau pengguna benar-benar men-drag file ke area itu, tidak terjadi apa-apa: tidak ada file yang masuk, tidak ada pesan error, tidak ada highlight zona drop. Sistem menjanjikan sebuah kapabilitas lewat teks, tapi tidak memberi status apa pun saat kapabilitas itu dicoba. Selain itu, semua tombol submit (Kirim Pengaduan, Daftar Sekarang, Masuk) langsung berpindah state begitu diklik — tidak ada state "Mengirim..." sebelum modal sukses muncul, yang aman untuk prototipe statis tapi jadi berisiko di implementasi nyata dengan API yang punya latensi.

Perbaikan:

Implementasikan onDragOver/onDrop yang benar-benar berfungsi pada drop zone, dengan highlight visual (border berubah warna) saat file di-drag di atasnya.
Kalau drag-and-drop belum mau diimplementasikan penuh, hapus dulu kalimat "atau seret ke sini" dari teks — jangan menjanjikan yang tidak berjalan.
Tambahkan state loading singkat (spinner + teks "Mengirim...") pada tombol submit sebelum modal sukses muncul, sebagai pola yang siap dipasangkan ke API sungguhan nanti.
2. Match Between System and the Real World

Penjelasan: Istilah "Maklumat Pelayanan" (di MaklumatPage) masih dipakai apa adanya tanpa padanan bahasa awam. Selain itu, kartu infografis "P3SPS 2024" di DataPage/beranda hanya menampilkan akronim tanpa kepanjangan di dekatnya — padahal di halaman lain (berita, profil) kepanjangannya ("Pedoman Perilaku Penyiaran dan Standar Program Siaran") memang dituliskan. Ketidakkonsistenan ini membuat pengguna awam yang pertama kali melihat kartu infografis tidak tahu itu tentang apa.

Perbaikan:

Tambahkan sub-judul di MaklumatPage, misalnya "Maklumat Pelayanan (Janji Standar Pelayanan Kami)".
Di kartu infografis INFOGRAPHICS, ubah judul jadi menyertakan kepanjangan singkat, misalnya "P3SPS 2024 — Pedoman Perilaku Penyiaran", atau tambahkan title/tooltip HTML pada kartu.
3. User Control and Freedom

Penjelasan: FormulirPage (form pengaduan) tidak punya tombol "Batal"/reset dan tidak ada peringatan beforeunload — kalau pengguna sudah mengisi banyak field lalu tidak sengaja menutup tab atau klik menu lain, semua data hilang tanpa konfirmasi apa pun. Ini berbeda dengan alur DaftarPage yang setidaknya punya tombol "← Kembali" antar-step, tapi begitu keluar dari alur registrasi lewat navbar, isian juga langsung hilang tanpa peringatan.

Perbaikan:

Tambahkan tombol "Batal" sekunder di sebelah "Kirim Pengaduan" yang mengonfirmasi dulu ("Yakin ingin membatalkan? Data yang sudah diisi akan hilang.") sebelum mengosongkan form.
Pasang listener beforeunload yang aktif kalau ada perubahan pada form (isDirty), untuk mencegah kehilangan data tidak sengaja saat pindah tab/menutup browser.
4. Consistency and Standards

Penjelasan: Selain temuan lama (5 label CTA berbeda untuk aksi yang sama, ikon sosial media header ≠ footer), ditemukan inkonsistensi pola interaksi: DaftarPage (form registrasi, 10 field) menggunakan stepper 3 langkah, sementara FormulirPage (form pengaduan, jumlah field yang sebanding) ditampilkan sebagai satu halaman panjang tanpa stepper. Dua form dengan kompleksitas mirip diperlakukan dengan pola UI yang berbeda tanpa alasan jelas — membingungkan ekspektasi pengguna soal "form panjang di situs ini biasanya seperti apa".

Perbaikan:

Standarkan: kalau kriteria "form panjang" adalah >6 field, terapkan stepper yang sama di kedua form (misalnya FormulirPage dipecah jadi "Data Pelapor" → "Data Siaran & Bukti").
Selesaikan juga penyamaan label CTA dan ikon sosial media seperti sudah direkomendasikan sebelumnya.
5. Error Prevention

Penjelasan: Field "Uraian Pengaduan" (deskripsi) di FormulirPage — field paling penting dalam form ini — sama sekali tidak masuk ke objek errors dan tidak punya maxLength/counter karakter. Pengguna bisa submit uraian sepanjang satu kata (misal "kasar") dan form tetap lolos validasi (hasErrors hanya mengecek nama, email, telepon, tanggal). Ini persis temuan asli yang belum tersentuh sama sekali di redesain.

Perbaikan:

Tambahkan validasi panjang minimum (misal 50 karakter) untuk deskripsi, masukkan ke objek errors, dan tampilkan counter karakter real-time ({form.deskripsi.length}/50 karakter minimum) di bawah textarea, sama seperti pola ErrMsg/OkMsg yang sudah dipakai di field lain.
6. Recognition Rather Than Recall

Penjelasan: Ini salah satu prinsip yang membaik — field Email di FormulirPage sudah punya hint proaktif "Email harus sudah terdaftar. Contoh: budi@gmail.com" sebelum pengguna mulai mengetik, dan field Program di step Data Siaran otomatis menampilkan "Pilih stasiun dulu" kalau stasiun belum dipilih. Tapi pola ini tidak konsisten diterapkan: field Password di DaftarPage tidak punya hint syarat ("minimal 8 karakter") yang tampil dari awal — pengguna baru tahu syaratnya setelah mengisi lalu di-blur, dan error baru muncul sesudahnya.

Perbaikan: Tambahkan teks bantuan statis di bawah field Password sejak awal (sebelum disentuh), sama seperti pola hint di field Email — misalnya "Minimal 8 karakter, kombinasikan huruf dan angka untuk keamanan lebih baik."

7. Flexibility and Efficiency of Use

Penjelasan: Pencarian sekarang cuma ada untuk daftar KPID (Cari KPID...). Belum ada pencarian lintas-konten (berita, infografis, ketentuan) dari satu titik, dan pengguna yang sudah tahu daerahnya (misalnya wartawan yang rutin memantau) tetap harus melewati alur navigasi generik yang sama seperti pengguna baru — tidak ada jalan pintas "langsung ke KPID [provinsi saya]".

Perbaikan: Tambahkan search bar global di Navbar yang mencari lintas NEWS_DATA, INFOGRAPHICS, dan konten Ketentuan sekaligus, ditampilkan sebagai dropdown hasil ringkas. Untuk shortcut, tambahkan opsi "ingat provinsi saya" (disimpan di sessionStorage) di halaman KPID agar kunjungan berikutnya langsung menyorot KPID terkait.

8. Aesthetic and Minimalist Design

Penjelasan: Hero beranda masih menumpuk banyak elemen yang bersaing secara visual: slider promosi, dua tombol CTA, dan dua badge app store besar (Google Play + App Store) dalam satu layar — ditambah promosi aplikasi yang sama juga muncul di TopBar ("📱 Download Aplikasi"). Total ada 3 ajakan berbeda (Buat Pengaduan, Lacak Aduan, Download Aplikasi) yang berebut perhatian di atas fold.

Perbaikan: Pertahankan hanya satu CTA utama paling menonjol ("Buat Pengaduan") secara visual dominan; jadikan "Lacak Aduan" tombol sekunder (outline, lebih kecil); dan hapus tombol "Download Aplikasi" dari TopBar karena sudah terwakili oleh badge besar di hero — cukup satu titik promosi aplikasi per halaman.

9. Help Users Recognize, Diagnose, and Recover from Errors

Penjelasan: Tombol submit di DaftarPage step 3 dan FormulirPage berubah abu-abu (disabled) kalau form belum valid, tapi tidak ada penjelasan field mana yang masih bermasalah kalau pengguna belum pernah menyentuh field tersebut (touched masih false, jadi showErr tidak menampilkan apa pun). Pengguna hanya melihat tombol nonaktif tanpa tahu kenapa. Ditambah lagi, di FormulirPage, field wajib seperti stasiun, program, deskripsi, dan checkbox setuju hanya mengandalkan atribut HTML required bawaan browser — begitu diklik submit, browser menampilkan tooltip validasi bawaan yang gaya visualnya berbeda total dari pesan error custom (teks merah + ikon ⚠) yang dipakai di field lain pada form yang sama.

Perbaikan:

Saat tombol disabled diklik (atau di-hover), tampilkan ringkasan singkat field mana saja yang belum valid, misalnya lewat tooltip "Lengkapi: Uraian Pengaduan, Persetujuan" di atas tombol.
Ganti validasi required bawaan browser di stasiun, program, deskripsi, dan setuju dengan pola error custom yang sama (teks merah + ikon ⚠) seperti field lain, supaya seluruh form konsisten secara visual saat menampilkan kesalahan.
10. Help and Documentation

Penjelasan: Tidak ada menu "Bantuan"/FAQ di Navbar sama sekali (NAV_ITEMS hanya: Beranda, Profil, Pengaduan Penyiaran, Berita, Data, Ketentuan, Kontak). Istilah yang berpotensi asing bagi pelapor awam — "Dugaan Pelanggaran", "P3SPS", "KPID vs KPI Pusat" — tidak punya ikon bantuan (?) atau tautan glosarium di mana pun pada form pengaduan, padahal titik keputusan itu justru saat pengguna paling butuh bantuan kontekstual.

Perbaikan: Tambahkan item menu "Bantuan/FAQ" di Navbar, dan pasang ikon "?" kecil di sebelah label field seperti "Dugaan Pelanggaran" pada FormulirPage yang membuka popover singkat berisi penjelasan tiap kategori pelanggaran serta panduan kapan melapor ke KPI Pusat vs KPID daerah.