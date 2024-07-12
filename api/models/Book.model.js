import mongoose from 'mongoose';

const BookSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        price: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    }
);

export default mongoose.model("Book", BookSchema);