"use client"

import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import Button from "../ui/button";
import Image from "next/image";
import PriceFormatter from "@/app/utils/price-formatter";
import { Product } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-cart-store";


type TProductsProps = {
    products: Product[];
    stock: number;
}

const ProductsSection = ({products, stock}: TProductsProps) => {
    const {items, addItem} = useCartStore()

    const handleAddtoCart = (e: React.MouseEvent, product: Product, stock: number) => {
        e.preventDefault();
        e.stopPropagation();
        const itemInCart = items.find((item) => item._id === product._id);
        const currentQty = itemInCart ? itemInCart.qty : 0;
        if (currentQty + 1 <= stock) {
            addItem(product);
        } else {
            alert(`Can't add more item. Maximum stock reached ${stock} items.`);
        }
    }

    return <section id="products-section" className="container mx-auto mt-32 mb-64">
        <h2 className="font-bold italic text-4xl text-center mb-11">
            <span className="text-primary">OUR</span> PRODUCTS
        </h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-6">
            {products.map((product) => (
                <Link 
                    href={`/product/${product._id}`} 
                    key={product._id} 
                    className="flex flex-col justify-center items-start shadow-lg rounded-lg p-2 hover:shadow-2xl transition-all duration-300"
                >
                    <div className="relative flex flex-col justify-center items-center bg-primary-light mb-4 w-full aspect-square">
                        <Image 
                            src={getImageUrl(product.imageUrl)}
                            width={250}
                            height={250} 
                            alt={product.name}/>
                        <Button 
                         className="w-10 h-10 p-2! absolute top-[8px] right-[8px]"
                         onClick={(e) => handleAddtoCart(e, product, product.stock)} 
                        >
                            <FiPlus size={24} className="text-white m-auto"/>
                        </Button>
                    </div>
                    <h3 className="font-medium text-[18px] mb-1">{product.name}</h3>
                    <div className="flex justify-between w-full">
                        <div className="text-grey-500">{product.category.name}</div>
                        <div className="font-medium text-primary">{PriceFormatter(product.price)}</div>
                    </div>
                </Link>
            ))}            
        </div>

    </section>;
};

export default ProductsSection;