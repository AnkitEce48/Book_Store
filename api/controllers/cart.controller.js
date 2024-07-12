import cart from "../models/cart.model.js"

export const addToCart = async (req,res) =>{
    try {
        const {title, price, image, email} = req.body
        const addcart = new cart ({
            email:email,
            title:title,
            price:price,
            image:image
        })
        await addcart.save();
        return res.status(200).json({message: `${title} is added to cart`});
    } catch (error) {
        console.log("error"+error.message)
        return res.status(400).json({message: "Internal Error"});
    }
    
}

export const getCart = async (req, res) => {
    try {
        const email = req.params
        const Cart = await cart.find(email);
        if(!Cart){
            res.status(400)
            throw new Error('No Cart Available')
        }
        res.status(200).json(Cart)
    } catch (error) {
        console.log("error"+error.message)
        res.status(500).json({message:"Internal Error"})
    }
}

export const removeFromCart = async (req, res ) =>{
    try {
        const {title, email} = req.params
        await cart.deleteOne({title,email});
        res.status(200).json({message:"Book Removed From Cart"})
    } catch (error) {
        console.log("error"+error.message)
        res.status(500).json({message:"Internal Error"})
    }
}

export const deleteCart = async(req, res ) =>{
    try {
        const email = req.params
        await cart.deleteMany(email)
        res.status(200).json({message:"Cart removed"})
    } catch (error) {
        console.log("error"+error.message)
        res.status(500).json({message:"Internal Error"})
    }
}

