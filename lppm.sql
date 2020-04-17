/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 8.0.19 : Database - lppm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `fakultas` */

DROP TABLE IF EXISTS `fakultas`;

CREATE TABLE `fakultas` (
  `id_fakultas` int unsigned NOT NULL,
  `nama_fakultas` varchar(255) NOT NULL,
  `singkatan` varchar(20) NOT NULL,
  PRIMARY KEY (`id_fakultas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `fakultas` */

insert  into `fakultas`(`id_fakultas`,`nama_fakultas`,`singkatan`) values 
(1,'Ekonomi','FE'),
(2,'Hukum','FH'),
(3,'Teknik','FT'),
(4,'Kedokteran','FK'),
(5,'Pertanian','FP'),
(6,'Keguruan dan Ilmu Pendidikan','FKIP'),
(7,'Ilmu Sosial dan Ilmu Politik','FISIP'),
(8,'Matematika dan Ilmu Pengetahuan Alam','FMIPA'),
(9,'Ilmu Komputer','FASILKOM'),
(10,'Kesehatan Masyarakat','FKM'),
(20,'Pascasarjana','Pascasarjana'),
(30,'MPK','MPK'),
(40,'Rektorat','Rektorat'),
(41,'LPPM','LPPM');

/*Table structure for table `indexing_institution` */

DROP TABLE IF EXISTS `indexing_institution`;

CREATE TABLE `indexing_institution` (
  `id_indexing_institution` varchar(2) NOT NULL,
  `nama_indexing_institution` varchar(255) NOT NULL,
  PRIMARY KEY (`id_indexing_institution`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `indexing_institution` */

insert  into `indexing_institution`(`id_indexing_institution`,`nama_indexing_institution`) values 
('01','Scopus'),
('02','Google Scholar'),
('98','Lainnya'),
('99','Tidak Ada');

/*Table structure for table `jabatan_fungsional` */

DROP TABLE IF EXISTS `jabatan_fungsional`;

CREATE TABLE `jabatan_fungsional` (
  `id_jabatan_fungsional` int unsigned NOT NULL,
  `kode_jabatan_fungsional` varchar(16) NOT NULL,
  `nama_jabatan_fungsional` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jabatan_fungsional`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jabatan_fungsional` */

insert  into `jabatan_fungsional`(`id_jabatan_fungsional`,`kode_jabatan_fungsional`,`nama_jabatan_fungsional`) values 
(1,'GB','Profesor'),
(2,'LKS3','Lektor Kepala S3'),
(3,'LKS2','Lektor Kepala S2'),
(4,'LKS1','Lektor Kepala S1'),
(5,'LS3','Lektor S3'),
(6,'LS2','Lektor S2'),
(7,'LS1','Lektor S1'),
(8,'AAS3','Asisten Ahli S3'),
(9,'AAS2','Asisten Ahli S2'),
(10,'AAS1','Asisten Ahli S1'),
(11,'TP','Tenaga Pengajar');

/*Table structure for table `jabatan_struktural` */

DROP TABLE IF EXISTS `jabatan_struktural`;

CREATE TABLE `jabatan_struktural` (
  `id_jabatan_struktural` int unsigned NOT NULL,
  `nama_jabatan_struktural` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jabatan_struktural`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jabatan_struktural` */

insert  into `jabatan_struktural`(`id_jabatan_struktural`,`nama_jabatan_struktural`) values 
(1,'Rektor'),
(2,'Dekan');

/*Table structure for table `jenis_belanja` */

DROP TABLE IF EXISTS `jenis_belanja`;

CREATE TABLE `jenis_belanja` (
  `id_jenis_belanja` varchar(2) NOT NULL,
  `nama_jenis_belanja` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jenis_belanja`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jenis_belanja` */

insert  into `jenis_belanja`(`id_jenis_belanja`,`nama_jenis_belanja`) values 
('01','Honor'),
('02','Belanja Non Operasional Lainnya'),
('03','Belanja Barang');

/*Table structure for table `jenis_fokus` */

DROP TABLE IF EXISTS `jenis_fokus`;

CREATE TABLE `jenis_fokus` (
  `id_jenis_fokus` varchar(2) NOT NULL,
  `nama_jenis_fokus` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jenis_fokus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jenis_fokus` */

insert  into `jenis_fokus`(`id_jenis_fokus`,`nama_jenis_fokus`) values 
('10','Pangan - Pertanian'),
('20','Energi - Energi Baru dan Tebarukan'),
('30','Riset Kesehatan - Obat'),
('40','Transportasi'),
('50','Teknologi Informasi dan Komunikasi'),
('60','Pertahanan dan Keamanan'),
('70','Material Maju'),
('80','Sosial, Ekonomi, Hukum, Humaniora, Seni Budaya, Pendidikan'),
('90','Lingkungan');

/*Table structure for table `jenis_luaran` */

DROP TABLE IF EXISTS `jenis_luaran`;

CREATE TABLE `jenis_luaran` (
  `id_jenis_luaran` varchar(2) NOT NULL,
  `nama_jenis_luaran` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jenis_luaran`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jenis_luaran` */

insert  into `jenis_luaran`(`id_jenis_luaran`,`nama_jenis_luaran`) values 
('01','Proceeding'),
('02','Journal'),
('03','Book'),
('04','HKI'),
('05','Lainnya'),
('06','Kemitraan');

/*Table structure for table `jenis_tema` */

DROP TABLE IF EXISTS `jenis_tema`;

CREATE TABLE `jenis_tema` (
  `id_jenis_tema` varchar(4) NOT NULL,
  `id_jenis_fokus` varchar(2) NOT NULL,
  `nama_jenis_tema` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jenis_tema`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jenis_tema` */

insert  into `jenis_tema`(`id_jenis_tema`,`id_jenis_fokus`,`nama_jenis_tema`) values 
('1010','10','Teknologi Pemuliaan Bibit Tanaman'),
('1020','10','Teknologi Budidaya dan Pemanfaatan Lahan Sub-Optimal'),
('1030','10','Teknologi Pascapanen'),
('1040','10','Teknologi Ketahanan dan Kemandirian Pangan'),
('2010','20','Teknologi Substitusi Bahan Bakar'),
('2020','20','Kemandirian Teknologi Pembangkit Listrik'),
('2030','20','Teknologi Konservasi Energi'),
('2040','20','Teknologi Ketahanan, Diversifikasi Energi dan Penguatan Komunitas Sosial'),
('2050','20','Pengembangan Fuel Cell dan Hidrogen'),
('2060','20','Pengembangan Biobriket'),
('2070','20','Pengembangan Biofuel'),
('2080','20','Pengembangan Biodiesel'),
('2090','20','Pengembangan Biolubricant'),
('3010','30','Teknologi Produk Biofarmasetika'),
('3020','30','Teknologi Alat Kesehatan dan Diagnostik'),
('3030','30','Teknologi Kemandirian Bahan Baku Obat'),
('4010','40','Teknologi dan Manajemen Keselamatan Transportasi'),
('4020','40','Teknologi Penguatan Industri Transportasi Nasional'),
('4030','40','Teknologi Infrastruktur dan Pendukung Sistem Transportasi'),
('5010','50','Pengembangan Infrastruktur TIK'),
('5020','50','Pengembangan Sistem/ Platform berbasis Open Source'),
('5030','50','Teknologi untuk Peningkatan Konten TIK'),
('5040','50','Teknologi Piranti TIK dan Pendukung TIK'),
('6010','60','Teknologi Pendukung Daya Gerak'),
('6020','60','Teknologi Pendukung Daya Gempur'),
('6030','60','Teknologi Pendukung Hankam'),
('7010','70','Teknologi Pengolahan Mineral Strategis Berbahan Baku Lokal'),
('7020','70','Teknologi Pengembangan Material Fungsional'),
('7030','70','Teknologi Eksplorasi Potensi Material Baru'),
('7040','70','Teknologi Karakterisasi Material dan Dukungan Industri'),
('8010','80','Kajian Pembangunan Sosial Budaya'),
('8020','80','Kajian Sustainable Mobility'),
('8030','80','Kajian Penguatan Modal Sosial'),
('8040','80','Kajian Ekonomi dan Sumber Daya Manusia'),
('9010','90','Pengelolaan Limbah Industri, Rumah Sakit atau Domestik'),
('9020','90','Pengelolaan dan pengendalian kerusakan lahan dan DAS'),
('9030','90','Pengendalian Kerusakan Lingkungan Kawasan Pesisir Pantai Timur Provinsi Sumatera Selatan'),
('9040','90','Pemodelan dan Simulasi Lingkungan'),
('9050','90','Sanitasi dan Kesehatan Lingkungan');

/*Table structure for table `jenis_topik` */

DROP TABLE IF EXISTS `jenis_topik`;

CREATE TABLE `jenis_topik` (
  `id_jenis_topik` varchar(6) NOT NULL,
  `id_jenis_tema` varchar(4) NOT NULL,
  `nama_jenis_topik` varchar(255) NOT NULL,
  PRIMARY KEY (`id_jenis_topik`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jenis_topik` */

insert  into `jenis_topik`(`id_jenis_topik`,`id_jenis_tema`,`nama_jenis_topik`) values 
('101010','1010','Pemanfaatan teknik radiasi untuk pencarian galur mutan unggul'),
('101020','1010','Pemuliaan tanaman dengan teknologi berbasis bioteknologi'),
('101030','1010','Pemuliaan tanaman  teknik konvensional'),
('102010','1020','Pertanian lahan sub-optimal basah'),
('102020','1020','Potensi tumbuhan dataran rendah kering sebagai sumber pangan'),
('102030','1020','Optimasi sistem pertanian tropis'),
('103010','1030','Penguatan agroindustri berbahan baku sumber daya lokal'),
('103020','1030','Teknologi iradiasi pengawetan hasil pertanian'),
('103030','1030','Diversifikasi dan hilirisasi produk pertanian, perkebunan, peternakan, dan perikanan'),
('104010','1040','Pendukung kemandirian pangan (PAJALE) dan tanaman perkebunan'),
('104020','1040','Kemandirian pangan komoditas ruminansia'),
('104030','1040','Kemandirian pangan komoditas perairan'),
('104040','1040','Efisiensi rantai nilai hasil pertanian, perkebunan, peternakan, dan perikanan'),
('201010','2010','Teknologi pendukung konversi ke bahan bakar gas (BBG)'),
('201020','2010','Dimethyl ether untuk energi rumah tangga dan transportasi'),
('201030','2010','Pengembangan komponen konverter kit'),
('202010','2020','Rancang bangun PLT panas bumi'),
('202020','2020','Rancang bangun PLT mikro hidro darat dan marine'),
('202030','2020','PLT bioenergi (biomassa, biogas, biofuel) massif'),
('203010','2030','Bangunan hemat dan mandiri energi'),
('203020','2030','Sistem smart grid dan manajemen konservasi energi'),
('203030','2030','Teknologi komponen listrik hemat energi'),
('204010','2040','Teknologi pendukung EOR'),
('204020','2040','Penyiapan infrastruktur PLTN'),
('204030','2040','Teknologi pendukung clean coal'),
('205010','2050','Pengembangan Fuel Cell dan Hidrogen'),
('206010','2060','Pengembangan Biobriket'),
('207010','2070','Pengembangan Biofuel'),
('208010','2080','Pengembangan Biodiesel'),
('209010','2090','Pengembangan Biolubricant dari Minyak Nabati'),
('301010','3010','Penguasaan produksi vaksin utama (hepatitis, dengue)'),
('301020','3010','Penguasaan sel punca (stem cell)'),
('301030','3010','Penguasaan produk biosimilar dan produk darah'),
('302010','3020','Pengembangan in vivo diagnostic (IVD) untuk deteksi penyakit infeksi'),
('302020','3020','Pengembangan in vivo diagnostic (IVD) untukdeteksi penyakit degeneratif'),
('302030','3020','Pengembangan alat elektromedik'),
('303010','3030','Pengembangan fitofarmaka berbasis sumber daya lokal'),
('303020','3030','Bahan baku obat kimia'),
('303030','3030','Saintifikasi jamu & herbal, teknologi produksi pigmen alami'),
('401010','4010','Manajemen keselamatan'),
('401020','4010','Sarana prasarana pendukung keselamatan'),
('402010','4020','Moda jalan dan rel'),
('402020','4020','Moda air'),
('402030','4020','Moda udara'),
('403010','4030','Sistem cerdas manajemen transportasi'),
('403020','4030','Kajian kebijakan, sosial dan ekonomi transportasi'),
('403030','4030','Riset dasar pendukung teknologi dan sistem transportasi'),
('501010','5010','Teknologi 5G (broadband)'),
('501020','5010','Telekomunikasi berbasis internet protocol (IP)'),
('501030','5010','Penyiaran multimedia berbasis digital'),
('501040','5010','IT security'),
('502010','5020','Sistem TIK e-Government'),
('502020','5020','Sistem TIK e-Bussiness'),
('502030','5020','Framework/ Platform penunjang industri kreatif dan kontrol'),
('503010','5030','Teknologi dan konten untuk data informasi geospasial dan inderaja'),
('503020','5030','Pengembangan teknologi big data'),
('504010','5040','Piranti TIK untuk sistem jaringan'),
('504020','5040','Piranti TIK untuk customer premises equipment (CPE)'),
('504030','5040','Kebijakan dan sosial humaniora pendukung TIK'),
('601010','6010','Pengembangan produk alat angkut matra darat'),
('601020','6010','Pengembangan produk alat angkut matra laut'),
('601030','6010','Pengembangan produk alat angkut matra udara'),
('602010','6020','Pengembangan produk roket'),
('602020','6020','Pengembangan produk handak'),
('602030','6020','Pengembangan produk sistem persenjataan'),
('603010','6030','Pengembangan produk K4IPP†,'),
('603020','6030','terutama radar, alat komunikasi dan satelit'),
('603030','6030','Pengembangan produk material'),
('603040','6030','Pengembangan sumber daya pertahanan'),
('701010','7010','Ekstraksi dan rancang bangun pabrik logam tanah jarang'),
('701020','7010','Pengembangan sel surya berbasis non silikon'),
('701030','7010','Pengolahan bijih mineral strategis lokal'),
('702010','7020','Produksi polimer untuk aplikasi separasi di industri'),
('702020','7020','Material pendukung biosensor dan kemosensor'),
('702030','7020','Pengembangan membran'),
('702040','7020','Pengembangan katalisator dan biokatalisator (enzim) untuk aplikasi di industri'),
('703010','7030','Desain dan eksplorasi material pigmen absorber'),
('703020','7030','Pendukung transformasi material sampah dan pengolahan limbah'),
('703030','7030','Pendukung material struktur'),
('704010','7040','Karakterisasi material berbasis laser dan optik'),
('704020','7040','Karakterisasi material biokompatibel'),
('704030','7040','Kemandirian bahan baku magnet kuat'),
('801010','8010','Kearifan lokal'),
('801020','8010','Indigenous studies'),
('801030','8010','Global village'),
('802010','8020','Urban planning'),
('802020','8020','Urban transportation'),
('803010','8030','Reforma agraria'),
('803020','8030','Pengentasan kemiskinan & kemandirian pangan'),
('803030','8030','Rekayasa sosial & pengembangan pedesaan'),
('804010','8040','Kewirausahaan, koperasi, dan UMKM'),
('804020','8040','Pendidikan berkarakter dan berdaya saing'),
('804030','8040','Seni-budaya pendukung pariwisata'),
('901010','9010','Pengelolaan limbah padat industri, rumah sakit atau domestik'),
('901030','9010','Pengelolaan limbah gas industri'),
('901040','9010','Pengelolaan limbah Bahan Berbahaya dan Beracun (B3)'),
('902010','9020','Pengelolaan Daerah Aliran Sungai (DAS) di Provinsi Sumatera Selatan'),
('902020','9020','Spasialisasi Lahan Kritis di Kawasan hulu, tengah dan hilir DAS'),
('902030','9020','Pengelolaan dan Pengendalian Lahan Kritis'),
('902040','9020','Pengelolaan Lahan Terkontaminasi Polutan'),
('902050','9020','Pengelolaan dan Pengendalian Longsor'),
('902060','9020','Pengelolaan dan Pengendalian Erosi dan Sedimentasi'),
('902070','9020','Pengedalian Aliran Permukaan dan Genangan di Daerah hilir Sungai Musi terutama Kota Palembang '),
('902080','9020','Penataan Lingkungan Perumahan di Bantaran Sungai'),
('902090','9020','Pengelolaan dan Pengendalian Lahan Gambut di Sumatera Selatan'),
('903010','9030','Pengendalian Kerusakan Kawasan Tambak di Wilayah Pesisir'),
('903020','9030','Pengendalian Kerusakan Kawasan Mangrove'),
('903030','9030','Penataan Lingkungan Zona Pengembangan Tanjung Api-api'),
('904010','9040','Pemodelan Prediksi dan Simulasi erosi'),
('904020','9040','Pemodelan dan Simulasi Aliran Polutan pada Lahan, Perairan dan Udara'),
('904030','9040','Pemodelan dan Simulasi Aliran Polutan pada Lahan, Perairan dan Udara'),
('904040','9040','Pemodelan dan Prediksi dan Simulasi Curah Hujan dan Perubahan Iklim'),
('905010','9050','Model Sanitasi Lingkungan Desa/Kota'),
('905020','9050','Pengendalian Penyakit Menular di Desa/Kota'),
('905030','9050','Pengelolaan Air Rawa dan Air Payau sebagai sumber Air Bersih ');

/*Table structure for table `jenjang_pendidikan` */

DROP TABLE IF EXISTS `jenjang_pendidikan`;

CREATE TABLE `jenjang_pendidikan` (
  `id_jenjang_pendidikan` int unsigned NOT NULL,
  `nama_jenjang_pendidikan` varchar(255) NOT NULL,
  `singkatan` varchar(20) NOT NULL,
  PRIMARY KEY (`id_jenjang_pendidikan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `jenjang_pendidikan` */

insert  into `jenjang_pendidikan`(`id_jenjang_pendidikan`,`nama_jenjang_pendidikan`,`singkatan`) values 
(0,'Diploma III','DIII'),
(1,'Strata 1','S1'),
(2,'Strata 2','S2'),
(3,'Strata 3','S3'),
(4,'Profesional','Profesional'),
(5,'Spesialis','Spesialis'),
(6,'Sub Spesialis','SubSpesialis'),
(8,'MPK','MPK'),
(9,'Rektorat','Rektorat');

/*Table structure for table `kegiatan` */

DROP TABLE IF EXISTS `kegiatan`;

CREATE TABLE `kegiatan` (
  `id_kegiatan` int unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_skema` varchar(4) NOT NULL,
  `id_jenis_topik` varchar(6) NOT NULL,
  `id_sbk` int unsigned NOT NULL,
  `id_tkt` int unsigned NOT NULL,
  `judul` varchar(255) NOT NULL,
  `tanggal_entri` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tahun` year NOT NULL,
  `lama` int unsigned NOT NULL,
  `proposal` varchar(255) DEFAULT NULL,
  `approval` enum('DITERIMA','DITOLAK','BELUM') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'BELUM',
  `mode` enum('VIEW','EDIT') NOT NULL DEFAULT 'EDIT',
  PRIMARY KEY (`id_kegiatan`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan` */

insert  into `kegiatan`(`id_kegiatan`,`id_user`,`id_skema`,`id_jenis_topik`,`id_sbk`,`id_tkt`,`judul`,`tanggal_entri`,`tahun`,`lama`,`proposal`,`approval`,`mode`) values 
(1,1,'0102','101020',2,4,'Are we alone in this universe?','2020-04-14 18:52:19',2020,2,NULL,'BELUM','EDIT'),
(2,2,'0103','101010',2,6,'Living Simulation, a thought experiment','2020-04-16 16:10:16',2020,1,NULL,'BELUM','EDIT');

/*Table structure for table `kegiatan_anggota` */

DROP TABLE IF EXISTS `kegiatan_anggota`;

CREATE TABLE `kegiatan_anggota` (
  `id_kegiatan_anggota` int unsigned NOT NULL AUTO_INCREMENT,
  `id_kegiatan` int unsigned NOT NULL,
  `id_user` int unsigned NOT NULL,
  `posisi` enum('KETUA','ANGGOTA') NOT NULL,
  `status` enum('DITERIMA','DITOLAK','BELUM') NOT NULL DEFAULT 'BELUM',
  PRIMARY KEY (`id_kegiatan_anggota`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan_anggota` */

insert  into `kegiatan_anggota`(`id_kegiatan_anggota`,`id_kegiatan`,`id_user`,`posisi`,`status`) values 
(1,1,1,'KETUA','DITERIMA'),
(2,1,2,'ANGGOTA','BELUM'),
(3,2,2,'KETUA','DITERIMA'),
(4,2,3,'ANGGOTA','BELUM');

/*Table structure for table `kegiatan_feedback` */

DROP TABLE IF EXISTS `kegiatan_feedback`;

CREATE TABLE `kegiatan_feedback` (
  `id_kegiatan_reviewer` int unsigned NOT NULL AUTO_INCREMENT,
  `id_tahap` int unsigned NOT NULL,
  `feedback` varchar(255) NOT NULL,
  PRIMARY KEY (`id_kegiatan_reviewer`,`id_tahap`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan_feedback` */

insert  into `kegiatan_feedback`(`id_kegiatan_reviewer`,`id_tahap`,`feedback`) values 
(1,4,'Keg #1 Rev #1 Tahap 4'),
(1,7,'Keg #1, Rev #1, Tahap 7'),
(2,7,'Keg #1, Rev #2, Tahap 7');

/*Table structure for table `kegiatan_grade` */

DROP TABLE IF EXISTS `kegiatan_grade`;

CREATE TABLE `kegiatan_grade` (
  `id_kegiatan_reviewer` int unsigned NOT NULL,
  `id_tahap` int unsigned NOT NULL,
  `id_review_question` varchar(6) NOT NULL,
  `id_review_answer` varchar(8) NOT NULL,
  PRIMARY KEY (`id_kegiatan_reviewer`,`id_tahap`,`id_review_question`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan_grade` */

insert  into `kegiatan_grade`(`id_kegiatan_reviewer`,`id_tahap`,`id_review_question`,`id_review_answer`) values 
(1,4,'042201','04220102'),
(1,4,'042202','04220203'),
(2,4,'042201','04220101');

/*Table structure for table `kegiatan_luaran` */

DROP TABLE IF EXISTS `kegiatan_luaran`;

CREATE TABLE `kegiatan_luaran` (
  `id_kegiatan_luaran` int unsigned NOT NULL AUTO_INCREMENT,
  `id_kegiatan` int unsigned NOT NULL,
  `id_jenis_luaran` varchar(2) NOT NULL,
  `id_luaran` int unsigned DEFAULT NULL,
  `deskripsi_luaran` varchar(255) NOT NULL,
  PRIMARY KEY (`id_kegiatan_luaran`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan_luaran` */

insert  into `kegiatan_luaran`(`id_kegiatan_luaran`,`id_kegiatan`,`id_jenis_luaran`,`id_luaran`,`deskripsi_luaran`) values 
(1,1,'2',NULL,'Artikel Ilmiah Pada Jurnal Internasional bereputasi'),
(2,1,'4',NULL,'Deskripsi Luaran #2'),
(3,2,'2',NULL,'Artikel Ilmiah Pada Jurnal Internasional bereputasi');

/*Table structure for table `kegiatan_mahasiswa` */

DROP TABLE IF EXISTS `kegiatan_mahasiswa`;

CREATE TABLE `kegiatan_mahasiswa` (
  `id_kegiatan_mahasiswa` int unsigned NOT NULL AUTO_INCREMENT,
  `id_kegiatan` int unsigned NOT NULL,
  `id_program_studi` int unsigned NOT NULL,
  `id_mahasiswa` varchar(16) NOT NULL,
  `nama_mahasiswa` varchar(255) NOT NULL,
  `angkatan` year NOT NULL,
  PRIMARY KEY (`id_kegiatan_mahasiswa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan_mahasiswa` */

insert  into `kegiatan_mahasiswa`(`id_kegiatan_mahasiswa`,`id_kegiatan`,`id_program_studi`,`id_mahasiswa`,`nama_mahasiswa`,`angkatan`) values 
(1,1,3,'123123123','Mahasiswa #1',2019),
(2,1,2,'456456456','Mahasiswa 2',2017);

/*Table structure for table `kegiatan_rab` */

DROP TABLE IF EXISTS `kegiatan_rab`;

CREATE TABLE `kegiatan_rab` (
  `id_kegiatan_rab` int unsigned NOT NULL AUTO_INCREMENT,
  `id_kegiatan` int unsigned NOT NULL,
  `id_jenis_belanja` varchar(2) NOT NULL,
  `tahun_ke` int unsigned NOT NULL,
  `nama_item` varchar(255) NOT NULL,
  `satuan` varchar(20) NOT NULL,
  `vol` int unsigned NOT NULL,
  `biaya_satuan` int unsigned NOT NULL,
  PRIMARY KEY (`id_kegiatan_rab`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan_rab` */

insert  into `kegiatan_rab`(`id_kegiatan_rab`,`id_kegiatan`,`id_jenis_belanja`,`tahun_ke`,`nama_item`,`satuan`,`vol`,`biaya_satuan`) values 
(1,1,'03',1,'Printer #1','Buah',2,2000000),
(2,1,'01',1,'Gaji Mahasiswa','Orang',4,1500000),
(3,2,'03',1,'Scanner #1','Buah',3,1200000),
(4,2,'03',1,'Laptop #1','Buah',2,6000000);

/*Table structure for table `kegiatan_reviewer` */

DROP TABLE IF EXISTS `kegiatan_reviewer`;

CREATE TABLE `kegiatan_reviewer` (
  `id_kegiatan_reviewer` int unsigned NOT NULL AUTO_INCREMENT,
  `id_kegiatan` int unsigned NOT NULL,
  `id_user` int unsigned NOT NULL,
  PRIMARY KEY (`id_kegiatan_reviewer`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `kegiatan_reviewer` */

insert  into `kegiatan_reviewer`(`id_kegiatan_reviewer`,`id_kegiatan`,`id_user`) values 
(1,1,4),
(2,1,5);

/*Table structure for table `luaran` */

DROP TABLE IF EXISTS `luaran`;

CREATE TABLE `luaran` (
  `id_luaran` int unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_sub_jenis_luaran` varchar(4) NOT NULL,
  `id_indexing_institution` varchar(2) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `tahun` year NOT NULL,
  `penerbit` varchar(255) DEFAULT NULL,
  `jumlah_halaman` int DEFAULT NULL,
  `isbn` varchar(40) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_luaran`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `luaran` */

insert  into `luaran`(`id_luaran`,`id_user`,`id_sub_jenis_luaran`,`id_indexing_institution`,`judul`,`tahun`,`penerbit`,`jumlah_halaman`,`isbn`,`url`,`attachment`) values 
(1,1,'0201','1','The effect of long sleep',2018,'Dark Room',666,'s-t-n-230','https://www.youtube.com/watch?v=oHg5SJYRHA0',NULL),
(2,1,'0401','1','Portable Bed',2017,'IKEA',10,'bbb-sleep','ikea.com',NULL),
(3,2,'0201','1','Purple & Bad Luck, study of corelation',2016,'PSA',313,'ttt-ygood','brian.com',NULL);

/*Table structure for table `luaran_anggota` */

DROP TABLE IF EXISTS `luaran_anggota`;

CREATE TABLE `luaran_anggota` (
  `id_luaran_anggota` int unsigned NOT NULL AUTO_INCREMENT,
  `id_luaran` int NOT NULL,
  `id_user` int NOT NULL,
  `posisi` enum('KETUA','ANGGOTA') NOT NULL,
  PRIMARY KEY (`id_luaran_anggota`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `luaran_anggota` */

insert  into `luaran_anggota`(`id_luaran_anggota`,`id_luaran`,`id_user`,`posisi`) values 
(1,1,1,'KETUA'),
(2,1,2,'ANGGOTA'),
(3,2,1,'KETUA'),
(4,3,2,'KETUA'),
(5,2,1,'ANGGOTA');

/*Table structure for table `periode` */

DROP TABLE IF EXISTS `periode`;

CREATE TABLE `periode` (
  `id_program` varchar(4) NOT NULL,
  `id_tahap` varchar(4) NOT NULL,
  `tahun` year NOT NULL,
  `mulai` date NOT NULL,
  `berakhir` date NOT NULL,
  PRIMARY KEY (`id_program`,`id_tahap`,`tahun`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `periode` */

insert  into `periode`(`id_program`,`id_tahap`,`tahun`,`mulai`,`berakhir`) values 
('01','1',2020,'2020-04-04','2020-04-05'),
('01','2',2020,'2020-06-01','2020-06-02');

/*Table structure for table `program` */

DROP TABLE IF EXISTS `program`;

CREATE TABLE `program` (
  `id_program` varchar(2) NOT NULL,
  `nama_program` varchar(255) NOT NULL,
  PRIMARY KEY (`id_program`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `program` */

insert  into `program`(`id_program`,`nama_program`) values 
('01','Penelitian PNBP Universitas'),
('02','Penelitian PNBP Fakultas'),
('03','Penelitian PNBP Dikti'),
('04','Pengabdian PNBP Universitas'),
('05','Pengabdian PNBP Fakultas'),
('06','Pengabdian PNBP Dikti');

/*Table structure for table `program_studi` */

DROP TABLE IF EXISTS `program_studi`;

CREATE TABLE `program_studi` (
  `id_program_studi` int unsigned NOT NULL,
  `id_fakultas` int unsigned NOT NULL,
  `id_jenjang_pendidikan` int unsigned NOT NULL,
  `nama_program_studi` varchar(255) NOT NULL,
  `kelompok` enum('SAINS','SOSHUM') DEFAULT NULL,
  PRIMARY KEY (`id_program_studi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `program_studi` */

insert  into `program_studi`(`id_program_studi`,`id_fakultas`,`id_jenjang_pendidikan`,`nama_program_studi`,`kelompok`) values 
(1,1,0,'Akuntansi','SAINS'),
(2,1,0,'Kesekretariatan','SAINS'),
(3,1,1,'Manajemen','SAINS'),
(4,1,1,'Ekonomi Pembangunan','SAINS'),
(5,1,1,'Akuntansi','SAINS'),
(6,1,4,'Pendidikan Profesi Akuntansi','SAINS'),
(7,1,2,'Magister Manajemen','SAINS'),
(8,1,2,'Ilmu Ekonomi','SAINS'),
(9,1,2,'Ilmu Manajemen','SAINS'),
(10,1,3,'Ilmu Ekonomi','SAINS'),
(11,2,1,'Ilmu Hukum','SAINS'),
(12,2,2,'Ilmu Hukum','SAINS'),
(13,2,2,'Kenotariatan','SAINS'),
(14,2,3,'Ilmu Hukum','SAINS'),
(15,3,1,'Teknik Sipil','SAINS'),
(16,3,1,'Teknik Pertambangan','SAINS'),
(17,3,1,'Teknik Kimia','SAINS'),
(18,3,1,'Teknik Elektro','SAINS'),
(19,3,1,'Teknik Mesin','SAINS'),
(20,3,1,'Arsitektur','SAINS'),
(21,3,1,'Teknik Geologi','SAINS'),
(22,3,2,'Teknik Kimia','SAINS'),
(23,3,2,'Teknik Sipil','SAINS'),
(24,3,2,'Teknik Mesin','SAINS'),
(25,3,2,'Teknik Pertambangan','SAINS'),
(26,4,1,'Pendidikan Dokter Umum','SAINS'),
(27,4,1,'Ilmu Keperawatan','SAINS'),
(28,4,1,'Pendidikan Dokter Gigi','SAINS'),
(29,4,1,'Psikologi','SAINS'),
(30,4,4,'Kedokteran Umum (Asal Kampus Inderalaya)','SAINS'),
(31,4,4,'Keperawatan','SAINS'),
(32,4,4,'Kedokteran Gigi','SAINS'),
(33,4,4,'Kedokteran Umum (Asal Kampus Palembang)','SAINS'),
(34,4,5,'Ilmu Bedah','SAINS'),
(35,4,5,'Ilmu Kesehatan Anak','SAINS'),
(36,4,5,'Ilmu Penyakit Mata','SAINS'),
(37,4,5,'Ilmu Penyakit Dalam','SAINS'),
(38,4,5,'Ilmu Kebidanan & Penyakit Kandungan','SAINS'),
(39,4,5,'Ilmu Patalogi Anatomi','SAINS'),
(40,4,5,'Neurologi','SAINS'),
(41,4,5,'Ilmu Penyakit Kulit & Kelamin','SAINS'),
(42,4,5,'T H T - K L','SAINS'),
(43,4,2,'Anestesi dan Reanimasi','SAINS'),
(44,4,2,'Biomedik','SAINS'),
(45,4,5,'Ilmu Penyakit Dalam','SAINS'),
(46,5,1,'Agribisnis','SAINS'),
(47,5,1,'Teknik Pertanian','SAINS'),
(48,5,1,'Teknologi Hasil Pertanian','SAINS'),
(49,5,1,'Peternakan','SAINS'),
(50,5,1,'Budidaya Perairan','SAINS'),
(51,5,1,'Teknologi Hasil Perikanan','SAINS'),
(52,5,1,'Agroekoteknologi','SAINS'),
(53,5,2,'Ilmu Tanaman','SAINS'),
(54,5,2,'Agribisnis','SAINS'),
(55,5,3,'Ilmu Pertanian','SAINS'),
(56,6,1,'Pendidikan Bahasa Inggris','SAINS'),
(57,6,1,'Pendidikan Bahasa Indonesia','SAINS'),
(58,6,1,'Pendidikan Ekonomi','SAINS'),
(59,6,1,'Pendidikan Sejarah','SAINS'),
(60,6,1,'Pendidikan PKN','SAINS'),
(61,6,1,'Pendidikan Jasmani & Kesehatan','SAINS'),
(62,6,1,'Bimbingan & Konseling','SAINS'),
(63,6,1,'Pendidikan Matematika','SAINS'),
(64,6,1,'Pendidikan Biologi','SAINS'),
(65,6,1,'Pendidikan Kimia','SAINS'),
(66,6,1,'Pendidikan Fisika','SAINS'),
(67,6,1,'Pendidikan Teknik Mesin','SAINS'),
(68,6,1,'PGSD','SAINS'),
(69,6,1,'PG PAUD','SAINS'),
(70,6,2,'Pendidikan Bahasa','SAINS'),
(71,6,2,'Pendidikan Matematika','SAINS'),
(72,6,2,'Teknologi Pendidikan','SAINS'),
(73,7,1,'Ilmu Administrasi Negara','SAINS'),
(74,7,1,'Sosiologi','SAINS'),
(75,7,1,'Ilmu Komunikasi','SAINS'),
(76,7,2,'Administrasi Publik','SAINS'),
(77,7,2,'Sosiologi','SAINS'),
(78,8,1,'Matematika','SAINS'),
(79,8,1,'Fisika','SAINS'),
(80,8,1,'Kimia','SAINS'),
(81,8,1,'Biologi','SAINS'),
(82,8,1,'Ilmu Kelautan','SAINS'),
(83,8,1,'Farmasi','SAINS'),
(84,9,0,'Manajemen Informatika','SAINS'),
(85,9,0,'Komputerisasi Akuntansi','SAINS'),
(86,9,0,'Teknik Komputer','SAINS'),
(87,9,1,'Sistem Komputer','SAINS'),
(88,9,1,'Teknik Informatika','SAINS'),
(89,9,1,'Sistem Informasi','SAINS'),
(90,10,1,'Ilmu Kesehatan Masyarakat','SOSHUM'),
(91,10,2,'Ilmu Kesehatan Masyarakat','SAINS'),
(92,20,2,'Pengelolaan Lingkungan','SAINS'),
(93,20,2,'Kependudukan','SAINS'),
(94,20,3,'Ilmu Lingkungan','SAINS'),
(95,30,1,'MPK','SAINS'),
(96,40,9,'Rektorat','SAINS'),
(97,8,2,'Ilmu Fisika','SAINS'),
(98,8,3,'MIPA','SAINS'),
(99,4,6,'Ilmu Penyakit Dalam','SAINS'),
(100,6,1,'Pendidikan Luar Sekolah','SAINS'),
(101,6,2,'Pendidikan Olahraga','SAINS'),
(102,5,1,'Budidaya Pertanian','SAINS'),
(103,5,1,'Tanah','SAINS'),
(104,5,1,'Hama dan Penyakit Tumbuhan','SAINS'),
(105,3,3,'Ilmu Teknik','SAINS'),
(106,1,3,'Ilmu Manajemen','SAINS'),
(107,9,2,'Teknik Informatika','SAINS'),
(108,9,1,'Laboratorium Komputer','SAINS'),
(109,20,2,'Laboratorium Bahasa','SAINS'),
(110,20,3,'Laboratorium Bahasa','SAINS'),
(111,40,9,'Pusbangdik','SAINS'),
(201,8,2,'Ilmu Kimia','SAINS'),
(202,8,2,'Ilmu Biologi','SAINS'),
(203,6,3,'Pendidikan Matematika','SAINS'),
(204,7,1,'Hubungan Internasional','SAINS'),
(205,10,1,'Ilmu Gizi','SAINS'),
(206,10,1,'Kesehatan Lingkungan','SAINS'),
(901,41,1,'LPPM','SAINS');

/*Table structure for table `review_answer` */

DROP TABLE IF EXISTS `review_answer`;

CREATE TABLE `review_answer` (
  `id_review_answer` varchar(8) NOT NULL,
  `id_review_question` varchar(6) NOT NULL,
  `review_answer` varchar(255) NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`id_review_answer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `review_answer` */

insert  into `review_answer`(`id_review_answer`,`id_review_question`,`review_answer`,`score`) values 
('04120101','041201','Tidak memiliki publikasi berupa artikel di jurnal internasional bereputasi sebagai',1),
('04120102','041201','Memiliki publikasi berupa artikel di jurnal internasional bereputasi sebagai',5),
('04120103','041201','Memiliki publikasi di jurnal internasional bereputasi sebagai penulis pertama',10),
('04120104','041201','Memiliki publikasi di jurnal internasional bereputasi sebagai penulis pertama atau corresponding author sebanyak 6-10 artikel',15),
('04120105','041201','Memiliki publikasi di jurnal internasional bereputasi sebagai penulis pertama atau corresponding author sebanyak > 10 artikel',20),
('04120201','041202','Tidak memiliki publikasi jurnal internasional dan/atau jurnal nasional\r\nterakreditasi (peringkat satu dan peringkat dua) dan/atau prosiding internasional\r\nterindeks sebagai penulis pertama atau corresponding author',1),
('04120202','041202','Memiliki publikasi jurnal internasional dan/atau jurnal nasional terakreditasi(peringkat satu dan peringkat dua) dan/atau prosiding internasional terindeks sebagai penulis pertama atau corresponding author 2 artikel',2),
('04120203','041202','Memiliki publikasi jurnal internasional dan/atau jurnal nasional terakreditasi(peringkat satu dan peringkat dua) dan/atau prosiding internasional terindeks sebagai penulis pertama atau corresponding author sebanyak 3-5 artikel',5),
('04120204','041202','Memiliki publikasi jurnal internasional dan/atau jurnal nasional terakreditasi(peringkat satu dan peringkat dua) dan/atau prosiding internasional terindeks sebagai penulis pertama atau corresponding author sebanyak 6-10 artikel',8),
('04120205','041202','Memiliki publikasi jurnal internasional dan/atau jurnal nasional terakreditasi(peringkat satu dan peringkat dua) dan/atau prosiding internasional terindeks sebagai penulis pertama atau corresponding author sebanyak > 10 artikel',10),
('04120301','041203','Tidak memiliki publikasi berupa buku',1),
('04120302','041203','Memiliki publikasi berupa 1 buku',2),
('04120303','041203','Memiliki publikasi berupa 2 buku',5),
('04120304','041203','Memiliki publikasi berupa 3 buku',8),
('04120305','041203','Memiliki publikasi berupa > 3 buku',10),
('04210101','042101','Tidak relevan/ topik lainnya',1),
('04210102','042101','Relevan',10),
('04210201','042102','Tidak ada kebaruan',1),
('04210202','042102','Kebaruan kurang signifikan',5),
('04210203','042102','Kebaruan cukup signifikan',15),
('04210204','042102','Kebaruan sangat signifikan',20),
('04210301','042103','Kompetensi tidak sesuai dan pembagian tugas tidak jelas',3),
('04210302','042103','Kompetensi cukup sesuai dan pembagian tugas cukup jelas',5),
('04210303','042103','Kompetensi sangat sesuai dan pembagian tugas sangat jelas',10),
('04210401','042104','Jurnal atau seminar yang dituju tidak sesuai dengan judul penelitian',1),
('04210402','042104','Jurnal atau seminar yang dituju cukup sesuai dengan judul penelitian',10),
('04210403','042104','Jurnal atau seminar yang dituju sesuai dengan judul penelitian',20),
('04210501','042105','Metode tahapan capaian luaran tidak jelas',5),
('04210502','042105','Metode tahapan capaian luaran kurang jelas',10),
('04210503','042105','Metode tahapan capaian luaran sangat jelas',15),
('04210601','042106','Target TKT tidak sesuai',1),
('04210602','042106','Target TKT sesuai',5),
('04210701','042107','Jadwal tidak ada',1),
('04210702','042107','Jadwal cukup sesuai dengan tahapan penelitian',3),
('04210703','042107','Jadwal sesuai dengan tahapan penelitian',5),
('04210801','042108','Tidak ada pustaka primer',1),
('04210802','042108','Pustaka tergolong primer dan mutakhir sejumlah 1-50%',5),
('04210803','042108','Pustaka tergolong primer dan mutakhir sejumlah 51-80%',10),
('04210804','042108','Pustaka tergolong primer dan mutakhir sejumlah 80%',15),
('04220101','042201','Tidak relevan/ topik lainnya',1),
('04220102','042201','Relevan ',3),
('04220201','042202','Tidak ada kebaruan',1),
('04220202','042202','Kebaruan kurang signifikan',5),
('04220203','042202','Kebaruan cukup signifikan',10),
('04220204','042202','Kebaruan sangat singnifikan',15),
('04220301','042203','Tidak ada roadmap',1),
('04220302','042203','Ada roadmap namun tidak jelas atau tidak ada keterkaitan antara milestone dan dengan usulan penelitian',2),
('04220303','042203','Roadmap jelas dan ada keterkaitan antara milestone dan dengan usulan penelitian',5),
('04220401','042204','Kompetensi tidak sesuai dan pembagian tugas tidak jelas',1),
('04220402','042204','Kompetensi cukup sesuai dan pembagian tugas cukup jelas',2),
('04220403','042204','Kompetensi sangat sesuai dan pembagian tugas sangat jelas',3),
('04220501','042205','Satu artikel di jurnal internasional yang terindeks pada database yang kurang baik',5),
('04220502','042205','Satu artikel di jurnal internasional yang terindeks pada database yang cukup baik',8),
('04220503','042205','Satu artikel di jurnal internasional yang terindeks pada database yang sangat baik',10),
('04220601','042206','Satu artikel di jurnal internasional yang terindeks pada database yang kurang baik',5),
('04220602','042206','Satu artikel di jurnal internasional yang terindeks pada database yang cukup baik',8),
('04220603','042206','Satu artikel di jurnal internasional yang terindeks pada database yang sangat baik',10),
('04220701','042207','Metode tahapan capaian luaran tidak jelas',1),
('04220702','042207','Metode tahapan capaian luaran kurang jelas',3),
('04220703','042207','Metode tahapan capaian luaran sangat jelas',5),
('04220801','042208','Target TKT tidak sesuai',1),
('04220802','042208','Target TKT sesuai',3),
('04220901','042209','Jadwal penelitian tidak ada',1),
('04220902','042209','Jadwal penelitian cukup sesuai dengan tahapan penelitian ',1),
('04220903','042209','Jadwal penelitian sesuai dengan tahapan penelitian',2),
('04221001','042210','Tidak ada pustaka primer',1),
('04221002','042210','Pustaka tergolong primer dan mutakhir kurang dari 50%',3),
('04221003','042210','Pustaka tergolong primer dan mutakhir sejumlah 51%-80%',5),
('04221004','042210','Pustaka tergolong primer dan mutakhir lebih besar 80%',7),
('04221101','042211','Tidak ada kerjasama penelitian',1),
('04221102','042211','Ada kerjasama penelitian dalam negeri',3),
('04221103','042211','Ada kerjasama penelitian luar negeri',5),
('04221104','042211','Ada dukungan pendanaan in cash dan atau in kind dari kerjasama penelitian luar negeri',7),
('04410101','044101','Buruk',1),
('04410102','044101','Sangat Kurang',2),
('04410103','044101','Kurang',3),
('04410104','044101','Cukup',5),
('04410105','044101','Baik',6),
('04410106','044101','Sangat Baik',7),
('04410201','044102','Buruk',1),
('04410202','044102','Sangat Kurang',2),
('04410203','044102','Kurang',3),
('04410204','044102','Cukup',5),
('04410205','044102','Baik',6),
('04410206','044102','Sangat Baik',7),
('04410301','044103','Buruk',1),
('04410302','044103','Sangat Kurang',2),
('04410303','044103','Kurang',3),
('04410304','044103','Cukup',5),
('04410305','044103','Baik',6),
('04410306','044103','Sangat Baik',7),
('04410401','044104','Buruk',1),
('04410402','044104','Sangat Kurang',2),
('04410403','044104','Kurang',3),
('04410404','044104','Cukup',5),
('04410405','044104','Baik',6),
('04410406','044104','Sangat Baik',7),
('04410501','044105','Buruk',1),
('04410502','044105','Sangat Kurang',2),
('04410503','044105','Kurang',3),
('04410504','044105','Cukup',5),
('04410505','044105','Baik',6),
('04410506','044105','Sangat Baik',7),
('04410601','044106','Buruk',1),
('04410602','044106','Sangat Kurang',2),
('04410603','044106','Kurang',3),
('04410604','044106','Cukup',5),
('04410605','044106','Baik',6),
('04410606','044106','Sangat Baik',7),
('04420101','044201','Buruk',1),
('04420102','044201','Sangat Kurang',2),
('04420103','044201','Kurang',3),
('04420104','044201','Cukup',5),
('04420105','044201','Baik',6),
('04420106','044201','Sangat Baik',7),
('04420201','044202','Buruk',1),
('04420202','044202','Sangat Kurang',2),
('04420203','044202','Kurang',3),
('04420204','044202','Cukup',5),
('04420205','044202','Baik',6),
('04420206','044202','Sangat Baik',7),
('04420301','044203','Buruk',1),
('04420302','044203','Sangat Kurang',2),
('04420303','044203','Kurang',3),
('04420304','044203','Cukup',5),
('04420305','044203','Baik',6),
('04420306','044203','Sangat Baik',7),
('04420401','044204','Buruk',1),
('04420402','044204','Sangat Kurang',2),
('04420403','044204','Kurang',3),
('04420404','044204','Cukup',5),
('04420405','044204','Baik',6),
('04420406','044204','Sangat Baik',7),
('04420501','044205','Buruk',1),
('04420502','044205','Sangat Kurang',2),
('04420503','044205','Kurang',3),
('04420504','044205','Cukup',5),
('04420505','044205','Baik',6),
('04420506','044205','Sangat Baik',7),
('04420601','044206','Buruk',1),
('04420602','044206','Sangat Kurang',2),
('04420603','044206','Kurang',3),
('04420604','044206','Cukup',5),
('04420605','044206','Baik',6),
('04420606','044206','Sangat Baik',7),
('04430101','044301','Buruk',1),
('04430102','044301','Sangat Kurang',2),
('04430103','044301','Kurang',3),
('04430104','044301','Cukup',5),
('04430105','044301','Baik',6),
('04430106','044301','Sangat Baik',7),
('04430201','044302','Buruk',1),
('04430202','044302','Sangat Kurang',2),
('04430203','044302','Kurang',3),
('04430204','044302','Cukup',5),
('04430205','044302','Baik',6),
('04430206','044302','Sangat Baik',7),
('04430301','044303','Buruk',1),
('04430302','044303','Sangat Kurang',2),
('04430303','044303','Kurang',3),
('04430304','044303','Cukup',5),
('04430305','044303','Baik',6),
('04430306','044303','Sangat Baik',7),
('04430401','044304','Buruk',1),
('04430402','044304','Sangat Kurang',2),
('04430403','044304','Kurang',3),
('04430404','044304','Cukup',5),
('04430405','044304','Baik',6),
('04430406','044304','Sangat Baik',7),
('04430501','044305','Buruk',1),
('04430502','044305','Sangat Kurang',2),
('04430503','044305','Kurang',3),
('04430504','044305','Cukup',5),
('04430505','044305','Baik',6),
('04430506','044305','Sangat Baik',7),
('04430601','044306','Buruk',1),
('04430602','044306','Sangat Kurang',2),
('04430603','044306','Kurang',3),
('04430604','044306','Cukup',5),
('04430605','044306','Baik',6),
('04430606','044306','Sangat Baik',7),
('04440101','044401','Buruk',1),
('04440102','044401','Sangat Kurang',2),
('04440103','044401','Kurang',3),
('04440104','044401','Cukup',5),
('04440105','044401','Baik',6),
('04440106','044401','Sangat Baik',7),
('04440201','044402','Buruk',1),
('04440202','044402','Sangat Kurang',2),
('04440203','044402','Kurang',3),
('04440204','044402','Cukup',5),
('04440205','044402','Baik',6),
('04440206','044402','Sangat Baik',7),
('04440301','044403','Buruk',1),
('04440302','044403','Sangat Kurang',2),
('04440303','044403','Kurang',3),
('04440304','044403','Cukup',5),
('04440305','044403','Baik',6),
('04440306','044403','Sangat Baik',7),
('04440401','044404','Buruk',1),
('04440402','044404','Sangat Kurang',2),
('04440403','044404','Kurang',3),
('04440404','044404','Cukup',5),
('04440405','044404','Baik',6),
('04440406','044404','Sangat Baik',7),
('04440501','044405','Buruk',1),
('04440502','044405','Sangat Kurang',2),
('04440503','044405','Kurang',3),
('04440504','044405','Cukup',5),
('04440505','044405','Baik',6),
('04440506','044405','Sangat Baik',7),
('04440601','044406','Buruk',1),
('04440602','044406','Sangat Kurang',2),
('04440603','044406','Kurang',3),
('04440604','044406','Cukup',5),
('04440605','044406','Baik',6),
('04440606','044406','Sangat Baik',7),
('07210102','072101','sangat kurang',1),
('07210103','072101','kurang',2),
('07210104','072101','cukup',3),
('07210105','072101','baik',4),
('07210106','072101','sangat baik',5),
('07210201','072102','buruk',1),
('07210202','072102','sangat kurang',2),
('07210203','072102','kurang',3),
('07210204','072102','cukup',5),
('07210205','072102','baik',6),
('07210206','072102','sangat baik',7),
('07210301','072103','buruk',1),
('07210302','072103','sangat kurang',2),
('07210303','072103','kurang',3),
('07210304','072103','cukup',5),
('07210305','072103','baik',6),
('07210306','072103','sangat baik',7),
('07210401','072104','kurang',1),
('07210402','072104','cukup',2),
('07210403','072104','baik',3),
('07410102','074101','sangat kurang',1),
('07410103','074101','kurang',2),
('07410104','074101','cukup',3),
('07410105','074101','baik',4),
('07410106','074101','sangat baik',5),
('07410201','074102','buruk',1),
('07410202','074102','sangat kurang',2),
('07410203','074102','kurang',3),
('07410204','074102','cukup',5),
('07410205','074102','baik',6),
('07410206','074102','sangat baik',7),
('07410301','074103','buruk',1),
('07410302','074103','sangat kurang',2),
('07410303','074103','kurang',3),
('07410304','074103','cukup',5),
('07410305','074103','baik',6),
('07410306','074103','sangat baik',7),
('07410401','074104','kurang',1),
('07410402','074104','cukup',2),
('07410403','074104','baik',3),
('09210102','092101','sangat kurang',1),
('09210103','092101','kurang',2),
('09210104','092101','cukup',3),
('09210105','092101','baik',4),
('09210106','092101','sangat baik',5),
('09210201','092102','buruk',1),
('09210202','092102','sangat kurang',2),
('09210203','092102','kurang',3),
('09210204','092102','cukup',5),
('09210205','092102','baik',6),
('09210206','092102','sangat baik',7),
('09210301','092103','buruk',1),
('09210302','092103','sangat kurang',2),
('09210303','092103','kurang',3),
('09210304','092103','cukup',5),
('09210305','092103','baik',6),
('09210306','092103','sangat baik',7),
('09210401','092104','kurang',1),
('09210402','092104','cukup',2),
('09210403','092104','baik',3),
('09410102','094101','sangat kurang',1),
('09410103','094101','kurang',2),
('09410104','094101','cukup',3),
('09410105','094101','baik',4),
('09410106','094101','sangat baik',5),
('09410201','094102','buruk',1),
('09410202','094102','sangat kurang',2),
('09410203','094102','kurang',3),
('09410204','094102','cukup',5),
('09410205','094102','baik',6),
('09410206','094102','sangat baik',7),
('09410301','094103','buruk',1),
('09410302','094103','sangat kurang',2),
('09410303','094103','kurang',3),
('09410304','094103','cukup',5),
('09410305','094103','baik',6),
('09410306','094103','sangat baik',7),
('09410401','094104','kurang',1),
('09410402','094104','cukup',2),
('09410403','094104','baik',3);

/*Table structure for table `review_question` */

DROP TABLE IF EXISTS `review_question`;

CREATE TABLE `review_question` (
  `id_review_question` varchar(6) NOT NULL,
  `jenis_question` enum('JEJAK','ISI') NOT NULL,
  `ids_skema` varchar(255) NOT NULL,
  `id_tahap` int unsigned NOT NULL,
  `review_question` varchar(255) NOT NULL,
  `bobot` int unsigned NOT NULL,
  `max_score` int unsigned NOT NULL,
  PRIMARY KEY (`id_review_question`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `review_question` */

insert  into `review_question`(`id_review_question`,`jenis_question`,`ids_skema`,`id_tahap`,`review_question`,`bobot`,`max_score`) values 
('041201','JEJAK','10002,10003',4,'Jurnal internasional bereputasi',1,1),
('041202','JEJAK','10002,10003',4,'Jurnal internasional dan/atau jurnal nasional terakreditasi dan/atau prosiding internasional terindeks',1,1),
('041203','JEJAK','10002,10003',4,'Buku ber-ISBN dan/atau chapter dalam buku yang ber-ISBN(1 buku setara dengan 3 book chapter)',1,1),
('042101','ISI','10001',4,'Relevansi usulan penelitian terhadap bidang fokus, tema, dan topik RIRN',1,1),
('042102','ISI','10001',4,'Kualitas dan relevansi tujuan, permasalahan, state of the art, metode, dan\r\n kebaruan penelitian',1,1),
('042103','ISI','10001',4,'Kesesuaian kompetensi tim peneliti dan pembagian tugas',1,1),
('042104','ISI','10001',4,'Kesuaian luaran wajib yang dijanjikan : Publikasi berbentuk artikel di jurnal atau artikel di prosiding seminar internasional',1,1),
('042105','ISI','10001',4,'Kewajaran metode tahapan target capaian luaran wajaib penelitian',1,1),
('042106','ISI','10001',4,'Kesesuaian target TKT',1,1),
('042107','ISI','10001',4,'Kesesuaian jadwal penelitian',1,1),
('042108','ISI','10001',4,'Kekinian dan sumber primer pengacuan pustaka',1,1),
('042201','ISI','10002,10003,20001,20002,20003',4,'Relevansi usulan penelitian terhadap bidang unggulan, tema, dan topik',1,1),
('042202','ISI','10002,10003,20001,20002,20003',4,'Kualitas dan relevansi tujuan, permasalahan, state of the art, metode, dan kebaruan penelitian',1,1),
('042203','ISI','10002,10003,20001,20002,20003',4,'Keterkaitan usulan penelitian terhadap hasil penelitian yang didapat sebelumnya dan rencana kedepan (roadmap penelitian)',1,1),
('042204','ISI','10002,10003,20001,20002,20003',4,'Kesesuaian kompetensi tim peneliti dan pembagian tugas',1,1),
('042205','ISI','10002,10003,20001,20002,20003',4,'Luaran Penelitian Pubikasi Tahun Ke 1',1,1),
('042206','ISI','10002,10003,20001,20002,20003',4,'Luaran Penelitain Publikasi Tahun Ke 2',1,1),
('042207','ISI','10002,10003,20001,20002,20003',4,'Kewajaran metode tahapan target capaian luaran wajib penelitian',1,1),
('042208','ISI','10002,10003,20001,20002,20003',4,'Kesesuaian target TKT',1,1),
('042209','ISI','10002,10003,20001,20002,20003',4,'Kesesuaian jadwal penelitian',1,1),
('042210','ISI','10002,10003,20001,20002,20003',4,'Kekinian dan sumber primer pengacuan pustaka',1,1),
('042211','ISI','10002,10003,20001,20002,20003',4,'Dukungan kerjasama penelitian',1,1),
('044101','ISI','40001',4,'Analisis situasi (kondisi mitra saat ini, persoalan umum yang dihadapi mitra)',20,7),
('044102','ISI','40001',4,'Permasalahan prioritas mitra dan solusi yang ditawarkan (kecocokan permasalahan, solusi & kompetensi tim)',15,7),
('044103','ISI','40001',4,'Target luaran (Artikel di publikasikan di media massa)',15,7),
('044104','ISI','40001',4,'Ketepatan metode pendekatan untuk mengatasi permasalahan, rencana kegiatan, kontribusi partisifasi mitra.',20,7),
('044105','ISI','40001',4,'Kelayakan PT (kualifikasi tim pelaksana, relevansi skill tim, sinergisme tim, pengalaman kemasyarakatan, organisasi tim, jadwal kegiatan, kelengkapan lampiran)',10,7),
('044106','ISI','40001',4,'Biaya pekerjaan kelayakan usulan biaya (honorarium maksimum 30%), bahan habis, peralatan, perjalanan, lain-lain pengeluaran.',20,7),
('044201','ISI','40002',4,'Analisis situasi (kondisi mitra saat ini, persoalan umum yang dihadapi mitra)',20,7),
('044202','ISI','40002',4,'Permasalahan prioritas mitra dan solusi yang ditawarkan (kecocokan permasalahan, solusi & kompetensi tim)',15,7),
('044203','ISI','40002',4,'Target luaran (Artikel di publikasi di media massa & Teknologi Tepat Guna)',15,7),
('044204','ISI','40002',4,'Ketepatan metode pendekatan untuk mengatasi permasalahan, rencana kegiatan, kontribusi partisifasi mitra.',20,7),
('044205','ISI','40002',4,'Kelayakan PT (kualifikasi tim pelaksana, relevansi skill tim, sinergisme tim, pengalaman kemasyarakatan, organisasi tim, jadwal kegiatan, kelengkapan lampiran)',10,7),
('044206','ISI','40002',4,'Biaya pekerjaan kelayakan usulan biaya (honorarium maksimum 30%), bahan habis, peralatan, perjalanan, lain-lain pengeluaran.',20,7),
('044301','ISI','40003',4,'Analisis situasi (kondisi mitra saat ini, persoalan umum yang dihadapi mitra)',20,7),
('044302','ISI','40003',4,'Permasalahan prioritas mitra dan solusi yang ditawarkan (kecocokan permasalahan, solusi & kompetensi tim)',15,7),
('044303','ISI','40003',4,'Target luaran (Artikel di publikasikan di media massa dan /atau Teknologi Tepat Guna)',15,7),
('044304','ISI','40003',4,'Ketepatan metode pendekatan untuk mengatasi permasalahan, rencana kegiatan, kontribusi partisifasi mitra.',20,7),
('044305','ISI','40003',4,'Kelayakan PT (kualifikasi tim pelaksana, relevansi skill tim, sinergisme tim, pengalaman kemasyarakatan, organisasi tim, jadwal kegiatan, kelengkapan lampiran)',10,7),
('044306','ISI','40003',4,'Biaya pekerjaan kelayakan usulan biaya (honorarium maksimum 30%), bahan habis, peralatan, perjalanan, lain-lain pengeluaran.',20,7),
('044401','ISI','40004',4,'Analisis situasi (kondisi mitra saat ini, persoalan umum yang dihadapi mitra)',20,7),
('044402','ISI','40004',4,'Permasalahan prioritas mitra dan solusi yang ditawarkan (kecocokan permasalahan, solusi & kompetensi tim)',15,7),
('044403','ISI','40004',4,'Target luaran (Artikel di publikasikan di media massa dan Pembinaan UKM/Home Industry)',15,7),
('044404','ISI','40004',4,'Ketepatan metode pendekatan untuk mengatasi permasalahan, rencana kegiatan, kontribusi partisifasi mitra.',20,7),
('044405','ISI','40004',4,'Kelayakan PT (kualifikasi tim pelaksana, relevansi skill tim, sinergisme tim, pengalaman kemasyarakatan, organisasi tim, jadwal kegiatan, kelengkapan lampiran)',10,7),
('044406','ISI','40004',4,'Biaya pekerjaan kelayakan usulan biaya (honorarium maksimum 30%), bahan habis, peralatan, perjalanan, lain-lain pengeluaran.',20,7),
('072101','ISI','10001,10002,10003',7,'Publikasi ilmiah / jurnal',50,5),
('072102','ISI','10001,10002,10003',7,'Sebagai pemakalah dalam temu ilmiah lokal / nasional',20,7),
('072103','ISI','10001,10002,10003',7,'Bahan ajar',20,7),
('072104','ISI','10001,10002,10003',7,'TTG, produk/ model/ purwarupa/ desain/ karya seni/ rekaya sosial',10,3),
('074101','ISI','40001,40002,40003,40004',7,'Publikasi ilmiah / jurnal',50,5),
('074102','ISI','40001,40002,40003,40004',7,'Sebagai pemakalah dalam temu ilmiah lokal / nasional',20,7),
('074103','ISI','40001,40002,40003,40004',7,'Bahan ajar',20,7),
('074104','ISI','40001,40002,40003,40004',7,'TTG, produk/ model/ purwarupa/ desain/ karya seni/ rekaya sosial',10,3),
('092101','ISI','10001,10002,10003',9,'Publikasi ilmiah / jurnal',50,5),
('092102','ISI','10001,10002,10003',9,'Sebagai pemakalah dalam temu ilmiah lokal / nasional',20,7),
('092103','ISI','10001,10002,10003',9,'Bahan ajar',20,7),
('092104','ISI','10001,10002,10003',9,'TTG, produk/ model/ purwarupa/ desain/ karya seni/ rekaya sosial',10,3),
('094101','ISI','40001,40002,40003,40004',9,'Publikasi ilmiah / jurnal',50,5),
('094102','ISI','40001,40002,40003,40004',9,'Sebagai pemakalah dalam temu ilmiah lokal / nasional',20,7),
('094103','ISI','40001,40002,40003,40004',9,'Bahan ajar',20,7),
('094104','ISI','40001,40002,40003,40004',9,'TTG, produk/ model/ purwarupa/ desain/ karya seni/ rekaya sosial',10,3);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id_role` int unsigned NOT NULL,
  `nama_role` varchar(32) NOT NULL,
  `title_role` varchar(64) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `role` */

insert  into `role`(`id_role`,`nama_role`,`title_role`) values 
(1,'admin','Admin'),
(2,'dosen','Dosen'),
(3,'reviewer','Reviewer'),
(4,'pimpinan_fakultas','Pimpinan Fakultas');

/*Table structure for table `sbk` */

DROP TABLE IF EXISTS `sbk`;

CREATE TABLE `sbk` (
  `id_sbk` int unsigned NOT NULL,
  `nama_sbk` varchar(255) NOT NULL,
  `tkt_min` int unsigned NOT NULL,
  `tkt_max` int unsigned NOT NULL,
  PRIMARY KEY (`id_sbk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sbk` */

insert  into `sbk`(`id_sbk`,`nama_sbk`,`tkt_min`,`tkt_max`) values 
(1,'SBK Riset Dasar',1,3),
(2,'SBK Riset Terapan',4,6),
(3,'SBK Riset Pengembangan',7,9);

/*Table structure for table `sessions` */

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sessions` */

insert  into `sessions`(`session_id`,`expires`,`data`) values 
('L_W1NdBAMBgaJjNHxU5mAJVHEjTCD0SS',1586248341,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id_user\":1,\"id_role\":1,\"id_program_studi\":901,\"username\":\"admin\",\"nama_user\":\"Admin LPPM\",\"nohp\":\"084323515536\",\"email\":\"admin@lppm.com\",\"profile_picture\":\"http://localhost:8888/profile_picture/ed7f4836c70302f37508119a841165e3\",\"nama_role\":\"admin\",\"title_role\":\"Admin\"}}'),
('_UFXNtdPuJ1Xab7D9jYYsiOG2wnb-8YR',1586250586,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id_user\":28,\"id_role\":1,\"id_program_studi\":1,\"username\":\"husein\",\"nama_user\":\"Husein nashr\",\"nohp\":\"1231231231241\",\"email\":\"husein@gmail.com\",\"profile_picture\":\"http://localhost:8888/profile_picture/6d8272809413e2b6ceb284f1c3205c89\",\"nama_role\":\"admin\",\"title_role\":\"Admin\"}}');

/*Table structure for table `skema` */

DROP TABLE IF EXISTS `skema`;

CREATE TABLE `skema` (
  `id_skema` varchar(4) NOT NULL,
  `id_program` varchar(2) NOT NULL,
  `nama_skema` varchar(255) NOT NULL,
  `dana_maksimum` int unsigned NOT NULL,
  `lama_maksimum` int NOT NULL,
  `tkt_min` int unsigned DEFAULT NULL,
  `tkt_max` int unsigned DEFAULT NULL,
  `luaran_wajib` varchar(255) DEFAULT NULL,
  `luaran_pilihan` varchar(255) DEFAULT NULL,
  `min_jabatan_fungsional` int unsigned DEFAULT NULL,
  `min_jenjang_pendidikan` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_skema`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `skema` */

insert  into `skema`(`id_skema`,`id_program`,`nama_skema`,`dana_maksimum`,`lama_maksimum`,`tkt_min`,`tkt_max`,`luaran_wajib`,`luaran_pilihan`,`min_jabatan_fungsional`,`min_jenjang_pendidikan`) values 
('0101','01','Sains dan Teknologi',40000000,1,1,3,'1;Sertifikat Sebagai Penyaji Pada Seminar Internasional Bereputasi Terindeks Scopus','5',11,1),
('0102','01','Unggulan Kompetitif',75000000,2,4,6,'2;Artikel Ilmiah Pada Jurnal Internasional bereputasi','4#5',11,1),
('0103','01','Unggulan Profesi',250000000,4,4,6,'2;Artikel Ilmiah Pada Jurnal Internasional bereputasi','4#5',1,3),
('0104','01','Unggulan Profesi (NIDK)',75000000,4,4,6,'2;Artikel Ilmiah Pada Jurnal Internasional bereputasi','4#5',1,3),
('0105','01','Unggulan Inovasi',150000000,3,7,9,'6;Purwarupa Hasil Kerjasama','4#5',11,0),
('0106','01','Matching Grant',200000000,2,5,9,'2;Artikel Ilmiah Pada Jurnal Internasional bereputasi#6;Purwarupa Hasil Kerjasama','',11,0),
('0107','01','Tenaga Kependidikan (Tendik)',15000000,1,2,3,'5;Dokumen SOP','2',11,0),
('0201','02','Sains dan Teknologi',40000000,1,1,9,'','',11,0),
('0202','02','Unggulan Fakultas',4294967295,1,1,9,'','',11,0),
('0203','02','Kerjasama',4294967295,1,1,9,'','',11,0),
('0301','03','Penelitian Terapan Unggulan Perguruan Tinggi',4294967295,1,1,9,'','',11,0),
('0302','03','Penelitian Tim Pasca Sarjana',4294967295,1,1,9,'','',11,0),
('0303','03','Penelitian Disertasi Doktor',4294967295,1,1,9,'','',11,0),
('0304','03','Penelitian Strategis Nasional Institusi',4294967295,1,1,9,'','',11,0),
('0305','03','Penelitian Berbasis Kompetensi',4294967295,1,1,9,'','',11,0),
('0306','03','Penelitian Pendidikan Magister menuju Doktor untuk Sarjana Unggul',4294967295,1,1,9,'','',11,0),
('0307','03','Penelitian Dasar\r\n',4294967295,1,1,9,'','',11,0),
('0308','03','Penelitian Terapan\r\n',4294967295,1,1,9,'','',11,0),
('0401','04','Pengabdian Regular',12500000,1,1,9,'2;Artikel Ilmiah Pada Jurnal Nasional/Internasional Bereputasi','',11,0),
('0402','04','Pengabdian Inovasi',30000000,1,1,9,'5;produk berupa alat, protitpe, sistem, aplikasi, software','',11,0),
('0403','04','KKN Tematik',20000000,1,1,9,'','',11,0),
('0404','04','Pengabdian Desa Binaan',25000000,1,1,9,'','',11,0),
('0501','05','Pengabdian Regular',12500000,1,1,9,'','',11,0);

/*Table structure for table `sub_jenis_luaran` */

DROP TABLE IF EXISTS `sub_jenis_luaran`;

CREATE TABLE `sub_jenis_luaran` (
  `id_sub_jenis_luaran` varchar(4) NOT NULL,
  `id_jenis_luaran` varchar(2) NOT NULL,
  `nama_sub_jenis_luaran` varchar(255) NOT NULL,
  PRIMARY KEY (`id_sub_jenis_luaran`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sub_jenis_luaran` */

insert  into `sub_jenis_luaran`(`id_sub_jenis_luaran`,`id_jenis_luaran`,`nama_sub_jenis_luaran`) values 
('0101','01','Proceeding Internasional'),
('0102','01','Proceeding Nasional'),
('0103','01','Proceeding Lokal'),
('0201','02','Journal Internasional'),
('0202','02','Journal Nasional'),
('0203','02','Journal Lokal'),
('0301','03','Buku dengan ISBN'),
('0302','03','Buku dengan Chapter'),
('0401','04','Paten Sederhana'),
('0402','04','Hak Cipta'),
('0403','04','Merek Dagang'),
('0404','04','Rahasia Dagang'),
('0405','04','Desain Produk Industri'),
('0406','04','Indikasi Geografis'),
('0407','04','Perlindungan Varietas Tanaman'),
('0408','04','Perlindung Topografi Sirkuit Terpadu'),
('0501','05','Metode'),
('0502','05','Teknologi Tepat Guna'),
('0503','05','Cetak Biru (Blueprint)'),
('0504','05','Purwarupa'),
('0505','05','Sistem'),
('0506','05','Kebijakan'),
('0507','05','Model'),
('0601','06','Kerjasama Internasional'),
('0602','06','Kerjasama Nasional'),
('0603','06','Kerjasama Lokal');

/*Table structure for table `tahap` */

DROP TABLE IF EXISTS `tahap`;

CREATE TABLE `tahap` (
  `id_tahap` int unsigned NOT NULL,
  `nama_tahap` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tahap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `tahap` */

insert  into `tahap`(`id_tahap`,`nama_tahap`) values 
(1,'Usulan Baru'),
(2,'Review Pimpinan'),
(3,'Penunjukkan Reviewer'),
(4,'Review Usulan'),
(5,'Perbaikan Usulan'),
(6,'Kemajuan Kegiatan'),
(7,'Review Kemajuan'),
(8,'Akhir Kegiatan'),
(9,'Review Akhir');

/*Table structure for table `tahun` */

DROP TABLE IF EXISTS `tahun`;

CREATE TABLE `tahun` (
  `tahun` year NOT NULL,
  PRIMARY KEY (`tahun`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `tahun` */

insert  into `tahun`(`tahun`) values 
(2019),
(2020),
(2021);

/*Table structure for table `tkt` */

DROP TABLE IF EXISTS `tkt`;

CREATE TABLE `tkt` (
  `id_tkt` int unsigned NOT NULL,
  `nama_tkt` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tkt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `tkt` */

insert  into `tkt`(`id_tkt`,`nama_tkt`) values 
(1,'Prinsip dasar dari teknologi diteliti dan dilaporkan'),
(2,'Formulasi konsep dan/atau aplikasi formulasi'),
(3,'Pembuktian konsep fungsi dan/atau karakteristik penting secara analitis dan eksperimental '),
(4,'Validasi komponen/subsistem dalam lingkungan laboratorium'),
(5,'Validasi komponen/subsistem dalam suatu lingkungan yang relevan'),
(6,'Demonstrasi model atau prototype system/subsistem dalam suatu lingkungan yang relevan'),
(7,'Demonstrasi prototype system dalam lingkungan sebenarnya'),
(8,'Sistem telah lengkap dan handal melalui pengujian dan demonstrasi dalam lingkungan yang sebenarnya'),
(9,'Sistem benar-benar teruji/terbukti melalui keberhasilan pengoperasian');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id_user` int unsigned NOT NULL AUTO_INCREMENT,
  `id_role` int unsigned NOT NULL,
  `id_program_studi` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `nohp` varchar(16) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `id_jabatan_fungsional` int unsigned DEFAULT NULL,
  `id_jabatan_struktural` int unsigned DEFAULT NULL,
  `id_jenjang_pendidikan` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `user_username_uq` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user` */

insert  into `user`(`id_user`,`id_role`,`id_program_studi`,`username`,`password`,`nama_user`,`nohp`,`email`,`profile_picture`,`id_jabatan_fungsional`,`id_jabatan_struktural`,`id_jenjang_pendidikan`) values 
(1,2,1,'dosen1','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Dosen #1','083251252245','dosen1@lppm.com',NULL,11,NULL,1),
(2,2,1,'dosen2','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Dosen #2','084323515536','dosen2@lppm.com',NULL,1,2,3),
(3,2,1,'dosen3','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Dosen #3','084323515536','dosen3@lppm.com',NULL,11,NULL,1),
(4,2,1,'dosen4','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Dosen #4','084323515536','dosen4@lppm.com',NULL,1,NULL,3),
(5,2,2,'dosen5','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Dosen #5','084323515536','dosen5@lppm.com',NULL,1,NULL,3),
(6,2,2,'dosen6','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Dosen #6','084323515536','dosen6@lppm.com',NULL,11,NULL,1),
(991,1,901,'admin','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Admin LPPM','084323515536','admin@lppm.com','http://localhost:8888/profile_picture/ed7f4836c70302f37508119a841165e3',NULL,NULL,NULL),
(992,1,0,'delete_this','$2b$08$n5MJoayA3kcDGRxlgBO.MutNQLy9RfThQr9hkuCLog5UMpYapwlNy','Delete This','23124123123123','deletethis@lppm.com',NULL,NULL,NULL,NULL),
(993,2,1,'edit_this','$2b$08$3AMO2a5IouGvRv76CjqfROUQsrL/8EyKdLYOVdg8XVHAw2sLW11/i','Edit This','084323515536','editthis@lppm.com',NULL,11,NULL,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
