//create order model
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {

        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            zipcode: { type: String, required: true },
        },
        orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
        totalItems: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        status:{ type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    },{ timestamps: true })

   export const Order = mongoose.model('Order', orderSchema); 
       
