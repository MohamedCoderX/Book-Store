import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/order";
import { useAuth } from "../../context/AuthContext";

const OrderPages = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isError,
    isLoading,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-500">
        Loading your orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
        Error loading orders. Please try again later.
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 font-medium">
        No orders found for your account.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-2">
        My Orders
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-blue-600">
                Order ID: <span className="text-gray-700">{order._id}</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Total Items:{" "}
                <span className="font-medium text-gray-700">
                  {order.totalItems}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Total Amount:{" "}
                <span className="font-semibold text-green-600">
                  ₹{order.totalAmount.toFixed(2)}
                </span>
              </p>
              <p>
                Order Status : { " "}
                <span className={`font-medium ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'}`}>
                  {order.status}
                  </span>
              </p>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Order Items:
              </h3>
              <ul className="space-y-2">
                {order.orderItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-all"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-700">
                      ₹{item.newPrice.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPages;
