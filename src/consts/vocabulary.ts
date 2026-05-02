export type VocabularyCategory =
  | 'numbers'
  | 'commands'
  | 'body'
  | 'colors'
  | 'techniques'
  | 'phrases'
  | 'heights';

export type VocabularyItem = {
  korean: string;
  pronunciation: string;
  spanish: string;
  category: VocabularyCategory;
};

export const vocabulary: VocabularyItem[] = [
  // Números
  {
    korean: '하나',
    pronunciation: 'hana',
    spanish: 'Uno',
    category: 'numbers',
  },
  { korean: '둘', pronunciation: 'dul', spanish: 'Dos', category: 'numbers' },
  { korean: '셋', pronunciation: 'set', spanish: 'Tres', category: 'numbers' },
  {
    korean: '넷',
    pronunciation: 'net',
    spanish: 'Cuatro',
    category: 'numbers',
  },
  {
    korean: '다섯',
    pronunciation: 'daseot',
    spanish: 'Cinco',
    category: 'numbers',
  },
  {
    korean: '여섯',
    pronunciation: 'yeoseot',
    spanish: 'Seis',
    category: 'numbers',
  },
  {
    korean: '일곱',
    pronunciation: 'ilgop',
    spanish: 'Siete',
    category: 'numbers',
  },
  {
    korean: '여덟',
    pronunciation: 'yeodeol',
    spanish: 'Ocho',
    category: 'numbers',
  },
  {
    korean: '아홉',
    pronunciation: 'ahop',
    spanish: 'Nueve',
    category: 'numbers',
  },
  { korean: '열', pronunciation: 'yeol', spanish: 'Diez', category: 'numbers' },

  // Comandos básicos
  {
    korean: '차렷',
    pronunciation: 'charyeot',
    spanish: 'Atención',
    category: 'commands',
  },
  {
    korean: '경례',
    pronunciation: 'gyeongnye',
    spanish: 'Saludo',
    category: 'commands',
  },
  {
    korean: '쉬어',
    pronunciation: 'swieo',
    spanish: 'Descanso',
    category: 'commands',
  },
  {
    korean: '시작',
    pronunciation: 'sijak',
    spanish: 'Comenzar',
    category: 'commands',
  },
  {
    korean: '그만',
    pronunciation: 'geuman',
    spanish: 'Parar',
    category: 'commands',
  },
  {
    korean: '돌아서',
    pronunciation: 'dolaseo',
    spanish: 'Media vuelta',
    category: 'commands',
  },
  {
    korean: '앞으로',
    pronunciation: 'ap-euro',
    spanish: 'Adelante',
    category: 'commands',
  },
  {
    korean: '뒤로',
    pronunciation: 'dwiro',
    spanish: 'Atrás',
    category: 'commands',
  },

  // Zonas de ataque, altura y términos de bloques (ITF)
  {
    korean: '얼굴',
    pronunciation: 'eolgul',
    spanish: 'Cara o cabeza (zona alta de ataque o defensa)',
    category: 'heights',
  },
  {
    korean: '몸통',
    pronunciation: 'momtong',
    spanish: 'Zona media (tronco: pecho, abdomen alto)',
    category: 'heights',
  },
  {
    korean: '하단',
    pronunciation: 'hadan',
    spanish: 'Zona baja (pubis, muslos, tibia)',
    category: 'heights',
  },
  {
    korean: '높은',
    pronunciation: 'nopeun',
    spanish: 'Alto (golpe, bloqueo o cámara en altura alta)',
    category: 'heights',
  },
  {
    korean: '낮은',
    pronunciation: 'najeun',
    spanish: 'Bajo (golpe o cámara en altura baja)',
    category: 'heights',
  },
  {
    korean: '높은데',
    pronunciation: 'nopeunde',
    spanish: 'A la altura alta (nivel del rostro, defensa, etc.)',
    category: 'heights',
  },
  {
    korean: '낮은데',
    pronunciation: 'najunde',
    spanish: 'A la altura baja (defensa, patada, etc.)',
    category: 'heights',
  },
  {
    korean: '아래',
    pronunciation: 'arae',
    spanish: 'Abajo; parte inferior; en la zona baja de la técnica',
    category: 'heights',
  },
  {
    korean: '위',
    pronunciation: 'wi',
    spanish: 'Arriba; hacia arriba; parte superior',
    category: 'heights',
  },
  {
    korean: '중',
    pronunciation: 'jung',
    spanish: 'Medio; centro; altura intermedia (medio cuerpo)',
    category: 'heights',
  },
  {
    korean: '가운데',
    pronunciation: 'gaunde',
    spanish: 'En el centro; al medio (posición a altura media)',
    category: 'heights',
  },
  {
    korean: '반달',
    pronunciation: 'bandal',
    spanish: '“Media luna” (p. ej. bandal dollyeochagi: arco y altura de patada)',
    category: 'heights',
  },

  // Partes del cuerpo
  {
    korean: '머리',
    pronunciation: 'meori',
    spanish: 'Cabeza',
    category: 'body',
  },
  { korean: '눈', pronunciation: 'nun', spanish: 'Ojo', category: 'body' },
  { korean: '코', pronunciation: 'ko', spanish: 'Nariz', category: 'body' },
  { korean: '입', pronunciation: 'ip', spanish: 'Boca', category: 'body' },
  { korean: '목', pronunciation: 'mok', spanish: 'Cuello', category: 'body' },
  {
    korean: '어깨',
    pronunciation: 'eokkae',
    spanish: 'Hombro',
    category: 'body',
  },
  { korean: '팔', pronunciation: 'pal', spanish: 'Brazo', category: 'body' },
  { korean: '손', pronunciation: 'son', spanish: 'Mano', category: 'body' },
  {
    korean: '가슴',
    pronunciation: 'gaseum',
    spanish: 'Pecho',
    category: 'body',
  },
  { korean: '배', pronunciation: 'bae', spanish: 'Estómago', category: 'body' },
  {
    korean: '다리',
    pronunciation: 'dari',
    spanish: 'Pierna',
    category: 'body',
  },
  { korean: '발', pronunciation: 'bal', spanish: 'Pie', category: 'body' },

  // Colores de cinturones
  {
    korean: '하얀색',
    pronunciation: 'hayansaek',
    spanish: 'Blanco',
    category: 'colors',
  },
  {
    korean: '노란색',
    pronunciation: 'noransaek',
    spanish: 'Amarillo',
    category: 'colors',
  },
  {
    korean: '초록색',
    pronunciation: 'choroksaek',
    spanish: 'Verde',
    category: 'colors',
  },
  {
    korean: '파란색',
    pronunciation: 'paransaek',
    spanish: 'Azul',
    category: 'colors',
  },
  {
    korean: '빨간색',
    pronunciation: 'ppalgansaek',
    spanish: 'Rojo',
    category: 'colors',
  },
  {
    korean: '검은색',
    pronunciation: 'geomeunsaek',
    spanish: 'Negro',
    category: 'colors',
  },

  // Técnicas básicas
  {
    korean: '주먹',
    pronunciation: 'jumeok',
    spanish: 'Puño',
    category: 'techniques',
  },
  {
    korean: '막기',
    pronunciation: 'makgi',
    spanish: 'Defensa',
    category: 'techniques',
  },
  {
    korean: '지르기',
    pronunciation: 'jireugi',
    spanish: 'Golpe de puño',
    category: 'techniques',
  },
  {
    korean: '차기',
    pronunciation: 'chagi',
    spanish: 'Patada',
    category: 'techniques',
  },
  {
    korean: '앞차기',
    pronunciation: 'apchagi',
    spanish: 'Patada frontal',
    category: 'techniques',
  },
  {
    korean: '옆차기',
    pronunciation: 'yeopchagi',
    spanish: 'Patada lateral',
    category: 'techniques',
  },
  {
    korean: '돌려차기',
    pronunciation: 'dollyeochagi',
    spanish: 'Patada circular',
    category: 'techniques',
  },
  {
    korean: '후려차기',
    pronunciation: 'huryeochagi',
    spanish: 'Patada hacia atrás',
    category: 'techniques',
  },

  // Frases útiles
  {
    korean: '감사합니다',
    pronunciation: 'gamsahamnida',
    spanish: 'Gracias',
    category: 'phrases',
  },
  {
    korean: '죄송합니다',
    pronunciation: 'joesonghamnida',
    spanish: 'Disculpe',
    category: 'phrases',
  },
  {
    korean: '안녕하세요',
    pronunciation: 'annyeonghaseyo',
    spanish: 'Hola',
    category: 'phrases',
  },
  {
    korean: '안녕히 가세요',
    pronunciation: 'annyeonghi gaseyo',
    spanish: 'Adiós',
    category: 'phrases',
  },
  {
    korean: '수고하셨습니다',
    pronunciation: 'sugohasyeotseumnida',
    spanish: 'Bien hecho',
    category: 'phrases',
  },
];

export const categoryLabels: Record<VocabularyCategory, string> = {
  numbers: 'Números',
  commands: 'Comandos',
  body: 'Partes del cuerpo',
  colors: 'Colores',
  techniques: 'Técnicas',
  phrases: 'Frases útiles',
  heights: 'Zonas y alturas',
};

