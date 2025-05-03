import express from "express";
import { getBooks, getBookById, addBooks, updateBooks, deleteBooks } from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", addBooks);
router.put("/:id", updateBooks); 
router.delete("/:id", deleteBooks);

export default router;