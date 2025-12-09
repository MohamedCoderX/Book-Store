import React, { useEffect, useState, useRef } from 'react'
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useFetchAllBooksQuery } from '../../redux/features/book';

const TopSellers = () => {
  
  const category = ["All", "Business", "Marketing", "Fiction", "Horror"];
  const [active, setactive] = useState("All");
const {data:books = []} = useFetchAllBooksQuery();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filterbooks =
    active === "All"
      ? books
      : books.filter((book) => book.category === active.toLowerCase());

  useEffect(() => {
    console.log('Filtered Books:', filterbooks);
  }, []);

  return (
    <div className="py-10 relative">
      <h2 className="text-black text-2xl font-semibold py-3">Top Sellers</h2>

      {/* Category Dropdown */}
      <div>
        <select
          name="category"
          id="cat"
          onChange={(e) => setactive(e.target.value)}
           className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
        >
          {category.map((cat, index) => (
            <option value={cat} key={index}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Custom navigation buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          ref={prevRef}
          className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          ◀ Prev
        </button>
        <button
          ref={nextRef}
          className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          Next ▶
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        onInit={(swiper) => {
          // Connect refs to Swiper navigation
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {filterbooks.length > 0 &&
          filterbooks.map((book) => (
            <SwiperSlide key={book.id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
      
    </div>
  );
};

export default TopSellers;
