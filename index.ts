import express from "express";
import cors from "cors";
import * as http from "http";
import altairRoute from "./src/routes/altairRoute";
import graphqlServer from "./src/graphql"
import * as dotenv from 'dotenv'
import path from "path"

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const PORT = parseInt(process.env.PORT || "3001");
export const corsOptions = { origin: "*", exposedHeaders: ["Authorization"] };

const main = async () => {
  const app: express.Application = express();

  app.use("/uploads",
    express.static(path.join(process.cwd(), "/../uploads/ubbpress"), {
      fallthrough: true,
      index: false,
      redirect: false,
    })
  );

  app.use(express.json({ limit: 1.2 * 1024 * 1024 }));
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));

  app.use("/altair", altairRoute);

  const httpServer = http.createServer(app);

  graphqlServer({ app, httpServer });

  httpServer.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`⚡️ Server is listening on port ${PORT}`);
    console.log(`GraphQL path: "/graphql"`);
  });

  process.on("warning", (warning) => {
    console.warn(warning.name); // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack); // Print the stack trace
  });
};

main().catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});