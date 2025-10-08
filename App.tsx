import React, { useState, useEffect, useMemo } from 'react';
import { Category, Participant, ParticipantsData } from './types';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import DataTable from './components/DataTable';
import SummaryBar from './components/SummaryBar';
import ParticipantModal from './components/ParticipantModal';
import CategoryManagerModal from './components/CategoryManagerModal';
import ParticipantChart from './components/ParticipantChart';
import { api } from './api';

const App: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [participantsData, setParticipantsData] = useState<ParticipantsData>({});
    const [activeCategoryId, setActiveCategoryId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isParticipantModalOpen, setParticipantModalOpen] = useState(false);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [participantToEdit, setParticipantToEdit] = useState<Participant | null>(null);

    // Load data from the simulated API on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [fetchedCategories, fetchedParticipants] = await Promise.all([
                    api.getCategories(),
                    api.getParticipantsData()
                ]);

                setCategories(fetchedCategories);
                setParticipantsData(fetchedParticipants);

                if (fetchedCategories.length > 0) {
                    setActiveCategoryId(fetchedCategories[0].id);
                }
            } catch (err) {
                console.error("Failed to fetch data", err);
                setError("Gagal memuat data dari server.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddParticipant = () => {
        setParticipantToEdit(null);
        setParticipantModalOpen(true);
    };

    const handleEditParticipant = (participant: Participant) => {
        setParticipantToEdit(participant);
        setParticipantModalOpen(true);
    };

    const handleDeleteParticipant = async (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data peserta ini?')) {
            try {
                await api.deleteParticipant(activeCategoryId, id);
                setParticipantsData(prev => ({
                    ...prev,
                    [activeCategoryId]: prev[activeCategoryId].filter(p => p.id !== id),
                }));
            } catch (err) {
                console.error("Failed to delete participant", err);
                alert("Gagal menghapus data peserta.");
            }
        }
    };

    const handleSaveParticipant = async (participant: Participant) => {
        try {
            const savedParticipant = await api.saveParticipant(activeCategoryId, participant);
            setParticipantsData(prev => {
                const currentParticipants = prev[activeCategoryId] || [];
                let updatedParticipants;
                if (participantToEdit) {
                    updatedParticipants = currentParticipants.map(p => p.id === participantToEdit.id ? savedParticipant : p);
                } else {
                    updatedParticipants = [...currentParticipants, savedParticipant];
                }
                return { ...prev, [activeCategoryId]: updatedParticipants };
            });
        } catch (err) {
            console.error("Failed to save participant", err);
            alert("Gagal menyimpan data peserta.");
        }
    };

    const handleAddCategory = async (name: string) => {
        try {
            const newCategory = await api.addCategory(name);
            setCategories(prev => [...prev, newCategory]);
            setParticipantsData(prev => ({ ...prev, [newCategory.id]: [] }));
        } catch (err: any) {
            console.error("Failed to add category", err);
            alert(err.message || "Gagal menambahkan kategori baru.");
        }
    };

    const handleUpdateCategory = async (id: string, name: string) => {
        try {
            const updatedCategory = await api.updateCategory(id, name);
            setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
        } catch (err: any) {
            console.error("Failed to update category", err);
            alert(err.message || "Gagal memperbarui kategori.");
            // Re-throw to allow modal to handle UI state
            throw err;
        }
    };

    const handleDeleteCategory = async (id: string) => {
        const categoryToDelete = categories.find(c => c.id === id);
        if (!categoryToDelete) return;

        const participants = participantsData[id] || [];
        let confirmation = true;

        if (participants.length > 0) {
            confirmation = window.confirm(`Kategori "${categoryToDelete.name}" memiliki ${participants.length} data peserta. Apakah Anda yakin ingin menghapusnya? Semua data peserta terkait akan ikut terhapus.`);
        } else {
            confirmation = window.confirm(`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete.name}"?`);
        }
        
        if(confirmation) {
            try {
                await api.deleteCategory(id);
                // Refetch all data to ensure state consistency after deletion
                const [refetchedCategories, refetchedParticipants] = await Promise.all([
                    api.getCategories(),
                    api.getParticipantsData()
                ]);

                setCategories(refetchedCategories);
                setParticipantsData(refetchedParticipants);

                // If the deleted category was active, or if the active one somehow disappeared, reset to the first available.
                if (activeCategoryId === id || !refetchedCategories.some(c => c.id === activeCategoryId)) {
                     setActiveCategoryId(refetchedCategories.length > 0 ? refetchedCategories[0].id : '');
                }
            } catch (err) {
                console.error("Failed to delete category", err);
                alert("Gagal menghapus kategori.");
            }
        }
    };

    const activeParticipants = useMemo(() => {
        return participantsData[activeCategoryId] || [];
    }, [participantsData, activeCategoryId]);

    const isProdaActive = useMemo(() => {
        const activeCategory = categories.find(c => c.id === activeCategoryId);
        return activeCategory?.name.toLowerCase() === 'proda';
    }, [categories, activeCategoryId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                <p className="text-slate-500 dark:text-slate-400 text-lg">Memuat data...</p>
            </div>
        )
    }

    if (error) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/50">
                <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-6">
                        {categories.length > 0 && activeCategoryId && (
                             <CategoryTabs 
                                categories={categories}
                                activeCategoryId={activeCategoryId}
                                onSelectCategory={setActiveCategoryId}
                                onManageCategories={() => setCategoryModalOpen(true)}
                             />
                        )}
                        <div className="mt-6 space-y-4">
                            <SummaryBar participants={activeParticipants} isProdaActive={isProdaActive} />
                            <DataTable 
                                participants={activeParticipants}
                                onAdd={handleAddParticipant}
                                onEdit={handleEditParticipant}
                                onDelete={handleDeleteParticipant}
                                isProdaActive={isProdaActive}
                            />
                        </div>
                    </div>
                    
                    <ParticipantChart categories={categories} participantsData={participantsData} />
                </div>
            </main>

            <ParticipantModal
                isOpen={isParticipantModalOpen}
                onClose={() => setParticipantModalOpen(false)}
                onSave={handleSaveParticipant}
                participantToEdit={participantToEdit}
                isProdaActive={isProdaActive}
            />

            <CategoryManagerModal 
                isOpen={isCategoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                categories={categories}
                onAddCategory={handleAddCategory}
                onDeleteCategory={handleDeleteCategory}
                onUpdateCategory={handleUpdateCategory}
            />
        </div>
    );
};

export default App;