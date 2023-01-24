import { GraphQLError } from "graphql";
import cloudinary from "../../../libs/cloudinary";
import { BookResolvers, MutationResolvers, QueryResolvers } from "../../../types/graphql";
import { stringPath } from "./utils";

export const Query: QueryResolvers = {
  books: async (_, __, { db }) => await db.book.findMany(),
  book: async (_, { bookId, slug }, { db }) => await db.book.findUnique({ where: { id: bookId!, slug: slug! } }),
  bookcategories: async (_, __, { db }) => await db.category.findMany(),
  bookcategory: async (_, { categoryId }, { db }) => await db.category.findUnique({ where: { id: categoryId } }),
};

export const Mutation: MutationResolvers = {
  addBook: async (_, { data }, { db }) => {
    const addBook = await db.book.create({
      data: {
        title: data.title,
        authorName: data.authorName,
        price: data.price,
        stock: data.stock,
        publisher: data.publisher,
        description: data.description,
        printType: data.printType,
        numberOfPages: data.numberOfPages,
        isbn: data.isbn,
        slug: stringPath(`${data.publisher}-${data.title}`)
      },
    })
    return addBook
  },
  updateBook: async (_, { data }, { db }) => {
    const updateBook = await db.book.update({
      where: { id: data.bookId },
      data: {
        title: data.title || undefined,
        authorName: data.authorName || undefined,
        price: data.price || undefined,
        stock: data.stock || undefined,
        publisher: data.publisher || undefined,
        description: data.description || undefined,
        printType: data.printType || undefined,
        numberOfPages: data.numberOfPages || undefined,
        isbn: data.isbn || undefined
      },
    })
    return updateBook
  },
  deleteBook: async (_, { bookId }, { db, cloudinary }) => {
    const findBook = await db.book.findUnique({ where: { id: bookId }, select: { Images: { select: { publicId: true } } } })
    const deleteBook = await db.book.delete({ where: { id: bookId } })
    for (const img of findBook?.Images || []) {
      await cloudinary.uploader.destroy(img.publicId)
    }
    return deleteBook
  },
  addBookCategory: async (_, { data }, { db }) => {
    const addBookCategory = await db.category.create({
      data: {
        nameEn: data.nameEn,
        nameId: data.nameId,
      },
    })
    return addBookCategory
  },
  updateBookCategory: async (_, { data }, { db }) => {
    const updateBookCategory = await db.category.update({
      where: { id: data.categoryId },
      data: {
        nameEn: data.nameEn || undefined,
        nameId: data.nameId || undefined,
      },
    })
    return updateBookCategory
  },
  deleteBookCategory: async (_, { categoryId }, { db }) => {
    const deleteBookCategory = await db.category.delete({ where: { id: categoryId } })
    return deleteBookCategory
  },
}

export const Book: BookResolvers = {
  Images: async ({ id }, __, { db }) => db.bookImage.findMany({ where: { bookId: id! } }),
  Categories: async ({ id }, __, { db }) => db.category.findMany({ where: { Books: { some: { id: id! } } } }),
};
