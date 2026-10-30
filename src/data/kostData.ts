import heroKostBojongsoang from '../assets/images/hero_kost_bojongsoang_1792854715076.jpg';
import kostRoomModern from '../assets/images/kost_room_modern_1792854715841.jpg';
import kostRoomDeluxe from '../assets/images/kost_room_deluxe_1792854716917.jpg';
import kostSharedKitchen from '../assets/images/kost_shared_kitchen_1792854716762.jpg';

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
  category: 'gate' | 'academic' | 'facility' | 'food' | 'market' | 'laundry';
  distance: string;
  description: string;
  x: number;
  y: number;
  position: { lat: number; lng: number }; // Real GPS coordinates for Google Maps
  openingHours?: string;
  priceEstimate?: string;
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
    mainImage: kostRoomModern,
    galleryImages: [
      kostRoomModern,
      heroKostBojongsoang,
      kostSharedKitchen,
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
    mainImage: heroKostBojongsoang,
    galleryImages: [
      heroKostBojongsoang,
      kostRoomModern,
      kostSharedKitchen,
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
    mainImage: kostRoomDeluxe,
    galleryImages: [
      kostRoomDeluxe,
      kostSharedKitchen,
      heroKostBojongsoang,
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
    mainImage: kostSharedKitchen,
    galleryImages: [
      kostSharedKitchen,
      kostRoomModern,
      heroKostBojongsoang,
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
    mainImage: heroKostBojongsoang,
    galleryImages: [
      heroKostBojongsoang,
      kostRoomModern,
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
    mainImage: kostRoomDeluxe,
    galleryImages: [
      kostRoomDeluxe,
      kostRoomModern,
      kostSharedKitchen,
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
  // Gerbang & Landmark Kampus
  {
    id: 'poi-telkom-rektorat',
    name: 'Gedung Rektorat & Landmark Telkom University',
    category: 'academic',
    distance: 'Pusat Kampus',
    description: 'Pusat administrasi, rektorat, dan taman terbuka Telkom University',
    x: 50,
    y: 50,
    position: { lat: -6.9731, lng: 107.6303 },
    openingHours: '08.00 - 17.00 WIB',
    priceEstimate: 'Akses Mahasiswa & Civitas'
  },
  {
    id: 'poi-gate-sukabirus',
    name: 'Gerbang 1 Sukabirus (Tel-U)',
    category: 'gate',
    distance: '250m - 400m dari deretan kost',
    description: 'Akses pejalan kaki & motor terpopuler mahasiswa, ramai sentra kuliner, fotokopi & laundry',
    x: 40,
    y: 45,
    position: { lat: -6.9715, lng: 107.6292 },
    openingHours: 'Buka 24 Jam (Portal Khusus Mahasiswa)',
    priceEstimate: 'Akses Bebas Pejalan Kaki & Motor'
  },
  {
    id: 'poi-gate-pga',
    name: 'Gerbang 2 PGA (Tel-U)',
    category: 'gate',
    distance: '300m - 500m dari area PGA',
    description: 'Akses langsung menuju Gedung Kuliah Bersama TULT & Fakultas Teknik Elektro',
    x: 56,
    y: 54,
    position: { lat: -6.9748, lng: 107.6325 },
    openingHours: '05.30 - 23.00 WIB',
    priceEstimate: 'Akses Mobil, Motor & Pejalan Kaki'
  },
  {
    id: 'poi-gate-sukapura',
    name: 'Gerbang 3 Sukapura (Tel-U)',
    category: 'gate',
    distance: '450m dari kost Sukapura',
    description: 'Akses dekat asrama mahasiswa baru, Telkomedika, dan Fakultas Ilmu Terapan (FIT)',
    x: 32,
    y: 38,
    position: { lat: -6.9698, lng: 107.6335 },
    openingHours: '06.00 - 22.00 WIB',
    priceEstimate: 'Akses Gerbang Utama Timur'
  },
  {
    id: 'poi-tult-building',
    name: 'Gedung Kuliah Bersama (TULT)',
    category: 'academic',
    distance: 'Di dalam kampus',
    description: 'Gedung perkuliahan tertinggi kampus Tel-U dengan ruang kelas modern dan lab teknologi',
    x: 53,
    y: 47,
    position: { lat: -6.9740, lng: 107.6315 },
    openingHours: '07.00 - 21.00 WIB',
    priceEstimate: 'Fasilitas Perkuliahan'
  },
  {
    id: 'poi-open-library',
    name: 'Open Library Telkom University',
    category: 'academic',
    distance: 'Di dalam kampus',
    description: 'Perpustakaan megah ramah mahasiswa dengan spot belajar santai, pod private & Wi-Fi gigabit',
    x: 47,
    y: 52,
    position: { lat: -6.9725, lng: 107.6318 },
    openingHours: '08.00 - 19.30 WIB',
    priceEstimate: 'Gratis Civitas Tel-U'
  },

  // Minimarket & Supermarket
  {
    id: 'poi-indomaret-sukabirus',
    name: 'Indomaret & ATM Center Sukabirus',
    category: 'market',
    distance: '150m di jalan utama Sukabirus',
    description: 'Minimarket 24 jam dengan ATM Center (BCA, Mandiri, BRI), galon air mineral, gas, dan e-money top-up',
    x: 36,
    y: 42,
    position: { lat: -6.9710, lng: 107.6288 },
    openingHours: 'Buka 24 Jam',
    priceEstimate: 'Tersedia ATM BCA, Mandiri, BRI & Sayur Buah Fresh'
  },
  {
    id: 'poi-alfamart-pga',
    name: 'Alfamart 24 Jam & ATM Radio PGA',
    category: 'market',
    distance: '200m dari Gerbang 2 PGA',
    description: 'Minimarket strategis kawasan PGA dengan Beans Spot Coffee, aneka roti fresh, dan mesin ATM BCA/Mandiri',
    x: 58,
    y: 56,
    position: { lat: -6.9752, lng: 107.6331 },
    openingHours: 'Buka 24 Jam',
    priceEstimate: 'ATM BCA & Mandiri, Kopi Beans Spot'
  },
  {
    id: 'poi-indomaret-sukapura',
    name: 'Indomaret Point Sukapura',
    category: 'market',
    distance: '350m dari Gerbang Sukapura',
    description: 'Minimarket konsep Point dengan area duduk semi-outdoor, Point Coffee, dan perlengkapan mandi/kost',
    x: 30,
    y: 35,
    position: { lat: -6.9692, lng: 107.6342 },
    openingHours: 'Buka 24 Jam',
    priceEstimate: 'Point Coffee, ATM, Snack & Kuliner Siap Saji'
  },
  {
    id: 'poi-borma-bojongsoang',
    name: 'Borma Toserba Bojongsoang',
    category: 'market',
    distance: '1.2 km di Jl. Raya Bojongsoang',
    description: 'Pusat supermarket serba ada: perlengkapan kamar kost (ember, sprei, hanger), bahan makanan segar, dan food court',
    x: 78,
    y: 30,
    position: { lat: -6.9805, lng: 107.6382 },
    openingHours: '08.00 - 21.30 WIB',
    priceEstimate: 'Supermarket Lengkap & Grosir Murah'
  },

  // Warung Makan & Kuliner
  {
    id: 'poi-warteg-bahari-sukabirus',
    name: 'Warteg Bahari Jaya Sukabirus',
    category: 'food',
    distance: '100m dari Gerbang 1 Sukabirus',
    description: 'Warung makan prasmanan 24 jam dengan 30+ pilihan lauk higienis, sayur tumis segar, dan harga ramah kantong mahasiswa.',
    x: 38,
    y: 44,
    position: { lat: -6.9718, lng: 107.6285 },
    openingHours: 'Buka 24 Jam',
    priceEstimate: 'Rp 12.000 - Rp 25.000 / porsi lengkap'
  },
  {
    id: 'poi-ayam-geprek-bebas',
    name: 'Ayam Geprek Bebas Sukabirus',
    category: 'food',
    distance: '150m dari deretan kost Sukabirus',
    description: 'Kuliner ayam krispi pedas legendaris mahasiswa Tel-U dengan level cabai sesuai selera, nasi dan es teh ambil sepuasnya.',
    x: 41,
    y: 41,
    position: { lat: -6.9708, lng: 107.6295 },
    openingHours: '10.00 - 22.00 WIB',
    priceEstimate: 'Rp 15.000 - Rp 22.000 / paket nasi + minum'
  },
  {
    id: 'poi-kantin-pga',
    name: 'Food Court & Pujasera Terusan PGA',
    category: 'food',
    distance: '200m dari Gerbang 2 PGA',
    description: 'Sentra kuliner mahasiswa dengan aneka menu: Mie Aceh, Nasi Padang, Soto Lamongan, Ayam Bakar Madu, dan aneka jus buah segar.',
    x: 57,
    y: 53,
    position: { lat: -6.9745, lng: 107.6332 },
    openingHours: '09.00 - 23.00 WIB',
    priceEstimate: 'Rp 15.000 - Rp 30.000 / menu'
  },

  // Laundry Kiloan
  {
    id: 'poi-laundry-express-sukabirus',
    name: 'Koin Kiloan Laundry Express Sukabirus',
    category: 'laundry',
    distance: '50m di simpang jalan Sukabirus',
    description: 'Jasa cuci kering kilat (express 4 jam selesai), setrika uap rapi, dan layanan jemput-antar langsung ke kamar kost.',
    x: 35,
    y: 46,
    position: { lat: -6.9722, lng: 107.6280 },
    openingHours: '07.00 - 21.00 WIB',
    priceEstimate: 'Mulai Rp 7.000 / kg (Cuci + Kering + Setrika)'
  },
  {
    id: 'poi-laundry-clean-pga',
    name: 'Daily Wash & Laundry Kiloan PGA',
    category: 'laundry',
    distance: '120m dari Gerbang 2 PGA',
    description: 'Laundry koin modern dan kiloan higienis dengan deterjen & pelembut premium anti-bakteri, aman untuk pakaian bahan sensitif.',
    x: 59,
    y: 57,
    position: { lat: -6.9755, lng: 107.6328 },
    openingHours: '06.30 - 22.00 WIB',
    priceEstimate: 'Mulai Rp 8.000 / kg'
  },

  // Fasilitas Kesehatan & Percetakan
  {
    id: 'poi-telkomedika',
    name: 'Klinik Utama TelkoMedika',
    category: 'facility',
    distance: '400m dari kampus di Jl. Radio PGA',
    description: 'Fasilitas kesehatan resmi mahasiswa Telkom University & umum: dokter umum 24 jam, dokter gigi, laboratorium, dan apotek lengkap.',
    x: 60,
    y: 58,
    position: { lat: -6.9760, lng: 107.6338 },
    openingHours: 'UGD 24 Jam / Poli 08.00 - 20.00 WIB',
    priceEstimate: 'BPJS Kesehatan & Asuransi Mahasiswa Tel-U'
  },
  {
    id: 'poi-fotokopi-sukabirus',
    name: 'Sentra Percetakan & Fotokopi Digital 24 Jam',
    category: 'facility',
    distance: '100m dari Gerbang 1 Sukabirus',
    description: 'Pusat print tugas warna/BW cepat, jilid skripsi soft/hardcover kilat, fotokopi murah, dan perlengkapan alat tulis kuliah.',
    x: 39,
    y: 43,
    position: { lat: -6.9712, lng: 107.6290 },
    openingHours: 'Buka 24 Jam',
    priceEstimate: 'Print mulai Rp 500 / lembar, Jilid Rp 5.000'
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
