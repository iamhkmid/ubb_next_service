import fs from "fs";
import cloudinary from "../../../libs/cloudinary";

export const stringPath = (str: string) =>
  str.replace(/([^a-z0-9 ]+)/gi, "-").replace(/\s/g, "-");