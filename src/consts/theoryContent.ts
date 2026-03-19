export type BeltRange = 'all' | 'white-yellow' | 'green-blue' | 'red-black';

export type TheoryBlock = {
  id: string;
  title: string;
  beltRange: BeltRange;
  content: string;
};

export const beltFilters: { id: BeltRange; label: string; colors: string[] }[] = [
  { id: 'all', label: 'Todos', colors: ['bg-gray-500'] },
  { id: 'white-yellow', label: 'Blanco - Amarillo', colors: ['bg-gray-300', 'bg-yellow-400'] },
  { id: 'green-blue', label: 'Verde - Azul', colors: ['bg-green-500', 'bg-blue-500'] },
  { id: 'red-black', label: 'Rojo - Negro', colors: ['bg-red-500', 'bg-gray-900'] },
];

export const theoryBlocks: TheoryBlock[] = [
  {
    id: 'intro',
    title: 'Introducción a la Teoría del Taekwondo',
    beltRange: 'white-yellow',
    content: `El Taekwondo es un arte marcial y deporte de combate moderno, originario de Corea, conocido mundialmente por su espectacular variedad de técnicas de pierna (patadas). Sin embargo, la "teoría del Taekwondo" es el conjunto de principios, filosofía, fundamentos técnicos y conocimientos que transforman el simple acto de patear y golpear en un camino de desarrollo personal y disciplina marcial.

Esta teoría no es solo un conjunto de reglas, sino la base sobre la que se construye la práctica. Comprenderla es esencial para cualquier practicante, desde el cinturón blanco hasta el cinturón negro, ya que proporciona el "por qué" y el "cómo" detrás de cada movimiento.

Podemos dividir la teoría del Taekwondo en cuatro pilares fundamentales:
• Filosofía y Principios (El Espíritu)
• Fundamentos Técnicos (El "Cómo" del Movimiento)
• Formas o Poomsae (El Baile Marcial)
• Combate y Defensa Personal`,
  },
  {
    id: 'philosophy',
    title: 'Filosofía y Principios (El Espíritu)',
    beltRange: 'white-yellow',
    content: `El Taekwondo busca la formación integral del individuo: cuerpo, mente y espíritu. Esta base filosófica se resume en sus Cinco Principios del Taekwondo (a menudo atribuidos a su fundador, el General Choi Hong Hi), que guían la conducta dentro y fuera del dojang (la sala de entrenamiento):

**Cortesía (Ye Ui)**
Ser educado, respetuoso con los demás (compañeros, instructores) y mostrar humildad. Se manifiesta en el saludo al entrar y salir, al interactuar con los compañeros, etc.

**Integridad (Yom Chi)**
Ser honesto consigo mismo y con los demás. Reconocer las propias limitaciones, saber lo que está bien y mal, y actuar en consecuencia.

**Perseverancia (In Nae)**
No rendirse ante las dificultades. La constancia en el entrenamiento, la paciencia para superar un obstáculo técnico y la determinación para alcanzar una meta, como el cinturón negro.

**Autocontrol (Guk Gi)**
Tener dominio sobre el propio cuerpo y emociones. Saber cuándo detener un golpe en el combate para no lastimar al oponente, y controlar la ira o el miedo en situaciones difíciles.

**Espíritu Indomable (Baekjul Boolgool)**
Afrontar la adversidad con valentía y convicción. Defender lo que es justo, incluso frente a una oposición abrumadora.

Estos principios no son meras palabras; se internalizan a través de la práctica constante.`,
  },
  {
    id: 'fundamentals',
    title: 'Fundamentos Técnicos (El "Cómo" del Movimiento)',
    beltRange: 'white-yellow',
    content: `Esta es la parte más práctica y visible de la teoría. Describe y clasifica las técnicas básicas que componen el Taekwondo. Se basan en principios biomecánicos como la generación de potencia a través de la rotación de la cadera, el equilibrio y la respiración.

Los fundamentos se dividen en:

**Posturas (Seogi)**
La base de todo movimiento. Una postura correcta proporciona equilibrio, estabilidad y potencia. Ejemplos: postura de atención (Charyeot Seogi), de preparación (Junbi Seogi), de jinete (Juchum Seogi), hacia adelante (Ap Seogi), hacia atrás (Dwit Seogi), etc.

**Técnicas de defensa (Makgi)**
Movimientos diseñados para bloquear o desviar un ataque. Ejemplos: bloqueo inferior (Arae Makgi), bloqueo medio (Momtong Makgi), bloqueo superior (Eolgul Makgi), bloqueo con cuchillo de mano (Sonkal Makgi), etc.

**Técnicas de puño (Jireugi)**
Golpes lineales con la mano cerrada. El más básico es el golpe de puño hacia adelante (Ap Jireugi).

**Técnicas de mano abierta (Son Taegi, Chigi)**
Golpes realizados con diferentes partes de la mano abierta, como el cuchillo de mano (Sonkal), el dorso de la mano (Deung Joomuk), etc.

**Técnicas de pie (Chagi)**
El sello de identidad del Taekwondo. La teoría aquí es vasta, explicando la trayectoria, la altura y la parte del pie que golpea. Ejemplos: patada frontal (Ap Chagi), patada circular (Dollyo Chagi), patada lateral (Yop Chagi), patada hacia atrás (Dwit Chagi), patada en gancho (Huryeo Chagi), etc.`,
  },
  {
    id: 'poomsae',
    title: 'Formas o Poomsae (El Baile Marcial)',
    beltRange: 'green-blue',
    content: `Un Poomsae es un conjunto de movimientos de ataque y defensa, realizados en una secuencia predeterminada contra uno o más oponentes imaginarios. Es como un libro de texto viviente.

La teoría del Poomsae implica entender:

**La línea de despliegue**
Cada forma se realiza sobre un diagrama geométrico específico.

**La secuencia de movimientos**
Cada movimiento tiene una razón de ser y una aplicación marcial (hoshinsul).

**El significado**
Cada Poomsae tiene un nombre (a menudo de figuras históricas coreanas o conceptos) y un propósito de aprendizaje, enfocándose en diferentes técnicas, ritmos y niveles de dificultad. A medida que el alumno avanza de cinturón, los Poomsae se vuelven más complejos.`,
  },
  {
    id: 'combat',
    title: 'Combate (Kyorugi) y Defensa Personal (Hosinsul)',
    beltRange: 'green-blue',
    content: `La teoría aquí explica cómo aplicar los fundamentos y el espíritu en situaciones dinámicas:

**Combate (Kyorugi)**
Puede ser de varios tipos (por puntos, olímpico, etc.). La teoría cubre la distancia, el tiempo, la estrategia, las reglas y cómo conectar las técnicas con eficacia y control.

**Defensa Personal (Hosinsul)**
Aplica los principios del Taekwondo en situaciones de defensa real contra agarres, empujones o amenazas. Aquí se prioriza la efectividad y la disuasión sobre la estética deportiva.`,
  },
  {
    id: 'conclusion',
    title: 'Conclusión',
    beltRange: 'red-black',
    content: `En resumen, la teoría del Taekwondo es el mapa que guía al practicante en su viaje. No se limita a aprender a pegar patadas, sino a entender por qué se pega de una manera concreta, cuándo es apropiado hacerlo y, sobre todo, cómo el entrenamiento constante forja un carácter más fuerte, respetuoso y disciplinado.

Es la unión perfecta entre la técnica física y la fortaleza mental y espiritual.`,
  },
];
