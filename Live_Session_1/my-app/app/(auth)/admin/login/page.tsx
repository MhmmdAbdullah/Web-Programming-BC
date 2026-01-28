"use client"

import Button from "@/app/(landing)/components/ui/button"
import { login } from "@/app/services/auth.service"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/admin/products");
        }
    }, [router]);

    const handleLogin = async () => {
        setisLoading(true)
        try {
            const data = await login({email,password})
            console.log("LOGIN RESPONSE:", data);
            if (data.token) {
                router.push("/admin/products")
            }
        } catch (err: any) {
            setErrorMessage(err.message || "Something went wrong, please try again later.")
            console.error("login error", err)
        } finally {
            setisLoading(false)
        }
    }

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

                {errorMessage && (
                    <div className="px-2 mx-6 py-4 bg-primary-light border border-primary rounded-md text-primary text-base font-semibold text-center w-99 mb-4">
                        {errorMessage}
                    </div>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }} 
                    className="flex flex-col gap-5 w-99 mx-auto">
                    <div className="input-group-admin">
                        <label htmlFor="email" className="text-base!">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="Please Type Your Email"
                            className="py-4!"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group-admin">
                        <label htmlFor="password" className="text-base!">Password</label>
                        <input
                            type="password"
                            id="password" 
                            name="password" 
                            placeholder="••••••••••••••••••••"
                            className="py-4!"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button 
                        className="rounded-lg my-6"
                        disabled={!email || !password || isLoading}
                    >
                        {
                            isLoading ? "Signing in ..." : "Sign In"
                        }
                    </Button>
                </form>
            </div>
        </main>

    )

}

export default LoginPage