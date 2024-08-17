import mongoose from "mongoose";

const purchesSchema = new mongoose.Schema({
    user: {
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    course: {
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Cource' }
    },
    purchesd: {
        type: Boolean,
        default: false
    },

   
})

const Purches = mongoose.models.Purches || mongoose.model("Purches", purchesSchema);

export default Purches;