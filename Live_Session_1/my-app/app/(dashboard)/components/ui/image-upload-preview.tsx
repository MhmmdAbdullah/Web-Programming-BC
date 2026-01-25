"use client"

import { useRef } from "react"
import Image from "next/image"
import { FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
    label?: string;
    value?: string | null;
    onChange: (file: File) => void;
    className?: string;
}


const ImageUploadPreview = ({label, value, onChange, className}: TImageUploadPreviewProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        fileInputRef?.current?.click()
    }

    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        onChange(file);
        }
    }

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-xs font-medium">
                {label}
            </label>
            <div 
                onClick={handleImageClick}
                className="flex flex-col justify-center items-center h-50 border border-dashed border-primary bg-primary/5 rounded-lg"
            >
                {
                    value ? (
                        <Image 
                            src={value}
                            alt="preview product"
                            className="w-full h-full object-cover"
                            width={190}
                            height={190}
                        />
                    ): (
                        <>
                            <FiUploadCloud className="text-primary" size={24}/>
                            <span className="text-sm font-medium">Click to Upload</span>
                        </>
                    )
                }
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}

export default ImageUploadPreview