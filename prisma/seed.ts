import { Category, Prisma, PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { stringPath } from '../src/graphql/schema/book/utils';
import { backupBanner, backupBookImgCat, backupFooter } from './backup';

const prisma = new PrismaClient()

type TBookImage = {
  id: string;
  publicId: string;
  type: string;
  url: string;
  secureUrl: string;
  createdAt: string;
  updatedAt: string;
}[]

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

  const bookData: Prisma.BookCreateInput[] = backupBookImgCat.data.books.map((book) => ({
    ...book,
    Images: { connectOrCreate: book.Images.map((img) => ({ where: { id: img.id }, create: img })) },
    Categories: { connectOrCreate: book.Categories.map((cat) => ({ where: { id: cat.id }, create: cat })) }
  }))

  const bannerData: Prisma.BannerCreateInput[] = backupBanner.data.banners

  
  const footerData: Prisma.FooterInfoCreateInput[] = backupFooter.data.footerInfo.map((footer) => ({
    ...footer,
    Group: { connectOrCreate: { where: { id: footer.Group.id }, create: footer.Group } },
  }))


  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  for (const u of bookData) {
    const createBook = await prisma.book.create({
      data: u,
    })
    console.log(`Created Book with id: ${createBook.id}`)
  }

  for (const u of bannerData) {
    const create = await prisma.banner.create({
      data: u,
    })
    console.log(`Created Banner with id: ${create.id}`)
  }

  for (const u of footerData) {
    const create = await prisma.footerInfo.create({
      data: u,
    })
    console.log(`Created footerData with id: ${create.id}`)
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
