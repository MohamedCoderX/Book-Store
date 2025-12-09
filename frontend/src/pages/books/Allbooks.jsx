import React, { useEffect, useState } from 'react'
import BookCard from './BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/book';

const Allbooks = () => {
    const [ Books,setBooks] = useState([]);
    // const [books,setbooks] = useState([])
    const [active, setactive] = useState("All");
    //pagination
    const[postperpage,setpostperpage]=useState(6);
    const[currentpage,setcurrentpage]=useState(1);
    const {data:books =[]} = useFetchAllBooksQuery();
    const filterbooks =
    active === "All"
      ? Books
      : Books.filter((book) => book.category === active.toLowerCase());

    const lastpostindex = currentpage * postperpage;
    const firstpostindex = lastpostindex - postperpage;

    const data = filterbooks.slice(firstpostindex, lastpostindex);
     
    const pages = Math.ceil(filterbooks.length/postperpage);

    const category = ["All", "Business", "Marketing", "Fiction", "Horror"];

    useEffect(()=>{
       setBooks(books);
       
    },[books])
    const search = (e)=>{
        if(e.target.value === ""){
            return setBooks(books);
        }
        const keyword = e.target.value.toLowerCase();
        const filteredBooks = Books.filter((book) =>
            book.title.toLowerCase().includes(keyword) 
        );
        
        setBooks(filteredBooks);
    }
    
    
  return (
    <div>
        <h1 className='text-black text-3xl text-center my-6 font-semibold'>All Books</h1>
        <div>
        <select
          name="category"
          id="cat"
          onChange={(e) => setactive(e.target.value)}
           className='my-3 border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
        >
          {category.map((cat, index) => (
            <option value={cat} key={index}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input type="text" placeholder='Search for Books' className='border my-5 p-4' onChange={(e)=>search(e)}/>
      </div>
        <div className='grid grid-cols-3 gap-3 '>
        {
            data.map((book)=>(
                <BookCard key={book._id} book={book} />
            ))
        }
        </div>
        <div className='flex justify-center items-center my-10 gap-2'>
        {Array.from({ length: pages }, (_, index) => (
    <button
      key={index}
      onClick={() => setcurrentpage(index + 1)}
      className={`px-4 py-2 rounded-md border text-sm font-medium ${
        currentpage === index + 1
          ? "bg-yellow-300 text-black "
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      {index + 1}
    </button>
  ))}
        </div>
    </div>
  )
}

export default Allbooks