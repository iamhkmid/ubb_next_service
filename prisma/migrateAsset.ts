import { backupBanner, backupBookImgCat, backupFooter } from "./backup"
import path from "path"
import fs from "fs"
import https from "https"
import util from "util"

type Timg = {
  id: string;
  publicId: string;
  type: string;
  url: string;
  secureUrl: string;
  createdAt: string;
  updatedAt: string;
}


export const makeDir = async (dirLoc: string) => {
  const fsMkdir = util.promisify(fs.mkdir);
  const dir = path.join(process.cwd(), `/..${dirLoc}`);
  if (!fs.existsSync(dir))
    await fsMkdir(dir, { recursive: true }).catch((err) => {
      throw new Error("Failed make directory");
    });
  return { pictureDir: dirLoc };
};

const migrateBook = async () => {
  console.log("--------------------- MIGRATE BOOK ASSETS ---------------------")
  for (const u of backupBookImgCat.data.books.reduce((acc, curr) => ([...acc, ...curr.Images]), [] as Timg[])) {

    const { secureUrl, publicId } = u
    const filename = publicId.split("/")[2]
    const dirName = `/uploads/images/books/${filename}`
    const ext = "jpg"
    const pathName = path.format({ dir: dirName, base: `${filename}.${ext}` })
    await makeDir(dirName)
    if (fs.existsSync(path.join(process.cwd(), `/..${pathName}`))) {
      console.log(`Skip: ${filename}.${ext} already exist`);
    } else {
      const download = async () => new Promise((resolve, reject) => {
        https.get(secureUrl, (res) => {
          const dirPath = path.join(process.cwd(), `/..${pathName}`)
          const filePath = fs.createWriteStream(dirPath);
          res.pipe(filePath);
          filePath.on('finish', () => {
            filePath.close();
            console.log(`Download file: ${filename}.${ext} Completed`);
            resolve("success")
          }).on("error", (err) => {
            reject("failed")
            console.log("failed")
          });
        })
      })
      await download()
    }
  }
}

const migrateBanner = async () => {
  console.log("--------------------- MIGRATE BANNER ASSETS ---------------------")
  for (const u of backupBanner.data.banners) {

    const { image, publicId } = u
    const filename = publicId.split("/")[2]
    const dirName = `/uploads/images/banner`
    const ext = "jpg"
    const pathName = path.format({ dir: dirName, base: `${filename}.${ext}` })
    await makeDir(dirName)
    if (fs.existsSync(path.join(process.cwd(), `/..${pathName}`))) {
      console.log(`Skip: ${filename}.${ext} already exist`);
    } else {
      const download = async () => new Promise((resolve, reject) => {
        https.get(image, (res) => {
          const dirPath = path.join(process.cwd(), `/..${pathName}`)
          const filePath = fs.createWriteStream(dirPath);
          res.pipe(filePath);
          filePath.on('finish', () => {
            filePath.close();
            console.log(`Download file: ${filename}.${ext} Completed`);
            resolve("success")
          }).on("error", (err) => {
            reject("failed")
            console.log("failed")
          });
        })
      })
      await download()
    }
  }
}


const migrateFooter = async () => {
  console.log("--------------------- MIGRATE BANNER ASSETS ---------------------")
  for (const u of backupFooter.data.footerInfo) {

    const { image, publicId } = u
    if (image) {
      const filename = publicId!.split("/")[2]
      const dirName = `/uploads/images/contact`
      const ext = "svg"
      const pathName = path.format({ dir: dirName, base: `${filename}.${ext}` })
      await makeDir(dirName)
      if (fs.existsSync(path.join(process.cwd(), `/..${pathName}`))) {
        console.log(`Skip: ${filename}.${ext} already exist`);
      } else {
        const download = async () => new Promise((resolve, reject) => {
          https.get(image!, (res) => {
            const dirPath = path.join(process.cwd(), `/..${pathName}`)
            const filePath = fs.createWriteStream(dirPath);
            res.pipe(filePath);
            filePath.on('finish', () => {
              filePath.close();
              console.log(`Download file: ${filename}.${ext} Completed`);
              resolve("success")
            }).on("error", (err) => {
              reject("failed")
              fs.rmSync(path.join(process.cwd(), pathName), { recursive: true })
              console.log("failed")
            });
          })
        })
        await download()
      }
    }
  }
}

const main = async () => {
  await migrateBook()
  await migrateBanner()
  await migrateFooter()
}

main()