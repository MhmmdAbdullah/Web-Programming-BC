"use client";

import { FiArrowRight, FiChevronDown, FiChevronUp, FiShoppingBag} from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { Product } from "@/app/types";


type TProductActionProps = {
    product: Product;
    stock: number;
}

const ProductActions = ({product, stock}: TProductActionProps) => {
  const {addItem} = useCartStore();
  const {push} = useRouter()  
  const [quantity, setQuantity] = useState(1);

  const handleAddtoCart = () => {
    addItem(product, quantity)
  }

  const checkout = () => {
    push("/checkout")
  }

  return (
    <div className="flex gap-5">
      <div className="border border-gray-500 inline-flex w-fit min-w-20.5">
                <div className="aspect-square text-xl font-medium border-r border-gray-500 flex justify-center items-center">
                    <span>{quantity}</span>
                </div>
                <div className="flex flex-col">
                    <button 
                        className="border-b border-b-gray-500 cursor-pointer h-1/2 aspect-square flex items-center justify-center"
                        onClick={() => setQuantity(quantity < stock ? quantity + 1 : quantity )}
                        >
                        <FiChevronUp />
                    </button>
                    <button 
                        className="cursor-pointer h-1/2 aspect-square flex items-center justify-center"
                        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                        >
                        <FiChevronDown />
                    </button>
                </div>
            </div>
            <Button className="px-20 w-full" onClick={handleAddtoCart}>
                <FiShoppingBag size={24} className="mr-3"/>
                Add to Cart
            </Button>
            <Button 
                variant="dark" 
                className="px-20 w-full" 
                onClick={checkout}>
                Checkout Now
                <FiArrowRight size={24} className="mr-3"/>
            </Button>
        </div>
    )       
}

export default ProductActions;