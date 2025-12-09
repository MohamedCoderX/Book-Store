import express from "express"
import { Order } from "../models/order.js";
const app = express();
app.use(express.json());

//post order
export const postOrder = async(req,res)=>{
    const orderData = req.body;
    try{
        const order = Order({...orderData});
        order.save();
        res.json({message:"Order saved successfully",order});
    }catch(err){
        res.status(500).json({message:"Error saving order",error:err.message});
    }
}

//get by single id
export const getOrderById = async(req,res)=>{
    const orderId = req.params.id;
    try{
        const order = await Order.findById(orderId).populate('orderItems');
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.json(order);
    }catch(err){
        res.status(500).json({message:"Error fetching order",error:err.message});
    }
}

//update order
export const updateOrder = async(req,res)=>{
    const id = req.params.id
    const {status}=req.body
    const validate = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    try{
const fetchorder = await Order.findById(id);
if(!fetchorder){
    return res.status(404).json({message:"Order not found"});
}
if(status && !validate.includes(status)){
    return res.status(400).json({message:"Invalid status value"});
}
const neworder = await Order.findByIdAndUpdate(id,{status},{new:true});
neworder.save();
//wiht status code 200
res.status(200).json({message:"Order updated successfully",neworder});
    }
    catch(err){
        res.status(500).json({message:"Error updating order",error:err.message});
    }
}

//delete order
export const deleteOrder = async(req,res)=>{
    const id = req.params.id
    try{
        const order = await Order.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json({message:"Order deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Error deleting order",error:err.message});
    }
}
export const getOrderByEmail = async(req,res)=>{
    const email  = req.params.email
    try{
        
        const orders = await Order.find({email}).sort({createdAt:-1}).populate('orderItems');
        if(!orders){
            return res.status(404).json({message:"Orders not found"});
        }
        res.json(orders);
    }catch(err){
        res.status(500).json({message:"Error fetching orders",error:err.message});
    }
}