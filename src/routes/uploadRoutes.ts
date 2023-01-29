import express from "express";
import { uploadBookImage } from "../middlewares/uploadBookImage";

const uploadRoutes = express.Router();

uploadRoutes.use("/book-image", uploadBookImage);

export default uploadRoutes;
