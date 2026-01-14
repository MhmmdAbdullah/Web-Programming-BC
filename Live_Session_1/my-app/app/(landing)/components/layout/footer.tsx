import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (<footer className="bg-dark-alternate text-white">
        <div className="container mx-auto flex justify-between pt-14 pb-24">
            <div className="w-105">
                <Image src="/images/logo-footer.svg" alt="Logo" width={100} height={100} />
                <p className=" mt-8">
                    Engineered for endurance and designed for speed.  Experience gear that moves as fast as you do.
                </p>
            </div>
            <div className="w-105 grid grid-cols-2 ">
                <div className="flex flex-col gap-7">
                    <Link href="#">Home</Link>
                    <Link href="#">Categories</Link>
                    <Link href="#">Products</Link>
                    <Link href="#">About Us</Link>  
                </div>
                <div className="flex flex-col gap-7">
                    <Link href="#">Instagram</Link>
                    <Link href="#">Facebook</Link>
                    <Link href="#">Tiktok</Link>
                    <Link href="#">YouTube</Link>  
                </div>
            </div>
        </div>
        <div className="border-t border-t-white container mx-auto py-4"></div>
        <div className="container mx-auto flex justify-between pb-8 ">
            <p>SportsOn © 2025 All Rights Reserverd.</p>
            <div className="w-105 grid grid-cols-2 ">
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Term Condition</Link>
    
            </div>
        </div>
    </footer>
    )
}

export default Footer;