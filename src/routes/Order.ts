import express from 'express';
import {Order} from '../database/db';
import { authmiddleware } from '../middleware/authMiddleware';
const router = express.Router();



router.get('/orders' , authmiddleware , async (req : any , res : any) => {
    try{
        const order = await Order.find({});
        return res.status(200).json(order);
    }catch(error){
        return res.status(400).json({error : 'Error in fetching order'});
    }
})

router.post('/order',authmiddleware , async (req : any , res : any) => {
    try{
        const {userId , items , totalAmount , status} = req.body;
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            status
        });
        await newOrder.save();
        return res.status(200).json(newOrder);
    }catch(error){
        return res.status(400).json({error : 'Error in adding order'});
    }
})

router
export default router;