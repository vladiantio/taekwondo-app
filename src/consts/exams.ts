export type Exam = {
  id: string;
  range: string;
  belt: string;
  type: 'gup' | 'dan';
  breaking: string;
};

export const exams: Exam[] = [
  {
    id: 'gup-9',
    range: '9º GUP',
    belt: 'white-yellow',
    type: 'gup',
    breaking: 'Suele no exigirse rotura; confirma con tu escuela.',
  },
  {
    id: 'gup-8',
    range: '8º GUP',
    belt: 'yellow',
    type: 'gup',
    breaking: 'Ap Chagi — 1 tablero (según programa del club).',
  },
  {
    id: 'gup-7',
    range: '7º GUP',
    belt: 'yellow-green',
    type: 'gup',
    breaking: 'Ap Chagi o Dollyo Chagi — 1 tablero.',
  },
  {
    id: 'gup-6',
    range: '6º GUP',
    belt: 'green',
    type: 'gup',
    breaking: 'Dollyo Chagi — 1 tablero.',
  },
  {
    id: 'gup-5',
    range: '5º GUP',
    belt: 'green-blue',
    type: 'gup',
    breaking: 'Yop Chagi — 1 tablero.',
  },
  {
    id: 'gup-4',
    range: '4º GUP',
    belt: 'blue',
    type: 'gup',
    breaking: 'Técnica de pie lateral o circular — 2 tableros.',
  },
  {
    id: 'gup-3',
    range: '3º GUP',
    belt: 'blue-red',
    type: 'gup',
    breaking: 'Combinación de patadas — 2 tableros.',
  },
  {
    id: 'gup-2',
    range: '2º GUP',
    belt: 'red',
    type: 'gup',
    breaking: 'Patada saltada o con giro — según criterio del examinador.',
  },
  {
    id: 'gup-1',
    range: '1º GUP',
    belt: 'red-black',
    type: 'gup',
    breaking: 'Rotura múltiple o técnica avanzada — confirma requisitos.',
  },
  {
    id: 'dan-1',
    range: 'I DAN',
    belt: 'black-dan-1',
    type: 'dan',
    breaking: 'I Dan: roturas y poder acorde al programa de tu federación.',
  },
  {
    id: 'dan-2',
    range: 'II DAN',
    belt: 'black-dan-2',
    type: 'dan',
    breaking: 'II Dan: conjunto de roturas acordes al grado.',
  },
  {
    id: 'dan-3',
    range: 'III DAN',
    belt: 'black-dan-3',
    type: 'dan',
    breaking: 'III Dan: roturas avanzadas según criterio del examinador.',
  },
];
