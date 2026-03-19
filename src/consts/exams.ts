export type Exam = {
  id: string;
  range: string;
  color: string;
  img: string;
  type: 'gup' | 'dan';
};

export const exams: Exam[] = [
  {
    id: 'gup-9',
    range: '9º GUP Punta Amarilla',
    color: 'Blanco con punta Amarilla',
    img: '/imgs/exams/white_yellow.png',
    type: 'gup',
  },
  {
    id: 'gup-8',
    range: '8º GUP  Cinturón Amarillo',
    color: 'Amarillo',
    img: '/imgs/exams/yellow.png',
    type: 'gup',
  },
  {
    id: 'gup-7',
    range: '7º GUP Punta Verde',
    color: 'Amarillo con punta Verde',
    img: '/imgs/exams/yellow_green.png',
    type: 'gup',
  },
  {
    id: 'gup-6',
    range: '6º GUP Cinturón Verde',
    color: 'Verde',
    img: '/imgs/exams/green.png',
    type: 'gup',
  },
  {
    id: 'gup-5',
    range: '5º GUP Punta Azul',
    color: 'Verde con punta Azul',
    img: '/imgs/exams/green_blue.png',
    type: 'gup',
  },
  {
    id: 'gup-4',
    range: '4º GUP Cinturón Azul',
    color: 'Azul',
    img: '/imgs/exams/blue.png',
    type: 'gup',
  },
  {
    id: 'gup-3',
    range: '3º GUP Punta Rojo',
    color: 'Azul con punta Rojo',
    img: '/imgs/exams/blue_red.png',
    type: 'gup',
  },
  {
    id: 'gup-2',
    range: '2º GUP Cinturón Rojo',
    color: 'Rojo',
    img: '/imgs/exams/red.png',
    type: 'gup',
  },
  {
    id: 'gup-1',
    range: '1º GUP Punta Negra',
    color: 'Rojo con punta Negra',
    img: '/imgs/exams/red_black.png',
    type: 'gup',
  },
  {
    id: 'dan-1',
    range: 'Cinturón I DAN',
    color: 'Negro',
    img: '/imgs/exams/black_I_DAN.png',
    type: 'dan',
  },
  {
    id: 'dan-2',
    range: 'Cinturón II DAN',
    color: 'Negro',
    img: '/imgs/exams/black_I_DAN.png',
    type: 'dan',
  },
  {
    id: 'dan-3',
    range: 'Cinturón III DAN',
    color: 'Negro',
    img: '/imgs/exams/black_I_DAN.png',
    type: 'dan',
  },
];
