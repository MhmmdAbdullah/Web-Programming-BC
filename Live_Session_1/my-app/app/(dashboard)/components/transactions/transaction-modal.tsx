import { useState } from "react";
import Modal from "../ui/modal";
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import Image from "next/image";
import PriceFormatter from "@/app/utils/price-formatter";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onStatusChange: (id: string, status: "paid" | "rejected") => Promise<void>;
};

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onStatusChange,
}: TProductModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return;

  const handleStatusUpdate = async (status: "paid" | "rejected") => {
    setIsUpdating(true);
    try {
      await onStatusChange(transaction._id, status);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        <div className="min-w-50">
          <h4 className="font-semibold text-xs mb-2">Payment Proof</h4>
          {transaction.paymentProof ? (
            <Image
              src={getImageUrl(transaction.paymentProof)}
              alt="payment proof"
              width={200}
              height={401}
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-sm">No payment proof uploaded</p>
            </div>
          )}
        </div>
        <div className="w-full">
          <h4 className="font-semibold text-xs mb-2">Order Details</h4>
          <div className="flex flex-col bg-gray-100 rounded-md p-4 gap-3 mb-5">
            <div className="flex justify-between text-xs">
              <div className="opacity-50 ">Date</div>
              <div className="text-right font-medium">
                {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <div className="opacity-50 ">Customer</div>
              <div className="text-right font-medium">
                {transaction.customerName}
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <div className="opacity-50 ">Contact</div>
              <div className="text-right font-medium">
                {transaction.customerContact}
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <div className="opacity-50 whitespace-nowrap">
                Shipping Address
              </div>
              <div className="text-right font-medium">
                {transaction.customerAddress}
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-xs mb-4">Items Purchased</h4>
          <div className="space y-3">
            {transaction.purchasedItems.map((item) => (
              <div
                key={item.productId._id}
                className="border border-gray-200 rounded-lg p-2.5 flex gap-2 mb-6"
              >
                <div className="flex bg-gray-100 rounded-md aspect-square w-8 h-8 ">
                  <Image
                    src={getImageUrl(item.productId.imageUrl)}
                    width={30}
                    height={30}
                    alt="product image"
                  />
                </div>
                <div className="font-medium text-xs self-center">
                  {item.productId.name}
                </div>
                <div className="font-medium text-xs self-center ml-auto">
                  {item.qty} Units
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-xs">
            <h4>Total</h4>
            <h4 className="text-primary">
              {PriceFormatter(parseInt(transaction.totalPayment))}
            </h4>
          </div>
          <div className="flex justify-end gap-5 mt-17">
            {isUpdating ? (
              <div className="text-center">Updating...</div>
            ) : transaction.status.toLowerCase() !== "pending" ? (
              <div className={" py-3 rounded-md text-sm"}>
                This transaction has been {transaction.status.toLowerCase()}
              </div>
            ) : (
              <>
                <Button
                  className="text-red-500! bg-primary/20! text-sm px-5! py-2! rounded-md"
                  size="small"
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={isUpdating}
                >
                  <FiX size={20} />
                  Reject
                </Button>
                <Button
                  className="text-white! bg-[#50C252]! text-sm px-4! py-2! rounded-md"
                  size="small"
                  onClick={() => handleStatusUpdate("paid")}
                  disabled={isUpdating}
                >
                  <FiCheck size={20} />
                  Approve
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
