"use client"

import { useState } from "react"
import ProductModal from "../../components/products/product-modal"
import ProductTable from "../../components/products/product-table"
import PageWithHeader from "../../components/ui/page-with-header"

const ProductManagement = () => {
    const[isOpen, setIsOpen] = useState(false)

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return <PageWithHeader 
            title="Product Management"
            information="Manage your inventory, prices and stock."
            category="Product"
            onAdd={() => setIsOpen(true)}
            >
            <div>
                <ProductTable />
                <ProductModal isOpen={isOpen} onClose={handleCloseModal} />
            </div>
    </PageWithHeader>
}

export default ProductManagement