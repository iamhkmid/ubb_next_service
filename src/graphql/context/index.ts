import { prisma } from "../../libs/prisma";
import { TGraphqlCtxFunc } from "../../types/graphql_ctx";

const context: TGraphqlCtxFunc = async ({ req, res }) => {
  return { req, res, db: prisma };
};

export default context;
