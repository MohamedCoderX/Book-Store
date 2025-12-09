import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/slice/cartslice';

const OrderComplete = () => {
    const {orders} = useSelector((state)=>state.order);
    const dispatch = useDispatch()
     const items = useSelector((state)=>state.cart.cartitems);
  return (
    <div>OrderComplete
        <div>
       <h1>Your Order</h1>
         {orders && orders.map((order)=>(
            <div key={order._id} className='border p-4 m-4'>
                <h2>Order ID: {order._id}</h2>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total Amount: ₹{order.totalAmount}</p>
                
            </div>
         ))}
         <h3>Items:</h3>
                <ul>
                    {items && items.map((item, index)=>(
                        <li key={index}>
                            {item.title} - Quantity: {item.quantity} - Price: ₹{item.newPrice}
                        </li>
                    ))}
                </ul>
 <h2>Succesfully completed</h2>
 <Link to="/orders">
 <button onClick={()=>dispatch(clearCart())}>
    Go to Orders
 </button>
 </Link>

        </div>
    </div>
  )
}

export default OrderComplete