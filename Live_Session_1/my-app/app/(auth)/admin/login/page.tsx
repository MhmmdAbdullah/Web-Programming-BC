"use client"

import Button from "@/app/(landing)/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

const LoginPage = () => {
    const {push} = useRouter()
    return (
        <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
            <div className="max-w-136 w-full bg-white rounded-xl border-t-8 border-primary p-12 shadow-lg">
                <Image 
                    src= "/images/logo-admin.svg" 
                    alt="logo admin"
                    width={304}
                    height={51}
                    className="mx-auto mb-6"
                />
                <p className="opacity-50 text-sm text-center mb-10">Enter your credentials to access the dashboard</p>
                <div className="flex flex-col gap-5 w-99 mx-auto">
                    <div className="input-group-admin">
                        <label htmlFor="email" className="text-base!">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="Please Type Your Email"
                            className="py-4!"
                        />
                    </div>
                    <div className="input-group-admin">
                        <label htmlFor="password" className="text-base!">Password</label>
                        <input
                            type="text"
                            id="password" 
                            name="password" 
                            placeholder="••••••••••••••••••••"
                            className="py-4!"
                        />
                    </div>
                    <Button 
                        className="rounded-lg my-6"
                        onClick={() => push("/admin/products")}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </main>
    )

}

export default LoginPage