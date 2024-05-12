import  express from "express";
const router = express.Router()
import { Book } from "../models/Book-Model.js";
import mongoose from "mongoose";

//! router for save a new book
router.post("/", async function (req, res) {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishedyear) {
        return res.status(400).send({ message: "Pleace send all fields" });
      }
      
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishedyear: req.body.publishedyear,
      };
  
      const book = Book.create(newBook);
      res.status(201).send(book);
    } catch (error) {
      console.log(error.message);
  
      res.status(500).send({ message: error.message });
    }
  });
  
  //! router for get all books
  router.get("/", async function (req,res) {
    try {
      const books = await Book.find({})
      res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      })
    } catch (error) {
      console.log("All Books not fetched");
      res.status(500).send({messgae: error.message})
  
    }
  })
  
  
  //! router for get one book by id
  
  router.get("/:id", async function (req,res) {
    try {
      const {id} = req.params
  
      const book = await Book.findById(id)
     return res.status(200).json(book)
    } catch (error) {
      console.log("error", error.message);
      res.status(500).send({message: error.message})

    }
  })
  


  
  //! router for update book by id
   router.put("/:id", async function (req,res) {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishedyear) {
        return res.status(400).send({ message: "Pleace send all fields" });
      }
      const {id} = req.params
      
      // res.send(id)
      console.log(id);
      const result = await Book.findByIdAndUpdate(id, req.body)
      if (!result) {
        return res.status(404).json({message: "Book not found"})
      }
  
      return res.status(200).send({message:"book updated"})
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  })
  

  //! router for delete book by id
  router.delete("/:id", async function (req,res) {
    try {
      const {id} = req.params
  
      const result = await Book.findByIdAndDelete(id)
      if (!result) {
        return res.status(404).json({message: "Book not found"})
      }
      return res.status(200).send({message:"book deleted"})
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  })
  

  export default router