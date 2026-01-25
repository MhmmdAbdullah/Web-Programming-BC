import Image from "next/image"
import PriceFormatter from "@/app/utils/price-formatter"
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi"

const transactionData = [
    {
        date: "23/02/2026 19:32",
        customer: "John Doe",
        contact: "08231223123",
        total: 450000,
        status: "PENDING"
    },
    {
        date: "23/02/2026 19:32",
        customer: "John Doe",
        contact: "08231223123",
        total: 450000,
        status: "REJECTED"
    },
    {
        date: "23/02/2026 19:32",
        customer: "John Doe",
        contact: "08231223123",
        total: 450000,
        status: "PAID"
    }
]

type TCategoryTableProps = {
    onViewDetails:() => void;
}

const TransactionTable = ({onViewDetails}: TCategoryTableProps) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-900 border-yellow-400";
            case "rejected":
                return "bg-red-100 text-red-600 border-red-600";
            case "paid":
                return "bg-green-100 text-green-900 border-green-500";
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 ">
                        <th className="px-6 py-4 font-semibold">
                            Date
                        </th>
                        <th className="px-6 py-4 font-semibold">
                            Customer
                        </th>
                        <th className="px-6 py-4 font-semibold">
                            Contact
                        </th>
                        <th className="px-6 py-4 font-semibold">
                            Total
                        </th>
                        <th className="px-6 py-4 font-semibold">
                            Status
                        </th> 
                        <th className="px-6 py-4 font-semibold">
                            Actions
                        </th> 
                    </tr>
                </thead>
                <tbody>
                    {transactionData.map((data, index) => {
                        return(
                            <tr key={index} className="border-b border-gray-200 last:border-b-0 ">
                                <td className="px-6 py-4 font-medium">
                                        {data.date}
                                </td>
                                <td className="px-6 py-4 font-medium">
                                        {data.customer}
                                </td>
                                <td className="px-6 py-4 font-medium">                                    
                                    {data.contact}
                                </td>
                                <td className="px-6 py-4 font-medium">                                    
                                    {PriceFormatter(data.total)}
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    <div className={`px-4 py-1 rounded-full border text-center w-fit ${getStatusColor(data.status)}`}>
                                        {data.status} 
                                    </div>                                    
                                </td>
                                <td 
                                    onClick={onViewDetails}
                                    className="px-6 py-7.5 flex gap-2 items-center font-medium cursor-pointer hover:scale-105 duration-300"
                                >
                                    <button>
                                        <FiEye size={22}/>
                                    </button>
                                    View Details     
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}


export default TransactionTable