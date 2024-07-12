import express from 'express';
import { addToCart, deleteCart, getCart, removeFromCart } from '../controllers/cart.controller.js'

const router = express.Router();

router.post('/', addToCart)

router.get('/getcart/:email', getCart)

router.delete('/removefromcart/:email/:title', removeFromCart)

router.delete('/deletecart/:email', deleteCart)

export default router;