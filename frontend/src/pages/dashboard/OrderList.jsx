import React from 'react'
import { useFetchAllOrdersQuery, useUpdateOrderMutation } from '../../redux/features/order'
import { toast } from 'react-toastify'

const OrderList = () => {
  const { data: orders = [], isLoading, isError } = useFetchAllOrdersQuery()
  const [updateOrder] = useUpdateOrderMutation();

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrder({ id, status: newStatus }).unwrap()
      toast.success("Order status updated!")
      
    } catch (error) {
      toast.error("Failed to update order")
      console.error(error)
    }
  }

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Loading orders...</p>
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load orders.</p>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Manage Orders</h2>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-gray-800 text-xs uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Items</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">{order.name}</td>
                <td className="py-3 px-4 text-green-700 font-semibold">₹{order.totalAmount}</td>
                <td className="py-3 px-4 text-gray-600">
                  {order.address.street}, {order.address.city}
                </td>

                {/* 🔽 Dropdown for changing status */}
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td className="py-3 px-4">
                  <ul className="space-y-1">
                    {order.orderItems.map((item, idx) => (
                      <li key={idx} className="text-gray-700">{item.title}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderList
