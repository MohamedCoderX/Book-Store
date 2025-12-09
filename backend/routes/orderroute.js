import express from 'express';
import { deleteOrder, getOrderByEmail, getOrderById, postOrder, updateOrder } from '../functions/order.js';
import { Order } from '../models/order.js';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';

const router = express.Router();



// // Get all order
router.get('/',verifyAdminToken, async(req,res)=>{
    const orders = await Order.find().populate('orderItems');
    try{
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message:"Error fetching orders",error:err.message});
    }
})

// Create a new order
router.post('/',postOrder );

// Get an order by ID 
router.get('/:id',getOrderById);

// Update an order by ID
router.put('/:id',verifyAdminToken, updateOrder);

// Delete an order by ID
router.delete('/:id',verifyAdminToken, deleteOrder);

//get by email
router.get("/email/:email",getOrderByEmail)

export default router;