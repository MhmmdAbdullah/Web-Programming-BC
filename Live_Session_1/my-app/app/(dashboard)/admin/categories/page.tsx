"use client";

import { useEffect, useState } from "react";
import PageWithHeader from "../../components/ui/page-with-header";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import { Category } from "@/app/types";
import {
  deleteCategory,
  getAllCategories,
} from "@/app/services/category.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setisModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setisDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDeleteId) return;
    try {
      await deleteCategory(categoryToDeleteId);
      fetchCategories();
      toast.success("Category deleted successfully!");
      setisDeleteModalOpen(false);
      setCategoryToDeleteId("");
    } catch (error) {
      console.error("Failed to delete category", error);
      toast.error("Failed to delete category");
    }
  };

  const handleCloseModal = () => {
    setisModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <PageWithHeader
      title="Category Management"
      information="Organize your products into categories."
      category="Category"
      onAdd={() => setisModalOpen(true)}
    >
      <div>
        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <CategoryModal
          category={selectedCategory}
          onSuccess={fetchCategories}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
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

export default CategoryManagement;
