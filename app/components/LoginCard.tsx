import { ReactNode } from 'react';
import Image from 'next/image';

interface LoginCardProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export default function LoginCard({ children, title, subtitle }: LoginCardProps) {
    return (
        <div className="w-full max-w-md lg:w-[40vw] lg:max-w-none lg:h-screen bg-white/90 dark:bg-gray-600/90 backdrop-blur-sm lg:rounded-none rounded-2xl shadow-2xl p-8 opacity-94 flex flex-col justify-center animate-fadeInLeft">
            <div className="mb-6">
                {/* Logo */}
                <div className="mb-12 flex justify-center">
                    <Image
                        src="/auth/logo.png"
                        alt="AgriTrust Logo"
                        width={280}
                        height={280}
                        className="object-contain hover:scale-125 transition-transform duration-300"
                    />
                </div>
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-600 mb-2   hover:text-green-500 transition-colors">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {subtitle}
                    </p>
                )}
            </div>
            {children}
        </div>
    );
}
