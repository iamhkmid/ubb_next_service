import { Category, Prisma, PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { stringPath } from '../src/graphql/schema/book/utils';
import { backupBanner, backupBookImgCat, backupFooter } from './backup';
import path from "path"
import https from "https"
import fs from "fs"
import util from "util"

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

export const makeDir = async (dirLoc: string) => {
  const fsMkdir = util.promisify(fs.mkdir);
  const dir = path.join(process.cwd(), dirLoc);
  if (!fs.existsSync(dir))
    await fsMkdir(dir, { recursive: true }).catch((err) => {
      throw new Error("Failed make directory");
    });
  return { pictureDir: dirLoc };
};

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

  const bookData: Prisma.BookCreateInput[] = backupBookImgCat.data.books.map((book) => {
    const cover = book.Images.find((val) => val.type === "COVER")
    let imageDirectory = `/../uploads/images/books/${book.title}`
    if (cover) {
      const filename = cover.publicId.split("/")[2]
      imageDirectory = `/../uploads/images/books/${filename}`
    }
    return {
      ...book,
      imageDirectory,
      Images: {
        connectOrCreate: book.Images.map((img) => {
          const { id, createdAt, updatedAt, type, publicId } = img
          const filename = publicId.split("/")[2]
          const dirName = `/uploads/images/books/${filename}`
          const pathName = path.format({ dir: dirName, base: `${filename}.jpg` })

          return { where: { id: img.id }, create: { id, createdAt, updatedAt, type, path: pathName } }
        })
      },
      Categories: { connectOrCreate: book.Categories.map((cat) => ({ where: { id: cat.id }, create: cat })) }
    }
  })

  const bannerData: Prisma.BannerCreateInput[] = backupBanner.data.banners.map((banner) => {
    const { id, publicId, createdAt, updatedAt } = banner
    const filename = publicId.split("/")[2]
    const image = path.format({ dir: "/uploads/images/banner", base: `${filename}.svg` })
    return { id, createdAt, updatedAt, image }
  })


  const footerData: Prisma.FooterInfoCreateInput[] = backupFooter.data.footerInfo.map((footer) => {
    const { publicId, Group, image: img, ...rest } = footer
    let image = null
    if (publicId) {
      const filename = publicId!.split("/")[2]
      image = path.format({ dir: "/uploads/images/contact", base: `${filename}.svg` })
    }
    return {
      ...rest,
      ...(image ? { image } : {}),
      Group: { connectOrCreate: { where: { id: footer.Group.id }, create: footer.Group } },
    }
  })

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
