import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import Button from "../ui/button";

const productsList = [
    {
        name: "SportsOn Hyperfast Shoes",
        category: "Running",
        image: "images/products/shoes-1.svg",
        price: "Rp. 329.000",
    },
    {
        name: "SportsOn Rocket Tennis",
        category: "Tennis",
        image: "images/products/racket-2.svg",
        price: "Rp. 999.000",
    },
    {
        name: "SportsOn SlowLivin",
        category: "Running",
        image: "images/products/sportshirt-1.svg",
        price: "Rp. 119.000",
    },
    {
        name: "SportsOn HyperSoccer v2",
        category: "Football",
        image: "images/products/shoes-2.svg",
        price: "Rp. 458.000",
    },
    {
        name: "SportsOn HyperSoccer v2",
        category: "Football",
        image: "images/products/shoes-3.svg",
        price: "Rp. 458.000",
    },
    {
        name: "SportsOn SlowLivin",
        category: "Running",
        image: "images/products/sportshirt-2.svg",
        price: "Rp. 119.000",
    },
    {
        name: "SportsOn Hyperfast Shoes",
        category: "Running",
        image: "images/products/shoes-4.svg",
        price: "Rp. 329.000",
    },
    {
        name: "SportsOn Rocket Tennis",
        category: "Tennis",
        image: "images/products/racket-2.svg",
        price: "Rp. 999.000",
    }
];

const ProductsSection = () => {
    return <section id="products-section" className="container mx-auto mt-32 mb-64">
        <h2 className="font-bold italic text-4xl text-center mb-11">
            <span className="text-primary">OUR</span> PRODUCTS
        </h2>
        <div className="grid grid-cols-4 grid-rows-2 gap-6">
            {productsList.map((product, index) => (
                <Link 
                    href="#" 
                    key={index} 
                    className="flex flex-col justify-center items-start shadow-lg rounded-lg p-2 hover:shadow-2xl transition-all duration-300"
                >
                    <div className="relative flex flex-col justify-center items-center bg-primary-light mb-4 w-full aspect-square">
                        <img 
                            src={product.image} 
                            height={250}/>
                        <Button className="w-10 h-10 p-2! absolute top-[8px] right-[8px]">
                            <FiPlus size={24} className="text-white m-auto"/>
                        </Button>
                    </div>
                    <h3 className="font-medium text-[18px] mb-1">{product.name}</h3>
                    <div className="flex justify-between w-full">
                        <div className="text-grey-500">{product.category}</div>
                        <div className="font-medium text-primary">{product.price}</div>
                    </div>
                </Link>
            ))}            
        </div>

    </section>;
};

export default ProductsSection;