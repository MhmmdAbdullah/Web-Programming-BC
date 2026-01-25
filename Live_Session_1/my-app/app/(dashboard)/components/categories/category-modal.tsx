import { useState } from "react";
import Modal from "../ui/modal"
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";

type TProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const CategoryModal = ({isOpen, onClose}: TProductModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Category" >
            <div className="flex flex-col gap-6">
                <div className="flex gap-8">
                    <div className="min-w-50">
                        <ImageUploadPreview label="Category Image" value={imagePreview} onChange={
                            (file) => {
                                setImageFile(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }/>  
                    </div>
                    <div className="flex flex-col gap-5 w-91">
                        <div className="input-group-admin">
                            <label htmlFor="categoryName">Category Name</label>
                            <input 
                                type="text" 
                                id="categoryName" 
                                name="categoryName" 
                                placeholder="e. g. Running Shoes"
                            />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                placeholder="Product Details..."
                                rows={5}
                            />
                        </div>
                    </div>
                </div>
                <Button className="ml-auto mt-1 rounded-lg px-6! py-[10.5px]!">Create Category</Button>
            </div>
        </Modal>
    )
}

export default CategoryModal