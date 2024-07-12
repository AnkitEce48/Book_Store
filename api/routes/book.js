import express from 'express';
import { getBook, getBooks } from '../controllers/book.controller.js';

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBook)

export default router;
