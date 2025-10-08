
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Category, ParticipantsData } from '../types';
import { ChartBarIcon } from './icons';

interface ParticipantChartProps {
    categories: Category[];
    participantsData: ParticipantsData;
}

const ParticipantChart: React.FC<ParticipantChartProps> = ({ categories, participantsData }) => {
    const chartData = useMemo(() => {
        return categories.map(category => {
            const participants = participantsData[category.id] || [];
            const total = participants.reduce((sum, p) => sum + p.total, 0);
            return {
                name: category.name,
                Peserta: total
            };
        });
    }, [categories, participantsData]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <ChartBarIcon />
                Grafik Peserta per Kategori
            </h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip
                            cursor={{fill: 'rgba(100, 116, 139, 0.1)'}}
                            contentStyle={{
                                background: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '0.5rem',
                            }}
                            itemStyle={{ color: '#cbd5e1' }}
                            labelStyle={{ color: '#cbd5e1', fontWeight: 'bold' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '14px', color: '#94a3b8' }} />
                        <Bar dataKey="Peserta" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ParticipantChart;