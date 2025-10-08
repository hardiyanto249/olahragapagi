
export interface Transportation {
  largeBus: number;
  smallBus: number;
  car: number;
  motorcycle: number;
  publicTransport: number;
}

export interface Participant {
  id: string;
  city: string;
  school: string;
  transportation: Transportation;
  total: number;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
}

export type ParticipantsData = Record<string, Participant[]>;
