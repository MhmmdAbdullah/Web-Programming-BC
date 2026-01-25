import { useState } from "react";
import Modal from "../ui/modal"
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";

type TProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal = ({isOpen, onClose}: TProductModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Product" >
            <div className="flex flex-col gap-6">
                <div className="flex gap-8">
                    <div className="min-w-50">
                        <ImageUploadPreview label="Product Image" value={imagePreview} onChange={
                            (file) => {
                                setImageFile(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }/>  
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="input-group-admin">
                            <label htmlFor="productName">Product Name</label>
                            <input 
                                type="text" 
                                id="productName" 
                                name="productName" 
                                placeholder="e. g. Running Shoes"
                            />
                        </div>
                        <div className="flex gap-7">
                            <div className="input-group-admin">
                                <label htmlFor="price">Price (IDR)</label>
                                <input 
                                    type="number" 
                                    id="price" 
                                    name="price" 
                                    placeholder="0"
                                />
                            </div>
                            <div className="input-group-admin">
                                <label htmlFor="stock">Stock</label>
                                <input 
                                    type="number" 
                                    id="stock" 
                                    name="stock" 
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category" 
                                name="category" 
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="running">Running</option>
                                <option value="tennis">Tennis</option>
                                <option value="basketball">Basketball</option>
                                <option value="football">Football</option>
                                <option value="badminton">Badminton</option>
                                <option value="swimming">Swimming</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="input-group-admin">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Product Details..."
                        rows={7}
                    />
                </div>
                <Button className="ml-auto mt-1 rounded-lg px-6! py-[10.5px]!">Create Product</Button>
            </div>
        </Modal>
    )
}

export default ProductModal