import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import { Bank } from "@/app/types";
import { createBank, updateBank } from "@/app/services/bank.service";
import { toast } from "react-toastify";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bank: Bank | null;
  onSuccess: () => void;
};

const BankInfoModal = ({
  isOpen,
  onClose,
  bank,
  onSuccess,
}: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<Bank>>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const isEditMode = !!bank;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateBank(bank._id, formData);
      } else {
        await createBank(formData);
      }

      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });
      onSuccess?.();
      onClose();

      toast.success(
        isEditMode
          ? "Bank info updated successfully!"
          : "Bank info created successfully!",
      );
    } catch (error) {
      console.error(
        isEditMode
          ? "Failed to update Bank info"
          : "Failed to create Bank info",
        error,
      );
      toast.error(
        isEditMode
          ? "Failed to update Bank info"
          : "Failed to create Bank info",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        bankName: bank.bankName,
      });
    } else if (isOpen) {
      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, bank]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Bank Account" : "Add Bank Account"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-92">
        <div className="flex flex-col gap-5">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              placeholder="e. g. Mandiri, BCA, BRI"
              value={formData.bankName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              placeholder="21837283672"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountName">Account Holder</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              placeholder="Holder Name as registered on the account"
              value={formData.accountName}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          className="ml-auto mt-1 rounded-lg px-6! py-[10.5px]!"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isEditMode ? "Update Bank Account" : "Add Bank Account"}
        </Button>
      </form>
    </Modal>
  );
};

export default BankInfoModal;
