"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HiArrowLeft } from "react-icons/hi"

const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header className='flex justify-between px-4 md:px-30 py-6 md:py-10 items-center'>
        <div className="flex items-center gap-3">
            <div className="bg-[#6FE79F] w-10 h-10 rounded-lg flex items-center justify-center text-[#1E2B37] font-bold text-xl">
                H
            </div>
            <span className="font-bold text-xl text-gray-700 dark:text-gray-200 hidden sm:inline">Mis Hábitos</span>
        </div>
        <nav>
            {isHome ? (
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Inicio
                </span>
            ) : (
                <Link href="/" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors font-medium">
                    <HiArrowLeft />
                    Volver al inicio
                </Link>
            )}
        </nav>
    </header>
  )
}

export default Header