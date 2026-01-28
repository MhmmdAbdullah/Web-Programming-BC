"use client";

import { useEffect, useState } from "react";
import ProductModal from "../../components/products/product-modal";
import ProductTable from "../../components/products/product-table";
import PageWithHeader from "../../components/ui/page-with-header";
import { Product } from "@/app/types";
import { deleteProduct, getAllProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  const fetchProducts = async () => {
    try {
      const data = await getAllProduct();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setisModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDeleteId(id);
    setisDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDeleteId) return;
    try {
      await deleteProduct(productToDeleteId);
      fetchProducts();
      toast.success("Product deleted successfully!");
      setisDeleteModalOpen(false);
      setProductToDeleteId("");
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setisModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <PageWithHeader
      title="Product Management"
      information="Manage your inventory, prices and stock."
      category="Product"
      onAdd={() => setisModalOpen(true)}
    >
      <div>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ProductModal
          product={selectedProduct}
          onSuccess={fetchProducts}
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

export default ProductManagement;
