import Button from "@/app/(landing)/components/ui/button"
import { FiPlus } from "react-icons/fi"

type TCardWithHeaderProps = {
    title: string;
    information: string;
    category: string;
    children: React.ReactNode;
    onAdd?: () => void;
}

const PageWithHeader = ({title, children, information, category, onAdd}:TCardWithHeaderProps) => {
    const isTransactions = title === "Transactions"

    return(
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <p className="opacity-50">{information}</p>
                </div>
                {onAdd && (
                    <Button
                        onClick={onAdd} 
                        className="rounded-lg" >
                        <FiPlus size={24} />
                        Add {category}   
                    </Button>
                )}
            </div>
            {children}
        </div>
    )
}

export default PageWithHeader