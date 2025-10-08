
import React, { useState, useEffect, useCallback } from 'react';
import { Participant } from '../types';

interface ParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (participant: Participant) => void;
    participantToEdit: Participant | null;
    isProdaActive: boolean;
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({ isOpen, onClose, onSave, participantToEdit, isProdaActive }) => {
    const getInitialState = useCallback(() => {
        return participantToEdit || {
            id: '',
            city: '',
            school: '',
            transportation: { largeBus: 0, smallBus: 0, car: 0, motorcycle: 0, publicTransport: 0 },
            total: 0,
            notes: '',
        };
    }, [participantToEdit]);

    const [formData, setFormData] = useState<Participant>(getInitialState);

    useEffect(() => {
        setFormData(getInitialState());
    }, [participantToEdit, isOpen, getInitialState]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTransportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = parseInt(value, 10) || 0;
        setFormData(prev => ({
            ...prev,
            transportation: {
                ...prev.transportation,
                [name]: numValue,
            }
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const total = Object.values(formData.transportation).reduce((sum, val) => sum + (isNaN(val) ? 0 : val), 0);
        onSave({ ...formData, total });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                            {participantToEdit ? 'Edit Peserta' : 'Tambah Peserta Baru'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={isProdaActive ? "md:col-span-2" : "md:col-span-1"}>
                                <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Kab/Kota</label>
                                <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                            </div>
                            {!isProdaActive && (
                                <div className="md:col-span-1">
                                    <label htmlFor="school" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Sekolah/Yayasan</label>
                                    <input type="text" name="school" id="school" value={formData.school} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                             <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">Akomodasi yang Digunakan</h3>
                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                <div>
                                    <label htmlFor="largeBus" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Bus Besar</label>
                                    <input type="number" name="largeBus" id="largeBus" min="0" value={formData.transportation.largeBus} onChange={handleTransportChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="smallBus" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Bus Kecil</label>
                                    <input type="number" name="smallBus" id="smallBus" min="0" value={formData.transportation.smallBus} onChange={handleTransportChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="car" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Mobil</label>
                                    <input type="number" name="car" id="car" min="0" value={formData.transportation.car} onChange={handleTransportChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="motorcycle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Motor</label>
                                    <input type="number" name="motorcycle" id="motorcycle" min="0" value={formData.transportation.motorcycle} onChange={handleTransportChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="publicTransport" className="block text-sm font-medium text-slate-700 dark:text-slate-300">KRL/Umum</label>
                                    <input type="number" name="publicTransport" id="publicTransport" min="0" value={formData.transportation.publicTransport} onChange={handleTransportChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                                </div>
                             </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="total" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Total Peserta (Orang)</label>
                            <input type="number" name="total" id="total" min="0" value={formData.total} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
                        </div>
                        
                        <div className="mt-4">
                            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Keterangan</label>
                            <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"></textarea>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Simpan
                        </button>
                        <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 dark:border-slate-500 shadow-sm px-4 py-2 bg-white dark:bg-slate-700 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParticipantModal;