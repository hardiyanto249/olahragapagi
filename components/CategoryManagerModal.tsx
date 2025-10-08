import React, { useState } from 'react';
import { Category } from '../types';
import { PlusIcon, TrashIcon, PencilIcon } from './icons';

interface CategoryManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    onAddCategory: (name: string) => void;
    onDeleteCategory: (id: string) => void;
    onUpdateCategory: (id: string, name: string) => Promise<void>;
}

const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
    isOpen,
    onClose,
    categories,
    onAddCategory,
    onDeleteCategory,
    onUpdateCategory
}) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [error, setError] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) {
            setError('Nama kategori tidak boleh kosong.');
            return;
        }
        onAddCategory(newCategoryName.trim());
        setNewCategoryName('');
        setError('');
    };

    const handleEditClick = (category: Category) => {
        setEditingCategoryId(category.id);
        setEditingCategoryName(category.name);
    };

    const handleCancelEdit = () => {
        setEditingCategoryId(null);
        setEditingCategoryName('');
    };
    
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategoryId || !editingCategoryName.trim()) return;

        setIsSubmitting(true);
        try {
            await onUpdateCategory(editingCategoryId, editingCategoryName);
            handleCancelEdit();
        } catch (err) {
            // Error is handled by parent component (shows an alert)
            // Keep editing form open for user to correct
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Kelola Kategori</h2>
                    
                    <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => { setNewCategoryName(e.target.value); setError(''); }}
                            placeholder="Nama kategori baru"
                            className="flex-grow block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                        />
                        <button type="submit" className="flex items-center justify-center bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 transition-colors shadow-sm">
                           <PlusIcon />
                        </button>
                    </form>
                    {error && <p className="text-red-500 dark:text-red-400 text-sm mb-4">{error}</p>}
                    
                    <div className="max-h-60 overflow-y-auto pr-2">
                         <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">Daftar Kategori</h3>
                         <ul className="space-y-2">
                             {categories.map(category => (
                                 <li key={category.id} className="flex justify-between items-center bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                                     {editingCategoryId === category.id ? (
                                         <form onSubmit={handleUpdateSubmit} className="flex-grow flex items-center gap-2">
                                             <input
                                                 type="text"
                                                 value={editingCategoryName}
                                                 onChange={e => setEditingCategoryName(e.target.value)}
                                                 className="flex-grow block w-full rounded-md border-slate-300 dark:border-slate-500 dark:bg-slate-600 dark:text-slate-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm text-sm"
                                                 autoFocus
                                             />
                                             <button type="submit" disabled={isSubmitting} className="font-medium text-sky-600 dark:text-sky-400 hover:underline text-sm disabled:opacity-50">Simpan</button>
                                             <button type="button" onClick={handleCancelEdit} disabled={isSubmitting} className="font-medium text-slate-600 dark:text-slate-400 hover:underline text-sm disabled:opacity-50">Batal</button>
                                         </form>
                                     ) : (
                                         <>
                                             <span className="text-slate-800 dark:text-slate-200">{category.name}</span>
                                             <div className="flex items-center gap-1">
                                                 <button
                                                    onClick={() => handleEditClick(category)}
                                                    className="text-sky-600 dark:text-sky-500 hover:text-sky-800 dark:hover:text-sky-400 p-1 rounded-full hover:bg-sky-100 dark:hover:bg-slate-600 transition-colors"
                                                    title="Edit Kategori">
                                                     <PencilIcon />
                                                 </button>
                                                 <button 
                                                    onClick={() => onDeleteCategory(category.id)}
                                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-100 dark:hover:bg-slate-600 transition-colors"
                                                    title="Hapus Kategori">
                                                     <TrashIcon />
                                                 </button>
                                             </div>
                                         </>
                                     )}
                                 </li>
                             ))}
                         </ul>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 sm:px-6 flex justify-end rounded-b-lg">
                    <button type="button" onClick={onClose} className="w-full inline-flex justify-center rounded-md border border-slate-300 dark:border-slate-500 shadow-sm px-4 py-2 bg-white dark:bg-slate-700 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryManagerModal;