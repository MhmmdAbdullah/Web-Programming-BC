import { useState } from "react";
import Modal from "../ui/modal"
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";

type TProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const BankInfoModal = ({isOpen, onClose}: TProductModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Add Bank Account" >
            <div className="flex flex-col gap-6 w-92">
                <div className="flex flex-col gap-5">
                    <div className="input-group-admin">
                        <label htmlFor="bankName">Bank Name</label>
                        <input 
                            type="text" 
                            id="bankName" 
                            name="bankName" 
                            placeholder="e. g. Mandiri, BCA, BRI"
                        />
                    </div>
                    <div className="input-group-admin">
                        <label htmlFor="accountName">Account Number</label>
                        <input 
                            type="text" 
                            id="accountName" 
                            name="accountName" 
                            placeholder="21837283672"
                        />
                    </div>
                    <div className="input-group-admin">
                        <label htmlFor="accountHolder">Account Holder</label>
                        <input 
                            type="text" 
                            id="accountHolder" 
                            name="accountHolder" 
                            placeholder="Holder Name as registered on the account"
                        />
                    </div>
                </div>
                <Button className="ml-auto mt-1 rounded-lg px-6! py-[10.5px]!">Add Bank Account</Button>
            </div>
        </Modal>
    )
}

export default BankInfoModal