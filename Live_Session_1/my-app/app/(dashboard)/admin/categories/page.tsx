"use client"

import { useState } from "react"
import PageWithHeader from "../../components/ui/page-with-header"
import CategoryTable from "../../components/categories/category-table"
import CategoryModal from "../../components/categories/category-modal"

const CategoryManagement = () => {
    const[isOpen, setIsOpen] = useState(false)

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    return <PageWithHeader 
            title="Category Management"
            information="Organize your products into categories."
            category="Category"
            onAdd={() => setIsOpen(true)}
            >
            <div>
                <CategoryTable />
                <CategoryModal isOpen={isOpen} onClose={handleCloseModal} />
            </div>

    </PageWithHeader>
}

export default CategoryManagement