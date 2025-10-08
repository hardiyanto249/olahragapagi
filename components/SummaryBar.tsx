
import React, { useMemo } from 'react';
import { Participant, Transportation } from '../types';

interface SummaryBarProps {
    participants: Participant[];
    isProdaActive: boolean;
}

const SummaryBar: React.FC<SummaryBarProps> = ({ participants, isProdaActive }) => {
    const summary = useMemo<{ transportation: Transportation, total: number }>(() => {
        const initialSummary = {
            transportation: {
                largeBus: 0,
                smallBus: 0,
                car: 0,
                motorcycle: 0,
                publicTransport: 0,
            },
            total: 0,
        };

        return participants.reduce((acc, p) => {
            acc.transportation.largeBus += p.transportation.largeBus;
            acc.transportation.smallBus += p.transportation.smallBus;
            acc.transportation.car += p.transportation.car;
            acc.transportation.motorcycle += p.transportation.motorcycle;
            acc.transportation.publicTransport += p.transportation.publicTransport;
            acc.total += p.total;
            return acc;
        }, initialSummary);

    }, [participants]);

    return (
        <div className="bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 font-bold rounded-lg shadow-sm">
             <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                         <tr>
                            <th className="p-3 text-left w-1/12"></th>
                            <th className="p-3 text-left w-2/12"></th>
                            {!isProdaActive && <th className="p-3 text-left w-3/12">REKAP</th>}
                            <th className="p-3 text-center w-1/12">Bus Besar</th>
                            <th className="p-3 text-center w-1/12">Bus Kecil</th>
                            <th className="p-3 text-center w-1/12">Mobil</th>
                            <th className="p-3 text-center w-1/12">Motor</th>
                            <th className="p-3 text-center w-1/12">KRL/Umum</th>
                            <th className="p-3 text-center w-1/12">Total</th>
                            <th className="p-3 text-left w-2/12"></th>
                            <th className="p-3 text-left w-1/12"></th>
                        </tr>
                    </thead>
                     <tbody>
                        <tr className="border-t-2 border-amber-200 dark:border-amber-800">
                             <td className="p-3"></td>
                             <td className="p-3"></td>
                             {!isProdaActive && <td className="p-3"></td>}
                             <td className="p-3 text-center">{summary.transportation.largeBus}</td>
                             <td className="p-3 text-center">{summary.transportation.smallBus}</td>
                             <td className="p-3 text-center">{summary.transportation.car}</td>
                             <td className="p-3 text-center">{summary.transportation.motorcycle}</td>
                             <td className="p-3 text-center">{summary.transportation.publicTransport}</td>
                             <td className="p-3 text-center text-lg">{summary.total}</td>
                             <td className="p-3"></td>
                             <td className="p-3"></td>
                        </tr>
                     </tbody>
                </table>
            </div>
        </div>
    );
};

export default SummaryBar;