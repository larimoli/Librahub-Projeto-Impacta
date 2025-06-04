import express from "express";
import { getBooks, addBooks } from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBooks);

export default router;