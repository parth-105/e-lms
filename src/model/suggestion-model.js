import mongoose, { Schema } from "mongoose";

const suggestionSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, "Please provide topic"],
    },
    subject: {
        type: String,
        required: [true, "Please provide a subject"],
        
    },
    student: {
        type: Schema.Types.ObjectId,
        required: [true, "Please provide a student id"],
        ref:'users'
    },
  
    Instructor: {
        type: Schema.Types.ObjectId,
        ref:'Instructor'
    },
    author: {
        type: String,
        required: [true, "Please provide a author"],
        
    },
   
})

// const Suggestion = mongoose.models.Suggestion || mongoose.model("suggestion", suggestionSchema);

// export default Suggestion;

const Suggestion = mongoose.models.Suggestion || mongoose.model('Suggestion', suggestionSchema);

export default Suggestion;