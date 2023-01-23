import { ApolloServer } from "@apollo/server";
import context from "./context";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { json } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { TGraphqlCtx, TGraphqlServer } from "../types/graphql_ctx";
import schema from "./schema";

const graphqlServer: TGraphqlServer = async ({ app, httpServer }) => {
  const server = new ApolloServer<TGraphqlCtx>({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use('/graphql',
    cors<cors.CorsRequest>({ origin: "*", exposedHeaders: ['Authorization'], allowedHeaders: ['Authorization'] }),
    json(),
    expressMiddleware(server, { context }),
  );
}

export default graphqlServer
