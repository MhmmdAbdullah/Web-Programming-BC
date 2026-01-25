"use client"

import TransactionModal from "../../components/transactions/transaction-modal"
import TransactionTable from "../../components/transactions/transaction-table"
import PageWithHeader from "../../components/ui/page-with-header"
import { useState } from "react"

const TransactionManagement = () => {
    const[isOpen, setIsOpen] = useState(false)

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleViewDetails = () => {
        setIsOpen(true);
    }

    return <PageWithHeader 
            title="Transactions"
            information="Verify incoming payments and manage orders."
            category=""
            >
            <div>
                <TransactionTable onViewDetails={handleViewDetails}/>
                <TransactionModal isOpen={isOpen} onClose={handleCloseModal} />
            </div>

    </PageWithHeader>
}

export default TransactionManagement