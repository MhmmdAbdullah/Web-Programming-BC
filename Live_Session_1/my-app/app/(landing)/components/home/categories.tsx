import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

const categoriesList = [
    { name: 'Running', image: 'images/categories/category-running.svg', w:86, h:86 },
    { name: 'Tennis', image: 'images/categories/category-tennis.svg', w:76, h:76 },
    { name: 'Basketball', image: 'images/categories/category-basketball.svg', w:77, h:77 },
    { name: 'Football', image: 'images/categories/category-football.svg', w:84, h:84 },
    { name: 'Badminton', image: 'images/categories/category-badminton.svg', w:98, h:98 },
    { name: 'Swimming', image: 'images/categories/category-swimming.svg', w:76, h:76 },
    

];

type TCategoriesProps = {
    categories : Category[];
}
    
const CategoriesSection = ({categories} : TCategoriesProps) => {
    return (
        <section id="categories-section" className="container mx-auto">
            <div className="flex justify-between pb-8">
                <h2 className="font-bold text-2xl">Browse By Categories</h2>
                <Link href="#" className="flex gap-2 text-primary font-medium self-center">
                    See All Categories
                    <FiArrowRight className="self-center" />
                </Link>
            </div>
            <div className="grid grid-cols-6 items-center gap-[46px]">
                {categories.map((category) => (
                    <div key={category._id} className="flex flex-col gap-3 pt-4 justify-center items-center rounded-lg bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square">
                        <Image 
                            src={getImageUrl(category.imageUrl)} 
                            width={86} 
                            height={86} 
                            alt={category.name}
                            className="h-24"
                        />
                        <div className="text-primary font-medium text-[20px]">{category.name}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CategoriesSection
            