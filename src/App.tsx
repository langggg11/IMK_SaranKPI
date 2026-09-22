import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const logoKpi = "/images/logo-kpi.png";
const tataCara = "/images/tata-cara-pengaduan.jpg";
import imgVisi from "@/imports/image-5.png";
import imgMisi from "@/imports/image-3.png";
import imgTugas from "@/imports/image-4.png";
import imgProfilVisiMisi from "@/imports/Gemini_Generated_Image_n719ikn719ikn719__1_.jpg";
import imgProfilJadwal from "@/imports/Gemini_Generated_Image_fubnunfubnunfubn.jpg";

// ─── Theme colors ─────────────────────────────────────────────────────────────
const C = {
  primary: "var(--color-primary)",
  primaryDark: "var(--color-primary-dark)",
  primaryLight: "var(--color-primary-light)",
  accent: "#c0392b",
  navy: "#1a0d0d",
  navyDeep: "#0f0808",
  bg: "var(--color-bg)",
  muted: "var(--color-muted)",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Page =
  | "beranda"
  | "profil"
  | "profil-saya"
  | "lupa-password"
  | "ubah-password"
  | "visi-misi"
  | "maklumat"
  | "jadwal"
  | "formulir"
  | "pengaduan-saya"
  | "berita"
  | "data"
  | "ketentuan"
  | "kontak"
  | "kontak-pusat"
  | "kontak-kpid"
  | "masuk"
  | "daftar"
  | "bantuan"
  | "unduh";

// ─── Nav config ───────────────────────────────────────────────────────────────
const NAV_ITEMS: {
  label: string;
  page?: Page;
  children?: { label: string; page: Page }[];
}[] = [
  { label: "Beranda", page: "beranda" },
  {
    label: "Profil",
    children: [
      { label: "Visi & Misi", page: "visi-misi" },
      { label: "Maklumat", page: "maklumat" },
      { label: "Jadwal", page: "jadwal" },
      { label: "Ketentuan", page: "ketentuan" },
      { label: "Kontak", page: "kontak" },
    ],
  },
  {
    label: "Pengaduan",
    children: [
      { label: "Formulir", page: "formulir" },
      { label: "Pengaduan Saya", page: "pengaduan-saya" },
    ],
  },
  { label: "Berita", page: "berita" },
  { label: "Data", page: "data" },
  { label: "Bantuan", page: "bantuan" },
];

// ─── Data ────────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1625236239092-8d15fbff5420?w=1400&h=600&fit=crop&auto=format",
    alt: "Media penyiaran Indonesia",
  },
  {
    img: "https://images.unsplash.com/photo-1622107906469-632c870f19e9?w=1400&h=600&fit=crop&auto=format",
    alt: "Kameraman siaran",
  },
  {
    img: "https://images.unsplash.com/photo-1688039763740-9036cb5d566e?w=1400&h=600&fit=crop&auto=format",
    alt: "Studio radio",
  },
  {
    img: "https://images.unsplash.com/photo-1716801543126-2748e9299f75?w=1400&h=600&fit=crop&auto=format",
    alt: "Televisi",
  },
];

const STEPS = [
  { num: "1", title: "Daftar / Masuk", desc: "Buat akun atau masuk menggunakan akun yang sudah terdaftar.", icon: "👤" },
  { num: "2", title: "Isi Formulir", desc: "Lengkapi formulir pengaduan dengan informasi konten yang dilaporkan.", icon: "📝" },
  { num: "3", title: "Lampirkan Bukti", desc: "Unggah bukti berupa tangkapan layar atau rekaman konten siaran.", icon: "📎" },
  { num: "4", title: "Pantau Progres", desc: "Lacak status pengaduan Anda melalui fitur pelacak pengaduan.", icon: "🔍" },
];

const NEWS_DATA = [
  {
    date: "25 Agustus 2026",
    category: "Siaran Pers",
    title: "KPI Tegur Stasiun TV Nasional atas Pelanggaran Program Hiburan",
    excerpt: "KPI memberikan teguran resmi kepada stasiun televisi nasional yang melanggar Pedoman Perilaku Penyiaran dan Standar Program Siaran (P3SPS).",
    img: "https://images.unsplash.com/photo-1622107906469-632c870f19e9?w=400&h=220&fit=crop&auto=format",
    full: "Komisi Penyiaran Indonesia (KPI) resmi mengeluarkan surat teguran tertulis kepada salah satu stasiun televisi nasional yang terbukti melanggar Pedoman Perilaku Penyiaran dan Standar Program Siaran (P3SPS). Pelanggaran tersebut ditemukan dalam program hiburan prime time yang menampilkan konten tidak sesuai untuk khalayak umum. KPI meminta stasiun TV bersangkutan untuk segera memperbaiki konten siarannya dan tidak mengulangi pelanggaran serupa.",
  },
  {
    date: "20 Agustus 2026",
    category: "Pengumuman",
    title: "Jadwal Sidang Evaluasi Lembaga Penyiaran Periode September 2026",
    excerpt: "KPI mengumumkan jadwal sidang evaluasi dengar pendapat bagi lembaga penyiaran yang akan berlangsung bulan September.",
    img: "https://images.unsplash.com/photo-1625236239092-8d15fbff5420?w=400&h=220&fit=crop&auto=format",
    full: "Komisi Penyiaran Indonesia (KPI) menjadwalkan serangkaian sidang evaluasi dengar pendapat (EDP) untuk lembaga penyiaran periode September 2026. Sidang ini merupakan bagian dari proses perpanjangan izin penyelenggaraan penyiaran (IPP) yang rutin dilaksanakan setiap tahun. Lembaga penyiaran yang terjadwal diminta untuk hadir dan menyiapkan dokumen laporan penyelenggaraan penyiaran selama periode berlakunya izin.",
  },
  {
    date: "15 Agustus 2026",
    category: "Berita",
    title: "Sosialisasi P3SPS 2026 Hadir di 34 Provinsi Seluruh Indonesia",
    excerpt: "KPI menyelenggarakan sosialisasi Pedoman Perilaku Penyiaran dan Standar Program Siaran terbaru di seluruh wilayah Indonesia.",
    img: "https://images.unsplash.com/photo-1688039763740-9036cb5d566e?w=400&h=220&fit=crop&auto=format",
    full: "KPI bersama KPID seluruh Indonesia menyelenggarakan kegiatan sosialisasi P3SPS 2026 secara serentak di 34 provinsi. Kegiatan ini bertujuan untuk memberikan pemahaman yang komprehensif kepada seluruh pemangku kepentingan penyiaran mengenai aturan-aturan baru yang berlaku dalam Pedoman Perilaku Penyiaran dan Standar Program Siaran edisi terbaru.",
  },
  {
    date: "10 Agustus 2026",
    category: "Siaran Pers",
    title: "KPI Luncurkan Fitur Baru SARAN Mobile untuk Kemudahan Pelaporan",
    excerpt: "Aplikasi SARAN versi terbaru kini hadir dengan fitur pelaporan real-time dan notifikasi progres pengaduan secara langsung.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop&auto=format",
    full: "KPI resmi meluncurkan pembaruan besar aplikasi SARAN (Sistem Aduan Rakyat) versi 3.0. Versi terbaru ini menghadirkan fitur pelaporan real-time, notifikasi progres pengaduan, dan antarmuka yang lebih ramah pengguna. Masyarakat kini dapat lebih mudah melaporkan konten siaran yang melanggar ketentuan penyiaran langsung dari smartphone mereka.",
  },
  {
    date: "5 Agustus 2026",
    category: "Pengumuman",
    title: "Rekrutmen Komisioner KPI Daerah Periode 2026–2029 Dibuka",
    excerpt: "KPI membuka pendaftaran untuk rekrutmen anggota Komisi Penyiaran Indonesia Daerah (KPID) periode 2026-2029.",
    img: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=400&h=220&fit=crop&auto=format",
    full: "Komisi Penyiaran Indonesia membuka pendaftaran rekrutmen anggota Komisi Penyiaran Indonesia Daerah (KPID) untuk periode jabatan 2026-2029. Rekrutmen ini dibuka untuk seluruh provinsi di Indonesia. Calon anggota KPID harus memenuhi persyaratan yang ditetapkan dalam Undang-Undang Penyiaran dan peraturan pelaksanaannya.",
  },
  {
    date: "1 Agustus 2026",
    category: "Berita",
    title: "Survei Indeks Kualitas Program Siaran TV 2026 Semester I Dirilis",
    excerpt: "KPI merilis hasil survei indeks kualitas program siaran televisi semester pertama tahun 2026 untuk 15 stasiun TV nasional.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=220&fit=crop&auto=format",
    full: "KPI merilis hasil survei Indeks Kualitas Program Siaran Televisi semester I 2026 yang melibatkan 15 stasiun TV nasional. Survei ini dilakukan di 12 kota besar di Indonesia dengan melibatkan ribuan responden. Hasil survei menunjukkan adanya peningkatan kualitas pada program berita dan dokumenter, namun masih terdapat catatan untuk program hiburan dan reality show.",
  },
];

const INFOGRAPHICS = [
  { title: "Tata Cara Pengaduan", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&auto=format" },
  { title: "Jenis Pelanggaran Siaran", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&auto=format" },
  { title: "Statistik Pengaduan 2026", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=200&fit=crop&auto=format" },
  { title: "P3SPS 2024 — Pedoman Perilaku Penyiaran", img: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=300&h=200&fit=crop&auto=format" },
];

const REGISTERED_EMAILS = new Set([
  "user@example.com", "budi@gmail.com", "siti@yahoo.com", "andi@kpi.go.id",
  "test@test.com", "demo@saran.id", "pelapor@email.com", "admin@kpi.go.id",
]);

const PENGADUAN_DATA = [
  {
    id: "ADU-2026-001247", tanggal: "20 Agustus 2026", stasiun: "Trans TV", program: "Hitam Putih",
    jam: "20:00", pasal: "Konten kekerasan", status: "Dalam Proses", statusColor: "#e67e22",
    deskripsi: "Program menampilkan adegan perkelahian yang tidak disensor dan tidak layak ditonton oleh anak-anak di bawah umur pada jam prime time.",
    timeline: [
      { tgl: "20 Agt 2026", aksi: "Pengaduan diterima", done: true },
      { tgl: "22 Agt 2026", aksi: "Verifikasi administrasi", done: true },
      { tgl: "26 Agt 2026", aksi: "Kajian konten oleh tim KPI", done: false },
      { tgl: "-", aksi: "Keputusan sidang pleno", done: false },
    ],
  },
  {
    id: "ADU-2026-000983", tanggal: "5 Agustus 2026", stasiun: "RCTI", program: "Sinetron Ikatan Cinta",
    jam: "19:30", pasal: "Perlindungan anak", status: "Selesai", statusColor: "#27ae60",
    deskripsi: "Dialog dalam sinetron mengandung unsur bullying verbal terhadap karakter anak yang dapat berdampak negatif pada penonton anak.",
    timeline: [
      { tgl: "5 Agt 2026", aksi: "Pengaduan diterima", done: true },
      { tgl: "7 Agt 2026", aksi: "Verifikasi administrasi", done: true },
      { tgl: "12 Agt 2026", aksi: "Kajian konten oleh tim KPI", done: true },
      { tgl: "18 Agt 2026", aksi: "Teguran tertulis dikirim ke stasiun", done: true },
    ],
  },
  {
    id: "ADU-2026-000712", tanggal: "22 Juli 2026", stasiun: "MNC TV", program: "Tawa Sutra",
    jam: "21:00", pasal: "Konten SARA", status: "Ditolak", statusColor: "#c0392b",
    deskripsi: "Konten komedi yang dianggap mengandung stereotype negatif terhadap kelompok etnis tertentu.",
    timeline: [
      { tgl: "22 Jul 2026", aksi: "Pengaduan diterima", done: true },
      { tgl: "24 Jul 2026", aksi: "Verifikasi administrasi", done: true },
      { tgl: "28 Jul 2026", aksi: "Kajian: tidak cukup bukti pelanggaran", done: true },
      { tgl: "30 Jul 2026", aksi: "Pengaduan ditolak", done: true },
    ],
  },
];

interface KPIDInfo { name: string; provinsi: string; telepon: string; email: string; alamat: string; }
const KPID_LIST: KPIDInfo[] = [
  { name: "KPID Aceh", provinsi: "Prov. Aceh", telepon: "0651-7556085", email: "kpid@acehprov.go.id", alamat: "Jl. T. Nyak Arief No. 219, Banda Aceh" },
  { name: "KPID Sumatera Utara", provinsi: "Prov. Sumatera Utara", telepon: "061-4158876", email: "kpid.sumut@gmail.com", alamat: "Jl. Willem Iskandar No. 1, Medan" },
  { name: "KPID Sumatera Barat", provinsi: "Prov. Sumatera Barat", telepon: "0751-893000", email: "kpid@sumbarprov.go.id", alamat: "Jl. Khatib Sulaiman No. 8, Padang" },
  { name: "KPID Riau", provinsi: "Prov. Riau", telepon: "0761-42151", email: "kpidriau@gmail.com", alamat: "Jl. Jend. Sudirman No. 460, Pekanbaru" },
  { name: "KPID Kepulauan Riau", provinsi: "Prov. Kepulauan Riau", telepon: "0778-460893", email: "kpid@kepriprov.go.id", alamat: "Jl. Soekarno-Hatta No. 1, Tanjungpinang" },
  { name: "KPID Jambi", provinsi: "Prov. Jambi", telepon: "0741-669100", email: "kpidjambi@gmail.com", alamat: "Jl. A. Yani No. 100, Jambi" },
  { name: "KPID Bengkulu", provinsi: "Prov. Bengkulu", telepon: "0736-349026", email: "kpidbengkulu@gmail.com", alamat: "Jl. Salak Raya No. 10, Bengkulu" },
  { name: "KPID Sumatera Selatan", provinsi: "Prov. Sumatera Selatan", telepon: "0711-351232", email: "kpid@sumselprov.go.id", alamat: "Jl. Kapten A. Rivai No. 1, Palembang" },
  { name: "KPID Bangka Belitung", provinsi: "Prov. Bangka Belitung", telepon: "0717-421580", email: "kpid@babelprov.go.id", alamat: "Jl. Merdeka No. 4, Pangkal Pinang" },
  { name: "KPID Lampung", provinsi: "Prov. Lampung", telepon: "0721-486637", email: "kpidlampung@gmail.com", alamat: "Jl. A. Yani No. 31, Bandar Lampung" },
  { name: "KPID DKI Jakarta", provinsi: "Prov. DKI Jakarta", telepon: "021-5440338", email: "kpid@jakarta.go.id", alamat: "Jl. Kebon Sirih No. 18, Jakarta Pusat" },
  { name: "KPID Banten", provinsi: "Prov. Banten", telepon: "085283338660", email: "kpid@bantenprov.go.id - kpidbanten@yahoo.co.id", alamat: "Kawasan Pusat Pemerintahan Prov. Banten (KP3B) Jl. Syeh Nawawi Al-Bantani Blok F No.1 Curug Kota Serang 42171" },
  { name: "KPID Jawa Barat", provinsi: "Prov. Jawa Barat", telepon: "022-4234393", email: "kpid@jabarprov.go.id", alamat: "Jl. Wastukencana No. 2, Bandung" },
  { name: "KPID Jawa Tengah", provinsi: "Prov. Jawa Tengah", telepon: "024-3544477", email: "kpidjateng@gmail.com", alamat: "Jl. Pahlawan No. 9, Semarang" },
  { name: "KPID DI Yogyakarta", provinsi: "Prov. DI Yogyakarta", telepon: "0274-588865", email: "kpid@jogjaprov.go.id", alamat: "Jl. Brigjen Katamso No. 1, Yogyakarta" },
  { name: "KPID Jawa Timur", provinsi: "Prov. Jawa Timur", telepon: "031-5616114", email: "kpid@jatimprov.go.id", alamat: "Jl. A. Yani No. 242, Surabaya" },
  { name: "KPID Bali", provinsi: "Prov. Bali", telepon: "0361-227461", email: "kpidbali@gmail.com", alamat: "Jl. Cok Agung Tresna No. 1, Denpasar" },
  { name: "KPID NTB", provinsi: "Prov. Nusa Tenggara Barat", telepon: "0370-629000", email: "kpidntb@gmail.com", alamat: "Jl. Pejanggik No. 12, Mataram" },
  { name: "KPID NTT", provinsi: "Prov. Nusa Tenggara Timur", telepon: "0380-821755", email: "kpidntt@gmail.com", alamat: "Jl. El Tari No. 52, Kupang" },
  { name: "KPID Kalimantan Barat", provinsi: "Prov. Kalimantan Barat", telepon: "0561-736395", email: "kpidkalbar@gmail.com", alamat: "Jl. A. Yani No. 1, Pontianak" },
  { name: "KPID Kalimantan Tengah", provinsi: "Prov. Kalimantan Tengah", telepon: "0536-3222055", email: "kpidkalteng@gmail.com", alamat: "Jl. Tjilik Riwut No. 97, Palangka Raya" },
  { name: "KPID Kalimantan Selatan", provinsi: "Prov. Kalimantan Selatan", telepon: "0511-3305000", email: "kpidkalsel@gmail.com", alamat: "Jl. Jend. Sudirman No. 29, Banjarmasin" },
  { name: "KPID Kalimantan Timur", provinsi: "Prov. Kalimantan Timur", telepon: "0541-741200", email: "kpidkaltim@gmail.com", alamat: "Jl. Gajah Mada No. 2, Samarinda" },
  { name: "KPID Kalimantan Utara", provinsi: "Prov. Kalimantan Utara", telepon: "0551-21006", email: "kpidkaltara@gmail.com", alamat: "Jl. Kolonel Soetadji No. 1, Tanjung Selor" },
  { name: "KPID Sulawesi Utara", provinsi: "Prov. Sulawesi Utara", telepon: "0431-862517", email: "kpidsulut@gmail.com", alamat: "Jl. 17 Agustus No. 1, Manado" },
  { name: "KPID Gorontalo", provinsi: "Prov. Gorontalo", telepon: "0435-831073", email: "kpidgorontalo@gmail.com", alamat: "Jl. Jend. Sudirman No. 1, Gorontalo" },
  { name: "KPID Sulawesi Tengah", provinsi: "Prov. Sulawesi Tengah", telepon: "0451-421060", email: "kpidsulteng@gmail.com", alamat: "Jl. Sam Ratulangi No. 101, Palu" },
  { name: "KPID Sulawesi Barat", provinsi: "Prov. Sulawesi Barat", telepon: "0426-2325060", email: "kpidsulbar@gmail.com", alamat: "Jl. H. Abdul Malik Pattana Endeng, Mamuju" },
  { name: "KPID Sulawesi Selatan", provinsi: "Prov. Sulawesi Selatan", telepon: "0411-3620606", email: "kpid@sulselprov.go.id", alamat: "Jl. A. Pangerang Pettarani No. 100, Makassar" },
  { name: "KPID Sulawesi Tenggara", provinsi: "Prov. Sulawesi Tenggara", telepon: "0401-3123606", email: "kpidsultra@gmail.com", alamat: "Jl. Sao-Sao No. 1, Kendari" },
  { name: "KPID Maluku", provinsi: "Prov. Maluku", telepon: "0911-312220", email: "kpidmaluku@gmail.com", alamat: "Jl. Pattimura No. 1, Ambon" },
  { name: "KPID Maluku Utara", provinsi: "Prov. Maluku Utara", telepon: "0921-3121120", email: "kpidmalut@gmail.com", alamat: "Jl. Raya Sofifi, Ternate" },
  { name: "KPID Papua", provinsi: "Prov. Papua", telepon: "0967-592014", email: "kpidpapua@gmail.com", alamat: "Jl. Dr. Sam Ratulangi No. 1, Jayapura" },
  { name: "KPID Papua Barat", provinsi: "Prov. Papua Barat", telepon: "0986-213450", email: "kpidpapuabarat@gmail.com", alamat: "Jl. Trikora No. 1, Manokwari" },
];

// ─── Shared layout components ─────────────────────────────────────────────────

function TopBar({ navigate, darkMode, toggleDark }: { navigate: (p: Page) => void; darkMode: boolean; toggleDark: () => void }) {
  return (
    <div className="text-white text-xs py-1.5 px-4" style={{ backgroundColor: C.primaryDark }}>
      <div className="w-full px-6 flex items-center justify-between">
        <span>Komisi Penyiaran Indonesia — Lembaga Negara Independen</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            {[
              { name: "Facebook", Icon: SocialIcons.Facebook, url: "https://facebook.com/KPIpusat" },
              { name: "Twitter / X", Icon: SocialIcons.Twitter, url: "https://twitter.com/KPIpusat" },
              { name: "Instagram", Icon: SocialIcons.Instagram, url: "https://instagram.com/kpi.pusat" },
              { name: "YouTube", Icon: SocialIcons.YouTube, url: "https://youtube.com/@KPIpusat" },
            ].map(({ name, Icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" title={name}
                className="hover:text-red-200 transition-colors">
                <Icon />
              </a>
            ))}
          </div>
          {/* Night mode toggle */}
          <button
            onClick={toggleDark}
            title={darkMode ? "Mode Terang" : "Night Mode"}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/30 hover:border-white/60 transition-all text-white/80 hover:text-white"
          >
            {darkMode ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm0 15a5 5 0 100-10 5 5 0 000 10zm7-5a1 1 0 011-1h1a1 1 0 010 2h-1a1 1 0 01-1-1zM3 11a1 1 0 010 2H2a1 1 0 010-2h1zm15.364-6.364a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.343 17.657a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM18.364 17.657l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414zM5.636 5.636l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414zM12 20a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1z"/>
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
            <span className="text-xs leading-none">{darkMode ? "Terang" : "Gelap"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar({ currentPage, navigate, currentUser, logout }: { currentPage: Page; navigate: (p: Page) => void; currentUser: string | null; logout: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);
  const [masukHover, setMasukHover] = useState(false);
  const [daftarHover, setDaftarHover] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLoginGateNav, setShowLoginGateNav] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false); setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allSearchItems = [
    ...NEWS_DATA.map((n) => ({ label: n.title, sub: n.category, page: "berita" as Page })),
    ...INFOGRAPHICS.map((i) => ({ label: i.title, sub: "Infografis", page: "data" as Page })),
    { label: "Ketentuan Penggunaan Layanan", sub: "Ketentuan", page: "ketentuan" as Page },
    { label: "Persyaratan Pelaporan", sub: "Ketentuan", page: "ketentuan" as Page },
    { label: "Kerahasiaan Identitas", sub: "Ketentuan", page: "ketentuan" as Page },
    { label: "Formulir Pengaduan", sub: "Pengaduan", page: "formulir" as Page },
    { label: "Lacak Pengaduan Saya", sub: "Pengaduan", page: "pengaduan-saya" as Page },
    { label: "Bantuan & FAQ", sub: "Bantuan", page: "bantuan" as Page },
    { label: "Kontak KPI Pusat", sub: "Kontak", page: "kontak-pusat" as Page },
    { label: "KPID Daerah", sub: "Kontak", page: "kontak-kpid" as Page },
  ];

  const searchResults = searchQuery.trim().length >= 2
    ? allSearchItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sub.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.page === currentPage) return true;
    if (item.children?.some((c) => c.page === currentPage)) return true;
    return false;
  };

  const navBtnStyle = (item: typeof NAV_ITEMS[0]) => {
    const active = isActive(item);
    const hovering = hovered === item.label;
    return {
      backgroundColor: active || hovering ? C.primary : "transparent",
      color: active || hovering ? "#ffffff" : "var(--color-text)",
    };
  };

  const childBtnStyle = (label: string) => ({
    backgroundColor: hoveredChild === label ? C.primary : "transparent",
    color: hoveredChild === label ? "#ffffff" : "var(--color-text)",
  });

  return (
    <>
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate("beranda")} className="flex items-center gap-3 flex-shrink-0">
            <img src={logoKpi} alt="Logo KPI" className="h-12 w-12 object-contain" />
            <div className="hidden sm:block text-left">
              <div className="font-bold text-sm leading-tight" style={{ color: C.primary }}>
                Komisi Penyiaran Indonesia
              </div>
              <div className="text-xs text-gray-500">Sistem Aduan Rakyat (SARAN)</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative flex flex-col"
                onMouseEnter={() => { setHovered(item.label); item.children && setOpenDropdown(item.label); }}
                onMouseLeave={() => { setHovered(null); setOpenDropdown(null); }}>
                <button
                  onClick={() => item.page && navigate(item.page)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                  style={navBtnStyle(item)}
                >
                  {item.label}
                  {item.children && (
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full bg-white border border-gray-100 shadow-xl rounded-xl py-1.5 z-50"
                    style={{ minWidth: "max-content", left: "50%", transform: "translateX(-50%)" }}>
                    {item.children.map((child) => (
                      <button key={child.label}
                        onClick={() => {
                          if (item.label === "Pengaduan" && !currentUser) {
                            setShowLoginGateNav(true); setOpenDropdown(null); setHovered(null); return;
                          }
                          navigate(child.page); setOpenDropdown(null); setHovered(null);
                        }}
                        className="w-full text-left block px-4 py-2.5 text-sm transition-colors whitespace-nowrap"
                        style={childBtnStyle(child.label)}
                        onMouseEnter={() => setHoveredChild(child.label)}
                        onMouseLeave={() => setHoveredChild(null)}>
                        {child.label}
                        {item.label === "Pengaduan" && !currentUser && (
                          <span className="ml-1.5 text-xs">🔒</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Inline oval search bar */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all"
                style={{ borderColor: searchOpen ? C.primary : "var(--color-border)", background: "transparent", minWidth: 320 }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari berita, infografis, FAQ..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                  onFocus={() => setSearchOpen(true)}
                  onKeyDown={(e) => e.key === "Escape" && (setSearchOpen(false), setSearchQuery(""))}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400 min-w-0"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                )}
              </div>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-full min-w-[320px] bg-white rounded-xl shadow-xl border z-50 overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
                  {searchQuery.length < 2 ? (
                    /* Aspek 15: Autocomplete suggestions — popular topics */
                    <div className="p-3">
                      <p className="text-xs text-gray-400 font-medium px-1 mb-2">Pencarian Populer</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["P3SPS", "Teguran TV", "Pengaduan siaran", "KPID", "Jadwal sidang", "Formulir aduan"].map((kw) => (
                          <button key={kw} onClick={() => setSearchQuery(kw)}
                            className="text-xs px-2.5 py-1 rounded-full border transition-colors hover:border-transparent hover:text-white"
                            style={{ borderColor: "#e0c8c8", color: C.primary }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primary; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = C.primary; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = ""; (e.currentTarget as HTMLButtonElement).style.color = C.primary; (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0c8c8"; }}>
                            🔍 {kw}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((r, i) => (
                        <li key={i}>
                          <button onClick={() => { navigate(r.page); setSearchOpen(false); setSearchQuery(""); }}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 transition-colors flex items-center gap-3">
                            <span className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                              style={{ background: "#fff0f0", color: C.primary }}>{r.sub}</span>
                            <span className="text-gray-700 truncate">{r.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    /* Aspek 20: No-result feedback with suggestions */
                    <div className="p-4 text-center">
                      <p className="text-sm font-medium text-gray-600 mb-1">Kata kunci tidak ditemukan</p>
                      <p className="text-xs text-gray-400 mb-3">Coba istilah yang berbeda atau pilih topik di bawah ini:</p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {["Pengaduan", "Berita KPI", "Bantuan", "Kontak"].map((kw) => (
                          <button key={kw} onClick={() => setSearchQuery(kw)}
                            className="text-xs px-2.5 py-1 rounded-full border"
                            style={{ borderColor: "#e0c8c8", color: C.primary }}>
                            {kw}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {currentUser ? (
              /* Profile icon + dropdown */
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(!profileOpen)} title={currentUser}
                  className="w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm text-white transition-all"
                  style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`, boxShadow: "0 2px 8px rgba(139,26,26,0.35)" }}>
                  {currentUser.charAt(0).toUpperCase()}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border z-50 overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
                    <div className="px-4 py-3 border-b" style={{ borderColor: "#f0dede", background: "#fff8f8" }}>
                      <p className="text-xs text-gray-500">Masuk sebagai</p>
                      <p className="text-sm font-semibold truncate" style={{ color: C.primary }}>{currentUser}</p>
                    </div>
                    <button onClick={() => { navigate("profil-saya"); setProfileOpen(false); }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-colors">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      Profil Saya
                    </button>
                    <button onClick={() => { setShowLogoutConfirm(true); setProfileOpen(false); }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t" style={{ borderColor: "#f0dede" }}>
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Masuk */}
                <button onClick={() => navigate("masuk")} title="Masuk"
                  className="w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all"
                  style={{ borderColor: C.primary, backgroundColor: masukHover ? C.primary : "transparent", color: masukHover ? "#ffffff" : C.primary }}
                  onMouseEnter={() => setMasukHover(true)}
                  onMouseLeave={() => setMasukHover(false)}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
                {/* Daftar */}
                <button onClick={() => navigate("daftar")} title="Daftar Akun"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
                  style={{ backgroundColor: daftarHover ? C.primaryDark : C.primary, color: "#ffffff" }}
                  onMouseEnter={() => setDaftarHover(true)}
                  onMouseLeave={() => setDaftarHover(false)}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                </button>
              </>
            )}
          </div>

          <button className="lg:hidden p-2 rounded-md text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t pb-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <button onClick={() => { if (item.page) { navigate(item.page); setMobileOpen(false); } }}
                  className="w-full text-left block px-4 py-2.5 text-sm font-medium text-gray-700"
                  style={isActive(item) ? { color: C.primary } : {}}>
                  {item.label}
                </button>
                {item.children?.map((child) => (
                  <button key={child.label} onClick={() => {
                    if (item.label === "Pengaduan" && !currentUser) {
                      setShowLoginGateNav(true); setMobileOpen(false); return;
                    }
                    navigate(child.page); setMobileOpen(false);
                  }}
                    className="w-full text-left block px-8 py-2 text-sm text-gray-500"
                    style={currentPage === child.page ? { color: C.primary } : {}}>
                    {child.label}
                    {item.label === "Pengaduan" && !currentUser && <span className="ml-1 text-xs">🔒</span>}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex gap-2 px-4 pt-3">
              <button onClick={() => { navigate("masuk"); setMobileOpen(false); }} className="flex-1 py-2 text-sm font-medium border rounded-md" style={{ borderColor: C.primary, color: C.primary }}>Masuk</button>
              <button onClick={() => { navigate("daftar"); setMobileOpen(false); }} className="flex-1 py-2 text-sm font-medium text-white rounded-md" style={{ backgroundColor: C.primary }}>Daftar</button>
            </div>
          </div>
        )}
      </div>
    </nav>

    {/* Login gate popup for Pengaduan Penyiaran */}
    {showLoginGateNav && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ animation: "fadeIn 0.2s ease" }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginGateNav(false)} />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center" style={{ animation: "slideUp 0.25s ease" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fff0f0" }}>
            <svg className="w-7 h-7" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Login Diperlukan</h3>
          <p className="text-sm text-gray-500 mb-6">Harap login atau daftar terlebih dahulu untuk mengakses fitur Pengaduan Penyiaran.</p>
          <div className="flex gap-3">
            <button onClick={() => { setShowLoginGateNav(false); navigate("masuk"); }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl text-white transition-all"
              style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
              Masuk
            </button>
            <button onClick={() => { setShowLoginGateNav(false); navigate("daftar"); }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all"
              style={{ borderColor: C.primary, color: C.primary }}>
              Daftar
            </button>
          </div>
          <button onClick={() => setShowLoginGateNav(false)} className="mt-4 text-xs text-gray-400 hover:text-gray-600">Batal</button>
        </div>
      </div>
    )}

    {/* Logout confirmation popup */}
    {showLogoutConfirm && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ animation: "fadeIn 0.2s ease" }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutConfirm(false)} />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center" style={{ animation: "slideUp 0.25s ease" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fff0f0" }}>
            <svg className="w-7 h-7" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Keluar Akun</h3>
          <p className="text-sm text-gray-500 mb-6">Apakah Anda yakin ingin keluar dari akun Anda?</p>
          <div className="flex gap-3">
            <button onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all text-gray-600"
              style={{ borderColor: "#d1d5db" }}>
              Batal
            </button>
            <button onClick={() => { setShowLogoutConfirm(false); logout(); navigate("beranda"); }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl text-white transition-all"
              style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

const BREADCRUMB_PAGE_MAP: Record<string, Page> = {
  "Beranda": "beranda",
  "Profil": "visi-misi",
  "Berita": "berita",
  "Pengaduan": "formulir",
  "Bantuan": "bantuan",
  "Data": "data",
};

function PageBreadcrumb({ title, parents = [], navigate, parentActions }: { title: string; parents?: string[]; navigate?: (p: Page) => void; parentActions?: Record<string, () => void> }) {
  const Chevron = () => (
    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
  );
  const crumbBtn = (label: string, page: Page | undefined) => {
    const action = parentActions?.[label] ?? (navigate && page ? () => navigate(page) : undefined);
    if (!action) return <span className="hover:underline cursor-default">{label}</span>;
    return (
      <button onClick={action} className="hover:underline transition-colors" style={{ color: "inherit" }}>
        {label}
      </button>
    );
  };
  return (
    <div className="py-3 px-4 text-sm" style={{ backgroundColor: C.muted, borderBottom: `1px solid var(--color-border)` }}>
      <div className="w-full px-6 flex items-center gap-2 text-gray-500 flex-wrap">
        {crumbBtn("Beranda", "beranda")}
        {parents.map((p) => (
          <span key={p} className="flex items-center gap-2">
            <Chevron />
            {crumbBtn(p, BREADCRUMB_PAGE_MAP[p])}
          </span>
        ))}
        <Chevron />
        <span style={{ color: C.primary }} className="font-medium">{title}</span>
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-white py-10 px-4" style={{ background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primary} 100%)` }}>
      <div className="w-full px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">{title}</h1>
        {subtitle && <p className="text-red-200 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}

// Social icon SVGs
const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
};

function Footer({ navigate, currentUser }: { navigate: (p: Page) => void; currentUser: string | null }) {
  const [leaveUrl, setLeaveUrl] = useState<string | null>(null);
  const [showFormGate, setShowFormGate] = useState(false);
  const socials = [
    { name: "Facebook", Icon: SocialIcons.Facebook, url: "https://facebook.com/KPIpusat" },
    { name: "Twitter / X", Icon: SocialIcons.Twitter, url: "https://twitter.com/KPIpusat" },
    { name: "Instagram", Icon: SocialIcons.Instagram, url: "https://instagram.com/kpi.pusat" },
    { name: "YouTube", Icon: SocialIcons.YouTube, url: "https://youtube.com/@KPIpusat" },
  ];

  const extLink = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    setLeaveUrl(url);
  };

  return (
    <>
    {showFormGate && (
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
        onClick={(e) => { if (e.target === e.currentTarget) setShowFormGate(false); }}>
        <div className="rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl" style={{ background: "var(--color-surface)", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div className="flex flex-col items-center p-8 gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fce8e8" }}>
              <svg className="w-8 h-8" fill="none" stroke={C.primary} strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Login Diperlukan</h3>
            <p className="text-sm text-gray-500 text-center">
              Harap login atau daftar terlebih dahulu untuk mengakses fitur Pengaduan Penyiaran.
            </p>
            <div className="flex gap-3 w-full mt-1">
              <button onClick={() => { setShowFormGate(false); navigate("masuk"); }}
                className="flex-1 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: C.primaryDark }}>
                Masuk
              </button>
              <button onClick={() => { setShowFormGate(false); navigate("daftar"); }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm border-2"
                style={{ borderColor: C.primary, color: C.primary }}>
                Daftar
              </button>
            </div>
            <button onClick={() => setShowFormGate(false)} className="text-xs text-gray-400 hover:text-gray-600">Batal</button>
          </div>
        </div>
      </div>
    )}
    {leaveUrl && (
      <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ animation: "fadeIn 0.2s ease" }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setLeaveUrl(null)} />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center" style={{ animation: "slideUp 0.25s ease" }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fff0f0" }}>
            <svg className="w-7 h-7" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-800">Meninggalkan Website</h3>
          <p className="text-sm text-gray-500 mb-1">Anda akan diarahkan ke:</p>
          <p className="text-xs font-medium mb-5 break-all px-2 py-1.5 rounded-lg" style={{ color: C.primary, background: "#fff0f0" }}>{leaveUrl}</p>
          <p className="text-xs text-gray-400 mb-5">Tautan ini akan membawa Anda ke website pihak ketiga di luar lingkungan SARAN-KPI.</p>
          <div className="flex gap-3">
            <button onClick={() => setLeaveUrl(null)}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 text-gray-600"
              style={{ borderColor: "#d1d5db" }}>
              Batal
            </button>
            <button onClick={() => { const a = document.createElement("a"); a.href = leaveUrl!; a.target = "_blank"; a.rel = "noopener noreferrer"; document.body.appendChild(a); a.click(); document.body.removeChild(a); setLeaveUrl(null); }}
              className="flex-1 py-2.5 text-sm font-semibold rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    )}
    <footer style={{ backgroundColor: C.navy }} className="text-white">
      <div className="w-full px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoKpi} alt="Logo KPI" className="h-14 w-14 object-contain" />
              <div>
                <div className="font-bold text-sm">Komisi Penyiaran</div>
                <div className="font-bold text-sm">Indonesia</div>
                <div className="text-xs text-gray-400 mt-0.5">Sahabat Penyiaran</div>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Lembaga Negara Independen yang mengatur hal-hal mengenai penyiaran di Indonesia.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ name, Icon, url }) => (
                <a key={name} href={url} onClick={(e) => extLink(url, e)} title={name}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.primary; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.1)"; }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: C.primary }}>Navigasi</h4>
            <ul className="space-y-2">
              {(["beranda", "profil", "formulir", "pengaduan-saya", "ketentuan"] as Page[]).map((p) => {
                const labels: Record<string, string> = { beranda: "Beranda", profil: "Profil", formulir: "Formulir Pengaduan", "pengaduan-saya": "Pengaduan Saya", ketentuan: "Ketentuan" };
                return (
                  <li key={p}>
                    <button
                      onClick={() => {
                        if (p === "formulir" && !currentUser) { setShowFormGate(true); return; }
                        if (p === "pengaduan-saya" && !currentUser) { setShowFormGate(true); return; }
                        navigate(p === "profil" ? "visi-misi" : p);
                      }}
                      className="text-gray-400 text-sm hover:text-white transition-colors text-left">
                      {labels[p]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Link Terkait */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: C.primary }}>Link Terkait</h4>
            <ul className="space-y-2">
              {[
                { label: "KPI Pusat", url: "https://www.kpi.go.id" },
                { label: "Komdigi RI", url: "https://www.komdigi.go.id" },
                { label: "KPID Seluruh Indonesia", url: "https://www.kpi.go.id/index.php/id/kpid" },
                { label: "Setneg RI", url: "https://www.setneg.go.id" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.url} onClick={(e) => extLink(l.url, e)}
                    className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                    <svg className="w-3 h-3 opacity-50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: C.primary }}>Hubungi Kami</h4>
            <ul className="space-y-3 mb-4">
              {[
                { d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", text: "Jl. H. Juanda No.36, Gambir, Jakarta Pusat 10120" },
                { d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "(021) 3521 637" },
                { d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: "humas@kpi.go.id", href: "mailto:humas@kpi.go.id" },
                { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Senin–Jumat, 08:00–16:00 WIB", href: null },
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: C.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.d} />
                  </svg>
                  {item.href
                    ? <a href={item.href} className="hover:text-white transition-colors">{item.text}</a>
                    : <span>{item.text}</span>}
                </li>
              ))}
            </ul>
            {/* Embedded map */}
            <div className="rounded-lg overflow-hidden" style={{ height: "160px" }}>
              <iframe
                title="Lokasi KPI Pusat"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6596703740714!2d106.82919!3d-6.1717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f422f43cf82f%3A0x9c75a8cb1d8b69b9!2sKomisi%20Penyiaran%20Indonesia!5e0!3m2!1sid!2sid!4v1693000000000!5m2!1sid!2sid"
                width="100%"
                height="160"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: C.navyDeep }} className="py-4">
        <div className="w-full px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 Komisi Penyiaran Indonesia. Hak Cipta Dilindungi.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Kebijakan Privasi</a>
            <a href="#" className="hover:text-gray-300">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-gray-300">Aksesibilitas</a>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function HeroSlider({ navigate, currentUser }: { navigate: (p: Page) => void; currentUser: string | null }) {
  const [current, setCurrent] = useState(0);
  const [showBuatGate, setShowBuatGate] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length), 4500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "480px" }}>
      {HERO_SLIDES.map((slide, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? "opacity-100" : "opacity-0"}`}>
          <img src={slide.img} alt={slide.alt} className="w-full h-full object-cover" style={{ minHeight: "480px" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(91,16,16,0.90) 0%, rgba(91,16,16,0.65) 55%, rgba(91,16,16,0.15) 100%)` }} />
        </div>
      ))}

      <div className="relative z-10 w-full px-6 py-16 md:py-24">
        <div className="max-w-xl text-white">
          <p className="text-xs font-semibold mb-3 uppercase tracking-widest opacity-80 border-l-4 pl-3" style={{ borderColor: "#f0a0a0" }}>
            Sistem Aduan Rakyat (SARAN)
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Sampaikan Aduan Konten Siaran TV & Radio
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-8 leading-relaxed">
            Laporkan konten siaran televisi dan radio yang melanggar ketentuan penyiaran kepada Komisi Penyiaran Indonesia.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => { if (!currentUser) { setShowBuatGate(true); return; } navigate("formulir"); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: C.primary }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Buat Pengaduan
            </button>
            <button
              onClick={() => { if (!currentUser) { setShowBuatGate(true); return; } navigate("pengaduan-saya"); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium border border-white/60 transition-all"
              style={{ color: "rgba(255,255,255,0.85)", backgroundColor: "rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Lacak Aduan
            </button>
          </div>

          {/* App Store Badges — official style */}
          <div className="flex items-center gap-3">
            {/* Google Play */}
            <a href="#" className="hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-2.5 bg-black text-white rounded-xl px-4 py-2.5 border border-white/20" style={{ minWidth: "148px" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none">
                  <path d="M3.18 23.76c.36.21.77.24 1.15.07l11.29-6.43-2.39-2.39-10.05 8.75z" fill="#EA4335"/>
                  <path d="M20.83 10.3l-2.38-1.35-2.67 2.67 2.67 2.68 2.4-1.37c.68-.39.68-1.03-.02-1.63z" fill="#FBBC05"/>
                  <path d="M4.33.17L15.62 6.6l-2.39 2.39L3.18.24C3.54.07 3.97.1 4.33.17z" fill="#4285F4"/>
                  <path d="M.27 2.34C.1 2.69 0 3.1 0 3.56v16.88c0 .46.1.87.27 1.22l.09.09 9.45-9.45v-.23L.36 2.25l-.09.09z" fill="#34A853"/>
                  <path d="M4.33.17L15.62 6.6l-2.39 2.39L3.18.24C3.54.07 3.97.1 4.33.17z" fill="#4285F4"/>
                </svg>
                <div>
                  <div className="text-xs leading-none opacity-75">DAPATKAN DI</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </div>
            </a>
            {/* App Store */}
            <a href="#" className="hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-2.5 bg-black text-white rounded-xl px-4 py-2.5 border border-white/20" style={{ minWidth: "148px" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-xs leading-none opacity-75">UNDUH DI</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => goTo(idx)}
            className={`rounded-full transition-all ${idx === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50 hover:bg-white/75"}`}
          />
        ))}
      </div>

      {showBuatGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowBuatGate(false); }}>
          <div className="rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl" style={{ background: "var(--color-surface)", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div className="flex flex-col items-center p-8 gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: "#fce8e8" }}>
                <svg className="w-8 h-8" fill="none" stroke={C.primary} strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Login Diperlukan</h3>
              <p className="text-sm text-gray-500 text-center">
                Harap login atau daftar terlebih dahulu untuk mengakses fitur Pengaduan Penyiaran.
              </p>
              <div className="flex gap-3 w-full mt-1">
                <button onClick={() => { setShowBuatGate(false); navigate("masuk"); }}
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-sm"
                  style={{ background: C.primaryDark }}>
                  Masuk
                </button>
                <button onClick={() => { setShowBuatGate(false); navigate("daftar"); }}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm border-2"
                  style={{ borderColor: C.primary, color: C.primary }}>
                  Daftar
                </button>
              </div>
              <button onClick={() => setShowBuatGate(false)} className="text-xs text-gray-400 hover:text-gray-600 mt-1">Batal</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function BerandaPage({ navigate, currentUser }: { navigate: (p: Page) => void; currentUser: string | null }) {
  const [trackingId, setTrackingId] = useState("");
  const [showLoginGateTrack, setShowLoginGateTrack] = useState(false);
  const [showBuatGate2, setShowBuatGate2] = useState(false);

  return (
    <>
      <HeroSlider navigate={navigate} currentUser={currentUser} />

      {/* Tracker */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e8d5d5" }}>
        <div className="w-full px-6">
          <div className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: "var(--color-muted)" }}>
            <div className="md:flex-1">
              <h2 className="text-xl font-bold mb-1" style={{ color: C.primary }}>Lacak Status Pengaduan</h2>
              <p className="text-gray-600 text-sm">Masukkan nomor tiket untuk melihat status terkini.</p>
            </div>
            <div className="flex flex-col w-full md:w-auto flex-1 max-w-md gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan nomor tiket pengaduan..."
                  value={trackingId}
                  onChange={(e) => { setTrackingId(e.target.value); setShowLoginGateTrack(false); }}
                  className="flex-1 border rounded-md px-4 py-2.5 text-sm focus:outline-none"
                  style={{ borderColor: "#e0c8c8" }}
                />
                <button
                  onClick={() => {
                    if (!currentUser) { setShowLoginGateTrack(true); return; }
                    navigate("pengaduan-saya");
                  }}
                  className="px-5 py-2.5 rounded-md text-white text-sm font-medium transition-colors"
                  style={{ backgroundColor: C.primary }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primaryDark; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primary; }}>
                  Lacak
                </button>
              </div>
              {showLoginGateTrack && createPortal(
                <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ animation: "fadeIn 0.2s ease" }}>
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginGateTrack(false)} />
                  <div className="relative bg-white rounded-2xl overflow-hidden max-w-sm w-full mx-4 shadow-2xl" style={{ animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
                    <div className="flex flex-col items-center p-8 gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fce8e8" }}>
                        <svg className="w-8 h-8" fill="none" stroke={C.primary} strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Login Diperlukan</h3>
                      <p className="text-sm text-gray-500 text-center">Harap login atau daftar terlebih dahulu untuk mengakses fitur Pengaduan Penyiaran.</p>
                      <div className="flex gap-3 w-full mt-1">
                        <button onClick={() => { setShowLoginGateTrack(false); navigate("masuk"); }}
                          className="flex-1 py-3 rounded-xl text-white font-semibold text-sm"
                          style={{ background: C.primaryDark }}>Masuk</button>
                        <button onClick={() => { setShowLoginGateTrack(false); navigate("daftar"); }}
                          className="flex-1 py-3 rounded-xl font-semibold text-sm border-2"
                          style={{ borderColor: C.primary, color: C.primary }}>Daftar</button>
                      </div>
                      <button onClick={() => setShowLoginGateTrack(false)} className="text-xs text-gray-400 hover:text-gray-600">Batal</button>
                    </div>
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Steps — infographic */}
      <section className="py-14" style={{ backgroundColor: C.muted }}>
        <div className="max-w-6xl mx-auto px-6">
          <img
            src={tataCara}
            alt="Tata Cara Isi Pengaduan — 8 langkah mulai dari persiapan hingga terima nomor tiket"
            className="w-full h-auto rounded-2xl shadow-md object-contain"
          />
          <div className="text-center mt-8">
            <button
              onClick={() => { if (!currentUser) { setShowBuatGate2(true); return; } navigate("formulir"); }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-white font-semibold transition-colors"
              style={{ backgroundColor: C.primary }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primaryDark; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primary; }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Mulai Buat Pengaduan
            </button>
          </div>
        </div>
      </section>

      {/* Impact Statistics — Aspek 5: Emotional Design */}
      <section className="py-12" style={{ background: `linear-gradient(135deg, ${C.navyDeep} 0%, #3d0f0f 100%)` }}>
        <div className="w-full px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Dampak Nyata SARAN — KPI</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "12.847", label: "Pengaduan Diterima", icon: "📥" },
              { value: "94%", label: "Diselesaikan Tepat Waktu", icon: "✅" },
              { value: "7 Hari", label: "Rata-rata Respons", icon: "⚡" },
              { value: "34", label: "Stasiun Ditindaklanjuti", icon: "📡" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-14 bg-white">
        <div className="w-full px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--color-text)" }}>Berita Terkini</h2>
              <p className="text-gray-500 text-sm mt-1">Informasi terbaru dari Komisi Penyiaran Indonesia</p>
            </div>
            <button onClick={() => navigate("berita")} className="text-sm font-medium hover:underline flex-shrink-0" style={{ color: C.primary }}>Lihat Semua →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_DATA.slice(0, 3).map((item, idx) => (
              <button key={idx} onClick={() => navigate("berita")} className="group text-left bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: "#e8d5d5" }}>
                <div className="h-44 overflow-hidden bg-gray-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: C.primary }}>{item.category}</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 leading-snug line-clamp-2 group-hover:underline">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Infographics */}
      <section className="py-14" style={{ backgroundColor: C.muted }}>
        <div className="w-full px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--color-text)" }}>Infografis KPI</h2>
              <p className="text-gray-500 text-sm mt-1">Panduan dan statistik penyiaran</p>
            </div>
            <button onClick={() => navigate("data")} className="text-sm font-medium hover:underline flex-shrink-0" style={{ color: C.primary }}>Lihat Semua →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INFOGRAPHICS.map((item, idx) => (
              <button key={idx} onClick={() => navigate("data")} className="group text-left bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow" style={{ borderColor: "#e8d5d5" }}>
                <div className="h-36 md:h-44 overflow-hidden bg-gray-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-gray-700 group-hover:underline">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {showBuatGate2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowBuatGate2(false); }}>
          <div className="rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl" style={{ background: "var(--color-surface)", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div className="flex flex-col items-center p-8 gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fce8e8" }}>
                <svg className="w-8 h-8" fill="none" stroke={C.primary} strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Login Diperlukan</h3>
              <p className="text-sm text-gray-500 text-center">Harap login atau daftar terlebih dahulu untuk mengakses fitur Pengaduan Penyiaran.</p>
              <div className="flex gap-3 w-full mt-1">
                <button onClick={() => { setShowBuatGate2(false); navigate("masuk"); }}
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-sm"
                  style={{ background: C.primaryDark }}>Masuk</button>
                <button onClick={() => { setShowBuatGate2(false); navigate("daftar"); }}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm border-2"
                  style={{ borderColor: C.primary, color: C.primary }}>Daftar</button>
              </div>
              <button onClick={() => setShowBuatGate2(false)} className="text-xs text-gray-400 hover:text-gray-600">Batal</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const PROFIL_TABS = [
  {
    id: "visi-misi",
    label: "Visi & Misi",
    sub: "Identitas Lembaga",
    src: null as null,
    imgKey: "visiMisi" as const,
    desc: "Arah gerak dan cita-cita Komisi Penyiaran Indonesia dalam mewujudkan penyiaran yang sehat dan bermartabat.",
  },
  {
    id: "jadwal",
    label: "Jadwal Pelayanan",
    sub: "Informasi Layanan",
    src: null as null,
    imgKey: "jadwal" as const,
    desc: "Informasi jadwal layanan pengaduan penyiaran KPI, tersedia secara luring maupun daring melalui platform SARAN.",
  },
];

function ProfilPage() {
  const [activeTab, setActiveTab] = useState<"visi-misi" | "jadwal">("visi-misi");
  const [fading, setFading] = useState(false);

  const imgMap = { visiMisi: imgProfilVisiMisi, jadwal: imgProfilJadwal };
  const tab = PROFIL_TABS.find((t) => t.id === activeTab)!;

  const switchTab = (id: "visi-misi" | "jadwal") => {
    if (id === activeTab) return;
    setFading(true);
    setTimeout(() => { setActiveTab(id); setFading(false); }, 260);
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* Hero — photo bg + overlay like beranda */}
      <PageHero title="Profil KPI" sub="Mengenal lebih dekat Komisi Penyiaran Indonesia — lembaga independen pengatur penyiaran nasional." imgKey="kontak" badge="Komisi Penyiaran Indonesia" />

      {/* Interactive image viewer */}
      <div className="max-w-4xl mx-auto px-4 pb-14">
        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex p-1 rounded-2xl gap-1"
            style={{ background: "#f0e4e4", boxShadow: "inset 0 2px 6px rgba(139,26,26,0.10)" }}
          >
            {PROFIL_TABS.map((t) => {
              const active = t.id === activeTab;
              return (
                <button
                  key={t.id}
                  onClick={() => switchTab(t.id as "visi-misi" | "jadwal")}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: active ? C.primary : "transparent",
                    color: active ? "#ffffff" : C.primaryDark,
                    boxShadow: active ? "0 4px 14px rgba(139,26,26,0.35)" : "none",
                    transform: active ? "translateY(-1px)" : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 12px 56px rgba(139,26,26,0.12), 0 2px 10px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Card top bar */}
          <div
            style={{
              padding: "1.25rem 2rem",
              background: `linear-gradient(90deg, ${C.navyDeep}, ${C.primary})`,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                {tab.sub}
              </p>
              <h2 className="text-lg font-bold text-white">{tab.label}</h2>
            </div>
            {/* Indicator dots */}
            <div className="flex gap-1.5">
              {PROFIL_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => switchTab(t.id as "visi-misi" | "jadwal")}
                  style={{
                    width: t.id === activeTab ? 20 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: t.id === activeTab ? "#ffffff" : "rgba(255,255,255,0.35)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Two-column layout: description left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Left: description panel */}
            <div
              className="flex flex-col justify-between p-8 md:col-span-2"
              style={{ background: "#fdf5f5", borderRight: "1px solid #f0dede" }}
            >
              <div>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{
                    color: "#6b4040",
                    opacity: fading ? 0 : 1,
                    transition: "opacity 0.26s ease",
                  }}
                >
                  {tab.desc}
                </p>

                {/* Mini stat chips */}
                {activeTab === "visi-misi" ? (
                  <div className="flex flex-col gap-3">
                    {["Independen & Imparsial", "Berlandaskan UU Penyiaran", "Mengatur Konten Siaran"].map((s) => (
                      <div key={s} className="flex items-center gap-2.5">
                        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.primary, flexShrink: 0 }} />
                        <span className="text-xs font-medium" style={{ color: C.primaryDark }}>{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {["Luring: Senin–Jumat", "Daring: 24 Jam", "Platform SARAN"].map((s) => (
                      <div key={s} className="flex items-center gap-2.5">
                        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.primary, flexShrink: 0 }} />
                        <span className="text-xs font-medium" style={{ color: C.primaryDark }}>{s}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav arrows */}
              <div className="flex gap-3 mt-10">
                {PROFIL_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => switchTab(t.id as "visi-misi" | "jadwal")}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: t.id === activeTab ? C.primary : "transparent",
                      color: t.id === activeTab ? "#ffffff" : C.primaryDark,
                      border: `1.5px solid ${t.id === activeTab ? C.primary : "#e0c8c8"}`,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: image */}
            <div
              className="md:col-span-3 flex items-center justify-center"
              style={{ background: "#f7eded", minHeight: 480, padding: "2rem" }}
            >
              <img
                src={imgMap[tab.imgKey]}
                alt={tab.label}
                style={{
                  maxWidth: "100%",
                  maxHeight: 560,
                  borderRadius: 16,
                  boxShadow: "0 8px 32px rgba(139,26,26,0.18)",
                  objectFit: "contain",
                  opacity: fading ? 0 : 1,
                  transform: fading ? "scale(0.97)" : "scale(1)",
                  transition: "opacity 0.26s ease, transform 0.26s ease",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-4 mt-12 mb-6">
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #e8d5d5)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.primary }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: C.primaryLight, opacity: 0.5 }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #e8d5d5)" }} />
        </div>
        <p className="text-center text-sm" style={{ color: "#9b7272" }}>
          KPI berkomitmen menghadirkan siaran yang sehat, bermutu, dan bermanfaat bagi masyarakat Indonesia.
        </p>
      </div>
    </div>
  );
}

function VisiMisiPage({ navigate }: { navigate: (p: Page) => void }) {
  const misiItems = [
    {
      label: "Tatanan Informasi",
      desc: "Membangun dan memelihara tatanan informasi nasional yang adil, merata, dan seimbang.",
      icon: (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <circle cx="18" cy="18" r="18" fill="#fce8e8"/>
          <circle cx="18" cy="18" r="6" fill="none" stroke="#8B1A1A" strokeWidth="2"/>
          <circle cx="18" cy="18" r="2.5" fill="#8B1A1A"/>
          <path d="M18 4v5M18 27v5M4 18h5M27 18h5" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "Infrastruktur Jaringan",
      desc: "Mewujudkan infrastruktur penyiaran yang tertib dan teratur serta terdistribusi secara adil.",
      icon: (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <circle cx="18" cy="18" r="18" fill="#e8f0fc"/>
          <rect x="14" y="20" width="8" height="8" rx="1" fill="#1a56a0" opacity="0.85"/>
          <path d="M18 20V12" stroke="#1a56a0" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 16q6-6 12 0" stroke="#1a56a0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M9 19q9-10 18 0" stroke="#1a56a0" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
    },
    {
      label: "Kompetisi Persaingan Sehat",
      desc: "Membangun iklim persaingan usaha penyiaran yang sehat dan bermartabat.",
      icon: (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <circle cx="18" cy="18" r="18" fill="#fef3c7"/>
          <path d="M10 26h4v-8h-4zM16 26h4v-12h-4zM22 26h4v-5h-4z" fill="#d97706"/>
        </svg>
      ),
    },
    {
      label: "Keberagaman Isi",
      desc: "Memelihara dan mengembangkan keberagaman isi siaran yang berkualitas.",
      icon: (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <circle cx="18" cy="18" r="18" fill="#f0fdf4"/>
          <circle cx="18" cy="18" r="7" fill="none" stroke="#16a34a" strokeWidth="2"/>
          <path d="M18 11v2M18 23v2M11 18h2M23 18h2" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="18" cy="18" r="2.5" fill="#16a34a"/>
        </svg>
      ),
    },
    {
      label: "Media Pengiriman Optimal",
      desc: "Mendorong penyelenggara penyiaran untuk menjalankan fungsi media secara optimal.",
      icon: (
        <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0" fill="none">
          <circle cx="18" cy="18" r="18" fill="#fce8e8"/>
          <circle cx="18" cy="18" r="8" fill="none" stroke="#8B1A1A" strokeWidth="1.5"/>
          <path d="M15 13l8 5-8 5V13z" fill="#8B1A1A"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-bg)" }}>
      <PageHero title="Visi & Misi KPI" sub="Menjaga ruang publik, mewujudkan penyiaran yang sehat dan bermanfaat." imgKey="profil" badge="Profil · KPI" />
      <PageBreadcrumb title="Visi & Misi" parents={["Profil"]} navigate={navigate} />

      {/* 1. HERO */}
      <section className="py-16 px-4 border-b" style={{ borderColor: "#f0d5d5" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6" style={{ color: C.primary }}>
            Menjaga Ruang Publik,{" "}
            <span className="block">Mewujudkan Penyiaran yang</span>
            <span className="block">Sehat dan Bermanfaat</span>
          </h1>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
            Komisi Penyiaran Indonesia (KPI) hadir sebagai wakil masyarakat untuk mengawal ekosistem
            penyiaran televisi dan radio nasional. Kenali landasan kerja, tujuan utama, serta wewenang
            kami dalam melindungi kepentingan publik.
          </p>
        </div>
      </section>

      {/* 2. VISI */}
      <section className="py-12 px-4 border-b" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
        <div className="w-full px-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fce8e8" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#8B1A1A" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="#8B1A1A"/>
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold" style={{ color: C.primary }}>Visi</h2>
          </div>
          <blockquote className="border-l-4 pl-5 py-2 text-gray-800 leading-relaxed text-base md:text-lg font-medium" style={{ borderColor: C.primary }}>
            Terwujudnya sistem penyiaran nasional yang berkeadilan dan bermartabat untuk kepentingan masyarakat.
          </blockquote>
        </div>
      </section>

      {/* 3. MISI */}
      <section className="py-12 px-4 border-b" style={{ backgroundColor: "var(--color-muted)", borderColor: "var(--color-border)" }}>
        <div className="w-full px-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fce8e8" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#8B1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold" style={{ color: C.primary }}>Misi</h2>
          </div>
          <ol className="space-y-4">
            {misiItems.map((m, i) => (
              <li key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border shadow-sm" style={{ borderColor: "#f0d5d5" }}>
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: C.primary }}>{i + 1}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-0.5">{m.label}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. TUGAS & WEWENANG */}
      <section className="py-12 px-4 bg-white">
        <div className="w-full px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: C.primary }}>Amanat Undang-Undang: Tugas dan Wewenang KPI</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sebagai lembaga negara yang independen, KPI dibekali kewenangan khusus oleh Undang-Undang Penyiaran (UU No. 32 Tahun 2002) untuk memastikan setiap lembaga penyiaran beroperasi sesuai Pedoman Perilaku Penyiaran dan Standar Program Siaran (P3SPS).
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                no: "01",
                title: "Mengatur",
                desc: "Menyusun dan mengawasi pelaksanaan peraturan di bidang penyiaran sesuai UU Penyiaran dan P3SPS.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                ),
              },
              {
                no: "02",
                title: "Mengawasi",
                desc: "Memantau dan mengevaluasi isi siaran lembaga penyiaran televisi dan radio secara berkala.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                ),
              },
              {
                no: "03",
                title: "Memberikan Sanksi",
                desc: "Menjatuhkan sanksi administratif kepada lembaga penyiaran yang terbukti melanggar aturan.",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
              },
            ].map((t) => (
              <div key={t.no} className="rounded-xl border p-5" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: "#fce8e8", color: C.primary }}>{t.icon}</div>
                  <span className="text-xs font-semibold text-gray-400 tracking-wider">{t.no}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{t.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function MaklumatPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <PageHero title="Maklumat Pelayanan" sub="Janji standar pelayanan kami — Komitmen KPI dalam melayani masyarakat." imgKey="ketentuan" badge="Profil · Maklumat" />
      <PageBreadcrumb title="Maklumat" parents={["Profil"]} navigate={navigate} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl p-8 md:p-12 border shadow-sm text-center" style={{ borderColor: "#e8d5d5" }}>
          <div className="text-5xl mb-6">📜</div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: C.primary }}>MAKLUMAT PELAYANAN</h2>
          <p className="text-gray-500 text-sm mb-8">Komisi Penyiaran Indonesia</p>
          <div className="border-2 rounded-xl p-6 mb-8" style={{ borderColor: C.primary, backgroundColor: "var(--color-bg)" }}>
            <p className="text-gray-700 leading-relaxed text-base font-medium italic">
              "Dengan ini, kami menyatakan sanggup menyelenggarakan pelayanan sesuai standar pelayanan yang telah ditetapkan dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai peraturan perundang-undangan yang berlaku."
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { label: "Waktu Respons", value: "7 Hari Kerja", icon: "⏱️" },
              { label: "Kerahasiaan", value: "Identitas Terlindungi", icon: "🔒" },
              { label: "Transparansi", value: "Status Real-Time", icon: "📊" },
              { label: "Akses", value: "24/7 Online", icon: "🌐" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg p-4 text-center" style={{ backgroundColor: "var(--color-muted)" }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-semibold text-sm" style={{ color: C.primary }}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function JadwalPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <PageHero title="Jadwal Pelayanan" sub="Informasi jam layanan pengaduan penyiaran Komisi Penyiaran Indonesia." imgKey="kontak" badge="Profil · Jadwal" />
      <PageBreadcrumb title="Jadwal Pelayanan" parents={["Profil"]} navigate={navigate} />
      <div className="w-full px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Hero info card */}
          <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: "#e8d5d5" }}>
            <div style={{ background: `linear-gradient(135deg, ${C.navyDeep}, ${C.primary})`, padding: "1.75rem 2rem" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Sahabat Penyiaran</p>
              <h2 className="text-xl font-bold text-white mb-0.5">Jadwal Layanan Pengaduan Penyiaran</h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>Komisi Penyiaran Indonesia — SARAN</p>
            </div>

            <div className="bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Offline */}
              <div className="rounded-xl p-6 border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: C.primary }}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    Offline
                  </span>
                  <span className="text-xs text-gray-500">Layanan Tatap Muka</span>
                </div>
                <div className="space-y-3">
                  {[
                    { hari: "Senin – Kamis", jam: "08.00 – 16.00 WIB" },
                    { hari: "Jumat", jam: "08.00 – 16.30 WIB" },
                    { hari: "Sabtu – Minggu", jam: "Libur" },
                  ].map((r) => (
                    <div key={r.hari} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "var(--color-border-soft)" }}>
                      <span className="text-sm font-medium text-gray-700">{r.hari}</span>
                      <span className="text-sm font-semibold" style={{ color: r.jam === "Libur" ? "#9ca3af" : C.primary }}>
                        {r.jam}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/></svg>
                  <span>Layanan offline dilaksanakan di Kantor KPI Pusat, Jl. H. Juanda No.36, Jakarta Pusat 10120.</span>
                </div>
              </div>

              {/* Online */}
              <div className="rounded-xl p-6 border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#1a56a0" }}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                    Online
                  </span>
                  <span className="text-xs text-gray-500">Melalui Platform SARAN</span>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xs text-center leading-tight" style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
                    24<br/>JAM
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Tersedia 24 Jam Sehari</p>
                    <p className="text-xs text-gray-500">7 Hari Seminggu, Termasuk Hari Libur</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Website", val: "saran.kpi.go.id", icon: "🌐" },
                    { label: "Aplikasi Mobile", val: "SARAN (Google Play)", icon: "📱" },
                    { label: "Email", val: "humas@kpi.go.id", icon: "✉️" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: "var(--color-border-soft)" }}>
                      <span className="text-base">{r.icon}</span>
                      <div>
                        <p className="text-xs text-gray-500">{r.label}</p>
                        <p className="text-sm font-medium text-gray-800">{r.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}


const KLASIFIKASI_BY_KATEGORI: Record<string, string[]> = {
  Televisi: [
    "Lembaga Penyiaran Berjaringan (LPB)",
    "Lembaga Penyiaran Publik (LPP)",
    "Lembaga Penyiaran Berlangganan (LPB)",
    "Lembaga Penyiaran Komunitas (LPK)",
  ],
  Radio: [
    "Lembaga Penyiaran Berjaringan (LPB)",
    "Lembaga Penyiaran Publik (LPP)",
    "Lembaga Penyiaran Komunitas (LPK)",
  ],
};

const LEMBAGA_BY_KLASIFIKASI: Record<string, Record<string, string[]>> = {
  Televisi: {
    "Lembaga Penyiaran Berjaringan (LPB)": ["RCTI", "SCTV", "Indosiar", "Trans TV", "Trans7", "Metro TV", "TVOne", "MNC TV", "GTV", "NET.", "RTV", "ANTV", "Kompas TV", "CNN Indonesia TV", "iNews TV"],
    "Lembaga Penyiaran Publik (LPP)": ["TVRI Nasional", "TVRI Jawa Barat", "TVRI Jawa Tengah", "TVRI Yogyakarta", "TVRI Jawa Timur", "TVRI Bali", "TVRI Sumatera Utara", "TVRI Sulawesi Selatan"],
    "Lembaga Penyiaran Berlangganan (LPB)": ["MNC Vision", "First Media", "K-Vision", "IndiHome TV", "Nexmedia", "Orange TV"],
    "Lembaga Penyiaran Komunitas (LPK)": ["TV Komunitas Lokal", "TV Kampus", "TV Pesantren", "TV Komunitas Lainnya"],
  },
  Radio: {
    "Lembaga Penyiaran Berjaringan (LPB)": ["Hard Rock FM", "Prambors FM", "Gen FM", "Delta FM", "Trax FM", "Motion Radio", "Cosmopolitan FM", "I-Radio", "Sonora FM"],
    "Lembaga Penyiaran Publik (LPP)": ["RRI Pro 1", "RRI Pro 2", "RRI Pro 3", "RRI Pro 4 / Etnografi", "RRI World Service"],
    "Lembaga Penyiaran Komunitas (LPK)": ["Radio Komunitas Lokal", "Radio Kampus", "Radio Pesantren"],
  },
};

const PROGRAM_BY_STASIUN: Record<string, string[]> = {
  RCTI: ["Seputih Indonesia", "Sinetron Ikatan Cinta", "Indonesian Idol", "Dangerous Love", "Hot Room", "Berita RCTI Malam"],
  SCTV: ["Sinemart Dunia Terbalik", "FTV Siang", "Liputan 6 Petang", "Orang Ketiga", "Scooby-Doo", "Festival Film Indonesia"],
  Indosiar: ["Kisah Nyata", "Fokus Sore", "Mega Series Bidadari Surgamu", "D'Academy", "Liga 1 Indonesia", "Sinema Indosiar"],
  "Trans TV": ["Hitam Putih", "Bioskop Trans TV", "CNN Indonesia Malam", "Celebrity On Vacation", "Laporan Investigasi", "Brownis"],
  Trans7: ["Jejak Petualang", "On The Spot", "Redaksi Sore", "Opera Van Java", "Spotlite", "Mancing Mania"],
  "Metro TV": ["Mata Najwa", "Prime Time News", "Metro Hari Ini", "Economic Challenges", "Debat Metro", "Special Report"],
  TVOne: ["Kabar Pagi", "Kabar Siang", "Apa Kabar Indonesia", "Dialog Khusus", "Soccer One", "Indonesia Lawyer Club"],
  "MNC TV": ["Upin & Ipin", "Sinema Wajah Indonesia", "Lintas Siang", "Tawa Sutra", "Blitz", "My Heart"],
  GTV: ["Get Married The Series", "Bintang Pantura", "Garuda Superhero", "Captain Tsubasa", "SuperDeal", "Topik Pagi"],
  "NET.": ["The East", "NET 12", "Ini Talkshow", "OK Food", "Wipe Out Indonesia", "NET 16"],
  "TVRI Nasional": ["Berita Nasional", "Dari Desa Untuk Indonesia", "Ragam Indonesia", "Pesona Indonesia", "Dialog Budaya", "Siaran Langsung DPR"],
  "Hard Rock FM": ["Morning Show", "Afternoon Drive", "Hard Rock Top 20"], "Prambors FM": ["Laporan Dari Pranala", "Sore Sore Pramborsin"],
  "RRI Pro 1": ["Warta Berita", "Dialog Nasional", "Hiburan Malam"],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

interface BuktiFile { file: File; id: string; error?: string; }

function SuccessModal({ tiket, onClose, onLacak }: { tiket: string; onClose: () => void; onLacak: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(tiket).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 24px 80px rgba(139,26,26,0.30), 0 4px 16px rgba(0,0,0,0.15)", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Top bar */}
        <div style={{ background: `linear-gradient(135deg, ${C.navyDeep}, ${C.primary})`, padding: "2.5rem 2rem 2rem", textAlign: "center" }}>
          {/* Animated check circle */}
          <div
            className="mx-auto mb-4 flex items-center justify-center rounded-full"
            style={{ width: 72, height: 72, background: "rgba(255,255,255,0.15)", border: "3px solid rgba(255,255,255,0.4)" }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18L15 25L28 11" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 30, strokeDashoffset: 0, animation: "drawCheck 0.5s 0.2s ease forwards" }} />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Pengaduan Berhasil Dikirim!</h2>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13 }}>Tim KPI akan meninjau laporan Anda segera.</p>
        </div>

        {/* Body */}
        <div style={{ background: "#ffffff", padding: "1.75rem 2rem 2rem" }}>
          {/* Ticket number */}
          <div className="text-center mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#9b7272" }}>Nomor Tiket Pengaduan</p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
                style={{ background: "#fff0f0", border: `2px dashed ${C.primary}` }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" />
                </svg>
                <span className="text-lg font-bold tracking-wider" style={{ color: C.primary }}>{tiket}</span>
              </div>
              <button onClick={handleCopy} title="Salin nomor tiket"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                style={{ background: copied ? "#dcfce7" : "#fff0f0", border: `1.5px solid ${copied ? "#86efac" : "#e0c8c8"}` }}>
                {copied
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                }
              </button>
            </div>
            {copied && <p className="text-xs text-green-600 mt-1.5 font-medium">✓ Nomor tiket berhasil disalin!</p>}
          </div>

          {/* Info items */}
          <div className="space-y-3 mb-6">
            {[
              { icon: "🕐", text: "Respons dalam 7 hari kerja" },
              { icon: "🔒", text: "Identitas Anda dijaga kerahasiaannya" },
              { icon: "📧", text: "Notifikasi dikirim ke email Anda" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm" style={{ color: "#5a4040" }}>
                <span className="text-base">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "#f5eded", color: C.primaryDark, border: `1.5px solid #e0c8c8` }}
            >
              Buat Pengaduan Baru
            </button>
            <button
              onClick={() => { onClose(); onLacak(); }}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: C.primary }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primaryDark; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primary; }}
            >
              Lacak Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function validateNama(v: string) {
  if (!v) return "Nama lengkap wajib diisi.";
  if (/\d/.test(v)) return "Nama tidak boleh mengandung angka.";
  if (v.trim().length < 3) return "Nama terlalu pendek.";
  return "";
}
function validateEmail(v: string) {
  if (!v) return "Email wajib diisi.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Format email tidak valid.";
  return "";
}
function validateEmailRegistered(v: string) {
  if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "";
  if (!REGISTERED_EMAILS.has(v.toLowerCase())) return "Email belum terdaftar. Silakan daftar akun terlebih dahulu.";
  return "";
}
function validateTelepon(v: string) {
  if (!v) return "";
  if (!/^\d+$/.test(v)) return "No. telepon hanya boleh berisi angka.";
  if (v.length < 9 || v.length > 13) return "No. telepon harus 9–13 digit.";
  return "";
}

function FormulirPage({ currentUser, userProfile, navigate, addSubmission, navigateToLacak }: {
  currentUser: string | null;
  userProfile: UserProfile | null;
  navigate: (p: Page) => void;
  addSubmission: (sub: MySubmission) => void;
  navigateToLacak: (tiket: string) => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const [showLoginGate, setShowLoginGate] = useState(false);
  const [form, setForm] = useState({
    nama: userProfile?.nama ?? "",
    email: userProfile?.email ?? currentUser ?? "",
    telepon: userProfile?.telepon ?? "",
    kategori: "Televisi", klasifikasi: "", lembaga: "", stasiun: "", program: "", tanggal: "", jam: "", deskripsi: "", pasal: "", setuju: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [tanggalError, setTanggalError] = useState("");
  const [buktiFiles, setBuktiFiles] = useState<BuktiFile[]>([]);
  const [tiket, setTiket] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showBatalConfirm, setShowBatalConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = !!(form.lembaga || form.deskripsi || buktiFiles.length);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) { e.preventDefault(); e.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const klasifikasiOptions = KLASIFIKASI_BY_KATEGORI[form.kategori] ?? [];
  const lembagaOptions = form.klasifikasi ? (LEMBAGA_BY_KLASIFIKASI[form.kategori]?.[form.klasifikasi] ?? []) : [];
  const programOptions = form.lembaga ? (PROGRAM_BY_STASIUN[form.lembaga] ?? []) : [];

  const MIN_DESKRIPSI = 50;
  const errors: Record<string, string> = {
    tanggal: tanggalError,
    jam: !form.jam ? "Jam tayang wajib diisi." : "",
    klasifikasi: !form.klasifikasi ? "Klasifikasi lembaga wajib dipilih." : "",
    lembaga: !form.lembaga ? "Lembaga penyiaran wajib dipilih." : "",
    program: !form.program || form.program === "__lain__" ? "Program wajib dipilih atau diisi." : "",
    deskripsi: !form.deskripsi ? "Uraian pengaduan wajib diisi." : form.deskripsi.trim().length < MIN_DESKRIPSI ? `Uraian terlalu singkat — minimal ${MIN_DESKRIPSI} karakter.` : "",
    setuju: !form.setuju ? "Persetujuan wajib dicentang." : "",
  };

  const touch = (field: string) => setTouched((t) => ({ ...t, [field]: true }));
  const showErr = (field: string) => touched[field] ? errors[field] : "";

  const formFields = ["klasifikasi", "lembaga", "program", "tanggal", "jam", "deskripsi", "setuju"];
  const hasAnyError = Object.values(errors).some(Boolean) || buktiFiles.some((f) => f.error);

  const missingStep2 = formFields.filter((f) => !!errors[f]).map((f) => ({
    klasifikasi: "Klasifikasi", lembaga: "Lembaga Penyiaran", program: "Program", tanggal: "Tanggal Siaran", jam: "Jam Tayang", deskripsi: "Uraian Pengaduan", setuju: "Persetujuan",
  }[f] || f));

  const handleTanggal = (val: string) => {
    setForm({ ...form, tanggal: val });
    setTanggalError(val > today ? "Tanggal siaran tidak boleh melebihi hari ini." : "");
    touch("tanggal");
  };

  const handleKategori = (val: string) => { setForm({ ...form, kategori: val, klasifikasi: "", lembaga: "", stasiun: "", program: "" }); };
  const handleKlasifikasi = (val: string) => { setForm({ ...form, klasifikasi: val, lembaga: "", stasiun: "", program: "" }); touch("klasifikasi"); };
  const handleLembaga = (val: string) => { setForm({ ...form, lembaga: val, stasiun: val, program: "" }); touch("lembaga"); };

  const handleFileAdd = (files: FileList | null) => {
    if (!files) return;
    const next: BuktiFile[] = [...buktiFiles];
    Array.from(files).forEach((file) => {
      const err = file.size > MAX_FILE_SIZE ? "Ukuran melebihi 10 MB" : undefined;
      next.push({ file, id: `${Date.now()}-${Math.random()}`, error: err });
    });
    setBuktiFiles(next.slice(0, 5));
  };

  const removeFile = (id: string) => setBuktiFiles((prev) => prev.filter((f) => f.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) { setShowLoginGate(true); return; }
    formFields.forEach((f) => touch(f));
    if (hasAnyError) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const nomor = `ADU-2026-${Math.floor(Math.random() * 900000 + 100000)}`;
      const now = new Date();
      const tgl = `${now.getDate()} ${["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"][now.getMonth()]} ${now.getFullYear()}`;
      addSubmission({
        id: nomor,
        tanggal: tgl,
        stasiun: form.stasiun || "—",
        program: form.program === "__lain__" ? "Lainnya" : form.program || "—",
        status: "Dalam Proses",
        statusColor: "#f59e0b",
        pasal: form.pasal || "P3SPS",
        deskripsi: form.deskripsi,
        timeline: [
          { tgl, aksi: "Pengaduan diterima dan tercatat dalam sistem SARAN", done: true },
          { tgl: "", aksi: "Verifikasi kelengkapan dokumen", done: false },
          { tgl: "", aksi: "Kajian substansi pelanggaran", done: false },
          { tgl: "", aksi: "Sidang evaluasi", done: false },
          { tgl: "", aksi: "Keputusan final diterbitkan", done: false },
        ],
      });
      setTiket(nomor);
      setIsSubmitting(false);
      setShowModal(true);
    }, 1200);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({ nama: userProfile?.nama ?? "", email: userProfile?.email ?? currentUser ?? "", telepon: userProfile?.telepon ?? "", kategori: "Televisi", klasifikasi: "", lembaga: "", stasiun: "", program: "", tanggal: "", jam: "", deskripsi: "", pasal: "", setuju: false });
    setBuktiFiles([]);
    setTanggalError("");
    setTouched({});
  };

  const handleBatal = () => {
    if (!isDirty) { handleModalClose(); return; }
    setShowBatalConfirm(true);
  };

  const inputCls = "w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors";
  const inputStyle = { borderColor: "#e0c8c8", "--tw-ring-color": C.primary } as React.CSSProperties;

  return (
    <>
      {showModal && <SuccessModal tiket={tiket} onClose={handleModalClose} onLacak={() => navigateToLacak(tiket)} />}

      {/* Login Gate */}
      {showLoginGate && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ animation: "fadeIn 0.2s ease" }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLoginGate(false)} />
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-sm w-full mx-4 shadow-2xl" style={{ animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div style={{ background: `linear-gradient(135deg, ${C.navyDeep}, ${C.primary})`, padding: "1.5rem 2rem" }}>
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg">Masuk Diperlukan</h3>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>Anda harus masuk untuk melanjutkan pengaduan</p>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm text-gray-600 text-center">
                Untuk mengisi formulir pengaduan, silakan masuk atau daftar akun SARAN terlebih dahulu.
              </p>
              <button onClick={() => { setShowLoginGate(false); navigate("masuk"); }}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all"
                style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
                Masuk Sekarang
              </button>
              <button onClick={() => { setShowLoginGate(false); navigate("daftar"); }}
                className="w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all"
                style={{ borderColor: C.primary, color: C.primary }}>
                Daftar Akun Baru
              </button>
              <button onClick={() => setShowLoginGate(false)}
                className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Batal
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Batal Confirm Dialog */}
      {showBatalConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center" style={{ animation: "slideUp 0.25s ease" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fff0f0" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Batalkan Pengaduan?</h3>
            <p className="text-sm text-gray-500 mb-6">Data yang sudah Anda isi akan hilang dan tidak dapat dipulihkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowBatalConfirm(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-colors"
                style={{ borderColor: "#e0c8c8", color: "#666" }}>Lanjutkan Isi</button>
              <button onClick={() => { setShowBatalConfirm(false); handleModalClose(); }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                style={{ background: C.primary }}>Ya, Batalkan</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 240 }}>
        <img src="https://images.unsplash.com/photo-1589186161289-9eb8898086df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
          alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(15,8,8,0.90) 0%,rgba(92,16,16,0.84) 50%,rgba(139,26,26,0.72) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div className="relative z-10 text-center" style={{ padding: "3.5rem 1.5rem 4.5rem" }}>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.18)" }}>
            Pengaduan Penyiaran · SARAN
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ lineHeight: 1.15 }}>Formulir Pengaduan</h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.72)" }}>Sampaikan aduan konten siaran TV &amp; Radio kepada Komisi Penyiaran Indonesia secara resmi.</p>
        </div>
      </div>
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: "100%", height: 48, display: "block" }}>
          <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" fill="var(--color-bg)" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Pelapor info card (read-only) */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6 flex items-start gap-4" style={{ borderColor: "var(--color-border)" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: C.primary }}>
            {(userProfile?.nama ?? currentUser ?? "?").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: C.primary }}>Data Pelapor</p>
            <p className="font-semibold text-gray-800 text-sm">{userProfile?.nama || currentUser || "—"}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-gray-500">
              <span>{userProfile?.email || currentUser || "—"}</span>
              {(userProfile?.telepon) && <span>{userProfile.telepon}</span>}
            </div>
          </div>
          <button type="button" onClick={() => navigate("profil-saya")}
            className="text-xs flex-shrink-0 px-3 py-1.5 rounded-lg border transition-colors hover:opacity-80"
            style={{ borderColor: "var(--color-border)", color: C.primary }}>
            Edit Profil
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3 text-sm text-amber-800">
          <span className="text-lg flex-shrink-0">ℹ️</span>
          <span>Pastikan pengaduan disampaikan dengan informasi yang lengkap dan akurat. Identitas Anda akan dijaga kerahasiaannya.</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border shadow-sm p-8 space-y-6" style={{ borderColor: "#e8d5d5" }}>

          {/* ── Data Siaran & Bukti ── */}
          <div className="space-y-6">
              <div>
                <h3 className="font-bold text-base border-b pb-3 mb-4 flex items-center gap-2" style={{ color: C.primary, borderColor: "#f0dede" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>
                  Data Siaran
                </h3>
                {/* Kategori Lembaga Penyiaran */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori Lembaga Penyiaran <span style={{ color: C.primary }}>*</span></label>
                  <div className="flex gap-6">
                    {["Televisi", "Radio"].map((k) => (
                      <label key={k} className="flex items-center gap-2 cursor-pointer text-sm font-medium" style={{ color: form.kategori === k ? C.primary : "#374151" }}>
                        <input type="radio" name="kategori" value={k} checked={form.kategori === k}
                          onChange={() => handleKategori(k)} className="accent-red-800 w-4 h-4" />
                        {k}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Klasifikasi Lembaga */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Klasifikasi Lembaga <span style={{ color: C.primary }}>*</span></label>
                    <select value={form.klasifikasi} onChange={(e) => handleKlasifikasi(e.target.value)}
                      onBlur={() => touch("klasifikasi")}
                      className={inputCls + " bg-white"} style={{ ...inputStyle, borderColor: showErr("klasifikasi") ? "#e53e3e" : "#e0c8c8" }}>
                      <option value="">-Pilih-</option>
                      {klasifikasiOptions.map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
                    {showErr("klasifikasi") && <p className="text-xs mt-1 text-red-600">⚠ {showErr("klasifikasi")}</p>}
                  </div>

                  {/* Lembaga Penyiaran */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lembaga Penyiaran <span style={{ color: C.primary }}>*</span></label>
                    <select value={form.lembaga} onChange={(e) => handleLembaga(e.target.value)}
                      onBlur={() => touch("lembaga")}
                      className={inputCls + " bg-white"} style={{ ...inputStyle, borderColor: showErr("lembaga") ? "#e53e3e" : "#e0c8c8" }} disabled={!form.klasifikasi}>
                      <option value="">{form.klasifikasi ? "-Pilih-" : "Pilih klasifikasi dulu"}</option>
                      {lembagaOptions.map((l) => <option key={l} value={l}>{l}</option>)}
                      {form.klasifikasi && <option value="__lain__">Lainnya</option>}
                    </select>
                    {form.lembaga === "__lain__" && (
                      <input type="text" placeholder="Nama lembaga lainnya..." className={inputCls + " mt-2"} style={inputStyle}
                        onChange={(e) => setForm({ ...form, lembaga: e.target.value || "__lain__", stasiun: e.target.value || "__lain__" })} />
                    )}
                    {showErr("lembaga") && <p className="text-xs mt-1 text-red-600">⚠ {showErr("lembaga")}</p>}
                  </div>

                  {/* Program Penyiaran */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Penyiaran <span style={{ color: C.primary }}>*</span></label>
                    <select value={form.program}
                      onChange={(e) => { setForm({ ...form, program: e.target.value }); touch("program"); }}
                      onBlur={() => touch("program")}
                      className={inputCls + " bg-white"} style={{ ...inputStyle, borderColor: showErr("program") ? "#e53e3e" : "#e0c8c8" }} disabled={!form.lembaga}>
                      <option value="">{form.lembaga ? "-Pilih-" : "Pilih lembaga dulu"}</option>
                      {programOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                      {form.lembaga && <option value="__lain__">Lainnya (ketik manual)</option>}
                    </select>
                    {form.program === "__lain__" && (
                      <input type="text" placeholder="Nama program lainnya..." className={inputCls + " mt-2"} style={inputStyle}
                        onChange={(e) => setForm({ ...form, program: e.target.value || "__lain__" })} />
                    )}
                    {showErr("program") && <p className="text-xs mt-1 text-red-600">⚠ {showErr("program")}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Siaran <span style={{ color: C.primary }}>*</span></label>
                    <input type="date" max={today} value={form.tanggal}
                      onChange={(e) => handleTanggal(e.target.value)}
                      className={inputCls} style={{ ...inputStyle, borderColor: tanggalError ? "#e53e3e" : "#e0c8c8" }} />
                    {tanggalError && <p className="text-xs mt-1.5 text-red-600 flex items-center gap-1">⚠ {tanggalError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jam Tayang <span style={{ color: C.primary }}>*</span></label>
                    <input type="time" value={form.jam}
                      onChange={(e) => { setForm({ ...form, jam: e.target.value }); touch("jam"); }}
                      onBlur={() => touch("jam")}
                      className={inputCls} style={{ ...inputStyle, borderColor: showErr("jam") ? "#e53e3e" : "#e0c8c8" }} />
                    {showErr("jam") && <p className="text-xs mt-1 text-red-600">⚠ {showErr("jam")}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                      Dugaan Pelanggaran
                      <span className="relative group">
                        <span className="w-4 h-4 rounded-full border text-xs flex items-center justify-center cursor-help select-none"
                          style={{ borderColor: C.primary, color: C.primary }}>?</span>
                        <span className="absolute left-6 top-0 z-20 hidden group-hover:block w-72 p-3 rounded-xl text-xs text-gray-700 shadow-xl leading-relaxed"
                          style={{ background: "#fff", border: "1px solid #e8d5d5", fontWeight: 400 }}>
                          <strong style={{ color: C.primary }}>Pilih kategori yang paling sesuai:</strong><br/>
                          • <strong>Konten kekerasan</strong> — adegan fisik/sadisme<br/>
                          • <strong>Konten seksual</strong> — eksplisit/implisit tidak sesuai jam<br/>
                          • <strong>Konten SARA</strong> — menyinggung suku, agama, ras<br/>
                          • <strong>Perlindungan anak</strong> — berbahaya bagi penonton &lt;18 tahun<br/>
                          • <strong>Iklan tidak layak</strong> — menyesatkan/melanggar aturan iklan
                        </span>
                      </span>
                    </label>
                    <select value={form.pasal} onChange={(e) => setForm({ ...form, pasal: e.target.value })}
                      className={inputCls + " bg-white"} style={inputStyle}>
                      <option value="">Pilih jenis pelanggaran...</option>
                      {["Konten kekerasan", "Konten seksual", "Konten SARA", "Perlindungan anak", "Iklan tidak layak", "Konten berbahaya lainnya"].map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Uraian Pengaduan <span style={{ color: C.primary }}>*</span></label>
                    <textarea rows={5} placeholder="Jelaskan secara detail konten yang Anda adukan (minimal 50 karakter)..." value={form.deskripsi}
                      onChange={(e) => { setForm({ ...form, deskripsi: e.target.value }); touch("deskripsi"); }}
                      onBlur={() => touch("deskripsi")}
                      className={inputCls + " resize-none"} style={{ ...inputStyle, borderColor: showErr("deskripsi") ? "#e53e3e" : "#e0c8c8" }} />
                    <div className="flex items-center justify-between mt-1">
                      {showErr("deskripsi")
                        ? <p className="text-xs text-red-600">⚠ {showErr("deskripsi")}</p>
                        : <span />}
                      <span className="text-xs ml-auto" style={{ color: form.deskripsi.length >= MIN_DESKRIPSI ? "#38a169" : "#a07070" }}>
                        {form.deskripsi.length}/{MIN_DESKRIPSI} karakter minimum
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Bukti Pendukung ── */}
              <div>
                <h3 className="font-bold text-base border-b pb-3 mb-4 flex items-center gap-2" style={{ color: C.primary, borderColor: "#f0dede" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Bukti Pendukung
                </h3>
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx"
                  className="hidden" onChange={(e) => handleFileAdd(e.target.files)} />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFileAdd(e.dataTransfer.files); }}
                  className="w-full flex flex-col items-center gap-2 py-6 rounded-xl border-2 border-dashed text-sm transition-all cursor-pointer"
                  style={{
                    borderColor: isDragOver ? C.primary : "#d4b0b0",
                    background: isDragOver ? "#fff0f0" : "#fff8f8",
                    color: "#7a5050",
                    transform: isDragOver ? "scale(1.01)" : "scale(1)",
                  }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isDragOver ? C.primaryLight : C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span>
                    <span className="font-semibold" style={{ color: C.primary }}>Klik untuk pilih file</span>
                    {" "}atau seret &amp; lepas di sini
                  </span>
                  <span className="text-xs" style={{ color: "#a07070" }}>Gambar, video, PDF, DOC — maks. 10 MB per file (maks. 5 file)</span>
                </div>
                {buktiFiles.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {buktiFiles.map(({ file, id, error }) => {
                      const isImg = file.type.startsWith("image/");
                      const previewUrl = isImg ? URL.createObjectURL(file) : null;
                      return (
                        <li key={id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm"
                          style={{ background: error ? "#fff0f0" : "#f7f7f7", border: `1px solid ${error ? "#f5c6c6" : "#ececec"}` }}>
                          {isImg && previewUrl ? (
                            <img src={previewUrl} alt={file.name}
                              className="flex-shrink-0 rounded-md object-cover"
                              style={{ width: 48, height: 48 }}
                              onLoad={() => URL.revokeObjectURL(previewUrl)} />
                          ) : (
                            <div className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center text-xl"
                              style={{ background: "#e8d5d5" }}>
                              {file.type.startsWith("video/") ? "🎥" : "📄"}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-medium text-gray-700">{file.name}</p>
                            {error
                              ? <p className="text-xs text-red-600">{error}</p>
                              : <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</p>}
                          </div>
                          <button type="button" onClick={() => removeFile(id)}
                            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                            style={{ background: "#ffe4e4", color: "#c0392b" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#ffd0d0"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#ffe4e4"; }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Persetujuan */}
              <div>
                <div className="flex items-start gap-3 pt-1 pb-1">
                  <input type="checkbox" id="setuju" checked={form.setuju}
                    onChange={(e) => { setForm({ ...form, setuju: e.target.checked }); touch("setuju"); }}
                    className="mt-0.5 accent-red-800" />
                  <label htmlFor="setuju" className="text-sm text-gray-600">
                    Saya menyatakan bahwa informasi yang saya sampaikan adalah <strong>benar</strong> dan dapat dipertanggungjawabkan sesuai peraturan yang berlaku.
                  </label>
                </div>
                {showErr("setuju") && <p className="text-xs mt-1 text-red-600 ml-7">⚠ {showErr("setuju")}</p>}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleBatal}
                  className="px-5 py-3 rounded-xl text-sm font-medium border-2 transition-colors"
                  style={{ borderColor: "#e0c8c8", color: "#888" }}>Batal</button>
                <div className="relative flex-1 group">
                  <button type="submit" disabled={hasAnyError || isSubmitting}
                    className="w-full py-3.5 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2"
                    style={{ backgroundColor: hasAnyError || isSubmitting ? "#c0a0a0" : C.primary, cursor: hasAnyError || isSubmitting ? "not-allowed" : "pointer" }}
                    onMouseEnter={(e) => { if (!hasAnyError && !isSubmitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primaryDark; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = hasAnyError ? "#c0a0a0" : C.primary; }}>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        Kirim Pengaduan
                      </>
                    )}
                  </button>
                  {hasAnyError && missingStep2.length > 0 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 px-3 py-2 rounded-lg text-xs text-white shadow-lg whitespace-nowrap"
                      style={{ background: C.navy }}>
                      Lengkapi: {missingStep2.join(", ")}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ background: C.navy, marginTop: -4 }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
        </form>
      </div>
    </>
  );
}

type PengaduanItem = typeof PENGADUAN_DATA[0];

function DetailModal({ item, onClose }: { item: PengaduanItem; onClose: () => void }) {
  const progress = item.status === "Selesai" ? 100 : item.status === "Dalam Proses" ? 55 : 20;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(139,26,26,0.28)", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)", maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${C.navyDeep}, ${C.primary})`, padding: "1.75rem 2rem" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Detail Pengaduan</p>
              <h2 className="text-lg font-bold text-white font-mono">{item.id}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: item.statusColor }}>{item.status}</span>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>
              <span>Progress</span><span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: "rgba(255,255,255,0.85)" }} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ background: "#ffffff", padding: "1.75rem 2rem" }}>
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Stasiun", val: item.stasiun },
              { label: "Program", val: item.program },
              { label: "Tanggal Tayang", val: item.tanggal },
              { label: "Jam Tayang", val: item.jam },
              { label: "Dugaan Pelanggaran", val: item.pasal },
              { label: "Dilaporkan", val: item.tanggal },
            ].map(({ label, val }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: "#fdf5f5" }}>
                <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="text-sm font-semibold" style={{ color: C.primaryDark }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Uraian */}
          <div className="rounded-xl p-4 mb-5" style={{ background: "#fdf5f5", border: "1px solid #f0dede" }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: C.primary }}>Uraian Pengaduan</p>
            <p className="text-sm text-gray-700 leading-relaxed">{item.deskripsi}</p>
          </div>

          {/* Timeline */}
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: C.primary }}>Riwayat Proses</p>
          <div className="space-y-1">
            {item.timeline.map((t, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex flex-col items-center mt-1" style={{ minWidth: 20 }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: t.done ? C.primary : "#e8e8e8", border: `2px solid ${t.done ? C.primary : "#d0d0d0"}` }}>
                    {t.done && <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  {i < item.timeline.length - 1 && <div className="w-0.5 flex-1 mt-1 mb-1 rounded" style={{ background: t.done ? C.primary : "#e0e0e0", minHeight: 16 }} />}
                </div>
                <div className="pb-2">
                  <p className="text-sm font-medium" style={{ color: t.done ? "#1a1a1a" : "#a0a0a0" }}>{t.aksi}</p>
                  <p className="text-xs" style={{ color: "#b0b0b0" }}>{t.tgl}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={onClose} className="w-full mt-5 py-3 rounded-xl text-white font-semibold text-sm"
            style={{ background: C.primary }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primaryDark; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primary; }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function TrackModal({ result, notFound, onClose }: { result: PengaduanItem | null; notFound: boolean; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(139,26,26,0.28)", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {notFound ? (
          <>
            <div style={{ background: `linear-gradient(135deg, #4a4a4a, #2a2a2a)`, padding: "2rem", textAlign: "center" }}>
              <div className="mx-auto mb-3 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M11 16h.01"/></svg>
              </div>
              <h3 className="text-lg font-bold text-white">Tiket Tidak Ditemukan</h3>
            </div>
            <div style={{ background: "#fff", padding: "1.5rem 2rem 2rem", textAlign: "center" }}>
              <p className="text-sm text-gray-600 mb-5">Nomor tiket yang Anda masukkan tidak ditemukan dalam sistem. Pastikan nomor tiket sudah benar.</p>
              <button onClick={onClose} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: C.primary }}>Coba Lagi</button>
            </div>
          </>
        ) : result ? (
          <>
            <div style={{ background: `linear-gradient(135deg, ${C.navyDeep}, ${C.primary})`, padding: "2rem 2rem 1.5rem" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Hasil Lacak Pengaduan</p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-bold text-white font-mono">{result.id}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: result.statusColor }}>{result.status}</span>
              </div>
              {/* Big status icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: result.statusColor, boxShadow: `0 0 32px ${result.statusColor}66` }}>
                  {result.status === "Selesai" && <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
                  {result.status === "Dalam Proses" && <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  {result.status === "Ditolak" && <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>}
                </div>
              </div>
            </div>
            <div style={{ background: "#fff", padding: "1.5rem 2rem 2rem" }}>
              <div className="space-y-3 mb-5">
                {[
                  { label: "Stasiun", val: result.stasiun },
                  { label: "Program", val: result.program },
                  { label: "Tanggal Dilaporkan", val: result.tanggal },
                  { label: "Pelanggaran", val: result.pasal },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b" style={{ borderColor: "#f5eded" }}>
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-sm font-semibold" style={{ color: C.primaryDark }}>{val}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose} className="w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: C.primary }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primaryDark; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primary; }}>
                Tutup
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function PengaduanSayaPage({ mySubmissions, prefillTrackId, clearPrefill }: {
  mySubmissions: MySubmission[];
  prefillTrackId: string;
  clearPrefill: () => void;
}) {
  const [trackId, setTrackId] = useState(prefillTrackId);
  const [trackResult, setTrackResult] = useState<PengaduanItem | null>(null);
  const [trackNotFound, setTrackNotFound] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [detailItem, setDetailItem] = useState<PengaduanItem | null>(null);
  const [filter, setFilter] = useState<"Semua" | "Dalam Proses" | "Selesai" | "Ditolak">("Semua");

  // Auto-trigger track if navigated from success modal
  useEffect(() => {
    if (prefillTrackId) {
      setTrackId(prefillTrackId);
      clearPrefill();
    }
  }, []);

  const allData: PengaduanItem[] = [
    ...mySubmissions.map((s) => ({
      id: s.id, tanggal: s.tanggal, stasiun: s.stasiun, program: s.program,
      status: s.status, statusColor: s.statusColor, pasal: s.pasal, deskripsi: s.deskripsi,
      jam: "—", timeline: s.timeline,
    })),
    ...PENGADUAN_DATA,
  ];

  const handleTrack = () => {
    if (!trackId.trim()) return;
    const found = allData.find((p) => p.id.toLowerCase() === trackId.trim().toLowerCase()) ?? null;
    setTrackResult(found);
    setTrackNotFound(!found);
    setShowTrack(true);
  };

  const statusProgress = (s: string) => s === "Selesai" ? 100 : s === "Dalam Proses" ? 55 : 20;
  const filtered = filter === "Semua" ? allData : allData.filter((p) => p.status === filter);

  const filterTabs: Array<"Semua" | "Dalam Proses" | "Selesai" | "Ditolak"> = ["Semua", "Dalam Proses", "Selesai", "Ditolak"];
  const tabCount = (f: string) => f === "Semua" ? allData.length : allData.filter((p) => p.status === f).length;

  return (
    <>
      {detailItem && <DetailModal item={detailItem} onClose={() => setDetailItem(null)} />}
      {showTrack && <TrackModal result={trackResult} notFound={trackNotFound} onClose={() => setShowTrack(false)} />}

      {/* Hero */}
      <PageHero title="Pengaduan Saya" sub="Lacak dan pantau status pengaduan penyiaran yang telah Anda kirimkan kepada KPI." imgKey="berita" badge="Sistem Aduan Rakyat — SARAN" />

      {/* Lacak search bar — matches image-16 */}
      <div className="max-w-3xl mx-auto px-4 mt-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md flex items-center gap-3 px-5 py-3" style={{ border: "1px solid #e8d5d5" }}>
          <input type="text" placeholder="Masukkan nomor tiket, contoh: ADU-2026-001247" value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleTrack(); }}
            className="flex-1 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none" />
          <button onClick={handleTrack}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0 transition-all"
            style={{ background: C.primary, boxShadow: "0 2px 8px rgba(139,26,26,0.25)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primaryDark; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.primary; }}>
            Lacak
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-14">
        {/* Aspek 24: Status color legend */}
        <div className="flex items-center gap-4 flex-wrap mb-3 text-xs text-gray-500">
          <span className="font-medium">Keterangan status:</span>
          {[
            { label: "Dalam Proses", color: "#e67e22" },
            { label: "Selesai", color: "#27ae60" },
            { label: "Ditolak", color: "#c0392b" },
          ].map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {filterTabs.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border"
              style={filter === f
                ? { background: C.primary, color: "#fff", borderColor: C.primary }
                : { background: "#fff", color: "#6b7280", borderColor: "#e5e7eb" }}>
              {f}
              <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                style={filter === f
                  ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                  : { background: "#f3f4f6", color: "#6b7280" }}>
                {tabCount(f)}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "var(--color-muted)" }}>
              <svg className="w-9 h-9" fill="none" stroke={C.primary} strokeWidth={1.5} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-700 mb-2">
              {filter === "Semua" ? "Belum ada pengaduan" : `Tidak ada pengaduan "${filter}"`}
            </h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              {filter === "Semua"
                ? "Anda belum pernah mengirimkan pengaduan. Mulai laporkan konten siaran yang melanggar aturan."
                : `Saat ini tidak ada pengaduan dengan status "${filter}".`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-all"
                style={{ borderColor: "#e8d5d5", borderLeft: `4px solid ${p.statusColor}` }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-sm font-mono" style={{ color: C.primary }}>{p.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: p.statusColor }}>{p.status}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-800">{p.stasiun} — {p.program}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{p.tanggal} · {p.pasal}</div>
                  </div>
                  <button onClick={() => setDetailItem(p)}
                    className="text-sm font-semibold px-5 py-2.5 rounded-xl border-2 transition-all flex-shrink-0"
                    style={{ borderColor: C.primary, color: C.primary }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primary; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = ""; (e.currentTarget as HTMLButtonElement).style.color = C.primary; }}>
                    Lihat Detail
                  </button>
                </div>
                <div className="mt-3 relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${statusProgress(p.status)}%`, backgroundColor: p.statusColor, transition: "width 0.8s ease" }} />
                </div>
                <div className="flex justify-between text-xs mt-1" style={{ color: "#b0b0b0" }}>
                  <span>Diterima</span><span>Dalam Proses</span><span>Selesai</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ─── shared hero for auth pages ──────────────────────────────────────────────
const AUTH_BG = "https://images.unsplash.com/photo-1589186161289-9eb8898086df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600";
const HERO_IMGS: Record<string, string> = {
  berita: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  data:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  ketentuan: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  kontak: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  profil: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
};

function PageHero({ title, sub, imgKey, badge }: { title: string; sub: string; imgKey: keyof typeof HERO_IMGS; badge?: string }) {
  return (
    <>
      <div style={{ position: "relative", overflow: "hidden", minHeight: 240 }}>
        <img src={HERO_IMGS[imgKey]} alt="" aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(15,8,8,0.90) 0%,rgba(92,16,16,0.84) 50%,rgba(139,26,26,0.72) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div className="relative z-10 text-center" style={{ padding: "3.5rem 1.5rem 4.5rem" }}>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.18)" }}>
            {badge ?? "Komisi Penyiaran Indonesia"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ lineHeight: 1.15 }}>{title}</h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.72)" }}>{sub}</p>
        </div>
      </div>
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: "100%", height: 48, display: "block" }}>
          <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" fill="var(--color-bg)" />
        </svg>
      </div>
    </>
  );
}

function AuthHero({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: 240 }}>
      <img src={AUTH_BG} alt="" aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(15,8,8,0.92) 0%,rgba(92,16,16,0.86) 50%,rgba(139,26,26,0.74) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
      <div className="relative z-10 text-center" style={{ padding: "3.5rem 1.5rem 4.5rem" }}>
        <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
          style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.18)" }}>
          SARAN · Sistem Aduan Rakyat
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ lineHeight: 1.15 }}>{title}</h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>{sub}</p>
      </div>
    </div>
  );
}

const inputBase = "w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors";
const inputSt = { borderColor: "#e0c8c8", "--tw-ring-color": "#8B1A1A", backgroundColor: "var(--color-surface)", color: "var(--color-text)" } as React.CSSProperties;
const inputErr = { borderColor: "#e53e3e", "--tw-ring-color": "#e53e3e", backgroundColor: "var(--color-surface)", color: "var(--color-text)" } as React.CSSProperties;

function ErrMsg({ msg }: { msg: string }) {
  return msg ? <p className="text-xs mt-1 text-red-600 flex items-center gap-1"><span>⚠</span>{msg}</p> : null;
}
function OkMsg({ msg }: { msg: string }) {
  return msg ? <p className="text-xs mt-1 text-green-600">✓ {msg}</p> : null;
}

function StrengthBar({ password }: { password: string }) {
  const has = { upper: /[A-Z]/.test(password), lower: /[a-z]/.test(password), num: /[0-9]/.test(password), len: password.length >= 8 };
  const score = Object.values(has).filter(Boolean).length;
  const color = score <= 1 ? "#e53e3e" : score <= 2 ? "#dd6b20" : score === 3 ? "#d69e2e" : "#38a169";
  const label = score <= 1 ? "Lemah" : score <= 2 ? "Cukup" : score === 3 ? "Sedang" : "Kuat";
  return password ? (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all" style={{ background: i <= score ? color : "#e2e8f0" }} />
        ))}
      </div>
      <div className="flex gap-3 flex-wrap text-xs" style={{ color: "#6b7280" }}>
        {[
          { key: "upper", label: "Huruf kapital" }, { key: "lower", label: "Huruf kecil" },
          { key: "num", label: "Angka" }, { key: "len", label: "Min. 8 karakter" },
        ].map(({ key, label: l }) => (
          <span key={key} style={{ color: has[key as keyof typeof has] ? "#38a169" : "#9ca3af" }}>
            {has[key as keyof typeof has] ? "✓" : "○"} {l}
          </span>
        ))}
      </div>
      <p className="text-xs mt-0.5 font-semibold" style={{ color }}>{label}</p>
    </div>
  ) : null;
}

function MasukPage({ navigate, login }: { navigate: (p: Page) => void; login: (email: string) => void }) {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPwd, setShowPwd] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const [success, setSuccess] = useState(false);

  const touch = (f: string) => setTouched((t) => ({ ...t, [f]: true }));

  const emailErr = touched.email
    ? (!form.email ? "Email wajib diisi." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "Format email tidak valid." : "")
    : "";
  const pwdErr = touched.password && !form.password ? "Password wajib diisi." : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (emailErr || pwdErr || !form.email || !form.password) return;
    if (!REGISTERED_EMAILS.has(form.email.toLowerCase())) {
      setLoginErr("Email tidak terdaftar. Silakan daftar akun terlebih dahulu.");
      return;
    }
    setLoginErr("");
    login(form.email.toLowerCase());
    setSuccess(true);
  };

  if (success) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)" }}>
      <div className="text-center p-10">
        <div className="mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#f0fff4", border: "3px solid #38a169" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.primaryDark }}>Masuk Berhasil!</h2>
        <p className="text-gray-500 mb-6 text-sm">Selamat datang kembali, {form.email}</p>
        <button onClick={() => navigate("beranda")} className="px-8 py-3 rounded-xl text-white font-semibold" style={{ background: C.primary }}>Ke Beranda →</button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <AuthHero title="Masuk Akun" sub="Masuk ke SARAN untuk melanjutkan pengaduan Anda." />
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: "100%", height: 48, display: "block" }}>
          <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" fill="var(--color-bg)" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(139,26,26,0.12)", background: "var(--color-surface)" }}>
          <div style={{ background: `linear-gradient(90deg, ${C.navyDeep}, ${C.primary})`, padding: "1.25rem 2rem" }}>
            <h2 className="text-white font-bold text-lg">Masuk ke Akun Anda</h2>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Gunakan email dan password yang telah terdaftar</p>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email <span style={{ color: C.primary }}>*</span></label>
              <input type="email" placeholder="contoh@email.com" value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setLoginErr(""); }}
                onBlur={() => touch("email")}
                className={inputBase} style={emailErr ? inputErr : inputSt} />
              <ErrMsg msg={emailErr} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password <span style={{ color: C.primary }}>*</span></label>
              <div className="relative">
                <input type={showPwd ? "text" : "password"} placeholder="Kata sandi" value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setLoginErr(""); }}
                  onBlur={() => touch("password")}
                  className={inputBase} style={{ ...(pwdErr ? inputErr : inputSt), paddingRight: "3rem" }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPwd ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                  </svg>
                </button>
              </div>
              <ErrMsg msg={pwdErr} />
            </div>

            {loginErr && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "#fff0f0", border: "1px solid #fca5a5", color: "#b91c1c" }}>
                ⚠ {loginErr}
                <button type="button" onClick={() => navigate("daftar")} className="ml-2 underline font-semibold">Daftar sekarang</button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="accent-red-800" />
                Ingat saya
              </label>
              <button type="button" onClick={() => navigate("lupa-password")} className="text-sm font-medium hover:underline" style={{ color: C.primary }}>Lupa password?</button>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`, boxShadow: "0 4px 20px rgba(139,26,26,0.3)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
              Masuk
            </button>

            <p className="text-center text-sm text-gray-500">
              Belum punya akun?{" "}
              <button type="button" onClick={() => navigate("daftar")} className="font-semibold" style={{ color: C.primary }}>Daftar sekarang</button>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

const PEKERJAAN_LIST = ["Belum/Tidak Bekerja","Pelajar/Mahasiswa","Pegawai Negeri Sipil","Tentara Nasional Indonesia","Kepolisian RI","Karyawan Swasta","Karyawan BUMN","Wiraswasta","Pedagang","Petani/Pekebun","Guru","Dosen","Dokter","Perawat","Bidan","Pengacara","Wartawan","Buruh","Pensiunan","Lainnya"];
const PROVINSI_LIST = ["ACEH","BALI","BANTEN","BENGKULU","DI YOGYAKARTA","DKI JAKARTA","GORONTALO","JAMBI","JAWA BARAT","JAWA TENGAH","JAWA TIMUR","KALIMANTAN BARAT","KALIMANTAN SELATAN","KALIMANTAN TENGAH","KALIMANTAN TIMUR","KALIMANTAN UTARA","KEPULAUAN BANGKA BELITUNG","KEPULAUAN RIAU","LAMPUNG","MALUKU","MALUKU UTARA","NUSA TENGGARA BARAT","NUSA TENGGARA TIMUR","PAPUA","PAPUA BARAT","RIAU","SULAWESI BARAT","SULAWESI SELATAN","SULAWESI TENGAH","SULAWESI TENGGARA","SULAWESI UTARA","SUMATERA BARAT","SUMATERA SELATAN","SUMATERA UTARA"];

function DaftarPage({ navigate, registerUser }: { navigate: (p: Page) => void; registerUser: (profile: UserProfile) => void }) {
  const [step, setStep] = useState<1|2|3>(1);
  const [form, setForm] = useState({
    nik: "", tipe: "perorangan", nama: "", gender: "", tglLahir: "", pekerjaan: "",
    telepon: "", alamat: "", kodepos: "", provinsi: "",
    username: "", email: "", password: "", konfirmasi: "", setuju: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPwd, setShowPwd] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [registered, setRegistered] = useState(false);

  const touch = (f: string) => setTouched((t) => ({ ...t, [f]: true }));
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const calcAge = (dob: string) => {
    if (!dob) return null;
    const [y, m, d] = dob.split("-").map(Number);
    const today = new Date();
    let age = today.getFullYear() - y;
    if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
    return age;
  };

  const errs: Record<string, string> = {
    nik: !form.nik ? "NIK wajib diisi." : !/^\d{16}$/.test(form.nik) ? "NIK harus tepat 16 digit angka." : "",
    nama: !form.nama ? "Nama wajib diisi." : /\d/.test(form.nama) ? "Nama tidak boleh mengandung angka." : form.nama.trim().length < 3 ? "Nama minimal 3 karakter." : "",
    gender: !form.gender ? "Jenis kelamin wajib dipilih." : "",
    tglLahir: !form.tglLahir ? "Tanggal lahir wajib diisi." : (calcAge(form.tglLahir) ?? 0) < 17 ? `Usia ${calcAge(form.tglLahir)} tahun — minimal 17 tahun.` : "",
    pekerjaan: !form.pekerjaan ? "Pekerjaan wajib dipilih." : "",
    telepon: !form.telepon ? "Nomor telepon wajib diisi." : !/^\d+$/.test(form.telepon) ? "Hanya angka." : !form.telepon.startsWith("08") ? "Harus diawali 08." : form.telepon.length < 10 || form.telepon.length > 13 ? "10–13 digit." : "",
    alamat: !form.alamat ? "Alamat wajib diisi." : form.alamat.trim().length < 15 ? "Alamat terlalu singkat, sertakan RT/RW dan kelurahan." : "",
    kodepos: !form.kodepos ? "Kode pos wajib diisi." : !/^\d{5}$/.test(form.kodepos) ? "Kode pos harus 5 digit angka." : "",
    provinsi: !form.provinsi ? "Provinsi wajib dipilih." : "",
    username: !form.username ? "Username wajib diisi." : form.username.length < 4 ? "Minimal 4 karakter." : "",
    email: !form.email ? "Email wajib diisi." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "Format email tidak valid." : "",
    password: !form.password ? "Password wajib diisi." : form.password.length < 8 ? "Minimal 8 karakter." : "",
    konfirmasi: !form.konfirmasi ? "Konfirmasi password wajib diisi." : form.konfirmasi !== form.password ? "Password tidak cocok." : "",
  };

  const showErr = (f: string) => touched[f] ? errs[f] : "";

  const step1Fields = ["nik", "nama", "gender", "tglLahir"];
  const step2Fields = ["pekerjaan", "telepon", "alamat", "kodepos", "provinsi"];
  const step3Fields = ["username", "email", "password", "konfirmasi"];

  const touchAll = (fields: string[]) => setTouched((t) => { const n = { ...t }; fields.forEach((f) => (n[f] = true)); return n; });

  const canNext1 = step1Fields.every((f) => !errs[f]);
  const canNext2 = step2Fields.every((f) => !errs[f]);
  const canSubmit = step3Fields.every((f) => !errs[f]) && form.setuju;

  const handleNext = () => {
    if (step === 1) { touchAll(step1Fields); if (canNext1) setStep(2); }
    else if (step === 2) { touchAll(step2Fields); if (canNext2) setStep(3); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    touchAll(step3Fields);
    if (!canSubmit) return;
    REGISTERED_EMAILS.add(form.email.toLowerCase());
    registerUser({ nama: form.nama, email: form.email.toLowerCase(), telepon: form.telepon, pekerjaan: form.pekerjaan });
    setRegistered(true);
  };

  if (registered) return (
    <>
      <div style={{ minHeight: "60vh", background: "var(--color-bg)" }} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}>
        <div className="rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl" style={{ background: "var(--color-surface)", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div className="flex flex-col items-center p-8 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#f0fff4", border: "3px solid #38a169" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h2 className="text-xl font-bold text-center" style={{ color: C.primaryDark }}>Akun Berhasil Dibuat!</h2>
            <p className="text-gray-500 text-sm text-center">Akun <strong>{form.username}</strong> telah terdaftar.</p>
            <p className="text-gray-400 text-xs text-center">Silakan masuk menggunakan email dan password yang telah Anda daftarkan.</p>
            <button onClick={() => navigate("masuk")}
              className="w-full mt-2 py-3 rounded-xl text-white font-semibold text-sm"
              style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
              Masuk Sekarang
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const stepLabels = ["Data Identitas", "Kontak & Lokasi", "Data Akun"];
  const sectionHdr = (icon: string, label: string) => (
    <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: "var(--color-border)" }}>
      <span style={{ color: C.primary }}>{icon}</span>
      <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: C.primaryDark }}>{label}</h3>
    </div>
  );

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <AuthHero title="Buat Akun" sub="Daftar untuk mulai menyampaikan pengaduan penyiaran kepada KPI." />
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: "100%", height: 48, display: "block" }}>
          <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" fill="var(--color-bg)" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Stepper — centered */}
        <div className="flex justify-center mb-8">
          <div className="flex items-start w-full max-w-lg">
            {stepLabels.map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              const isLast = i === stepLabels.length - 1;
              return (
                <div key={label} className={`flex items-start ${isLast ? "flex-none" : "flex-1"}`}>
                  {/* Circle + label */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm"
                      style={{ background: done ? "#38a169" : active ? C.primary : "#e5e7eb", color: done || active ? "#fff" : "#9ca3af" }}>
                      {done ? "✓" : n}
                    </div>
                    <span className="text-xs mt-1.5 text-center hidden sm:block" style={{ color: active ? C.primary : done ? "#38a169" : "#9ca3af", fontWeight: active ? 600 : 400 }}>{label}</span>
                  </div>
                  {/* Connector line — only between steps */}
                  {!isLast && (
                    <div className="flex-1 h-0.5 mt-5 mx-2" style={{ background: done ? "#38a169" : "#e5e7eb" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 12px 48px rgba(139,26,26,0.12)", background: "var(--color-surface)" }}>
          <div style={{ background: `linear-gradient(90deg, ${C.navyDeep}, ${C.primary})`, padding: "1.25rem 2rem" }}>
            <h2 className="text-white font-bold text-lg">Langkah {step}: {stepLabels[step - 1]}</h2>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Lengkapi semua field yang bertanda *</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="space-y-5">
                {sectionHdr("", "Data Identitas")}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NIK <span style={{ color: C.primary }}>*</span></label>
                    <input type="text" maxLength={16} placeholder="16 digit NIK" value={form.nik}
                      onChange={(e) => set("nik", e.target.value.replace(/\D/g, ""))}
                      onBlur={() => touch("nik")} className={inputBase} style={showErr("nik") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("nik")} />
                    {!showErr("nik") && form.nik.length === 16 && <OkMsg msg="NIK 16 digit valid." />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Pengguna <span style={{ color: C.primary }}>*</span></label>
                    <select value={form.tipe} onChange={(e) => set("tipe", e.target.value)} className={inputBase + " bg-white"} style={inputSt}>
                      {["perorangan", "badan_hukum", "kelompok"].map((v) => (
                        <option key={v} value={v}>{v === "perorangan" ? "Perorangan" : v === "badan_hukum" ? "Badan Hukum" : "Kelompok"}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap <span style={{ color: C.primary }}>*</span></label>
                    <input type="text" placeholder="Nama sesuai KTP" value={form.nama}
                      onChange={(e) => set("nama", e.target.value)} onBlur={() => touch("nama")}
                      className={inputBase} style={showErr("nama") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("nama")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin <span style={{ color: C.primary }}>*</span></label>
                    <select value={form.gender} onChange={(e) => { set("gender", e.target.value); touch("gender"); }}
                      className={inputBase + " bg-white"} style={showErr("gender") ? inputErr : inputSt}>
                      <option value="">Pilih...</option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                    <ErrMsg msg={showErr("gender")} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir <span style={{ color: C.primary }}>*</span> <span className="text-gray-400 font-normal">(minimal 17 tahun)</span></label>
                    <input type="date" value={form.tglLahir}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 17)).toISOString().split("T")[0]}
                      onChange={(e) => { set("tglLahir", e.target.value); touch("tglLahir"); }}
                      className={inputBase} style={showErr("tglLahir") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("tglLahir")} />
                    {!showErr("tglLahir") && form.tglLahir && <OkMsg msg={`Usia ${calcAge(form.tglLahir)} tahun — memenuhi syarat.`} />}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="space-y-5">
                {sectionHdr("", "Kontak & Lokasi")}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan <span style={{ color: C.primary }}>*</span></label>
                    <select value={form.pekerjaan} onChange={(e) => { set("pekerjaan", e.target.value); touch("pekerjaan"); }}
                      className={inputBase + " bg-white"} style={showErr("pekerjaan") ? inputErr : inputSt}>
                      <option value="">Pilih pekerjaan...</option>
                      {PEKERJAAN_LIST.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ErrMsg msg={showErr("pekerjaan")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon <span style={{ color: C.primary }}>*</span></label>
                    <input type="tel" placeholder="08xxxxxxxxxx" value={form.telepon}
                      onChange={(e) => set("telepon", e.target.value.replace(/\D/g, ""))}
                      onBlur={() => touch("telepon")} className={inputBase} style={showErr("telepon") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("telepon")} />
                    {!showErr("telepon") && form.telepon.length >= 10 && <OkMsg msg={`${form.telepon.length} digit, format valid.`} />}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Domisili Lengkap <span style={{ color: C.primary }}>*</span></label>
                    <textarea rows={3} placeholder="Jl. …, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten" value={form.alamat}
                      onChange={(e) => set("alamat", e.target.value)} onBlur={() => touch("alamat")}
                      className={inputBase + " resize-none"} style={showErr("alamat") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("alamat")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos <span style={{ color: C.primary }}>*</span></label>
                    <input type="text" maxLength={5} placeholder="5 digit" value={form.kodepos}
                      onChange={(e) => set("kodepos", e.target.value.replace(/\D/g, ""))}
                      onBlur={() => touch("kodepos")} className={inputBase} style={showErr("kodepos") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("kodepos")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi Domisili <span style={{ color: C.primary }}>*</span></label>
                    <select value={form.provinsi} onChange={(e) => { set("provinsi", e.target.value); touch("provinsi"); }}
                      className={inputBase + " bg-white"} style={showErr("provinsi") ? inputErr : inputSt}>
                      <option value="">Pilih provinsi...</option>
                      {PROVINSI_LIST.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ErrMsg msg={showErr("provinsi")} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3 ── */}
            {step === 3 && (
              <div className="space-y-5">
                {sectionHdr("", "Data Akun")}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username <span style={{ color: C.primary }}>*</span></label>
                    <input type="text" placeholder="Min. 4 karakter" value={form.username}
                      onChange={(e) => set("username", e.target.value)} onBlur={() => touch("username")}
                      className={inputBase} style={showErr("username") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("username")} />
                    {!showErr("username") && form.username.length >= 4 && <OkMsg msg="Username tersedia." />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span style={{ color: C.primary }}>*</span></label>
                    <input type="email" placeholder="alamat@email.com" value={form.email}
                      onChange={(e) => set("email", e.target.value)} onBlur={() => touch("email")}
                      className={inputBase} style={showErr("email") ? inputErr : inputSt} />
                    <ErrMsg msg={showErr("email")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password <span style={{ color: C.primary }}>*</span></label>
                    <div className="relative">
                      <input type={showPwd ? "text" : "password"} placeholder="Kata sandi" value={form.password}
                        onChange={(e) => set("password", e.target.value)} onBlur={() => touch("password")}
                        className={inputBase} style={{ ...(showErr("password") ? inputErr : inputSt), paddingRight: "3rem" }} />
                      <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3 text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          {showPwd ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                            : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                        </svg>
                      </button>
                    </div>
                    <StrengthBar password={form.password} />
                    {!touched["password"] && <p className="text-xs mt-1 text-gray-400">Minimal 8 karakter — kombinasikan huruf dan angka untuk keamanan lebih baik.</p>}
                    <ErrMsg msg={showErr("password")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password <span style={{ color: C.primary }}>*</span></label>
                    <div className="relative">
                      <input type={showKonfirmasi ? "text" : "password"} placeholder="Ulangi kata sandi" value={form.konfirmasi}
                        onChange={(e) => set("konfirmasi", e.target.value)} onBlur={() => touch("konfirmasi")}
                        className={inputBase} style={{ ...(showErr("konfirmasi") ? inputErr : inputSt), paddingRight: "3rem" }} />
                      <button type="button" onClick={() => setShowKonfirmasi(!showKonfirmasi)} className="absolute right-3 top-3 text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          {showKonfirmasi ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                            : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                        </svg>
                      </button>
                    </div>
                    <ErrMsg msg={showErr("konfirmasi")} />
                    {!showErr("konfirmasi") && form.konfirmasi && form.konfirmasi === form.password && <OkMsg msg="Password cocok!" />}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="setuju-daftar" checked={form.setuju} onChange={(e) => set("setuju", e.target.checked)} className="mt-0.5 accent-red-800" />
                  <label htmlFor="setuju-daftar" className="text-sm text-gray-600">
                    Saya menyetujui <span className="font-semibold" style={{ color: C.primary }}>Kebijakan Privasi</span> dan <span className="font-semibold" style={{ color: C.primary }}>Syarat & Ketentuan</span> KPI.
                  </label>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button type="button" onClick={() => setStep((s) => (s - 1) as 1|2|3)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all"
                  style={{ borderColor: C.primary, color: C.primary }}>
                  ← Kembali
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={handleNext}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`, boxShadow: "0 4px 20px rgba(139,26,26,0.3)" }}>
                  Lanjut →
                </button>
              ) : (
                <button type="submit" disabled={!canSubmit}
                  className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: canSubmit ? `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` : "#c0a0a0", cursor: canSubmit ? "pointer" : "not-allowed", boxShadow: canSubmit ? "0 4px 20px rgba(139,26,26,0.3)" : "none" }}>
                  Daftar Sekarang
                </button>
              )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Sudah punya akun?{" "}
              <button type="button" onClick={() => navigate("masuk")} className="font-semibold" style={{ color: C.primary }}>Masuk di sini</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function BeritaPage({ navigate }: { navigate: (p: Page) => void }) {
  const [selected, setSelected] = useState<(typeof NEWS_DATA)[0] | null>(null);
  const [filter, setFilter] = useState("Semua");
  const [sortBy, setSortBy] = useState<"terbaru" | "terlama" | "az">("terbaru");

  const categories = ["Semua", "Siaran Pers", "Pengumuman", "Berita"];
  const catFiltered = filter === "Semua" ? NEWS_DATA : NEWS_DATA.filter((n) => n.category === filter);
  const filtered = [...catFiltered].sort((a, b) => {
    if (sortBy === "terbaru") return catFiltered.indexOf(a) - catFiltered.indexOf(b);
    if (sortBy === "terlama") return catFiltered.indexOf(b) - catFiltered.indexOf(a);
    return a.title.localeCompare(b.title, "id");
  });

  if (selected) {
    return (
      <>
        <PageBreadcrumb title={selected.title} parents={["Berita"]} navigate={navigate} parentActions={{ "Berita": () => setSelected(null) }} />
        <div className="max-w-3xl mx-auto px-4 py-10">
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm mb-6 hover:underline" style={{ color: C.primary }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Kembali ke Berita
          </button>
          <img src={selected.img} alt={selected.title} className="w-full h-64 object-cover rounded-xl mb-6" />
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: C.primary }}>{selected.category}</span>
            <span className="text-sm text-gray-500">{selected.date}</span>
          </div>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">{selected.title}</h1>
          <p className="text-gray-700 leading-relaxed">{selected.full}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title="Berita & Pengumuman" sub="Informasi terbaru dari Komisi Penyiaran Indonesia" imgKey="berita" badge="Berita" />
      <div className="w-full px-6 py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
                style={filter === c ? { backgroundColor: C.primary, color: "white", borderColor: C.primary } : { borderColor: "#e0c8c8", color: C.primary }}>
                {c}
              </button>
            ))}
          </div>
          {/* Aspek 18: Sorting */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 flex-shrink-0">Urutkan:</span>
            {(["terbaru", "terlama", "az"] as const).map((s) => {
              const label = s === "terbaru" ? "Terbaru" : s === "terlama" ? "Terlama" : "A–Z";
              return (
                <button key={s} onClick={() => setSortBy(s)}
                  className="px-3 py-1 rounded-full border text-xs font-medium transition-colors"
                  style={sortBy === s ? { backgroundColor: C.primary, color: "#fff", borderColor: C.primary } : { borderColor: "#e0c8c8", color: "#6b7280" }}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <button key={idx} onClick={() => setSelected(item)} className="group text-left bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: "#e8d5d5" }}>
              <div className="h-44 overflow-hidden bg-gray-100">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: C.primary }}>{item.category}</span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 leading-snug line-clamp-2 group-hover:underline">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function DataPage({ navigate }: { navigate: (p: Page) => void }) {
  const stats = [
    { label: "Total Pengaduan 2026", value: "14.382", icon: "📨", trend: "+12% dari 2025" },
    { label: "Pengaduan Diproses", value: "1.247", icon: "⚙️", trend: "Bulan ini" },
    { label: "Sanksi Diterbitkan", value: "89", icon: "⚖️", trend: "Tahun 2026" },
    { label: "Lembaga Penyiaran", value: "674", icon: "📡", trend: "Aktif berlisensi" },
  ];
  return (
    <>
      <PageHero title="Data & Statistik" sub="Data penyiaran dan pengaduan KPI" imgKey="data" badge="Data · KPI" />
      <div className="w-full px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 border shadow-sm text-center" style={{ borderColor: "#e8d5d5" }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold" style={{ color: C.primary }}>{s.value}</div>
              <div className="text-sm font-medium text-gray-700 mt-1">{s.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.trend}</div>
            </div>
          ))}
        </div>

        {/* Aspek 21 & 25: KPI trend bar chart */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-10" style={{ borderColor: "#e8d5d5" }}>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <h3 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>Tren Pengaduan Bulanan 2026</h3>
              <p className="text-sm text-gray-500 mt-0.5">Jumlah pengaduan yang masuk per bulan (Jan–Agt)</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: C.primary }}></span>Diterima</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: "#27ae60" }}></span>Selesai</span>
            </div>
          </div>
          {(() => {
            const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt"];
            const received = [1420, 1580, 1890, 1650, 1720, 1830, 1960, 2100];
            const resolved = [1180, 1340, 1560, 1430, 1510, 1650, 1720, 1870];
            const maxVal = Math.max(...received) + 100;
            const H = 250;
            const gap = 120;
            const startX = 60;
            const totalW = startX + (months.length - 1) * gap + 80;

            const getPath = (data: number[]) => {
              const pts = data.map((val, i) => ({
                x: startX + i * gap,
                y: 20 + H - (val / maxVal) * H
              }));
              let d = `M ${pts[0].x},${pts[0].y}`;
              for (let i = 1; i < pts.length; i++) {
                const p0 = pts[i - 1];
                const p1 = pts[i];
                const cx = (p0.x + p1.x) / 2;
                d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
              }
              return { d, pts };
            };

            const receivedPath = getPath(received);
            const resolvedPath = getPath(resolved);

            const receivedArea = `${receivedPath.d} L ${receivedPath.pts[receivedPath.pts.length-1].x},${20+H} L ${receivedPath.pts[0].x},${20+H} Z`;
            const resolvedArea = `${resolvedPath.d} L ${resolvedPath.pts[resolvedPath.pts.length-1].x},${20+H} L ${resolvedPath.pts[0].x},${20+H} Z`;

            return (
              <div className="overflow-x-auto overflow-y-visible relative pb-6">
                <svg viewBox={`0 0 ${totalW} ${H + 80}`} className="w-full" style={{ minWidth: 600, overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="areaRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B1A1A" stopOpacity={0.7}/>
                      <stop offset="100%" stopColor="#8B1A1A" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#27ae60" stopOpacity={0.7}/>
                      <stop offset="100%" stopColor="#27ae60" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  {/* Y gridlines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                    const y = 20 + H - t * H;
                    return (
                      <g key={t}>
                        <line x1={startX - 10} x2={totalW - 20} y1={y} y2={y} stroke="#e8d5d5" strokeWidth={1} />
                        <text x={startX - 16} y={y + 4} textAnchor="end" fontSize={12} fill="#9a7a7a">{Math.round(t * maxVal)}</text>
                      </g>
                    );
                  })}
                  {/* Grid X */}
                  {months.map((m, i) => {
                    const x = startX + i * gap;
                    return (
                      <g key={m}>
                        <line x1={x} x2={x} y1={20} y2={20 + H} stroke="#e8d5d5" strokeWidth={1} />
                        <text x={x} y={H + 40} textAnchor="middle" fontSize={13} fill="#9a7a7a">{m}</text>
                      </g>
                    );
                  })}
                  
                  {/* Areas */}
                  <path d={receivedArea} fill="url(#areaRed)" />
                  <path d={resolvedArea} fill="url(#areaGreen)" />
                  
                  {/* Lines */}
                  <path d={receivedPath.d} fill="none" stroke="#8B1A1A" strokeWidth={3} />
                  <path d={resolvedPath.d} fill="none" stroke="#27ae60" strokeWidth={2} />
                  
                  {/* Points */}
                  {receivedPath.pts.map((p, i) => {
                     const isLast = i === receivedPath.pts.length - 1;
                     const tooltipX = isLast ? p.x - 170 : p.x + 10;
                     return (
                      <g key={i} className="group cursor-pointer">
                        <circle cx={p.x} cy={p.y} r={16} fill="transparent" />
                        <circle cx={p.x} cy={p.y} r={4} fill="#8B1A1A" stroke="#fff" strokeWidth={2} className="transition-transform group-hover:scale-150" />
                        <foreignObject x={tooltipX} y={p.y - 40} width="160" height="90" className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" style={{ zIndex: 10 }}>
                          <div className="bg-white rounded-lg shadow-lg border p-3 text-xs" style={{ borderColor: '#e8d5d5' }}>
                            <div className="font-bold mb-1">{months[i]} 2026:</div>
                            <div className="text-gray-700">Total Aduan: {received[i]} (Garis Tren)</div>
                            <div className="text-gray-700">Selesai: {resolved[i]} (Area Hijau)</div>
                            <div className="text-gray-700">Tertunda: {received[i] - resolved[i]} (Area Cokelat)</div>
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                </svg>
              </div>
            );
          })()}
        </div>

        <h3 className="font-bold text-xl mb-6" style={{ color: "var(--color-text)" }}>Infografis KPI</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INFOGRAPHICS.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border" style={{ borderColor: "#e8d5d5" }}>
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-3 text-center">
                <p className="text-sm font-medium text-gray-700">{item.title}</p>
                <button onClick={() => navigate("unduh")} className="mt-2 text-xs font-medium hover:underline" style={{ color: C.primary }}>Unduh PDF →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function UnduhDataPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <>
      <PageHero title="Unduh Data" sub="Pusat unduhan data penyiaran dan pengaduan" imgKey="data" badge="Unduhan · KPI" />
      <PageBreadcrumb title="Unduh Data" parents={["Beranda", "Data"]} navigate={navigate} />
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 shadow-sm" style={{ backgroundColor: "#fdf8f8", border: "1px solid #f0dede" }}>
          <svg className="w-8 h-8" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: C.primaryDark }}>Pusat Unduhan Data KPI</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Unduh laporan tahunan, statistik pengaduan, dan data penyiaran publik secara lengkap dalam format PDF.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {[1,2,3,4].map(i => (
             <div key={i} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group" style={{ borderColor: "#e8d5d5" }}>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Laporan Kinerja KPI {2027-i}</h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">Ringkasan laporan tahunan komprehensif terkait pengaduan masyarakat dan sanksi lembaga penyiaran sepanjang tahun {2027-i}.</p>
                <button className="px-5 py-2.5 rounded-lg font-medium text-sm text-white flex items-center justify-center w-full transition-all group-hover:brightness-110 shadow-sm" style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Unduh Dokumen PDF
                </button>
             </div>
          ))}
        </div>
      </div>
    </>
  );
}

function KetentuanPage({ navigate }: { navigate: (p: Page) => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = [
    { title: "Ketentuan Penggunaan Layanan", content: "Layanan SARAN (Sistem Aduan Rakyat) ini disediakan oleh Komisi Penyiaran Indonesia (KPI) sebagai sarana penyampaian pengaduan konten siaran televisi dan radio kepada masyarakat. Pengguna wajib menggunakan layanan ini dengan itikad baik dan sesuai dengan ketentuan hukum yang berlaku di Indonesia." },
    { title: "Persyaratan Pelaporan", content: "Pengaduan yang disampaikan harus berdasarkan fakta yang dapat dipertanggungjawabkan. Pelapor wajib memberikan informasi yang akurat mengenai nama stasiun TV/radio, nama program, tanggal, dan jam tayang. Pengaduan yang tidak disertai dengan informasi yang lengkap dapat dihentikan prosesnya." },
    { title: "Kerahasiaan Identitas", content: "KPI berkomitmen untuk menjaga kerahasiaan identitas pelapor. Data pribadi pelapor tidak akan disebarluaskan kepada pihak manapun tanpa izin pelapor, kecuali diminta oleh instansi berwenang berdasarkan ketentuan hukum yang berlaku." },
    { title: "Proses Penanganan Pengaduan", content: "KPI akan memproses setiap pengaduan yang masuk sesuai dengan prosedur yang ditetapkan. Pelapor akan mendapatkan nomor tiket pengaduan sebagai bukti penerimaan. KPI akan merespons pengaduan dalam waktu paling lambat 7 (tujuh) hari kerja." },
    { title: "Sanksi Pelanggaran", content: "Pengaduan yang terbukti palsu atau mengandung informasi yang tidak benar dapat diproses secara hukum sesuai ketentuan yang berlaku. KPI berhak menolak pengaduan yang tidak memenuhi persyaratan atau mengandung unsur fitnah." },
  ];
  return (
    <>
      <PageHero title="Ketentuan Layanan" sub="Syarat dan ketentuan penggunaan SARAN" imgKey="ketentuan" badge="Ketentuan · SARAN" />
      <PageBreadcrumb title="Ketentuan" parents={["Beranda"]} navigate={navigate} />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left flex items-center justify-between p-5 font-semibold text-gray-800 hover:bg-red-50/30 transition-colors">
                <span>{item.title}</span>
                <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${openIdx === idx ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.primary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t" style={{ borderColor: "#f5e8e8" }}>
                  <p className="pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────── Profil Saya Page ───────────────────
function ProfilSayaPage({ currentUser, userProfile, updateProfile, navigate }: {
  currentUser: string | null;
  userProfile: UserProfile | null;
  updateProfile: (p: UserProfile) => void;
  navigate: (p: Page) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<UserProfile>({
    nama: userProfile?.nama ?? "",
    email: userProfile?.email ?? currentUser ?? "",
    telepon: userProfile?.telepon ?? "",
    pekerjaan: userProfile?.pekerjaan ?? "",
  });

  const handleSave = () => {
    updateProfile(form);
    setEditMode(false);
  };

  const initial = (userProfile?.nama ?? currentUser ?? "?").charAt(0).toUpperCase();

  return (
    <>
      <PageHero title="Profil Saya" sub="Informasi akun dan data diri Anda" imgKey="profil" badge="Akun · Profil Saya" />
      <div className="max-w-xl mx-auto px-4 py-10">
        {/* Account card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: "1px solid #e8d5d5" }}>
          {/* Card header */}
          <div className="px-6 py-8 text-center" style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl font-bold text-white shadow-lg"
              style={{ background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.4)" }}>
              {initial}
            </div>
            <p className="text-white font-bold text-lg">{userProfile?.nama || currentUser}</p>
            <p className="text-red-200 text-sm">{userProfile?.email || currentUser}</p>
          </div>

          {/* Info rows */}
          <div className="p-6 space-y-4">
            {editMode ? (
              <>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
                  <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                    style={{ borderColor: "#e0c8c8" }}
                    value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Akun (Email)</label>
                  <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                    style={{ borderColor: "#e8d5d5" }}
                    value={form.email} disabled />
                  <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nomor Telepon</label>
                  <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                    style={{ borderColor: "#e0c8c8" }}
                    value={form.telepon} onChange={(e) => setForm((f) => ({ ...f, telepon: e.target.value }))} placeholder="08xxxxxxxxxx" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pekerjaan</label>
                  <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                    style={{ borderColor: "#e0c8c8" }}
                    value={form.pekerjaan} onChange={(e) => setForm((f) => ({ ...f, pekerjaan: e.target.value }))} placeholder="Contoh: Karyawan Swasta" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setEditMode(false)} className="flex-1 py-2.5 text-sm font-semibold rounded-xl border-2" style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                    Batal
                  </button>
                  <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-bold rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
                    Simpan Perubahan
                  </button>
                </div>
              </>
            ) : (
              <>
                {[
                  { label: "Nama Lengkap", value: userProfile?.nama || "—", icon: "👤" },
                  { label: "Akun (Email)", value: userProfile?.email || currentUser || "—", icon: "📧" },
                  { label: "Nomor Telepon", value: userProfile?.telepon || "—", icon: "📞" },
                  { label: "Pekerjaan", value: userProfile?.pekerjaan || "—", icon: "💼" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-4 py-3 border-b last:border-0" style={{ borderColor: "#f5e8e8" }}>
                    <span className="text-lg flex-shrink-0 mt-0.5">{row.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{row.label}</div>
                      <div className="text-sm text-gray-800 mt-0.5">{row.value}</div>
                    </div>
                  </div>
                ))}
                <button onClick={() => { setForm({ nama: userProfile?.nama ?? "", email: userProfile?.email ?? currentUser ?? "", telepon: userProfile?.telepon ?? "", pekerjaan: userProfile?.pekerjaan ?? "" }); setEditMode(true); }}
                  className="mt-4 w-full py-2.5 text-sm font-semibold rounded-xl border-2 flex items-center justify-center gap-2 transition-all hover:bg-red-50"
                  style={{ borderColor: C.primary, color: C.primary }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Profil
                </button>
              </>
            )}
          </div>
        </div>

        {/* Password / Keamanan Akun card */}
        <div className="mt-5 bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: "1px solid #e8d5d5" }}>
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: "#f0dede" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#fff0f0" }}>
              <svg className="w-4 h-4" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h3 className="font-bold text-sm" style={{ color: C.primaryDark }}>Keamanan Akun</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-gray-800">Password</div>
                <div className="text-xs text-gray-400 mt-0.5">Terakhir diubah: belum pernah diubah</div>
              </div>
              <button onClick={() => navigate("ubah-password")}
                className="text-sm font-semibold px-4 py-2 rounded-lg border-2 transition-all hover:bg-red-50"
                style={{ borderColor: C.primary, color: C.primary }}>
                Ubah Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────── Ubah Password Page (from Profil — no email step) ───────────────────
function UbahPasswordPage({ navigate }: { navigate: (p: Page) => void }) {
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const pwdValid = newPwd.length >= 8;
  const pwdMatch = newPwd === confirm && pwdValid;

  const inputCls = "w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors";
  const inputSt = { borderColor: "#e0c8c8", "--tw-ring-color": C.primary } as React.CSSProperties;

  if (done) return (
    <>
      <AuthHero title="Ubah Password" sub="Keamanan akun Anda" />
      <div className="flex-1 flex items-start justify-center px-4 pb-16 pt-6" style={{ background: "#fff8f8" }}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center" style={{ border: "1px solid #e8d5d5" }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#f0fff4", border: "3px solid #38a169" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: C.primaryDark }}>Password Berhasil Diubah!</h2>
          <p className="text-sm text-gray-500 mb-6">Password akun Anda telah diperbarui.</p>
          <button onClick={() => navigate("profil-saya")} className="w-full py-3 rounded-xl text-white font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>Kembali ke Profil</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <AuthHero title="Ubah Password" sub="Masukkan password baru untuk akun Anda" />
      <div className="flex-1 flex items-start justify-center px-4 pb-16 pt-6" style={{ background: "#fff8f8" }}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: "1px solid #e8d5d5" }}>
          <div className="px-8 py-7">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#fff0f0" }}>
              <svg className="w-7 h-7" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h2 className="text-center text-lg font-bold mb-5" style={{ color: C.primaryDark }}>Buat Password Baru</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} placeholder="Minimal 8 karakter" value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)} className={inputCls} style={{ ...inputSt, paddingRight: "3rem" }} />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      {showNew ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </button>
                </div>
                {newPwd && !pwdValid && <p className="text-xs text-red-600 mt-1">⚠ Minimal 8 karakter.</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                <div className="relative">
                  <input type={showConf ? "text" : "password"} placeholder="Ulangi password baru" value={confirm}
                    onChange={(e) => setConfirm(e.target.value)} className={inputCls} style={{ ...inputSt, paddingRight: "3rem" }} />
                  <button type="button" onClick={() => setShowConf(!showConf)} className="absolute right-3 top-3 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      {showConf ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </button>
                </div>
                {confirm && confirm !== newPwd && <p className="text-xs text-red-600 mt-1">⚠ Password tidak cocok.</p>}
              </div>
              <button onClick={() => { if (pwdMatch) setShowConfirm(true); }} disabled={!pwdMatch}
                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
                Ubah Password
              </button>
              <button type="button" onClick={() => navigate("profil-saya")}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">← Kembali ke Profil</button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ animation: "fadeIn 0.2s ease" }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center" style={{ animation: "slideUp 0.25s ease" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fff0f0" }}>
              <svg className="w-7 h-7" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Konfirmasi Ubah Password</h3>
            <p className="text-sm text-gray-500 mb-6">Apakah Anda yakin ingin mengubah password akun Anda?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl border-2 text-gray-600"
                style={{ borderColor: "#d1d5db" }}>Batal</button>
              <button onClick={() => { setShowConfirm(false); setDone(true); }}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>Ya, Ubah</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────── Lupa / Ubah Password Page ───────────────────
function LupaPasswordPage({ navigate }: { navigate: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [done, setDone] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwdMatch = newPwd === confirm && newPwd.length >= 8;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid) return;
    setSent(true);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwdMatch) return;
    setDone(true);
  };

  const inputCls = "w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors";
  const inputSt = { borderColor: "#e0c8c8", "--tw-ring-color": C.primary } as React.CSSProperties;

  return (
    <>
      <AuthHero title="Lupa Password" sub="Kami akan membantu Anda memulihkan akses akun" />
      <div className="flex-1 flex items-start justify-center px-4 pb-16 pt-2" style={{ background: "#fff8f8" }}>
        <div className="w-full max-w-md">
          {done ? (
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center" style={{ border: "1px solid #e8d5d5" }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#f0fff4", border: "3px solid #38a169" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: C.primaryDark }}>Password Berhasil Diubah!</h2>
              <p className="text-sm text-gray-500 mb-6">Silakan masuk menggunakan password baru Anda.</p>
              <button onClick={() => navigate("masuk")} className="w-full py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>Masuk Sekarang</button>
            </div>
          ) : !sent ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: "1px solid #e8d5d5" }}>
              <div className="px-8 pt-8 pb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#fff0f0" }}>
                  <svg className="w-7 h-7" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </div>
                <h2 className="text-center text-xl font-bold mb-1" style={{ color: C.primaryDark }}>Lupa Password?</h2>
                <p className="text-center text-sm text-gray-500 mb-6">Masukkan email akun Anda dan kami akan mengirim kode verifikasi.</p>
                <form onSubmit={handleSend} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email <span style={{ color: C.primary }}>*</span></label>
                    <input type="email" placeholder="email@contoh.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className={inputCls} style={inputSt} />
                  </div>
                  <button type="submit" disabled={!emailValid}
                    className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40"
                    style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
                    Kirim Kode Verifikasi
                  </button>
                  <button type="button" onClick={() => navigate("masuk")}
                    className="w-full py-2 text-sm text-gray-500 hover:text-gray-700">← Kembali ke Masuk</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: "1px solid #e8d5d5" }}>
              <div className="px-6 py-3 text-sm text-center rounded-t-none" style={{ background: "#f0fff4", borderBottom: "1px solid #c6f6d5" }}>
                <span className="text-green-700">✓ Kode verifikasi dikirim ke <strong>{email}</strong></span>
              </div>
              <div className="px-8 py-6">
                <h2 className="text-center text-lg font-bold mb-1" style={{ color: C.primaryDark }}>Buat Password Baru</h2>
                <p className="text-center text-sm text-gray-500 mb-5">Minimal 8 karakter, kombinasi huruf dan angka.</p>
                <form onSubmit={handleReset} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                    <div className="relative">
                      <input type={showNew ? "text" : "password"} placeholder="Minimal 8 karakter" value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)} className={inputCls} style={{ ...inputSt, paddingRight: "3rem" }} />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          {showNew ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                            : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                        </svg>
                      </button>
                    </div>
                    {newPwd && newPwd.length < 8 && <p className="text-xs text-red-600 mt-1">⚠ Minimal 8 karakter.</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                    <div className="relative">
                      <input type={showConf ? "text" : "password"} placeholder="Ulangi password baru" value={confirm}
                        onChange={(e) => setConfirm(e.target.value)} className={inputCls} style={{ ...inputSt, paddingRight: "3rem" }} />
                      <button type="button" onClick={() => setShowConf(!showConf)} className="absolute right-3 top-3 text-gray-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          {showConf ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                            : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                        </svg>
                      </button>
                    </div>
                    {confirm && confirm !== newPwd && <p className="text-xs text-red-600 mt-1">⚠ Password tidak cocok.</p>}
                  </div>
                  <button type="submit" disabled={!pwdMatch}
                    className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40"
                    style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})` }}>
                    Simpan Password Baru
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────── Leaflet Map Component ───────────────────
function LeafletMap({ center, zoom, markers, onMarkerClick }: {
  center: [number, number];
  zoom: number;
  markers: Array<{ pos: [number, number]; label: string }>;
  onMarkerClick?: (label: string) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    import("leaflet").then((module) => {
      const L = module.default || module;
      // Remove any existing map on the container (React StrictMode double-invoke)
      const container = mapRef.current as HTMLDivElement & { _leaflet_id?: number };
      if (container._leaflet_id) {
        leafletRef.current?.remove();
        leafletRef.current = null;
        container._leaflet_id = undefined;
      }
      if (leafletRef.current) return;

      const map = L.map(mapRef.current!, { center, zoom, scrollWheelZoom: false });
      leafletRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="background:#8B1A1A;width:16px;height:16px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.5)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 16],
        popupAnchor: [0, -18],
      });

      markers.forEach(({ pos, label }) => {
        const marker = L.marker(pos, { icon }).addTo(map);
        marker.bindPopup(
          `<div style="font-family:Poppins,sans-serif;font-size:12px;color:#5c1010;font-weight:600">${label}</div>`
        );
        marker.on('click', () => {
          if (onMarkerClick) onMarkerClick(label);
        });
      });
    }).catch(err => console.error("Leaflet loading error:", err));

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, [center, zoom, markers, onMarkerClick]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%", isolation: "isolate", zIndex: 1 }} />;
}

function KontakPusatPage() {
  return (
    <>
      <PageHero title="Kontak KPI Pusat" sub="Hubungi kami untuk informasi lebih lanjut" imgKey="kontak" badge="Kontak · KPI Pusat" />
      <div className="w-full px-6 py-10 space-y-5">
        {/* Map first — full Indonesia view matching KPID style (image-15) */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5", height: "420px", isolation: "isolate", position: "relative", zIndex: 0 }}>
          <LeafletMap
            center={[-2.5, 118]}
            zoom={5}
            markers={[{ pos: [-6.1740, 106.8292], label: "KPI Pusat — Jl. H. Juanda No.36, Jakarta Pusat" }]}
          />
        </div>
        {/* Info card below */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: "#f0dede", background: "#fff8f8" }}>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: C.primary }}>KPI PUSAT</span>
            <h3 className="font-bold" style={{ color: C.primaryDark }}>KPI Pusat Jakarta</h3>
          </div>
          <div className="p-6 space-y-0">
            {[
              { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, value: "Prov. DKI Jakarta" },
              { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.63 19.79 19.79 0 01.07 2.18 2 2 0 012.04 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-.78a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>, value: "(021) 3521 841 / (021) 3521 842" },
              { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, value: "humas@kpi.go.id" },
              { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, value: "Jl. H. Juanda No.36, Gambir, Jakarta Pusat 10120" },
              { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, value: "Senin–Jumat, 08:00–16:00 WIB" },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0" style={{ borderColor: "#f5e8e8" }}>
                {r.icon}
                <span className="text-sm text-gray-700">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const KPID_MARKERS: Array<{ pos: [number, number]; label: string }> = [
  { pos: [5.5483, 95.3238], label: "KPID Aceh" },
  { pos: [3.5852, 98.6722], label: "KPID Sumatera Utara" },
  { pos: [-0.9493, 100.4136], label: "KPID Sumatera Barat" },
  { pos: [0.5071, 101.4478], label: "KPID Riau" },
  { pos: [1.0736, 104.0305], label: "KPID Kepulauan Riau" },
  { pos: [-1.6101, 103.6131], label: "KPID Jambi" },
  { pos: [-3.7928, 102.2608], label: "KPID Bengkulu" },
  { pos: [-2.9909, 104.7563], label: "KPID Sumatera Selatan" },
  { pos: [-2.7411, 106.4406], label: "KPID Bangka Belitung" },
  { pos: [-5.4294, 105.2610], label: "KPID Lampung" },
  { pos: [-6.2088, 106.8456], label: "KPID DKI Jakarta" },
  { pos: [-6.4058, 106.0640], label: "KPID Banten" },
  { pos: [-6.9147, 107.6098], label: "KPID Jawa Barat" },
  { pos: [-7.1500, 110.1403], label: "KPID Jawa Tengah" },
  { pos: [-7.7956, 110.3695], label: "KPID DI Yogyakarta" },
  { pos: [-7.5361, 112.2384], label: "KPID Jawa Timur" },
  { pos: [-8.3405, 115.0919], label: "KPID Bali" },
  { pos: [-8.6529, 117.3616], label: "KPID NTB" },
  { pos: [-8.6574, 121.0794], label: "KPID NTT" },
  { pos: [-0.2787, 111.4753], label: "KPID Kalimantan Barat" },
  { pos: [-1.6814, 113.3824], label: "KPID Kalimantan Tengah" },
  { pos: [-3.0926, 115.2838], label: "KPID Kalimantan Selatan" },
  { pos: [1.6406, 116.4194], label: "KPID Kalimantan Timur" },
  { pos: [3.0731, 116.0413], label: "KPID Kalimantan Utara" },
  { pos: [1.4931, 124.8413], label: "KPID Sulawesi Utara" },
  { pos: [0.5435, 123.0568], label: "KPID Gorontalo" },
  { pos: [-1.4300, 121.4456], label: "KPID Sulawesi Tengah" },
  { pos: [-2.8441, 119.2321], label: "KPID Sulawesi Barat" },
  { pos: [-5.1477, 119.4327], label: "KPID Sulawesi Selatan" },
  { pos: [-4.1494, 122.1749], label: "KPID Sulawesi Tenggara" },
  { pos: [-3.2385, 130.1453], label: "KPID Maluku" },
  { pos: [1.5709, 127.8087], label: "KPID Maluku Utara" },
  { pos: [-4.2699, 138.0804], label: "KPID Papua" },
  { pos: [-1.3361, 133.1747], label: "KPID Papua Barat" },
];

function KontakPage({ navigate }: { navigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<"pusat" | "kpid">("pusat");
  const [fading, setFading] = useState(false);
  const [search, setSearch] = useState("");

  const switchTab = (tab: "pusat" | "kpid") => {
    if (tab === activeTab) return;
    setFading(true);
    setTimeout(() => { setActiveTab(tab); setFading(false); }, 240);
  };

  const filteredKPID = KPID_LIST.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.provinsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <PageHero title="Kontak KPI" sub="Hubungi Komisi Penyiaran Indonesia — Pusat maupun Daerah" imgKey="kontak" badge="Profil · Kontak" />
      <PageBreadcrumb title="Kontak" parents={["Profil"]} navigate={navigate} />

      <div className="w-full px-6 pb-14">
        {/* Tab switcher */}
        <div className="flex justify-center my-8">
          <div className="inline-flex p-1 rounded-2xl gap-1" style={{ background: "#f0e4e4", boxShadow: "inset 0 2px 6px rgba(139,26,26,0.10)" }}>
            {[{ id: "pusat" as const, label: "KPI Pusat" }, { id: "kpid" as const, label: "KPID Daerah" }].map((t) => {
              const active = t.id === activeTab;
              return (
                <button key={t.id} onClick={() => switchTab(t.id)}
                  className="px-8 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: active ? C.primary : "transparent",
                    color: active ? "#ffffff" : C.primaryDark,
                    boxShadow: active ? "0 4px 14px rgba(139,26,26,0.35)" : "none",
                    transform: active ? "translateY(-1px)" : "none",
                  }}>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.24s ease" }}>
          {activeTab === "pusat" ? (
            <div className="space-y-5">
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5", height: "420px", isolation: "isolate", position: "relative", zIndex: 0 }}>
                <LeafletMap center={[-2.5, 118]} zoom={5} markers={[{ pos: [-6.1740, 106.8292], label: "KPI Pusat — Jl. H. Juanda No.36, Jakarta Pusat" }]} />
              </div>
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
                <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: "#f0dede", background: "#fff8f8" }}>
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: C.primary }}>KPI PUSAT</span>
                  <h3 className="font-bold" style={{ color: C.primaryDark }}>KPI Pusat Jakarta</h3>
                </div>
                <div className="p-6">
                  {[
                    { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, value: "Prov. DKI Jakarta" },
                    { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.63 19.79 19.79 0 01.07 2.18 2 2 0 012.04 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-.78a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>, value: "(021) 3521 841 / (021) 3521 842" },
                    { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, value: "humas@kpi.go.id" },
                    { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, value: "Jl. H. Juanda No.36, Gambir, Jakarta Pusat 10120" },
                    { icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, value: "Senin–Jumat, 08:00–16:00 WIB" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0" style={{ borderColor: "#f5e8e8" }}>
                      {r.icon}
                      <span className="text-sm text-gray-700">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5", height: "420px", isolation: "isolate", position: "relative", zIndex: 0 }}>
                <LeafletMap center={[-2.5, 118]} zoom={5} markers={KPID_MARKERS} />
              </div>
              <div>
                <input type="text" placeholder="Cari KPID atau provinsi..." value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-sm border rounded-md px-4 py-2.5 text-sm focus:outline-none mb-6"
                  style={{ borderColor: "#e0c8c8" }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredKPID.map((kpid) => (
                    <div key={kpid.name} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
                      <div className="px-5 pt-5 pb-4">
                        <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold text-white mb-3" style={{ background: C.primary }}>KPID</span>
                        <h3 className="font-bold text-base mb-4 border-b pb-3" style={{ color: C.primaryDark, borderColor: "#f0dede" }}>
                          KPI Daerah {kpid.provinsi.replace("Prov. ", "")}
                        </h3>
                        <div className="space-y-2.5">
                          {[
                            { icon: <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, val: kpid.provinsi },
                            { icon: <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.63 19.79 19.79 0 01.07 2.18 2 2 0 012.04 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-.78a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>, val: kpid.telepon },
                            { icon: <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, val: kpid.email },
                            { icon: <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, val: kpid.alamat },
                          ].map((r, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                              {r.icon}
                              <span className="break-words">{r.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredKPID.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-3">🔍</div>
                    <p>KPID "{search}" tidak ditemukan</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KontakKPIDPage() {
  const [search, setSearch] = useState("");
  const filtered = KPID_LIST.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.provinsi.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <PageHero title="Komisi Penyiaran Indonesia Daerah" sub="Daftar KPID seluruh Indonesia" imgKey="kontak" badge="Kontak · KPID" />
      <div className="w-full px-6 py-10 space-y-8">
        {/* Peta interaktif KPID */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5", height: "420px", position: "relative", zIndex: 1 }}>
          <LeafletMap center={[-2.5, 118]} zoom={5} markers={KPID_MARKERS} onMarkerClick={(label) => {
            setSearch(label.replace("KPID ", ""));
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }} />
        </div>

        <div>
          <input type="text" placeholder="Cari KPID atau provinsi..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm border rounded-md px-4 py-2.5 text-sm focus:outline-none mb-6"
            style={{ borderColor: "#e0c8c8" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((kpid) => (
              <div key={kpid.name} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
                <div className="px-5 pt-5 pb-4">
                  <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold text-white mb-3" style={{ background: C.primary }}>KPID</span>
                  <h3 className="font-bold text-base mb-4 border-b pb-3" style={{ color: C.primaryDark, borderColor: "#f0dede" }}>
                    KPI Daerah {kpid.provinsi.replace("Prov. ", "")}
                  </h3>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span>{kpid.provinsi}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.63 19.79 19.79 0 01.07 2.18 2 2 0 012.04 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-.78a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                      <span>{kpid.telepon}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <span className="break-all">{kpid.email}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={C.primary} strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                      <span>{kpid.alamat}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🔍</div>
              <p>KPID "{search}" tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function BantuanPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [votes, setVotes] = useState<Record<number, "up" | "down">>({});

  const vote = (idx: number, dir: "up" | "down") => {
    setVotes((v) => ({ ...v, [idx]: v[idx] === dir ? undefined as unknown as "up" | "down" : dir }));
  };

  const faqs = [
    {
      q: "Siapa yang bisa mengajukan pengaduan melalui SARAN?",
      a: "Setiap warga negara Indonesia yang berusia minimal 17 tahun dapat mengajukan pengaduan konten siaran TV dan radio melalui SARAN. Anda perlu mendaftar akun terlebih dahulu sebelum mengirimkan pengaduan.",
    },
    {
      q: "Apa perbedaan melapor ke KPI Pusat vs KPID daerah?",
      a: "KPI Pusat menangani pengaduan terhadap lembaga penyiaran berjaringan nasional (RCTI, Trans TV, SCTV, dll.) dan radio nasional. KPID (Komisi Penyiaran Indonesia Daerah) menangani lembaga penyiaran lokal di provinsi masing-masing. Jika ragu, lapor ke KPI Pusat — kami akan teruskan ke KPID yang berwenang.",
    },
    {
      q: "Apa itu P3SPS dan mengapa penting?",
      a: "P3SPS adalah Pedoman Perilaku Penyiaran dan Standar Program Siaran — aturan yang wajib dipatuhi oleh semua lembaga penyiaran di Indonesia. P3SPS mengatur batasan konten, perlindungan anak, iklan, dan standar kualitas siaran. Pengaduan yang valid harus menunjukkan dugaan pelanggaran terhadap P3SPS.",
    },
    {
      q: "Apa saja kategori 'Dugaan Pelanggaran' dalam formulir pengaduan?",
      a: "Pilihan dugaan pelanggaran: (1) Konten kekerasan — adegan fisik, sadisme; (2) Konten seksual — eksplisit/implisit tidak sesuai jam tayang; (3) Konten SARA — menyinggung suku, agama, ras, antargolongan; (4) Perlindungan anak — konten berbahaya bagi penonton di bawah umur; (5) Iklan tidak layak — menyesatkan atau melanggar aturan iklan; (6) Konten berbahaya lainnya — tidak masuk kategori di atas tapi jelas melanggar P3SPS.",
    },
    {
      q: "Berapa lama pengaduan saya diproses?",
      a: "KPI berkomitmen merespons dalam 7 hari kerja sejak pengaduan diterima. Proses lengkap (verifikasi → kajian → keputusan) dapat memakan waktu hingga 30 hari kerja tergantung kompleksitas kasus. Anda bisa memantau statusnya melalui fitur 'Lacak Aduan' di tab Pengaduan Saya.",
    },
    {
      q: "Apakah identitas saya akan dirahasiakan?",
      a: "Ya. KPI berkomitmen menjaga kerahasiaan identitas pelapor sesuai UU Perlindungan Data Pribadi. Data Anda tidak akan dibagikan ke lembaga penyiaran yang diadukan maupun pihak lain tanpa persetujuan Anda, kecuali diminta oleh instansi hukum yang berwenang.",
    },
    {
      q: "Bukti apa yang sebaiknya saya sertakan?",
      a: "Sertakan tangkapan layar (screenshot) atau rekaman video segmen yang Anda laporkan. Pastikan metadata (tanggal, jam, nama program) terlihat jika memungkinkan. Bukti yang kuat akan mempercepat proses verifikasi. Ukuran file maksimal 10 MB per file, maksimal 5 file.",
    },
    {
      q: "Pengaduan saya ditolak. Apa yang harus dilakukan?",
      a: "Pengaduan dapat ditolak jika bukti tidak cukup atau konten tidak melanggar P3SPS. Anda dapat mengajukan ulang dengan melengkapi bukti yang lebih kuat, atau menghubungi KPI Pusat di (021) 3521 637 untuk klarifikasi lebih lanjut.",
    },
  ];

  return (
    <>
      <PageHero title="Bantuan & FAQ" sub="Temukan jawaban atas pertanyaan umum seputar pengaduan penyiaran" imgKey="ketentuan" badge="Bantuan · SARAN" />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "#e8d5d5" }}>
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left flex items-start justify-between gap-4 p-5 font-semibold text-gray-800 hover:bg-red-50/30 transition-colors">
                <span className="leading-snug">{faq.q}</span>
                <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform ${openIdx === idx ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.primary }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t" style={{ borderColor: "#f5e8e8" }}>
                  <p className="pt-4 mb-4">{faq.a}</p>
                  {/* Thumbs feedback */}
                  <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: "#f5e8e8" }}>
                    <span className="text-xs text-gray-400">Apakah jawaban ini membantu?</span>
                    <button
                      onClick={() => vote(idx, "up")}
                      title="Ya, membantu"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: votes[idx] === "up" ? "#dcfce7" : "#f5f5f5",
                        color: votes[idx] === "up" ? "#16a34a" : "#6b7280",
                        border: `1.5px solid ${votes[idx] === "up" ? "#86efac" : "#e5e7eb"}`,
                      }}
                    >
                      <svg className="w-4 h-4" fill={votes[idx] === "up" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                      </svg>
                      <span>Ya</span>
                    </button>
                    <button
                      onClick={() => vote(idx, "down")}
                      title="Tidak membantu"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: votes[idx] === "down" ? "#fff1f1" : "#f5f5f5",
                        color: votes[idx] === "down" ? C.primary : "#6b7280",
                        border: `1.5px solid ${votes[idx] === "down" ? "#fca5a5" : "#e5e7eb"}`,
                      }}
                    >
                      <svg className="w-4 h-4" fill={votes[idx] === "down" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/>
                      </svg>
                      <span>Belum</span>
                    </button>
                    {votes[idx] && (
                      <span className="text-xs ml-1" style={{ color: votes[idx] === "up" ? "#16a34a" : C.primary }}>
                        {votes[idx] === "up" ? "✓ Terima kasih!" : "✗ Kami akan tingkatkan"}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Butuh Bantuan Lainnya? */}
        <div className="mt-10 rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: "var(--color-border)" }}>
          <div className="px-6 py-5 border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: C.primary }}>Butuh Bantuan Lainnya?</p>
            <p className="text-sm text-gray-600">Hubungi kami melalui saluran resmi KPI Pusat di bawah ini.</p>
          </div>
          <div className="bg-white p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.63 19.79 19.79 0 01.07 2.18 2 2 0 012.04 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-.78a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                ),
                label: "Telepon",
                value: "(021) 3521 637",
                sub: "Senin–Jumat, 08.00–16.00 WIB",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: "Email",
                value: "humas@kpi.go.id",
                sub: "Respons dalam 1–2 hari kerja",
              },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-muted)" }}>
                <div className="mt-0.5 flex-shrink-0 p-2 rounded-lg" style={{ backgroundColor: "var(--color-border)", color: C.primary }}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{c.label}</p>
                  <p className="font-semibold text-sm" style={{ color: C.primaryDark }}>{c.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

type UserProfile = { nama: string; email: string; telepon: string; pekerjaan: string };
type MySubmission = {
  id: string; tanggal: string; stasiun: string; program: string;
  status: string; statusColor: string; pasal: string; deskripsi: string;
  timeline: Array<{ tgl: string; aksi: string; done: boolean }>;
};

// ── Toast notification system ─────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: "success" | "error" | "info" }[]>([]);
  const show = (msg: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };
  const ToastContainer = () => (
    <div className="fixed top-20 right-4 z-[500] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium text-white pointer-events-auto"
          style={{
            background: t.type === "success" ? "#22c55e" : t.type === "error" ? "#ef4444" : "#3b82f6",
            animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            minWidth: 240,
          }}>
          {t.type === "success" && <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
          {t.type === "error" && <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
          {t.type === "info" && <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01"/><circle cx="12" cy="12" r="10"/></svg>}
          {t.msg}
        </div>
      ))}
    </div>
  );
  return { show, ToastContainer };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("beranda");
  const [darkMode, setDarkMode] = useState(false);
  const { show: showToast, ToastContainer } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try { return sessionStorage.getItem("saran_user"); } catch { return null; }
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const raw = sessionStorage.getItem("saran_profile");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [mySubmissions, setMySubmissions] = useState<MySubmission[]>(() => {
    try {
      const raw = sessionStorage.getItem("saran_submissions");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [prefillTrackId, setPrefillTrackId] = useState<string>("");
  const [pageKey, setPageKey] = useState(0);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setPageKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = (email: string) => {
    setCurrentUser(email);
    try {
      sessionStorage.setItem("saran_user", email);
      const pending = sessionStorage.getItem("saran_pending_profile");
      if (pending) {
        const profile: UserProfile = JSON.parse(pending);
        setUserProfile(profile);
        sessionStorage.setItem("saran_profile", pending);
        sessionStorage.removeItem("saran_pending_profile");
      }
    } catch { /* ignore */ }
    showToast("Selamat datang! Anda berhasil masuk.", "success");
  };

  const logout = () => {
    setCurrentUser(null);
    setUserProfile(null);
    try { sessionStorage.removeItem("saran_user"); sessionStorage.removeItem("saran_profile"); } catch { /* ignore */ }
    showToast("Anda telah keluar dari akun.", "info");
  };

  const addSubmission = (sub: MySubmission) => {
    setMySubmissions((prev) => {
      const next = [sub, ...prev];
      try { sessionStorage.setItem("saran_submissions", JSON.stringify(next)); } catch {}
      return next;
    });
    showToast("Pengaduan berhasil dikirim!", "success");
  };

  const navigateToLacak = (tiket: string) => {
    setPrefillTrackId(tiket);
    navigate("pengaduan-saya");
  };

  const registerUser = (profile: UserProfile) => {
    try {
      sessionStorage.setItem("saran_pending_profile", JSON.stringify(profile));
    } catch { /* ignore */ }
  };

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    try { sessionStorage.setItem("saran_profile", JSON.stringify(profile)); } catch { /* ignore */ }
    showToast("Profil berhasil disimpan.", "success");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "beranda":        return <BerandaPage navigate={navigate} currentUser={currentUser} />;
      case "profil":         return <ProfilPage />;
      case "profil-saya":    return <ProfilSayaPage currentUser={currentUser} userProfile={userProfile} updateProfile={updateProfile} navigate={navigate} />;
      case "lupa-password":  return <LupaPasswordPage navigate={navigate} />;
      case "ubah-password":  return <UbahPasswordPage navigate={navigate} />;
      case "visi-misi":      return <VisiMisiPage navigate={navigate} />;
      case "maklumat":       return <MaklumatPage navigate={navigate} />;
      case "jadwal":         return <JadwalPage navigate={navigate} />;
      case "formulir":       return <FormulirPage currentUser={currentUser} userProfile={userProfile} navigate={navigate} addSubmission={addSubmission} navigateToLacak={navigateToLacak} />;
      case "pengaduan-saya": return <PengaduanSayaPage mySubmissions={mySubmissions} prefillTrackId={prefillTrackId} clearPrefill={() => setPrefillTrackId("")} />;
      case "berita":         return <BeritaPage navigate={navigate} />;
      case "data":           return <DataPage navigate={navigate} />;
      case "unduh":          return <UnduhDataPage navigate={navigate} />;
      case "ketentuan":      return <KetentuanPage navigate={navigate} />;
      case "kontak":         return <KontakPage navigate={navigate} />;
      case "kontak-pusat":   return <KontakPusatPage />;
      case "kontak-kpid":    return <KontakKPIDPage />;
      case "masuk":          return <MasukPage navigate={navigate} login={login} />;
      case "daftar":         return <DaftarPage navigate={navigate} registerUser={registerUser} />;
      case "bantuan":        return <BantuanPage />;
      default:               return <BerandaPage navigate={navigate} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
      <TopBar navigate={navigate} darkMode={darkMode} toggleDark={() => setDarkMode((d) => !d)} />
      <Navbar currentPage={currentPage} navigate={navigate} currentUser={currentUser} logout={logout} />
      <main className="flex-1">
        <div key={pageKey} style={{ animation: "pageEnter 0.25s ease forwards" }}>
          {renderPage()}
        </div>
      </main>
      <Footer navigate={navigate} currentUser={currentUser} />

      <ToastContainer />

      {/* WhatsApp FAB */}
      <a href="https://wa.me/6221000000" target="_blank" rel="noopener noreferrer"
        title="Chat WhatsApp KPI"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ background: "#25D366" }}>
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.528 5.855L.057 23.5a.5.5 0 00.613.61l5.788-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.893 9.893 0 01-5.033-1.375l-.36-.214-3.735.979.997-3.648-.235-.375A9.865 9.865 0 012.1 12C2.1 6.534 6.534 2.1 12 2.1S21.9 6.534 21.9 12 17.466 21.9 12 21.9z"/>
        </svg>
      </a>
    </div>
  );
}
