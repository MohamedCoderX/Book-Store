import React, { useEffect } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearMessage } from '../../redux/slice/cartslice'
import { toast } from "react-toastify";
import { useAuth } from '../../context/AuthContext'

const BookCard = ({book}) => {
  const dispatch = useDispatch();
  const message  = useSelector((state)=>state.cart.message);
  const { currentUser} = useAuth()
  const addcart = ()=>{
  if(currentUser){
    dispatch(addToCart(book));
  toast.success("Book added to cart",{position:"top-left",autoClose:2000,});
  }
  else{
    toast.error("Please login to add to cart",{position:"top-left",autoClose:2000,});
    
  }


  }
 
  return (
    <div className="rounded-lg transition-shadow duration-300">
  <div
    className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4"
  >
    <div className="sm:h-full sm:flex-shrink-0 border border-gray-100 rounded-md w-1/2">
    <Link to={`/book/${book._id}`}>
        <img
          src={`${getImgUrl(book.coverImage)}`}
          alt="book cover"
          className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
        />
     </Link>
    </div>

    <div>
      <Link to={`/book/${book._id}`}>
        <h3 className="text-lg font-semibold hover:text-blue-600 mb-3">
          {book?.title}
        </h3>
        </Link>
      <p className="text-gray-600 mb-5 text-sm">{book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}</p>
      <p className="font-medium mb-5">
        ₹{book?.newPrice}<span className="line-through font-normal ml-2">₹{book?.oldPrice}</span>
      </p>
      <button className="bg-yellow-300 py-2 px-5 space-x-1 flex items-center gap-1" onClick={()=>addcart()}>
        <FiShoppingCart className="size-4" />
        <span className='text-sm'>Add to Cart</span>
      </button>
    </div>
  </div>
</div>
  )
}

export default BookCard