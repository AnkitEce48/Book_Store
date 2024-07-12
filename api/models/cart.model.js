import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    image:{
        type: String,
    },
    price:{
        type: String,
    },
    title:{
        type: String,
    },
    email:{
        type:String,
    }

});


export default mongoose.model("Cart", cartSchema)