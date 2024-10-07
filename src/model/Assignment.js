import mongoose from "mongoose";
import Video from "@/model/video-model"
import Instructor from "@/model/instructor-model";
import Cource from '@/model/cource-model';
import User from '@/model/user-model'

const answerSchema = new mongoose.Schema({
    studentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    awnserfileurl: {
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

   status: {
    type: String,
    enum: ['submitted', 'pending'], 
    default: 'pending' 
  }



});


const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

export default Assignment;


