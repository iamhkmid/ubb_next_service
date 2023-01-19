import express from "express";
import cors from "cors";
import * as http from "http";
import altairRoute from "./routes/altairRoute";


const PORT = parseInt(process.env.PORT || "3001");
export const corsOptions = { credentials: true, origin: "*" };

const main = async () => {
  const app: express.Application = express();

  if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
      if (req.header("x-forwarded-proto") !== "https")
        res.redirect(`https://${req.header("host")}${req.url}`);
      else next();
    });
  }

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));

  app.use("/altair", altairRoute);

  const httpServer = http.createServer(app);
  // await graphql({ app, httpServer });
  httpServer.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`⚡️Server is listening on port ${PORT}`);
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