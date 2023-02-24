import { PrismaClient } from "@prisma/client";
import express from "express";

export type TGraphqlParamsCtx = { req: express.Request; res: express.Response; };

export type TGraphqlCtx = {
  req: express.Request;
  res: express.Response;
  db: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
};

export type TGraphqlCtxFunc = (params: TGraphqlParamsCtx) => Promise<TGraphqlCtx>;

export type TGraphqlServer = (p: {
  app: express.Application
  httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
}) => void