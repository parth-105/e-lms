// import './globals.css'
import SidebarWithLogo from '@/component/ui/SidebarWithLogo'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex h-screen">
                    <div className="w-1/4 h-full hidden md:block ">
                        <SidebarWithLogo />

                    </div>
                    <div className="w-full md:w-3/4 overflow-y-auto  justify-center h-screen scrollbar-hide ">
                        <div className='sticky z-30 mb-4'>
                            <h1>filter</h1>
                        </div>
                        <div className='overflow-y-auto  h-screen '>

                            {children}

                        </div>
                    </div>
                </div>
                {/* <h1>hiiii</h1>
        {children} */}
            </body>
        </html>
    )
}