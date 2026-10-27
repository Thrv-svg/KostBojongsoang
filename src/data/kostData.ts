export interface KostProperty {
  id: string;
  name: string;
  tagline: string;
  category: 'putra' | 'putri' | 'campur';
  area: string;
  address: string;
  distanceToTelkom: string;
  distanceMeters: number;
  monthlyPrice: number;
  roomSize: string;
  roomAvailable: number;
  totalRooms: number;
  rating: number;
  reviewCount: number;
  includedUtilities: string[];
  electricityPolicy: string;
  features: string[];
  mainImage: string;
  galleryImages: string[];
  whatsappNumber: string;
  rules: string[];
  description: string;
  hasAC: boolean;
  hasPrivateBathroom: boolean;
  hasWaterHeater: boolean;
  hasWiFi: boolean;
  hasParking: boolean;
  kitchenFacility: string; // Detail fasilitas dapur bersama & perlengkapannya
  gasPolicy: string; // Ketentuan gas kompor (contoh: kompor disediakan tapi gas beli sendiri / gas sudah termasuk)
  mapCoords: { x: number; y: number }; // Relative percentage on campus interactive map
  position: { lat: number; lng: number }; // Real GPS coordinates for Google Maps
  drawbacks: string[]; // Limitations / Catatan Kekurangan
}

export interface CampusPOI {
  id: string;
  name: string;
  category: 'gate' | 'academic' | 'facility' | 'food' | 'market';
  distance: string;
  description: string;
  x: number;
  y: number;
  position: { lat: number; lng: number }; // Real GPS coordinates for Google Maps
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  kostName: string;
  stayDuration: string;
  quote: string;
  major: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'booking' | 'aturan' | 'biaya' | 'lokasi';
}

export const KOST_LISTINGS: KostProperty[] = [
  {
    id: 'kost-graha-asri-sukabirus',
    name: 'Kost Graha Asri Sukabirus',
    tagline: 'Kost Putri Tenang 3 Menit Jalan Kaki ke Gerbang 1 Sukabirus',
    category: 'putri',
    area: 'Jl. Sukabirus, Bojongsoang',
    address: 'Jl. Sukabirus No. 42B, Desa Citeureup, Kec. Dayeuhkolot / Bojongsoang, Bandung',
    distanceToTelkom: '3 menit jalan kaki (250m ke Gerbang 1)',
    distanceMeters: 250,
    monthlyPrice: 1150000,
    roomSize: '3 × 4 m',
    roomAvailable: 2,
    totalRooms: 18,
    rating: 4.9,
    reviewCount: 34,
    includedUtilities: ['Wi-Fi Fiber 150 Mbps', 'Air Bersih PDAM & Filter', 'Iuran Kebersihan & Keamanan'],
    electricityPolicy: 'Token listrik mandiri per kamar (lebih hemat dan adil)',
    features: ['Kasur Springbed 120x200', 'Kamar Mandi Dalam', 'Meja Belajar & Kursi Ergonomis', 'Lemari Pakaian 2 Pintu', 'Dapur Bersama Lengkap', 'Kulkas & Dispenser Bersama', 'Parkir Motor Kanopi', 'CCTV 24 Jam & Pintu Akses'],
    mainImage: '/src/assets/images/kost_room_modern_1792854715841.jpg',
    galleryImages: [
      '/src/assets/images/kost_room_modern_1792854715841.jpg',
      '/src/assets/images/hero_kost_bojongsoang_1792854715076.jpg',
      '/src/assets/images/kost_shared_kitchen_1792854716762.jpg',
    ],
    whatsappNumber: '6281223456781',
    rules: [
      'Jam malam gerbang pukul 23:00 WIB (penghuni memiliki akses kunci/card sendiri jika ada kegiatan lab)',
      'Tamu lawan jenis dilarang masuk ke dalam kamar tidur',
      'Ruang tamu bersama tersedia di lantai 1 untuk belajar kelompok',
      'Dilarang merokok dan membawa hewan peliharaan',
      'Wajib menjaga ketenangan setelah pukul 22:00 WIB'
    ],
    description: 'Hunian nyaman khusus mahasiswi Telkom University. Terletak strategis di Sukabirus dalam lingkungan aman dan tidak bising. Sangat dekat ke kantin, laundry kiloan, fotokopi, dan minimarket 24 jam.',
    hasAC: false,
    hasPrivateBathroom: true,
    hasWaterHeater: false,
    hasWiFi: true,
    hasParking: true,
    kitchenFacility: 'Dapur bersama di lantai 1 (kompor gas 2 tungku, sink wastafel cuci piring, kulkas bersama, dispenser galon)',
    gasPolicy: 'Kompor disediakan & gas sudah termasuk biaya sewa (diisi rutin oleh pengelola)',
    mapCoords: { x: 38, y: 46 },
    position: { lat: -6.9708, lng: 107.6285 },
    drawbacks: [
      'Water heater: Tidak ada',
      'Tidak ada AC (ventilasi alami & kipas angin)',
      'Dapur gabungan di lantai dasar',
      'Token listrik beli sendiri per kamar',
      'Khusus parkir motor (tidak muat mobil)'
    ],
  },
  {
    id: 'kost-wisma-telkom-pga',
    name: 'Wisma Telkom PGA Residence',
    tagline: 'Kost Putra Modern Dekat Gerbang 2 PGA & Gedung TULT',
    category: 'putra',
    area: 'Jl. Radio PGA, Bojongsoang',
    address: 'Jl. Radio PGA No. 18, Bojongsoang, Kab. Bandung',
    distanceToTelkom: '4 menit jalan kaki (300m ke Gerbang PGA)',
    distanceMeters: 300,
    monthlyPrice: 1350000,
    roomSize: '3.5 × 4 m',
    roomAvailable: 3,
    totalRooms: 24,
    rating: 4.8,
    reviewCount: 42,
    includedUtilities: ['Wi-Fi Kecepatan Tinggi Dedicated', 'Air Bersih Non-Stop', 'Biaya Sampah', 'Air Minum Galon RO'],
    electricityPolicy: 'Termasuk listrik dasar (lampu, laptop, kipas; alat pemanas tambahan kena biaya opsional)',
    features: ['Kasur Springbed', 'Kamar Mandi Dalam', 'Kloset Duduk & Shower', 'Meja Komputer Luas', 'Lemari Minimalis', 'Dapur Bersama', 'Parkir Motor Luas Berpagar', 'Penjaga Kost Siaga 24 Jam'],
    mainImage: '/src/assets/images/hero_kost_bojongsoang_1792854715076.jpg',
    galleryImages: [
      '/src/assets/images/hero_kost_bojongsoang_1792854715076.jpg',
      '/src/assets/images/kost_room_modern_1792854715841.jpg',
      '/src/assets/images/kost_shared_kitchen_1792854716762.jpg',
    ],
    whatsappNumber: '6281398765432',
    rules: [
      'Akses gerbang 24 jam dengan fingerprint scanner',
      'Tamu diperbolehkan di area lobi/ruang bersama hingga 22:00 WIB',
      'Dilarang membawa minuman keras atau barang terlarang',
      'Setiap penghuni bertanggung jawab atas kebersihan wastafel dapur setelah memasak'
    ],
    description: 'Pilihan favorit mahasiswa teknik dan informatika Telkom University karena akses langsung ke Gerbang PGA dan gedung kuliah bersama TULT. Internet super cepat dan parkir motor aman.',
    hasAC: false,
    hasPrivateBathroom: true,
    hasWaterHeater: false,
    hasWiFi: true,
    hasParking: true,
    kitchenFacility: 'Dapur bersama luas di area belakang (kompor gas 2 tungku, wastafel cuci piring, rak piring bersama)',
    gasPolicy: 'Kompor disediakan, tapi tabung gas beli sendiri (sistem patungan/bergantian antar penghuni lorong)',
    mapCoords: { x: 58, y: 52 },
    position: { lat: -6.9755, lng: 107.6332 },
    drawbacks: [
      'Water heater: Tidak ada',
      'Tidak ada AC (hanya kipas angin)',
      'Dapur gabungan (kompor disediakan, gas beli sendiri/patungan)',
      'Akses jalan radio agak padat saat jam sibuk kuliah'
    ],
  },
  {
    id: 'kost-dloft-executive-studio',
    name: "D'Loft Executive Studio Bojongsoang",
    tagline: 'Kost Eksklusif AC & Water Heater dengan Balkon Menghadap Perbukitan',
    category: 'campur',
    area: 'Jl. Raya Bojongsoang No. 112',
    address: 'Jl. Raya Bojongsoang No. 112, Bojongsoang, Kab. Bandung (Dekat SPBU & Borma)',
    distanceToTelkom: '5 menit berkendara (900m ke Telkom University)',
    distanceMeters: 900,
    monthlyPrice: 2200000,
    roomSize: '4 × 5 m',
    roomAvailable: 1,
    totalRooms: 12,
    rating: 5.0,
    reviewCount: 29,
    includedUtilities: ['Wi-Fi Dedicated 200 Mbps', 'Air Bersih & Water Heater', 'Maintenance AC Berkala', 'Cleaning Service Area Bersama'],
    electricityPolicy: 'Listrik token mandiri per kamar',
    features: ['Air Conditioner Daikin 1/2 PK', 'Water Heater Ariston', 'Kamar Mandi Dalam Mewah', 'Kasur Queen Size 160x200', 'Balkon Pribadi', 'Smart TV 32 Inch', 'Parkir Mobil & Motor Luas', 'Smart Door Lock Digital'],
    mainImage: '/src/assets/images/kost_room_deluxe_1792854716917.jpg',
    galleryImages: [
      '/src/assets/images/kost_room_deluxe_1792854716917.jpg',
      '/src/assets/images/kost_shared_kitchen_1792854716762.jpg',
      '/src/assets/images/hero_kost_bojongsoang_1792854715076.jpg'
    ],
    whatsappNumber: '6281122334455',
    rules: [
      'Gedung terbagi wing putra & wing putri',
      'Dilarang mengadakan pesta atau suara musik keras',
      'Deposit sewa 1 bulan di awal (dikembalikan penuh saat checkout jika kondisi kamar baik)',
      'Bebas jam pulang dengan smart door lock RFID'
    ],
    description: 'Hunian premium bergaya apartemen mini untuk mahasiswa tingkat akhir, dosen muda, maupun profesional. Fasilitas lengkap AC, smart lock, water heater, dan parkir mobil terlindung kanopi.',
    hasAC: true,
    hasPrivateBathroom: true,
    hasWaterHeater: true,
    hasWiFi: true,
    hasParking: true,
    kitchenFacility: 'Pantry mini komunal di setiap lorong (microwave, kettle elektrik, wastafel cuci piring, kulkas bersama)',
    gasPolicy: 'Tanpa kompor gas api (area bebas asap api komersial, masak menggunakan microwave & pemanas elektrik)',
    mapCoords: { x: 74, y: 35 },
    position: { lat: -6.9782, lng: 107.6360 },
    drawbacks: [
      'Harga sewa relatif lebih tinggi',
      'Jarak 900m ke kampus (perlu motor/ojol)',
      'Hanya pantry mini tanpa kompor gas (tidak bisa masak berat)',
      'Wajib deposit 1 bulan di awal'
    ],
  },
  {
    id: 'kost-ciganitri-residence',
    name: 'Kost Puri Ciganitri Asri',
    tagline: 'Kost Putri Nyaman, Dapur Bersama Estetik, Dekat Alfamart & Laundry',
    category: 'putri',
    area: 'Jl. Ciganitri Tengah, Bojongsoang',
    address: 'Jl. Terusan Ciganitri No. 8, Bojongsoang, Kab. Bandung',
    distanceToTelkom: '6 menit ke Kampus (750m)',
    distanceMeters: 750,
    monthlyPrice: 1450000,
    roomSize: '3.5 × 4 m',
    roomAvailable: 4,
    totalRooms: 16,
    rating: 4.8,
    reviewCount: 19,
    includedUtilities: ['Wi-Fi 100 Mbps', 'Air Minum Galon Gratis', 'Iuran Sampah & Kebersihan Lorong'],
    electricityPolicy: 'Token listrik mandiri per kamar',
    features: ['AC (Pilihan Varian)', 'Kamar Mandi Dalam', 'Kloset Duduk & Jet Shower', 'Dapur Bersama Modern Lengkap', 'Rooftop Jemuran Luas', 'Ruang Tamu & Belajar Bersama', 'Parkir Motor Tertutup', 'Akses Gerbang Kartu'],
    mainImage: '/src/assets/images/kost_shared_kitchen_1792854716762.jpg',
    galleryImages: [
      '/src/assets/images/kost_shared_kitchen_1792854716762.jpg',
      '/src/assets/images/kost_room_modern_1792854715841.jpg',
      '/src/assets/images/hero_kost_bojongsoang_1792854715076.jpg'
    ],
    whatsappNumber: '6285223344556',
    rules: [
      'Khusus mahasiswi / karyawati muslimah / umum',
      'Gerbang dikunci pukul 23:00 WIB untuk keamanan bersama',
      'Tamu pria hanya diperkenankan di teras / gazebo depan',
      'Kebersihan dapur dan kompor wajib dijaga setelah digunakan'
    ],
    description: 'Suasana tenang dengan pencahayaan alami melimpah. Dapur bersama estetik dilengkapi kompor tanam, microwave, kulkas 2 pintu, dan meja makan panjang untuk diskusi tugas kelompok.',
    hasAC: true,
    hasPrivateBathroom: true,
    hasWaterHeater: false,
    hasWiFi: true,
    hasParking: true,
    kitchenFacility: 'Dapur bersama modern estetik (kompor tanam 2 tungku, kulkas 2 pintu, microwave, sink wastafel, meja makan)',
    gasPolicy: 'Kompor disediakan & gas sudah termasuk biaya sewa (penggantian gas rutin oleh pengurus kost)',
    mapCoords: { x: 62, y: 22 },
    position: { lat: -6.9680, lng: 107.6385 },
    drawbacks: [
      'Water heater: Tidak ada di tipe kamar standar',
      'Dapur gabungan di area bersama',
      'Token listrik beli sendiri per kamar',
      'Jalan Ciganitri cenderung padat saat sore hari'
    ],
  },
  {
    id: 'kost-griya-sukapura-hemat',
    name: 'Kost Griya Sukapura Mandiri',
    tagline: 'Pilihan Ekonomis Mahasiswa dengan Fasilitas Lengkap & Suasana Ramah',
    category: 'putra',
    area: 'Jl. Sukapura Gg. Melati, Bojongsoang',
    address: 'Jl. Sukapura No. 15, Kec. Dayeuhkolot / Bojongsoang, Kab. Bandung',
    distanceToTelkom: '5 menit jalan kaki (450m ke Gerbang Sukapura)',
    distanceMeters: 450,
    monthlyPrice: 850000,
    roomSize: '3 × 3 m',
    roomAvailable: 2,
    totalRooms: 14,
    rating: 4.7,
    reviewCount: 31,
    includedUtilities: ['Wi-Fi 75 Mbps', 'Air Bersih Sumur Bor Jernih', 'Sudah Termasuk Listrik Standar'],
    electricityPolicy: 'Sudah termasuk biaya listrik bulanan (bebas biaya tambahan)',
    features: ['Kasur Busa Tebal & Bantal', 'Kamar Mandi Bersama Bersih (1:2)', 'Meja & Lemari Kayu', 'Dapur Bersama Sederhana', 'Parkir Motor Aman di Dalam Pagar', 'Ruang Santai TV'],
    mainImage: '/src/assets/images/hero_kost_bojongsoang_1792854715076.jpg',
    galleryImages: [
      '/src/assets/images/hero_kost_bojongsoang_1792854715076.jpg',
      '/src/assets/images/kost_room_modern_1792854715841.jpg'
    ],
    whatsappNumber: '6282112233990',
    rules: [
      'Pintu pagar terkunci 24 jam (masing-masing penghuni pegang kunci)',
      'Ibu kost tinggal di samping bangunan untuk pengawasan ramah',
      'Hemat listrik dan pastikan air keran tertutup rapat'
    ],
    description: 'Solusi hemat bagi mahasiswa yang ingin fokus belajar tanpa membebani orang tua. Biaya sudah all-in termasuk listrik dan air, dekat dengan puluhan warung makan murah khas Sukapura.',
    hasAC: false,
    hasPrivateBathroom: false,
    hasWaterHeater: false,
    hasWiFi: true,
    hasParking: true,
    kitchenFacility: 'Dapur bersama sederhana di samping bangunan (kompor gas 1 tungku, wastafel cuci piring)',
    gasPolicy: 'Kompor disediakan, tapi tabung gas beli sendiri masing-masing atau pakai kompor portable',
    mapCoords: { x: 28, y: 35 },
    position: { lat: -6.9692, lng: 107.6340 },
    drawbacks: [
      'Kamar mandi / WC di luar (WC gabungan bersih)',
      'Water heater: Tidak ada',
      'Tidak ada AC (hanya jendela ventilasi)',
      'Dapur bersama sederhana (kompor ada tapi gas beli sendiri)',
      'Tidak ada parkir mobil (khusus motor)'
    ],
  },
  {
    id: 'kost-sukabirus-deluxe-vip',
    name: 'Wisma Permata Sukabirus VIP',
    tagline: 'Kamar Luas AC, KM Dalam, Water Heater & Balkon Pribadi',
    category: 'campur',
    area: 'Jl. Sukabirus Utama, Bojongsoang',
    address: 'Jl. Sukabirus No. 88, Bojongsoang, Kab. Bandung',
    distanceToTelkom: '4 menit jalan kaki (350m ke Gerbang 1)',
    distanceMeters: 350,
    monthlyPrice: 1850000,
    roomSize: '4 × 4.5 m',
    roomAvailable: 1,
    totalRooms: 20,
    rating: 4.9,
    reviewCount: 27,
    includedUtilities: ['Wi-Fi Fiber 150 Mbps Mesh', 'Air Minum Galon', 'Kebersihan Koridor'],
    electricityPolicy: 'Token listrik per kamar',
    features: ['AC Dingin 1 PK', 'Kamar Mandi Dalam & Water Heater', 'Springbed King Size', 'Meja Belajar Kayu Solid', 'Balkon Pribadi Hadap Luar', 'Parkir Motor & Mobil', 'CCTV 16 Titik'],
    mainImage: '/src/assets/images/kost_room_deluxe_1792854716917.jpg',
    galleryImages: [
      '/src/assets/images/kost_room_deluxe_1792854716917.jpg',
      '/src/assets/images/kost_room_modern_1792854715841.jpg',
      '/src/assets/images/kost_shared_kitchen_1792854716762.jpg'
    ],
    whatsappNumber: '6287711223344',
    rules: [
      'Gedung blok putra dan putri terpisah tangga',
      'Tamu lawan jenis berkunjung hanya di ruang komunal lantai dasar',
      'Gerbang sidik jari 24 jam'
    ],
    description: 'Kamar luas dengan perabotan kayu solid berkualitas. Menawarkan kenyamanan maksimal untuk belajar dan istirahat dengan fasilitas setara hotel budget.',
    hasAC: true,
    hasPrivateBathroom: true,
    hasWaterHeater: true,
    hasWiFi: true,
    hasParking: true,
    kitchenFacility: 'Dapur bersama premium di lantai 1 & 2 (kompor gas 2 tungku, kitchen set, exhaust hood, kulkas bersama, dispenser air RO)',
    gasPolicy: 'Kompor disediakan & gas sudah termasuk biaya sewa (pengisian tabung gas ditanggung penuh pengelola)',
    mapCoords: { x: 42, y: 60 },
    position: { lat: -6.9722, lng: 107.6280 },
    drawbacks: [
      'Token listrik beli sendiri per kamar (AC intensif menambah biaya listrik)',
      'Dapur gabungan di ruang komunal',
      'Slot parkir mobil terbatas (maksimal 2 mobil)'
    ],
  }
];

export const CAMPUS_POIS: CampusPOI[] = [
  {
    id: 'poi-telkom-rektorat',
    name: 'Gedung Rektorat & Landmark Telkom University',
    category: 'academic',
    distance: 'Pusat Kampus',
    description: 'Pusat administrasi, rektorat, dan taman terbuka Telkom University',
    x: 50,
    y: 50,
    position: { lat: -6.9731, lng: 107.6303 }
  },
  {
    id: 'poi-gate-sukabirus',
    name: 'Gerbang 1 Sukabirus (Tel-U)',
    category: 'gate',
    distance: '250m - 400m dari deretan kost',
    description: 'Akses pejalan kaki & motor terpopuler mahasiswa, ramai kuliner & fotokopi',
    x: 40,
    y: 45,
    position: { lat: -6.9715, lng: 107.6292 }
  },
  {
    id: 'poi-gate-pga',
    name: 'Gerbang 2 PGA (Tel-U)',
    category: 'gate',
    distance: '300m - 500m dari area PGA',
    description: 'Akses langsung menuju Gedung Kuliah Bersama TULT & Fakultas Teknik Elektro',
    x: 56,
    y: 54,
    position: { lat: -6.9748, lng: 107.6325 }
  },
  {
    id: 'poi-gate-sukapura',
    name: 'Gerbang 3 Sukapura (Tel-U)',
    category: 'gate',
    distance: '450m dari kost Sukapura',
    description: 'Akses dekat asrama mahasiswa baru dan fakultas ilmu terapan',
    x: 32,
    y: 38,
    position: { lat: -6.9698, lng: 107.6335 }
  },
  {
    id: 'poi-tult-building',
    name: 'Gedung Kuliah Bersama (TULT)',
    category: 'academic',
    distance: 'Di dalam kampus',
    description: 'Gedung perkuliahan tertinggi kampus Tel-U dengan ruang kelas modern',
    x: 53,
    y: 47,
    position: { lat: -6.9740, lng: 107.6315 }
  },
  {
    id: 'poi-open-library',
    name: 'Open Library Telkom University',
    category: 'academic',
    distance: 'Di dalam kampus',
    description: 'Perpustakaan megah ramah mahasiswa dengan spot belajar santai',
    x: 47,
    y: 52,
    position: { lat: -6.9725, lng: 107.6318 }
  },
  {
    id: 'poi-indomaret-sukabirus',
    name: 'Indomaret & ATM Center Sukabirus',
    category: 'market',
    distance: '150m di jalan utama',
    description: 'Buka 24 jam, tarik tunai BCA/Mandiri/BRI dan belanja kebutuhan harian',
    x: 36,
    y: 42,
    position: { lat: -6.9710, lng: 107.6288 }
  },
  {
    id: 'poi-telkomedika',
    name: 'Klinik Utama TelkoMedika',
    category: 'facility',
    distance: '400m dari kampus',
    description: 'Fasilitas kesehatan resmi mahasiswa & umum di Jalan Radio PGA',
    x: 60,
    y: 58,
    position: { lat: -6.9760, lng: 107.6338 }
  },
  {
    id: 'poi-borma-bojongsoang',
    name: 'Borma Toserba Bojongsoang',
    category: 'market',
    distance: '1.2 km di Jl. Raya Bojongsoang',
    description: 'Pusat belanja supermarket lengkap, perlengkapan kamar kost, dan kuliner',
    x: 78,
    y: 30,
    position: { lat: -6.9805, lng: 107.6382 }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Farhan Dwi Pratama',
    role: 'Mahasiswa Teknik Informatika Tel-U 2023',
    kostName: 'Wisma Telkom PGA Residence',
    stayDuration: 'Sudah 2 tahun menghuni',
    major: 'S1 Informatika',
    quote: 'Jalan kaki ke TULT cuma 4 menit lewat Gerbang PGA. Wi-Fi-nya kencang banget buat push repository GitHub dan video meeting praktikum. Penjaga kost juga siaga dan lingkungan cowoknya tertib.'
  },
  {
    id: 'testi-2',
    name: 'Annisa Larasati',
    role: 'Mahasiswi Desain Komunikasi Visual 2024',
    kostName: 'Kost Graha Asri Sukabirus',
    stayDuration: 'Penghuni Baru (8 bulan)',
    major: 'S1 DKV Tel-U',
    quote: 'Orang tua saya sempat cemas saat cari kost dari Semarang, tapi pas lihat aturan jelas dan foto aslinya di sini, langsung yakin. Suasana tenang buat ngerjain tugas gambar sampai malam dan aman banget.'
  },
  {
    id: 'testi-3',
    name: 'Drs. H. Mulyadi (Wali Mahasiswa)',
    role: 'Orang Tua Mahasiswa dari Riau',
    kostName: 'Kost Putri Ciganitri Asri',
    stayDuration: 'Putri sudah 1 tahun sewa',
    major: 'Wali Mahasiswi Manajemen Bisnis',
    quote: 'Yang saya apresiasi adalah kejujuran biayanya: rincian listrik dan fasilitas dijelaskan transparan tanpa biaya siluman. Komunikasi via WhatsApp dengan pengelola sangat cepat dan bertanggung jawab.'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'booking',
    question: 'Bagaimana cara survei kamar atau booking di KostBojongsoang?',
    answer: 'Cukup klik tombol "Booking Kamar / Survei" pada kost yang kamu minati. Kamu bisa mengisi nama, tanggal rencana masuk, dan durasi sewa. Sistem akan otomatis membuka WhatsApp pengelola kost dengan pesan yang sudah terisi rapi, sehingga kamu bisa langsung janjian survei fisik atau kunci kamar.'
  },
  {
    category: 'biaya',
    question: 'Apakah harga bulanan yang tertera sudah termasuk listrik dan air?',
    answer: 'Biaya air bersih PDAM/sumur dan iuran kebersihan sudah termasuk di seluruh kost rekanan kami. Untuk listrik: sebagian kost bertanda "Termasuk Listrik" sudah bebas biaya, sedangkan kost bertanda "Token Mandiri" memiliki meteran token digital di tiap kamar agar pengeluaran listrik sesuai pemakaian pribadi.'
  },
  {
    category: 'lokasi',
    question: 'Berapa jarak rata-rata kost ke kampus Telkom University?',
    answer: 'Mayoritas listing kami berjarak 250 meter hingga 800 meter dari Gerbang Utama Sukabirus, Gerbang PGA, atau Gerbang Sukapura, yang dapat ditempuh dengan jalan kaki 3–7 menit tanpa perlu macet di jalan raya.'
  },
  {
    category: 'aturan',
    question: 'Apakah ada aturan jam malam untuk mahasiswa yang sering kegiatan lab?',
    answer: 'Setiap kost memiliki kebijakan masing-masing. Sebagian besar kost modern rekanan kami menggunakan akses fingerprint atau kunci gerbang mandiri bagi penghuni, sehingga mahasiswa yang memiliki kegiatan lab resmi kampus tetap dapat masuk dengan tertib.'
  },
  {
    category: 'biaya',
    question: 'Bisa sewa bulanan atau harus tahunan langsung?',
    answer: 'Semua listing di KostBojongsoang menerima pembayaran sewa bulanan. Namun, beberapa kost memberikan diskon khusus 1 bulan gratis jika membayar langsung 1 tahun di muka.'
  }
];
