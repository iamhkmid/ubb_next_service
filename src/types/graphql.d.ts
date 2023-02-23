import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TGraphqlCtx } from './graphql_ctx';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Banner = {
  __typename?: 'Banner';
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Book = {
  __typename?: 'Book';
  Categories?: Maybe<Array<Maybe<BookCategory>>>;
  Images?: Maybe<Array<Maybe<BookImage>>>;
  authorName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  imageDirectory?: Maybe<Scalars['String']>;
  isbn?: Maybe<Scalars['String']>;
  numberOfPages?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  printType?: Maybe<Scalars['String']>;
  publicationYear?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type BookCategory = {
  __typename?: 'BookCategory';
  books?: Maybe<Array<Maybe<Book>>>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type BookImage = {
  __typename?: 'BookImage';
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
};

export enum EnumSortBookBy {
  New = 'NEW'
}

export type FooterInfo = {
  __typename?: 'FooterInfo';
  Group?: Maybe<FooterInfoGroup>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  value?: Maybe<Scalars['String']>;
};

export type FooterInfoGroup = {
  __typename?: 'FooterInfoGroup';
  FooterInfos?: Maybe<Array<Maybe<FooterInfo>>>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBanner?: Maybe<Banner>;
  addBook?: Maybe<Book>;
  addBookCategory?: Maybe<BookCategory>;
  deleteBanner?: Maybe<Banner>;
  deleteBook?: Maybe<Book>;
  deleteBookCategory?: Maybe<BookCategory>;
  login?: Maybe<LoginData>;
  updateBook?: Maybe<Book>;
  updateBookCategory?: Maybe<BookCategory>;
  updateFooterInfo?: Maybe<FooterInfo>;
};


export type MutationAddBannerArgs = {
  imageBase64: Scalars['String'];
};


export type MutationAddBookArgs = {
  cover: Scalars['String'];
  data: AddBookInput;
};


export type MutationAddBookCategoryArgs = {
  data: AddBookCategoryInput;
};


export type MutationDeleteBannerArgs = {
  bannerId: Scalars['ID'];
};


export type MutationDeleteBookArgs = {
  bookId: Scalars['ID'];
};


export type MutationDeleteBookCategoryArgs = {
  categoryId: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateBookArgs = {
  cover?: InputMaybe<Scalars['String']>;
  data: UpdateBookInput;
};


export type MutationUpdateBookCategoryArgs = {
  data: UpdateBookCategoryInput;
};


export type MutationUpdateFooterInfoArgs = {
  data: UpdateFooterInfoInput;
};

export type Query = {
  __typename?: 'Query';
  banners?: Maybe<Array<Maybe<Banner>>>;
  book?: Maybe<Book>;
  bookCategories?: Maybe<Array<Maybe<BookCategory>>>;
  bookCategory?: Maybe<BookCategory>;
  books?: Maybe<Array<Maybe<Book>>>;
  footerInfo?: Maybe<Array<Maybe<FooterInfo>>>;
};


export type QueryBookArgs = {
  bookId?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['ID']>;
};


export type QueryBookCategoryArgs = {
  categoryId: Scalars['ID'];
};


export type QueryBooksArgs = {
  options?: InputMaybe<QueryBookOptionsInput>;
};


export type QueryFooterInfoArgs = {
  footerInfoId?: InputMaybe<Scalars['ID']>;
  group?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
};

export type AddBookCategoryInput = {
  name: Scalars['String'];
};

export type AddBookInput = {
  authorName: Scalars['String'];
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  isbn: Scalars['String'];
  numberOfPages: Scalars['Int'];
  price?: InputMaybe<Scalars['Int']>;
  printType: Scalars['String'];
  publicationYear: Scalars['Int'];
  publisher: Scalars['String'];
  stock?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};

export enum AuthRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type DeleteBook = {
  __typename?: 'deleteBook';
  authorName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isbn?: Maybe<Scalars['String']>;
  numberOfPages?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  printType?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  stock?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type LoginData = {
  __typename?: 'loginData';
  message?: Maybe<Scalars['String']>;
  user?: Maybe<LoginUserData>;
};

export type LoginUserData = {
  __typename?: 'loginUserData';
  fullName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type QueryBookOptionsInput = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  cursor?: InputMaybe<Scalars['String']>;
  maxAmount?: InputMaybe<Scalars['Int']>;
  minAmount?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<EnumSortBookBy>;
  take?: InputMaybe<Scalars['Int']>;
};

export type UpdateBookCategoryInput = {
  categoryId: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateBookInput = {
  authorName?: InputMaybe<Scalars['String']>;
  bookId: Scalars['ID'];
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  isbn?: InputMaybe<Scalars['String']>;
  numberOfPages?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Int']>;
  printType?: InputMaybe<Scalars['String']>;
  publicationYear?: InputMaybe<Scalars['Int']>;
  publisher?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateFooterInfoInput = {
  footerInfoId: Scalars['ID'];
  label?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Banner: ResolverTypeWrapper<Banner>;
  Book: ResolverTypeWrapper<Book>;
  BookCategory: ResolverTypeWrapper<BookCategory>;
  BookImage: ResolverTypeWrapper<BookImage>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  EnumSortBookBy: EnumSortBookBy;
  FooterInfo: ResolverTypeWrapper<FooterInfo>;
  FooterInfoGroup: ResolverTypeWrapper<FooterInfoGroup>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  addBookCategoryInput: AddBookCategoryInput;
  addBookInput: AddBookInput;
  authRole: AuthRole;
  deleteBook: ResolverTypeWrapper<DeleteBook>;
  loginData: ResolverTypeWrapper<LoginData>;
  loginUserData: ResolverTypeWrapper<LoginUserData>;
  queryBookOptionsInput: QueryBookOptionsInput;
  updateBookCategoryInput: UpdateBookCategoryInput;
  updateBookInput: UpdateBookInput;
  updateFooterInfoInput: UpdateFooterInfoInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Banner: Banner;
  Book: Book;
  BookCategory: BookCategory;
  BookImage: BookImage;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  FooterInfo: FooterInfo;
  FooterInfoGroup: FooterInfoGroup;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  addBookCategoryInput: AddBookCategoryInput;
  addBookInput: AddBookInput;
  deleteBook: DeleteBook;
  loginData: LoginData;
  loginUserData: LoginUserData;
  queryBookOptionsInput: QueryBookOptionsInput;
  updateBookCategoryInput: UpdateBookCategoryInput;
  updateBookInput: UpdateBookInput;
  updateFooterInfoInput: UpdateFooterInfoInput;
};

export type AuthDirectiveArgs = {
  requires: AuthRole;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = TGraphqlCtx, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BannerResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Banner'] = ResolversParentTypes['Banner']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  Categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookCategory']>>>, ParentType, ContextType>;
  Images?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookImage']>>>, ParentType, ContextType>;
  authorName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageDirectory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isbn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  printType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicationYear?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publisher?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookCategoryResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['BookCategory'] = ResolversParentTypes['BookCategory']> = {
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookImageResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['BookImage'] = ResolversParentTypes['BookImage']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FooterInfoResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['FooterInfo'] = ResolversParentTypes['FooterInfo']> = {
  Group?: Resolver<Maybe<ResolversTypes['FooterInfoGroup']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FooterInfoGroupResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['FooterInfoGroup'] = ResolversParentTypes['FooterInfoGroup']> = {
  FooterInfos?: Resolver<Maybe<Array<Maybe<ResolversTypes['FooterInfo']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBanner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<MutationAddBannerArgs, 'imageBase64'>>;
  addBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationAddBookArgs, 'cover' | 'data'>>;
  addBookCategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<MutationAddBookCategoryArgs, 'data'>>;
  deleteBanner?: Resolver<Maybe<ResolversTypes['Banner']>, ParentType, ContextType, RequireFields<MutationDeleteBannerArgs, 'bannerId'>>;
  deleteBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationDeleteBookArgs, 'bookId'>>;
  deleteBookCategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<MutationDeleteBookCategoryArgs, 'categoryId'>>;
  login?: Resolver<Maybe<ResolversTypes['loginData']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  updateBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationUpdateBookArgs, 'data'>>;
  updateBookCategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<MutationUpdateBookCategoryArgs, 'data'>>;
  updateFooterInfo?: Resolver<Maybe<ResolversTypes['FooterInfo']>, ParentType, ContextType, RequireFields<MutationUpdateFooterInfoArgs, 'data'>>;
};

export type QueryResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  banners?: Resolver<Maybe<Array<Maybe<ResolversTypes['Banner']>>>, ParentType, ContextType>;
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, Partial<QueryBookArgs>>;
  bookCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookCategory']>>>, ParentType, ContextType>;
  bookCategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<QueryBookCategoryArgs, 'categoryId'>>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType, Partial<QueryBooksArgs>>;
  footerInfo?: Resolver<Maybe<Array<Maybe<ResolversTypes['FooterInfo']>>>, ParentType, ContextType, Partial<QueryFooterInfoArgs>>;
};

export type DeleteBookResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['deleteBook'] = ResolversParentTypes['deleteBook']> = {
  authorName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isbn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  printType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publisher?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginDataResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['loginData'] = ResolversParentTypes['loginData']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['loginUserData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginUserDataResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['loginUserData'] = ResolversParentTypes['loginUserData']> = {
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = TGraphqlCtx> = {
  Banner?: BannerResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  BookCategory?: BookCategoryResolvers<ContextType>;
  BookImage?: BookImageResolvers<ContextType>;
  Date?: GraphQLScalarType;
  FooterInfo?: FooterInfoResolvers<ContextType>;
  FooterInfoGroup?: FooterInfoGroupResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  deleteBook?: DeleteBookResolvers<ContextType>;
  loginData?: LoginDataResolvers<ContextType>;
  loginUserData?: LoginUserDataResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = TGraphqlCtx> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
