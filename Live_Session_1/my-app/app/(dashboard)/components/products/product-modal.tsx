import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product?: Product | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
};

const ProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    description: "",
  });

  const isEditMode = !!product;

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

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
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      data.append("categoryId", formData.categoryId);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      if (isEditMode) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }

      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);

      toast.success(
        isEditMode
          ? "Product updated successfully!"
          : "Product created successfully!",
      );

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(
        isEditMode ? "Failed to update product" : "Failed to create product",
        error,
      );

      toast.error(
        isEditMode ? "Failed to update product" : "Failed to create product",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.category._id,
        description: product.description,
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else if (isOpen) {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-8">
          <div className="min-w-50">
            <ImageUploadPreview
              label="Product Image"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="input-group-admin">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e. g. Running Shoes"
              />
            </div>
            <div className="flex gap-7">
              <div className="input-group-admin">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="input-group-admin">
              <label htmlFor="category">Category</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Details..."
            rows={7}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="ml-auto mt-1 rounded-lg px-6! py-[10.5px]!"
          type="submit"
        >
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
