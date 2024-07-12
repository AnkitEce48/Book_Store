import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin:{
        type: Number,
        required: true
    },
    paymentmethod:{
        type: String,
        required: true
    },
    orderedBy:{
        type:String,
        required: true
    },
    totalprice:{
        type:Number,
        required:true
    },
    products: [{
        title:{
            type: String,
        },
        price:{
            type: String,
        },
        image:{
            type: String
        }
    }],
    status:{
        type: String,
        default: "Order Placed"
    }
},
    {
        timestamps: true
    }
);


const order = mongoose.model("Order", orderSchema);

export default order;