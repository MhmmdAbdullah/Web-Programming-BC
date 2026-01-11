type TButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "dark" | "ghost";
    size?: "normal" | "small";
}   & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ 
    children, 
    className, 
    variant = "primary", 
    size = "normal", ...props
}: TButtonProps) => {

    const baseStyles = "inline-flex items-center justify-center gap-2 duration-300 cursor-pointer hover:scale-105";

    const variants = {
        primary : 'bg-primary text-white hover:bg-primary-85',
        dark :  'bg-dark text-white hover:bg-dark-85',
        ghost : 'bg-transparent hover:bg-gray-100 text-dark',
    }

    const sizes = {
        normal: 'px-9 py-4',
        small: 'px-7 py-[10px]',
    }

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;