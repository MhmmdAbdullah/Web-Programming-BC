import { create } from "zustand";
import { Product } from "../types";
import { persist } from "zustand/middleware";

export interface CartItem extends Product {
    qty: number;
}

export interface CustomerInfo {
    customerName: string;
    customerContact: number | null;
    customerAddress: string;
}

interface CartStore {
    customerInfo: CustomerInfo | null;
    items: CartItem[];
    checkoutItem: CartItem | null;
    setCustomerInfo: (info: CustomerInfo) => void;
    addItem: (product: Product, qty?: number) => void;
    setCheckoutItem: (product: Product, qty: number) => void;
    clearCheckoutItem: () => void;
    removeItem: (productId: string) => void;
    reset: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            customerInfo: null,
            items: [],
            checkoutItem: null,
            setCustomerInfo: (info) => {
                set({customerInfo: info})
            },
            addItem: (product, qty = 1) => {
                const items = get().items;
                const existingItem = items.find((item) => item._id === product._id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                        item._id === product._id ? {...item, qty: item.qty + qty}: item)
                    })
                } else {
                    set({items: [...items, {...product, qty}]})
                }
            },

            setCheckoutItem: (product, qty) => {
            set({ checkoutItem: { ...product, qty } });
            },
            
            removeItem: (productId) => {
                set({items: get().items.filter((item) => item._id !== productId)})
            },
            
            clearCheckoutItem: () =>{ 
                set({ checkoutItem: null })
            },

            reset: () => {
                set({items: [], customerInfo: null, checkoutItem: null})
            }

            
        }),
        {
        name: "cart-storage"
        }
        
    )
)