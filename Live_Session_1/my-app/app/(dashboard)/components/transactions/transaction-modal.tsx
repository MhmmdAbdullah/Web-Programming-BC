import { useState } from "react";
import Modal from "../ui/modal"
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import Image from "next/image";
import PriceFormatter from "@/app/utils/price-formatter";
import { FiCheck, FiX } from "react-icons/fi";

type TProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const TransactionModal = ({isOpen, onClose}: TProductModalProps) => {
    return(
        <Modal 
            isOpen={isOpen}  
            onClose={onClose} 
            title="Verify Transactions" 
        >
            <div className="flex gap-6">
                <div className="">
                    <h4 className="font-semibold text-xs mb-2">Payment Proof</h4> 
                    <Image 
                        src="/images/payment-proof-dummy.svg" 
                        alt="payment proof" 
                        width={200} 
                        height={401} 
                    />
                </div>
                <div className="max-w-79">           
                    <h4 className="font-semibold text-xs mb-2">Order Details</h4>
                    <div className="flex flex-col bg-gray-100 rounded-md p-4 gap-3 mb-5">
                        <div className="flex justify-between text-xs">
                            <div className="opacity-50 ">Date</div>
                            <div className="text-right font-medium">23/02/2026 19:32</div>
                        </div>
                        <div className="flex justify-between text-xs">
                            <div className="opacity-50 ">Customer</div>
                            <div className="text-right font-medium">John Doe</div>
                        </div> 
                        <div className="flex justify-between text-xs">
                            <div className="opacity-50 ">Contact</div>
                            <div className="text-right font-medium">08123456789</div>
                        </div> 
                        <div className="flex justify-between text-xs">
                            <div className="opacity-50 whitespace-nowrap">Shipping Address</div>
                            <div className="text-right font-medium">Merdeka Street, Jakarta, Indonesia, 332122</div>
                        </div>     
                    </div>
                    <h4 className="font-semibold text-xs mb-4">Items Purchased</h4>
                    <div className="border border-gray-200 rounded-lg p-2.5 flex gap-2 mb-6">
                        <div className="flex bg-gray-100 rounded-md aspect-square w-8 h-8 ">
                            <Image 
                                src="/images/products/shoes-1.svg" 
                                width={30} 
                                height={30} 
                                alt="product image"
                            />                            
                        </div>
                        <div className="font-medium text-xs self-center">SportsOn Hyperfast Shoes</div>
                        <div className="font-medium text-xs self-center ml-auto">3 Units</div>
                    </div>
                    <div className="flex justify-between font-semibold text-xs">
                        <h4>Total</h4>
                        <h4 className="text-primary">{PriceFormatter(1000000)}</h4>
                    </div>
                    <div className="flex justify-end gap-5 mt-17">
                        <Button 
                            className="text-red-500! bg-primary/20! text-sm px-5! py-2! rounded-md"
                            size="small"
                        >
                            <FiX size={20} />
                            Reject 
                        </Button>
                        <Button 
                            className="text-white! bg-[#50C252]! text-sm px-4! py-2! rounded-md"
                            size="small"
                        >
                            <FiCheck size={20} />
                            Approved 
                        </Button>                    
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default TransactionModal