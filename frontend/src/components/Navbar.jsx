import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";


const navigation = [
    
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    
]

const Navbar = () => {

    const  [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartitems  = useSelector((state)=>state.cart.cartitems);
    const {currentUser,logout} = useAuth();
   
    
   
  
    return (
        <header className="max-w-screen-xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/* search input */}
                    <div className="relative sm:w-72 w-40 space-x-2">

                       <Link to="/books">
                       <h4 className="">Books</h4>
                       </Link>
                    </div>
                </div>


                {/* rigth side */}
                <div className="relative flex items-center md:space-x-5 space-x-2">
                    <div >
                        {
                            currentUser ? <>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                            </button>
                            {/* show dropdowns */}
                            {
                                isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {
                                                navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <button
                                               onClick={()=>logout()}
                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </> : 
                                <Link to="/login"> <HiOutlineUser className="size-6" /></Link>
                            
                        }
                    </div>
                    
                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-yellow-300 p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        {
                            cartitems.length > 0 ? <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full ml-2">{cartitems.length}</span> : <span className="text-sm font-semibold sm:ml-1">0</span>
                        }
                       
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;