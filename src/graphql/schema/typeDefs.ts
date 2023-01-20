import path from "path"
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs } from "@graphql-tools/merge"

const typesArray = loadFilesSync(path.join(process.cwd(), 'src/graphql/schema/**/*.graphql'), { recursive: true })
console.log({__dirname})
console.log({typesArray})
export default mergeTypeDefs(typesArray)