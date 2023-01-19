import { altairExpress } from "altair-express-middleware";
import express from "express";

const altairRoute = express.Router();

altairRoute.use(
  "/",
  (req, res, next) => {
    process.env.NODE_ENV === "development"
      ? next()
      : res.end("Development only");
  },
  altairExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:3001/subscriptions`,
    initialQuery: ``,
  })
);

export default altairRoute;
