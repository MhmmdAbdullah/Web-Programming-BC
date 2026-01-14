"use client";

import Image from "next/image"
import Link from "next/link";
import {FiSearch} from "react-icons/fi";
import {FiShoppingBag} from "react-icons/fi";
import CartPopup from "../ui/cart-popup";
import React, {useEffect} from "react";
import { usePathname } from "next/navigation";

const Header = () => {
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const pathname = usePathname()

    useEffect(() => {
        setIsCartOpen(false); 
    }, [pathname]);

    return (
        <header>
            <div className="flex justify-between items-center gap-10 container mx-auto  py-7">
                <Link href='/'>
                    <Image
                    src="/images/logo.svg"
                    alt="SportOn Logo"
                    className="-mt-1"
                    width={129}
                    height={29}
                    />
                </Link>
                <nav className="flex gap-20 font-medium">
                    <div className="relative">
                        <Link href="#" >Home</Link>
                        <div className="bg-primary rounded-full w-1/2 h-1 absolute left-1/4 translate-y-1"></div>
                    </div>
                    
                    <Link href="#" >Category</Link>
                    <Link href="#" >Explore Products</Link>
                </nav>
                <div className="relative flex gap-10">
                    <FiSearch size={24}/>
                    <button 
                        className="relative cursor-pointer" 
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        <FiShoppingBag size={24}/>
                        <div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-center text-white">3</div>
                    </button>
                    {isCartOpen && <CartPopup/>}
                </div>
            </div>    
        </header>
    );
}

export default Header;