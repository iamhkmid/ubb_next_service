import _ from "lodash";
import * as scalar from "./scalar"
import * as book from "./book/resolvers"

const resolvers = _.merge(
  scalar.resolvers,
  book
);
export default resolvers;
