
import React from 'react';
import { Participant } from '../types';
import { PencilIcon, TrashIcon, PlusIcon } from './icons';

interface DataTableProps {
    participants: Participant[];
    onAdd: () => void;
    onEdit: (participant: Participant) => void;
    onDelete: (id: string) => void;
    isProdaActive: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ participants, onAdd, onEdit, onDelete, isProdaActive }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                 <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Data Peserta</h3>
                 <button 
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors duration-200 shadow-sm text-sm font-medium">
                    <PlusIcon />
                    <span>Tambah Peserta</span>
                 </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/12">No</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-2/12">Kab/Kota</th>
                            {!isProdaActive && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-3/12">Sekolah/Yayasan</th>}
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/12">Bus Besar</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/12">Bus Kecil</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/12">Mobil</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/12">Motor</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/12">KRL/Umum</th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/12">Total</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-2/12">Keterangan</th>
                            <th scope="col" className="relative px-6 py-3 w-1/12"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-300">
                        {participants.length === 0 ? (
                            <tr>
                                <td colSpan={isProdaActive ? 10 : 11} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                    Belum ada data peserta. Silakan tambahkan data baru.
                                </td>
                            </tr>
                        ) : (
                            participants.map((p, index) => (
                                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{p.city}</td>
                                    {!isProdaActive && <td className="px-6 py-4 whitespace-nowrap">{p.school}</td>}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{p.transportation.largeBus || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{p.transportation.smallBus || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{p.transportation.car || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{p.transportation.motorcycle || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{p.transportation.publicTransport || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-slate-800 dark:text-slate-100">{p.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{p.notes}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button onClick={() => onEdit(p)} className="text-sky-600 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 p-1 rounded-full hover:bg-sky-100 dark:hover:bg-slate-700 transition-colors">
                                                <PencilIcon />
                                            </button>
                                            <button onClick={() => onDelete(p.id)} className="text-red-600 dark:text-red-500 hover:text-red-900 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-100 dark:hover:bg-slate-700 transition-colors">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;