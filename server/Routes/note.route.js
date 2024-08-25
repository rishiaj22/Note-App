import express from "express"
const noteRouter = express.Router()
import { NoteModel } from "../Models/note.model.js"


// Create notes
noteRouter.post("/create",async(req,res)=>{
    const {title,content,status} = req.body;
    const userId = req.user._id
    try {
        const notes = new NoteModel({
            title,
            content,
            status,
            userId
        })
        await notes.save()
        res.status(201).json({message:"Notes created successfully"})
    } catch (error) {
       res.status(404).json({message:`Error while creating note ${error}`}) 
    }
})

// Get notes
noteRouter.get("/",async(req,res)=>{
    const userId = req.user._id;
    try {
        const notes = await NoteModel.find({userId});
        res.status(201).json({notes})
    } catch (error) {
        res.status(404).json({message:`Error while fetching the notes ${error}`})
    }
})

// Update note
noteRouter.patch("/update/:id",async(req,res)=>{
    const noteId = req.params.id;
    const userId = req.user._id;
    try {
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId.toString() == userId.toString()){
            await NoteModel.findByIdAndUpdate({_id:noteId},req.body)
            return res.status(200).json({message:"Note updated successfully"})
        }
        else{
            return res.status(401).json({message:"Unauthorized access"})
        }
    } catch (error) {
        res.status(401).json({message:`Error while updating the note ${error}`})
    }
})

// Delete note
noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteId = req.params.id;
    const userId = req.user._id;
    try {
        const note = await NoteModel.findOne({_id:noteId})
        if(note.userId.toString() == userId.toString()){
            await NoteModel.findByIdAndDelete({_id:noteId})
            return res.status(201).json("Note deleted successfully")
        }
        else{
            return res.status(401).json({message:"Unauthorized access"})
        }
    } catch (error) {
        res.status(401).json({message:`Error while deleting the note ${error}`})
    }
})


export {noteRouter}