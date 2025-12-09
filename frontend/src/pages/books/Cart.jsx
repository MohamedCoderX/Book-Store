import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,

  clearMessage,
  removeItem,
  clearCart,
} from "../../redux/slice/cartslice";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartitems, message } = useSelector((state) => state.cart);

  const subtotal = cartitems.reduce(
    (total, item) => total + item.newPrice * item.quantity,
    0
  );

  

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>

      {cartitems.length === 0 ? (
        <p className="text-gray-600 text-center text-lg mt-10">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {cartitems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center justify-between border rounded-lg shadow-sm p-4 bg-white"
            >
              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={getImgUrl(item.coverImage)}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left mt-3 sm:mt-0 sm:ml-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  ₹{item.newPrice} per unit
                </p>
                <p className="text-gray-600 text-sm">
                  Subtotal:{" "}
                  <span className="font-medium text-gray-800">
                    ₹{item.newPrice * item.quantity}
                  </span>
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <button
                  onClick={() => dispatch(decreaseQuantity(item))}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-semibold"
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item))}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-semibold"
                >
                  +
                </button>
              </div>
              <div>
                <button className="" onClick={()=>dispatch(removeItem(item))}>Remove</button>
              </div>
            </div>
          ))}

          {/* Subtotal Section */}
          <div className="mt-8 bg-gray-50 border rounded-lg p-6 text-center sm:text-right">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Items: {cartitems.reduce((sum, i) => sum + i.quantity, 0)}
            </h3>
            <p className="text-xl font-bold text-gray-900 mt-2">
              Subtotal: ₹{subtotal.toFixed(2)}
            </p>
          <Link to="/checkout">
          <button className="mt-4 w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition">
              Proceed to Checkout
            </button>
          </Link>
          </div>
          <div>
            <button onClick={()=>dispatch(clearCart())}>clear cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
