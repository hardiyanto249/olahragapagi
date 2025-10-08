
import React from 'react';
import { Category } from '../types';
import { CogIcon } from './icons';

interface CategoryTabsProps {
    categories: Category[];
    activeCategoryId: string;
    onSelectCategory: (id: string) => void;
    onManageCategories: () => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategoryId, onSelectCategory, onManageCategories }) => {
    return (
        <div className="border-b border-slate-300 dark:border-slate-700">
            <nav className="-mb-px flex space-x-4 sm:space-x-6 lg:space-x-8" aria-label="Tabs">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={`
                            ${activeCategoryId === category.id
                                ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                            }
                            whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-t-md
                        `}
                    >
                        {category.name}
                    </button>
                ))}
                 <button
                    onClick={onManageCategories}
                    className="ml-auto flex items-center gap-2 py-4 px-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-md"
                    title="Kelola Kategori"
                >
                    <CogIcon />
                    <span className="hidden md:inline">Kelola Kategori</span>
                </button>
            </nav>
        </div>
    );
};

export default CategoryTabs;