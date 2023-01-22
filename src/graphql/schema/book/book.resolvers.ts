import { GraphQLError } from "graphql";
import cloudinary from "../../../libs/cloudinary";
import { BookResolvers, MutationResolvers, QueryResolvers } from "../../../types/graphql";
import { saveBooks, stringPath } from "./utils";

export const Query: QueryResolvers = {
  books: async (_, __, { db }) => await db.book.findMany(),
  book: async (_, { bookId }, { db }) => await db.book.findUnique({ where: { id: bookId } })
};

export const Mutation: MutationResolvers = {
  addBook: async (_, { data, images }, { req }) => {
    const imagesUpload = await saveBooks(images as { data: any; type: string; }[])
    const addBook = await prisma.book.create({
      data: {
        title: data.title || undefined,
        authorName: data.authorName || undefined,
        price: data.price || undefined,
        stock: data.stock || undefined,
        publisher: data.publisher || undefined,
        description: data.description || undefined,
        printType: data.printType || undefined,
        numberOfPages: data.numberOfPages || undefined,
        isbn: data.isbn || undefined,
        slug: stringPath(`${data.publisher}-${data.title}`),
        Images: {
          create: imagesUpload?.map((image) => (
            {
              publicId: image.publicId!,
              url: image.url,
              type: image.type,
              secureUrl: image.secureUrl,
            }))
        }
      },
    })
    return addBook
  }
}

export const Book: BookResolvers = {
  Images: async ({ id }, __, { db }) => db.bookImage.findMany({ where: { bookId: id! } }),
  Categories: async ({ id }, __, { db }) => db.category.findMany({ where: { Books: { some: { id: id! } } } }),
};
