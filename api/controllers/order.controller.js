import order from "../models/order.model.js";

export const createOrder = async(req , res)=>{
    try {
        const {name ,email, phone, address, city, state, pin, paymentmethod, userId, totalprice, books} = req.body

        const placeorder = new order ({
            name:name,
            email:email,
            phone:phone,
            address:address,
            city:city,
            state:state,
            pin:pin,
            paymentmethod:paymentmethod,
            orderedBy:userId,
            totalprice:totalprice,
            products:books
        })
        await placeorder.save();
        return res.status(200).json({message: "Order Placed"});
    } catch (error) {
        console.log("error"+error.message)
        return res.status(400).json({message: "Internal Error"});
    }
};

export const getorders = async(req, res )=>{
    try {
        const orderedBy = req.params
        const allOrder = await order.find(orderedBy);
        if(!allOrder){
            res.status(400)
            throw new Error('No Cart Available')
        }
        res.status(200).json(allOrder)
    } catch (error) {
        console.log("error"+error.message)
        return res.status(400).json({message: "Internal Error"});
    }
}

export const cancelOrder = async(req, res ) =>{
    try {
        const id = req.params
        console.log(id)
        const updatedOrder = await order.findByIdAndUpdate(
            id,
            { status: 'Cancelled'},
            { new: true }
          );
        res.send(updatedOrder);
    } catch (error) {
        console.log("error"+error.message)
        return res.status(400).json({message: "Internal Error"});
    }
}