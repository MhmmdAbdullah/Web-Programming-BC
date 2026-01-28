import Image from "next/image";
import PriceFormatter from "@/app/utils/price-formatter";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";


type TCategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
};

const CategoryTable = ({
  categories,
  onDelete,
  onEdit,
}: TCategoryTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 ">
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((data, index) => {
            return (
              <tr
                key={index}
                className="border-b border-gray-200 last:border-b-0 "
              >
                <td className="px-6 py-4 font-medium">
                  <div className="flex gap-3 items-center">
                    <div className="bg-gray-100 rounded-sm ">
                      <Image
                        src={getImageUrl(data.imageUrl)}
                        alt={data.name}
                        width={50}
                        height={50}
                        className="aspect-square object-contain"
                      />
                    </div>
                    <span>{data.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{data.description}</td>
                <td className="px-6 py-7.5 flex gap-4 items-center text-gray-600">
                  <button
                    onClick={() => onEdit?.(data)}
                    className="cursor-pointer hover:scale-105"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    onClick={() => onDelete?.(data._id)}
                    className="cursor-pointer hover:scale-105"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
