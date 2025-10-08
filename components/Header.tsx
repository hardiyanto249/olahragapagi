
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white dark:bg-slate-800 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                    REKAPITULASI PESERTA OLARAGA PAGI JAKARTA
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">BANTEN - 12102025</p>
            </div>
        </header>
    );
};

export default Header;