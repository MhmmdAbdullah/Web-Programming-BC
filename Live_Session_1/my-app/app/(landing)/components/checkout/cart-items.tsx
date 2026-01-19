"use client";

import Image from "next/image";
import { FiCreditCard, FiTrash2 } from "react-icons/fi";
import Button from "../ui/button";
import PriceFormatter from "@/app/utils/price-formatter";
import CardWithHeader from "../ui/card-with-header";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";

type TCartItems = {
    handlePayment: () => void;
}

const CartItems = ({handlePayment}: TCartItems) => {
    const {items, removeItem} = useCartStore();
    const {push} = useRouter();

    const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

    const Payment = () => {
        push("/payment")
    }

    return (
        <CardWithHeader title="Cart Item">
            <div className="overflow-auto h-[300px]">
                {items.length ? items.map((item) => {
                     return (
                        <div                             
                            key={item._id}
                            className="border-b border-gray-200 p-4 flex gap-3"
                        >
                            <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
                                <Image 
                                    src={getImageUrl(item.imageUrl)} 
                                    alt={item.name} 
                                    width={63} 
                                    height={63}
                                    className="aspect-square object-contain"/>
                            </div>                            
                            <div className="self-center">
                                <div className="text-sm font-medium">{item.name}</div>
                                <div className="flex gap-3 font-medium text-xs">
                                    <div>{item.qty}x</div>
                                    <div className="text-primary">{PriceFormatter(item.price)}</div>
                                </div>
                            </div>
                            <Button 
                             size="small" 
                             variant="ghost" 
                             className="w-7 h-7 p-0! self-center ml-auto"
                             onClick={() => removeItem(item._id)}
                             >
                                <FiTrash2/>
                            </Button>
                        </div>       
                    );
                }) : (
                    <div className="text-center opacity-50 py-5">
                        Your cart items is empty
                    </div>
                )
                }    
            </div>
            <div className="p-4">
                <div className="flex justify-between font-semibold">
                    <div className="text-sm">Total</div>
                    <div className="text-primary text-xs">{PriceFormatter(totalPrice)}</div>
                </div>
                <Button variant="dark" className="w-full mt-4" onClick={handlePayment}>
                    <FiCreditCard size={22} /> Proceed to Payment
                </Button>
            </div>       
        </CardWithHeader>
    )
}

export default CartItems;
