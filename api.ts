import { Category, Participant, ParticipantsData } from './types';

// Simulate a database with in-memory data.
// In a real app, this data would live in a PostgreSQL database.

let categories: Category[] = [
    { id: 'jsit', name: 'JSIT' },
    { id: 'proda', name: 'Proda' },
    { id: 'kampus', name: 'Kampus/dll' },
];

let participantsData: ParticipantsData = {
    'jsit': [
        { id: 'p1', city: 'Kota Serang', school: 'Yayasan Al Izzah', transportation: { largeBus: 2, smallBus: 0, car: 0, motorcycle: 0, publicTransport: 0 }, total: 100, notes: '' },
        { id: 'p2', city: 'Kab Serang', school: 'Al Izzah / PMT', transportation: { largeBus: 1, smallBus: 0, car: 0, motorcycle: 0, publicTransport: 0 }, total: 50, notes: '' },
        { id: 'p3', city: 'Kabupaten Serang', school: 'BI', transportation: { largeBus: 1, smallBus: 0, car: 0, motorcycle: 0, publicTransport: 0 }, total: 23, notes: '' },
        { id: 'p4', city: 'Pandeglang', school: 'Irsyadul Ibad', transportation: { largeBus: 4, smallBus: 0, car: 1, motorcycle: 0, publicTransport: 0 }, total: 240, notes: '' },
    ],
    'proda': [],
    'kampus': [],
};

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
    getCategories: async (): Promise<Category[]> => {
        await delay(300);
        return [...categories];
    },

    getParticipantsData: async (): Promise<ParticipantsData> => {
        await delay(500);
        return JSON.parse(JSON.stringify(participantsData));
    },
    
    saveParticipant: async (categoryId: string, participant: Participant): Promise<Participant> => {
        await delay(400);
        const categoryParticipants = participantsData[categoryId] || [];
        
        if (participant.id && participant.id !== '') {
            // Update existing
            const index = categoryParticipants.findIndex(p => p.id === participant.id);
            if (index !== -1) {
                categoryParticipants[index] = participant;
                return participant;
            }
        }
        
        // Add new
        const newParticipant = { ...participant, id: new Date().toISOString() };
        participantsData[categoryId] = [...categoryParticipants, newParticipant];
        return newParticipant;
    },

    deleteParticipant: async (categoryId: string, participantId: string): Promise<{ success: boolean }> => {
        await delay(400);
        const categoryParticipants = participantsData[categoryId] || [];
        const initialLength = categoryParticipants.length;
        participantsData[categoryId] = categoryParticipants.filter(p => p.id !== participantId);
        
        if (participantsData[categoryId].length < initialLength) {
             return { success: true };
        } else {
             throw new Error("Participant not found");
        }
    },

    addCategory: async (name: string): Promise<Category> => {
        await delay(300);
        if (categories.some(c => c.name.toLowerCase() === name.trim().toLowerCase())) {
             throw new Error('Nama kategori sudah ada.');
        }
        const newCategory: Category = { id: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(), name };
        categories.push(newCategory);
        participantsData[newCategory.id] = [];
        return newCategory;
    },
    
    updateCategory: async (id: string, name: string): Promise<Category> => {
        await delay(300);
        const trimmedName = name.trim();
        if (categories.some(c => c.id !== id && c.name.toLowerCase() === trimmedName.toLowerCase())) {
            throw new Error('Nama kategori sudah ada.');
        }
        
        const categoryIndex = categories.findIndex(c => c.id === id);
        if (categoryIndex === -1) {
            throw new Error("Category not found");
        }

        const updatedCategory = { ...categories[categoryIndex], name: trimmedName };
        categories[categoryIndex] = updatedCategory;
        return updatedCategory;
    },

    deleteCategory: async (id: string): Promise<Category[]> => {
        await delay(400);
        const categoryExists = categories.some(c => c.id === id);
        
        if (categoryExists) {
            categories = categories.filter(c => c.id !== id);
            delete participantsData[id];
            return [...categories];
        } else {
            throw new Error("Category not found");
        }
    }
};