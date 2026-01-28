"use client";

import { Transaction } from "@/app/types";
import TransactionModal from "../../components/transactions/transaction-modal";
import TransactionTable from "../../components/transactions/transaction-table";
import PageWithHeader from "../../components/ui/page-with-header";
import { useEffect, useState } from "react";
import {
  getAllTransactions,
  updateTransaction,
} from "@/app/services/transaction.service";
import { toast } from "react-toastify";
import { error } from "console";

const TransactionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleStatusChange = async (
    id: string,
    status: "paid" | "rejected",
  ) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      await updateTransaction(id, formData);

      toast.success("Transactions status updated!!");

      await fetchTransactions();
    } catch (error) {
      console.error("Failed to update transaction status!!", error);

      toast.error("Failed to update transaction status!!");
    } finally {
        setIsModalOpen(false)
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <PageWithHeader
      title="Transactions"
      information="Verify incoming payments and manage orders."
      category=""
    >
      <div>
        <TransactionTable
          transactions={transactions}
          onViewDetails={handleViewDetails}
        />
        <TransactionModal
          transaction={selectedTransaction}
          onStatusChange={handleStatusChange}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </PageWithHeader>
  );
};

export default TransactionManagement;
