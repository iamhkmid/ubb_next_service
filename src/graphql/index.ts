import { ApolloServer } from "@apollo/server";
import context from "./context";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import typeDefs from "./schema/typeDefs"
import cors from 'cors';
import { json } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from "./schema/resolvers";
import { TGraphqlCtx, TGraphqlServer } from "../types/graphql_ctx";

const graphqlServer: TGraphqlServer = async ({ app, httpServer }) => {
  const server = new ApolloServer<TGraphqlCtx>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use('/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, { context }),
  );

}

export default graphqlServer
