import express from "express";
import { Book } from "../models/books.js";




export const addbook = async (req, res) => {
  try {
    const bookData = req.body;
    const imageUrl = req.file?.path || ""; // Cloudinary returns secure URL in req.file.path

    const book = new Book({
      title: bookData.title,
      description: bookData.description,
      category: bookData.category,
      trending: bookData.trending,
      coverImage: imageUrl, // store Cloudinary URL here
      oldPrice: bookData.oldPrice,
      newPrice: bookData.newPrice,
    });

    await book.save();
    res.json({ message: "Book saved successfully", book });
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(500).json({ message: "Error saving book", error: err.message });
  }
};


export const updatebook = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBook = await Book.findById(id);
    if (!existingBook) return res.status(404).json({ message: "Book not found" });

    const imageUrl = req.file?.path || existingBook.coverImage;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title: req.body.title || existingBook.title,
        description: req.body.description || existingBook.description,
        category: req.body.category || existingBook.category,
        trending: req.body.trending || existingBook.trending,
        oldPrice: req.body.oldPrice || existingBook.oldPrice,
        newPrice: req.body.newPrice || existingBook.newPrice,
        coverImage: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




  
  export const getAllBooks = async(req,res)=>{
    try{
        const books = await Book.find();
        res.json(books);
    }catch(err){
        res.status(500).json({message:"Error fetching books",error:err.message});
    }
  }
  export const getsinglebook = async(req,res)=>{
    const id = req.params.id;
    try{
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        res.json(book);
    }catch(err){
        res.status(500).json({message:"Error fetching book",error:err.message});
    }
  }
  export const deletebook = async(req,res)=>{
    const id = req.params.id;
    try{
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).json({message:"Book not found"});
        }
        res.json({message:"Book deleted successfully",deletedBook});
    }catch(err){

        res.status(500).json({message:"Error deleting book",error:err.message});
    }
  }