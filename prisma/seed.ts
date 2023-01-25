import { Category, Prisma, PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { stringPath } from '../src/graphql/schema/book/utils';

const prisma = new PrismaClient()

async function main() {

  const salt = await bcrypt.genSalt();
  let password1 = await bcrypt.hash("ubbpress2023", salt);

  const userData: Prisma.UserCreateInput[] = [
    {
      fullName: "UBB Press",
      role: "ADMIN",
      isActive: true,
      username: "ubb_press",
      password: password1
    },
  ]

  const categoriesData: Prisma.CategoryCreateInput[] = []

  type TBookData = (p: { categoriesIDs: { id: string }[] }) => Prisma.BookCreateInput[]

  const bookData: TBookData = ({ categoriesIDs }) => {
    return [
      {
        title: "Pengantar Kriminologi",
        authorName: "Dwi Haryadi dan Ndaru Satrio",
        price: 0,
        stock: 0,
        publisher: "UBB Press",
        description: "Bab 1 berisi Pendahuluan yang isinya merupakan deskripsi tentang mata kuliah kriminologi, tujuan, dan metode pembelajarannya. Sementara, di bab 2 mengupas perkembangan awal kriminologi mulai dari faktor pendorong lahirnya, posisinya sebagai ilmu dan tujuan serta pendekatan yang digunakan. Di bab 3 banyak bicara tentang aliran-aliran yang berkembang dalam kriminologi. Bab 4 mengambil judul teori-teori kriminologi. Mengingat perkembangan teori kriminologi yang begitu luas dan saling bersinggungan tentu saja bahasan di sini tidak cukup untuk mendeskripsikan semuanya. Selanjutnya, bab 5 sampai dengan bab 8 materinya bergeser kepada fenomena kejahatan yang terjadi di masyarakat dengan faktor kriminogennya. Ada 4 fenomena yang dipilih, yakni delinkuensi anak, prostitusi anak, kasus bunuh diri, dan illegal mining timah. Pembahasan 4 fenomena ini tentu hanya sebagai pemantik untuk memancing sifat kritis mahasiswa dan pembaca terhadap banyaknya kasus unik di sekitar kita yang tidak hanya butuh upaya penegakan hukum, tetapi lebih dalam mengungkap faktor kausa yang kompleks dan butuh pendekatan preventif yang multisektor. ",
        printType: "Cetak",
        numberOfPages: 51,
        isbn: "dalam proses",
        publicationYear : 2022,
        slug: stringPath("Pengantar Kriminologi-Dwi Haryadi dan Ndaru Satrio"),
        createdAt: "2023-01-25T05:00:39.545Z",
        updatedAt: "2023-01-25T05:00:39.545Z",
        Images: {
          create: [
            {
              publicId: "ubb_press/books/rszbdke2adviip40jech",
              type: "COVER",
              url: "http://res.cloudinary.com/diw72nenn/image/upload/v1674622841/ubb_press/books/rszbdke2adviip40jech.jpg",
              secureUrl: "https://res.cloudinary.com/diw72nenn/image/upload/v1674622841/ubb_press/books/rszbdke2adviip40jech.jpg"
            }
          ]
        }
      },
      {
        title: "Ergonomi Partisipatif di Pertambangan Timah Indonesia",
        authorName: "R. Priyoko Prayitnoadi",
        price: 83500,
        stock: 80,
        publisher: "UBB Press",
        description: "Ribuan karyawan di perusahaan kecil dan menengah (UKM) di industri pertambangan timah bekerja di lingkungan berbahaya tanpa program keselamatan dan perlindungan kesehatan yang memadai. Keselamatan kerja (K2) menjadi fokus utama dalam hal mencegah insiden berbahaya yang dapat menyebabkan cedera serius dan kematian, mengingat bahwa penambangan melibatkan aktivitas berbahaya dan beresiko tinggi. Selama kurang lebih satu dekade, PT Timah, perusahaan timah milik negara,  telah berkolaborasi dengan sejumlah usaha kecil dan menengah (UKM) swasta yang bekerja di lebih dari 400 lokasi di bawah skema kerjasama. Meskipun menerapkan K2 dan program kesehatan di perusahaan utama, program yang sama belum dimasukkan dalam skema kerja sama operasi penambangan timah di UKM. Penelitian ini difokuskan pada pendekatan Participatory Ergonomics  (PE). Metode scenario based design (SBD) digunakan untuk menyelidiki penerimaan PE, sedangkan teknik Delphi dua putaran diterapkan untuk mencapai konsensus pada implementasi praktis dari solusi PE. Promosi keselamatan kerja secara teratur melalui pendekatan kekerabatan dan pelatihan keselamatan direkomendasikan untuk menyelesaikan masalah komunikasi, budaya dan pengetahuan yang terkait dengan K2. Konsensus dicapai pada solusi yang diusulkan mengenai implementasi PE dalam industri pertambangan timah, seperti evaluasi sistem remunerasi dan bonus, menggunakan program train-the-trainer, dan sistem pelaporan Keselamatan dan Kesehatan Kerja (K3). ",
        printType: "Cetak",
        numberOfPages: 126,
        isbn: "978-979-1373-65-4",
        publicationYear : 2017,
        slug: stringPath("Ergonomi Partisipatif di Pertambangan Timah Indonesia-R. Priyoko Prayitnoadi"),
        createdAt: "2023-01-25T05:14:29.286Z",
        updatedAt: "2023-01-25T05:14:29.286Z",
        Images: {
          create: [
            {
              publicId: "ubb_press/books/zhao9qdtny38fkrn1qvg",
              type: "COVER",
              url: "http://res.cloudinary.com/diw72nenn/image/upload/v1674623671/ubb_press/books/zhao9qdtny38fkrn1qvg.jpg",
              secureUrl: "https://res.cloudinary.com/diw72nenn/image/upload/v1674623671/ubb_press/books/zhao9qdtny38fkrn1qvg.jpg"
            }
          ]
        }
      },
      {
        title: "Metodologi penelitian bisnis pendekatan kuantitatif & kualitatif : disertai dengan contoh",
        authorName: "Reniati",
        price: 121000,
        stock: 80,
        publisher: "UBB Press",
        description: "Mudrajad Kuncoro (2003 : 3) menyatakan bahwa penelitian ilmiah adalah aplikasi secara formal dan sistematis dari metode ilmiah untuk mempelajari dan menjawab permasalahan. Tujuan penelitian identic dengan tujuan ilmu pengetahuan pada umumnya, yaitu membuat penjelasan, menyusun prediksi, serta mengendalikan fenomena yang terjadi di dalam suatu batasan yang ditentukan penelitian adalah proses, sedangkan ilmu pengetahuan adalah hasil dari penelitian (Nazir, 1988: 13-17). Oleh karena itu, “bahasa dasar” bagi seorang peneliti ditemukan dalam filsafat ilmu. Bangunan dasar suatu ilmu pengetahuan meliputi observasi, fakta, konsep, definisi, variable, masalah, hipotesis, hukum, teori, dan model (Davis & Cosenza, 1993: Bab 2). ",
        printType: "Cetak",
        numberOfPages: 200,
        isbn: "978-979-1373-66-1",
        publicationYear : 2022,
        slug: stringPath("Metodologi penelitian bisnis pendekatan kuantitatif & kualitatif : disertai dengan contoh-Reniati"),
        createdAt: "2023-01-25T05:25:12.995Z",
        updatedAt: "2023-01-25T05:25:12.995Z",
        Images: {
          create: [
            {
              publicId: "ubb_press/books/gfozlprvymhlvc5m9vhx",
              type: "COVER",
              url: "http://res.cloudinary.com/diw72nenn/image/upload/v1674624320/ubb_press/books/gfozlprvymhlvc5m9vhx.png",
              secureUrl: "https://res.cloudinary.com/diw72nenn/image/upload/v1674624320/ubb_press/books/gfozlprvymhlvc5m9vhx.png"
            }
          ]
        }
      },
      {
        title: "Akuntansi syariah : berdasarkan SAK syariah per 1 januari 2019",
        authorName: "Sumiyati, Anggraeni Yunita, Suhaidar",
        price: 69000,
        stock: 80,
        publisher: "UBB Press",
        description: "Akuntansi Syariah menggabungkan dua keilmuan tersendiri, yaitu ilmu  sains tentang akuntansi dan ilmu tentang Islam (syariah). Akuntansi Syariah pada dasarnya merupakan bentuk aplikasi dari nilai – nilai islam sebagai suatu agama yang tidak hanya mengatur masalah keimanan, tapi juga mengatur masalah kehidupan sehari hari. Salah satu ekonom kontemporer muslim menjelaskan bahwa ilmu sains dan agama memiliki tujuan yang selaras, yaitu untuk membuat kehidupan manusia menjadi lebih baik. Sementara ilmu sains lebih menitikberatkan pada suatu yang bersifat fisik dan material, agama lebih menitikberatkan pada suatu yang terkait dengan sosial, mental, emosional dan spiritual. Oleh karena itu, dapat disimpulkan bahwa integrarsi antara akutansi dan syariah (Islam) bukanlah suatu yang bermasalah, tetapi sebaliknya akan membuat akuntansi menjadi lebih sesuai dengan nilai – nilai yang bermanfaat bagi kemanusiaan. ",
        printType: "Cetak",
        numberOfPages: 112,
        isbn: "978-979-1373-62-3",
        publicationYear : 2019,
        slug: stringPath("Akuntansi syariah : berdasarkan SAK syariah per 1 januari 2019-Sumiyati, Anggraeni Yunita, Suhaidar"),
        createdAt: "2023-01-25T05:54:23.799Z",
        updatedAt: "2023-01-25T05:54:23.799Z",
        Images: {
          create: [
            {
              publicId: "ubb_press/books/wmxiqdbhss5kkuy1fsoa",
              type: "COVER",
              url: "http://res.cloudinary.com/diw72nenn/image/upload/v1674626070/ubb_press/books/wmxiqdbhss5kkuy1fsoa.jpg",
              secureUrl: "https://res.cloudinary.com/diw72nenn/image/upload/v1674626070/ubb_press/books/wmxiqdbhss5kkuy1fsoa.jpg"
            }
          ]
        }
      },
      {
        title: "Al Quran & mikrobiologi : catatan seorang mikrobiolog",
        authorName: "Andri Kurniawan",
        price: 81500,
        stock: 80,
        publisher: "UBB Press",
        description: "Pelajaran pertama tentang biologi adalah perkembangan teori kehidupan yang pada akhirnya bersimpul pada diskusi tentang dua teori utama, yaitu abiogenesis dan biogenesis. Pada saat saya harus berpijak dan memihak antara benar dan salah di antara kedua teori, saya berusaha untuk keluar daru doktrin yang telah ada tentang teori – teori tersebut. Saya mencari kebenaran teori yang sebenar-benarnya tentang kehidupan ini dan saya menemukannya di dalam Al Quran. Berbagai uraian tentang teori kehidupan dibaca telah mengantarkan pada suatu akhir kesimpulan di dalam menentukan arah kiblat pemikiran keilmuan saya. ",
        printType: "Cetak",
        numberOfPages: 136,
        isbn: "978-979-1373-61-6",
        publicationYear : 2020,
        slug: stringPath("Al Quran & mikrobiologi : catatan seorang mikrobiolog-Andri Kurniawan"),
        createdAt: "2023-01-25T05:59:23.810Z",
        updatedAt: "2023-01-25T05:59:23.810Z",
        Images: {
          create: [
            {
              publicId: "ubb_press/books/wbznkwt5e1996fn62s6c",
              type: "COVER",
              url: "http://res.cloudinary.com/diw72nenn/image/upload/v1674626366/ubb_press/books/wbznkwt5e1996fn62s6c.png",
              secureUrl: "https://res.cloudinary.com/diw72nenn/image/upload/v1674626366/ubb_press/books/wbznkwt5e1996fn62s6c.png"
            }
          ]
        }
      }
    ]
  }

  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  const categories: Category[] = []
  for (const c of categoriesData) {
    const category = await prisma.category.create({
      data: c,
    })
    categories.push(category)
    console.log(`Created category with id: ${category.id}`)
  }

  for (const u of bookData({ categoriesIDs: categories.map((val) => ({ id: val.id })) })) {
    const book = await prisma.book.create({
      data: u,
    })
    console.log(`Created book with id: ${book.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
