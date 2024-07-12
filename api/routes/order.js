import express from "express";
import { cancelOrder, createOrder, getorders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);

router.get('/getorder/:orderedBy', getorders);

router.put('/cancelorder/:_id', cancelOrder);

export default router;