import { ReactNode } from 'react';

interface LoginCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function LoginCard({ children, title, subtitle }: LoginCardProps) {
  return (
    <div className="w-full max-w-md lg:w-[40vw] lg:max-w-none lg:h-screen bg-white/90 dark:bg-gray-600/90 backdrop-blur-sm lg:rounded-none rounded-2xl shadow-2xl p-8 opacity-90 flex flex-col justify-center">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
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
