import PriceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import Button from "./button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";


const CartPopup = () => {
    const {push} = useRouter();
    const {items, removeItem} = useCartStore();

    const totalPrice = items.reduce((total, item) => total + item.price * item.qty, 0);

    const handleCheckout = () => {
        if (!items.length) {
            alert("There are no items in your cart.");
            return;
        }
        push("/checkout")
    }

    return(
        <div className="absolute right-0 top-12 bg-white shadow-xl shadow-black/10 border-gray-200 w-90 z-10">
            <div className="p-4 border-b border-gray-200 font-bold text-center">
                Shopping Cart
            </div>
            <div className="overflow-auto max-h-[200px]">
                {items.length ? items.map((item, index) => {
                    return (
                        <div 
                            key={index}
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
                        
                    )
                }) : (
                    <div className="text-center opacity-50 py-5 border-b border-gray-200">
                        Your shopping cart is empty
                    </div>
                )
                }
            </div>
            <div className="p-4">
                <div className="flex justify-between font-semibold">
                    <div className="text-sm">Total</div>
                    <div className="text-primary text-xs">{PriceFormatter(totalPrice)}</div>
                </div>
                <Button variant="dark" className="w-full mt-4" onClick={handleCheckout}>
                    Checkout Now
                </Button>
            </div>
        </div>
    )
}
export default CartPopup;