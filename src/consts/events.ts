export type EventCategory = {
  slug: string;
  color: string;
  label: string;
};

export type CalendarEvent = {
  id: number;
  date: string;
  title: string;
  location: string;
  cityCode: string;
  category: string;
  startTime?: string | null;
  endTime?: string | null;
  color?: string;
};

export const eventCategories: EventCategory[] = [
  {
    slug: 'competicion',
    color: '#AED6F1',
    label: 'Competición',
  },
  {
    slug: 'examen_gup',
    color: '#A9DFBF',
    label: 'Examen GUP',
  },
  {
    slug: 'examen_dan',
    color: '#A9DFBF',
    label: 'Examen DAN (Negro)',
  },
  {
    slug: 'especial',
    color: '#F9E79F',
    label: 'Especial',
  },
];

export const events: CalendarEvent[] = [
  {
    id: 1,
    date: '2026-03-07',
    title: 'Open Motril',
    location: 'Motril',
    cityCode: 'GRX',
    category: 'competicion',
    startTime: null,
    endTime: null,
  },
  {
    id: 2,
    date: '2026-04-11',
    title: 'Benalmadena CUP',
    location: 'Benalmadena',
    cityCode: 'MLG',
    category: 'competicion',
    startTime: null,
    endTime: null,
  },
  {
    id: 3,
    date: '2026-05-22',
    title: 'Examen I DAN',
    location: 'Valencia',
    cityCode: 'VLC',
    category: 'examen_dan',
    startTime: '18:00',
    endTime: '20:00',
  },
  {
    id: 4,
    date: '2026-05-23',
    title: 'Examen GUPS',
    location: 'Valencia',
    cityCode: 'VLC',
    category: 'examen_gup',
    startTime: '09:00',
    endTime: '12:00',
  },
  {
    id: 5,
    date: '2026-05-31',
    title: 'Open de Cataluña',
    location: 'Barcelona',
    cityCode: 'BCN',
    category: 'competicion',
    startTime: null,
    endTime: null,
  },
  {
    id: 6,
    date: '2026-06-06',
    title: 'Abierto de España GUPS',
    location: 'Málaga',
    cityCode: 'MLG',
    category: 'competicion',
    startTime: null,
    endTime: null,
  },
  {
    id: 7,
    date: '2026-06-21',
    title: 'Desafío de Guerreros',
    location: 'Valencia',
    cityCode: 'VLC',
    category: 'especial',
    startTime: '09:00',
    endTime: '12:00',
  },
  {
    id: 8,
    date: '2026-09-17',
    title: 'Spanish Open Benalmadena',
    location: 'Benalmadena',
    cityCode: 'MLG',
    category: 'competicion',
    startTime: null,
    endTime: null,
  },
];
