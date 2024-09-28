import mongoose from "mongoose";
import Video from "@/model/video-model"
import Instructor from "@/model/instructor-model";

const answerSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    awnser: {
      type: String,   
    }
  });

const assignmentSchema = new mongoose.Schema({
 
  title:{
     type: String,
      required: true 
    },

  description:{
    type: String, 
    required: true
    },

    questionfile:{
        type: String, 
        required: true
    },

    // awnserfile:{
    //     type: [{
    //         student:{
    //             type:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    //         },
    //         awnser:{
    //             type: String, 
    //         }
    //     }], 
    // },

    awnserfile: [answerSchema],

    couses:{
        type:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cource' }
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' 
   },



});


const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

export default Assignment;


