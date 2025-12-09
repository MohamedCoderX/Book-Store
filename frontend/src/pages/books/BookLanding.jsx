import React from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getImgUrl } from "../../utils/getImgUrl";
import { useFetchBookByIdQuery } from "../../redux/features/book";
import { addToCart } from "../../redux/slice/cartslice";
import { FiShoppingCart } from "react-icons/fi";

const BookLanding = () => {
  const { id } = useParams();
  const { data: Book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-4 border-blue-400 border-t-transparent w-12 h-12 rounded-full"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 font-semibold mt-20">
        ❌ Error loading book data.
      </div>
    );

  if (!Book) return null;

  return (
    <div className="min-h-screen  flex flex-col items-center py-10 px-4">
      <div className="max-w-6xl w-full  rounded-lg overflow-hidden grid md:grid-cols-2 gap-6 p-6 md:p-10">
        {/* Book Cover */}
        <div className="flex justify-center items-center">
          <img
            src={getImgUrl(Book.coverImage)}
            alt={Book.title}
            className="w-72 h-96 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-center space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{Book.title}</h1>

          <p className="text-gray-600 leading-relaxed">{Book.description}</p>

          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Category:</span>{" "}
              <span className="text-blue-600 capitalize">{Book.category}</span>
            </p>
            {Book.trending && (
              <p className="text-sm text-orange-500 font-semibold uppercase">
                🔥 Trending Now
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <p className="text-2xl font-bold text-green-600">
              ₹{Book.newPrice}
            </p>
            <p className="text-gray-400 line-through">₹{Book.oldPrice}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addToCart(Book))}
            className="mt-4 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FiShoppingCart className="text-xl" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Related Section (optional future expansion) */}
      <div className="mt-12 text-center text-gray-500">
        <p>📚 Explore more books in this category soon!</p>
      </div>
    </div>
  );
};

export default BookLanding;
