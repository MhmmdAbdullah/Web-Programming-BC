"use client";

import { Bank } from "@/app/types";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import TransactionModal from "../../components/transactions/transaction-modal";
import TransactionTable from "../../components/transactions/transaction-table";
import PageWithHeader from "../../components/ui/page-with-header";
import { useEffect, useState } from "react";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const BankInformationManagement = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [bankToDeleteId, setBankToDeleteId] = useState("");

  const fetchBanks = async () => {
    try {
      const data = await getAllBanks();
      if (data) {
        setBanks(data);
      }
    } catch (error) {
      console.error("Failed to fetch bank data", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBankToDeleteId(id);
    setisDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bankToDeleteId) return;
    try {
      await deleteBank(bankToDeleteId);
      fetchBanks();
      toast.success("Bank info deleted successfully!");
      setBankToDeleteId("");
      setisDeleteModalOpen(false);
      fetchBanks();
    } catch (error) {
      console.error("Failed to delete bank info", error);
      toast.error("Failed to delete bank info");
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <PageWithHeader
      title="Bank Information"
      information="Manage destination accounts for customer transfers."
      category="Bank Account"
      onAdd={() => setIsModalOpen(true)}
    >
      <div>
        <BankInfoList
          banks={banks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <BankInfoModal
          isOpen={isModalOpen}
          onSuccess={fetchBanks}
          onClose={handleCloseModal}
          bank={selectedBank}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setisDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </PageWithHeader>
  );
};

export default BankInformationManagement;
