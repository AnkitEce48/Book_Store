import Book from "../models/Book.model.js";
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";


export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        console.log("books bookcontroller",books)
        return next(CreateSuccess(200, "All Books Fetched", books));
    } catch (error) {
        return next(CreateError(500, "Internal Server Error!"));
    }
}


export const getBook = async (req, res) => {
    console.log("bookController",req.params);
    try {
        const bookAvailable = await Book.findById(req.params.id);
        if(!bookAvailable){
            res.status(400)
            throw new Error('No Book Available')
        }
        res.status(200).json(bookAvailable)
    } catch (error) {
        console.log("error"+error.message)
        res.status(500).json({message:"Internal Error"})
    }
}