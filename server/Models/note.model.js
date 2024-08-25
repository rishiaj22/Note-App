import mongoose, { version } from "mongoose";

const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    status:{type:Boolean,required:true,enum:["active","inactive"]},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{
    versionKey:false,
    timestamps:true
})

const NoteModel = mongoose.model("Note",noteSchema);

export {NoteModel}