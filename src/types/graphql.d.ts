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

export type Book = {
  __typename?: 'Book';
  Categories?: Maybe<Array<Maybe<BookCategory>>>;
  Images?: Maybe<Array<Maybe<BookImage>>>;
  authorName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
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

export type BookCategory = {
  __typename?: 'BookCategory';
  books?: Maybe<Array<Maybe<Book>>>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  nameEn?: Maybe<Scalars['String']>;
  nameId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type BookImage = {
  __typename?: 'BookImage';
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  publicId?: Maybe<Scalars['String']>;
  secureUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  addBookCategory?: Maybe<BookCategory>;
  deleteBook?: Maybe<Book>;
  deleteBookCategory?: Maybe<BookCategory>;
  login?: Maybe<LoginData>;
  updateBook?: Maybe<Book>;
  updateBookCategory?: Maybe<BookCategory>;
};


export type MutationAddBookArgs = {
  data: AddBookInput;
};


export type MutationAddBookCategoryArgs = {
  data: AddBookCategoryInput;
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
  data: UpdateBookInput;
};


export type MutationUpdateBookCategoryArgs = {
  data: UpdateBookCategoryInput;
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
  bookcategories?: Maybe<Array<Maybe<BookCategory>>>;
  bookcategory?: Maybe<BookCategory>;
  books?: Maybe<Array<Maybe<Book>>>;
};


export type QueryBookArgs = {
  bookId: Scalars['ID'];
};


export type QueryBookcategoryArgs = {
  categoryId: Scalars['ID'];
};

export type AddBookCategoryInput = {
  nameEn: Scalars['String'];
  nameId: Scalars['String'];
};

export type AddBookInput = {
  authorName: Scalars['String'];
  description: Scalars['String'];
  isbn: Scalars['String'];
  numberOfPages: Scalars['Int'];
  price: Scalars['Int'];
  printType: Scalars['String'];
  publisher: Scalars['String'];
  stock: Scalars['Int'];
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
  id?: Maybe<Scalars['String']>;
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

export type UpdateBookCategoryInput = {
  categoryId: Scalars['ID'];
  nameEn?: InputMaybe<Scalars['String']>;
  nameId?: InputMaybe<Scalars['String']>;
};

export type UpdateBookInput = {
  authorName?: InputMaybe<Scalars['String']>;
  bookId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  isbn?: InputMaybe<Scalars['String']>;
  numberOfPages?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Int']>;
  printType?: InputMaybe<Scalars['String']>;
  publisher?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
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
  Book: ResolverTypeWrapper<Book>;
  BookCategory: ResolverTypeWrapper<BookCategory>;
  BookImage: ResolverTypeWrapper<BookImage>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
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
  updateBookCategoryInput: UpdateBookCategoryInput;
  updateBookInput: UpdateBookInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Book: Book;
  BookCategory: BookCategory;
  BookImage: BookImage;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
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
  updateBookCategoryInput: UpdateBookCategoryInput;
  updateBookInput: UpdateBookInput;
};

export type AuthDirectiveArgs = {
  requires: AuthRole;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = TGraphqlCtx, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BookResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  Categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookCategory']>>>, ParentType, ContextType>;
  Images?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookImage']>>>, ParentType, ContextType>;
  authorName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type BookCategoryResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['BookCategory'] = ResolversParentTypes['BookCategory']> = {
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nameEn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookImageResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['BookImage'] = ResolversParentTypes['BookImage']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationAddBookArgs, 'data'>>;
  addBookCategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<MutationAddBookCategoryArgs, 'data'>>;
  deleteBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationDeleteBookArgs, 'bookId'>>;
  deleteBookCategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<MutationDeleteBookCategoryArgs, 'categoryId'>>;
  login?: Resolver<Maybe<ResolversTypes['loginData']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  updateBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationUpdateBookArgs, 'data'>>;
  updateBookCategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<MutationUpdateBookCategoryArgs, 'data'>>;
};

export type QueryResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<QueryBookArgs, 'bookId'>>;
  bookcategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['BookCategory']>>>, ParentType, ContextType>;
  bookcategory?: Resolver<Maybe<ResolversTypes['BookCategory']>, ParentType, ContextType, RequireFields<QueryBookcategoryArgs, 'categoryId'>>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
};

export type DeleteBookResolvers<ContextType = TGraphqlCtx, ParentType extends ResolversParentTypes['deleteBook'] = ResolversParentTypes['deleteBook']> = {
  authorName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  Book?: BookResolvers<ContextType>;
  BookCategory?: BookCategoryResolvers<ContextType>;
  BookImage?: BookImageResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  deleteBook?: DeleteBookResolvers<ContextType>;
  loginData?: LoginDataResolvers<ContextType>;
  loginUserData?: LoginUserDataResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = TGraphqlCtx> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
