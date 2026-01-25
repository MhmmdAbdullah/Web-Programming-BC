"use client"

import BankInfoList from "../../components/bank-info/bank-info-list"
import BankInfoModal from "../../components/bank-info/bank-info-modal"
import TransactionModal from "../../components/transactions/transaction-modal"
import TransactionTable from "../../components/transactions/transaction-table"
import PageWithHeader from "../../components/ui/page-with-header"
import { useState } from "react"

const BankInformationManagement = () => {
    const[isOpen, setIsOpen] = useState(false)

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    return <PageWithHeader 
            title="Bank Information"
            information="Manage destination accounts for customer transfers."
            category="Bank Account"
            onAdd={() => setIsOpen(true)}
            >
            <div>
                <BankInfoList />
                <BankInfoModal isOpen={isOpen} onClose={handleCloseModal} />
            </div>

    </PageWithHeader>
}

export default BankInformationManagement