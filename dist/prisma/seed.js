"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const salt = await bcrypt_1.default.genSalt();
    let password1 = await bcrypt_1.default.hash("ubbpress2023", salt);
    const userData = [
        {
            fullName: "UBB Press",
            role: "ADMIN",
            isActive: true,
            username: "ubb_press",
            password: password1
        },
    ];
    const categoriesData = [
        {
            nameId: "Petualangan",
            nameEn: "Adventure"
        }
    ];
    const bookData = ({ categoriesIDs }) => {
        return [
            {
                title: "Laskar Pelangi",
                authorName: "Andrea Hirata",
                price: 100000,
                stock: 100,
                publisher: "Bentang Pustaka",
                description: "Mereka bersekolah dan belajar pada kelas yang sama dari kelas 1 SD sampai kelas 3 SMP, dan menyebut diri mereka sebagai Laskar Pelangi. Pada bagian-bagian akhir cerita, anggota Laskar Pelangi bertambah satu anak perempuan yang bernama Flo, seorang murid pindahan. Keterbatasan yang ada bukan membuat mereka putus asa, tetapi malah membuat mereka terpacu untuk dapat melakukan sesuatu yang lebih baik.",
                printType: "E-Book",
                numberOfPages: 529,
                isbn: "Masih dalam proses",
                slug: "laskar-pelangi",
                Images: {
                    create: [
                        {
                            publicId: "books/Laskar_pelangi_sampul_gw0fk6",
                            type: "COVER",
                            url: "http://res.cloudinary.com/diw72nenn/image/upload/v1674189287/ubb_press/books/Laskar_pelangi_sampul_gw0fk6.jpg",
                            secureUrl: "https://res.cloudinary.com/diw72nenn/image/upload/v1674189287/ubb_press/books/Laskar_pelangi_sampul_gw0fk6.jpg"
                        }
                    ]
                },
                Categories: { connect: categoriesIDs }
            },
            {
                title: "Sang Pemimpi",
                authorName: "Andrea Hirata",
                price: 100000,
                stock: 100,
                publisher: "Bentang Pustaka",
                description: "Mereka bersekolah dan belajar pada kelas yang sama dari kelas 1 SD sampai kelas 3 SMP, dan menyebut diri mereka sebagai Laskar Pelangi. Pada bagian-bagian akhir cerita, anggota Laskar Pelangi bertambah satu anak perempuan yang bernama Flo, seorang murid pindahan. Keterbatasan yang ada bukan membuat mereka putus asa, tetapi malah membuat mereka terpacu untuk dapat melakukan sesuatu yang lebih baik.",
                printType: "E-Book",
                numberOfPages: 292,
                isbn: "Masih dalam proses",
                slug: "sang-pemimpi",
                Images: {
                    create: [
                        {
                            publicId: "ubb_press/books/Sang_Pemimpi_sampul_luff13",
                            type: "COVER",
                            url: "http://res.cloudinary.com/diw72nenn/image/upload/v1674189287/ubb_press/books/Sang_Pemimpi_sampul_luff13.jpg",
                            secureUrl: 'https://res.cloudinary.com/diw72nenn/image/upload/v1674189287/ubb_press/books/Sang_Pemimpi_sampul_luff13.jpg'
                        }
                    ]
                },
                Categories: { connect: categoriesIDs }
            },
        ];
    };
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    const categories = [];
    for (const c of categoriesData) {
        const category = await prisma.category.create({
            data: c,
        });
        categories.push(category);
        console.log(`Created category with id: ${category.id}`);
    }
    for (const u of bookData({ categoriesIDs: categories.map((val) => ({ id: val.id })) })) {
        const book = await prisma.book.create({
            data: u,
        });
        console.log(`Created book with id: ${book.id}`);
    }
    console.log(`Seeding finished.`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
