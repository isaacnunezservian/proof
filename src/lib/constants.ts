import type { MatchmakingOption, QuizQuestion, Profile, Color, Answer } from './types';

export const MATCHMAKING_OPTIONS: MatchmakingOption[] = [
  { id: 'tech-partner', label: 'Busco socio tech' },
  { id: 'commercial-partner', label: 'Busco socio comercial' },
  { id: 'dev-job', label: 'Busco trabajo como programador' },
  { id: 'hire-tech', label: 'Quiero contratar un perfil tech' },
  { id: 'funding', label: 'Busco financiación para mi proyecto' },
  { id: 'investor', label: 'Soy inversor y estoy conociendo proyectos' },
  { id: 'designer-job', label: 'Busco trabajo como diseñador' },
  { id: 'hire-designer', label: 'Estoy buscando contratar un diseñador' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: '¿Qué rol te representa mejor?',
    options: [
      { id: 'A', text: 'Tech/Desarrollador' },
      { id: 'B', text: 'Comercial/Ventas' },
      { id: 'C', text: 'Creativo/Diseño' },
      { id: 'D', text: 'Estrategia/Negocio' },
      { id: 'E', text: 'Quiero aprender sobre emprendimientos :)' },
    ],
  },
  {
    question: '¿Etapa de tu proyecto?',
    options: [
      { id: 'A', text: 'Solo idea' },
      { id: 'B', text: 'Validando' },
      { id: 'C', text: 'Primeras ventas' },
      { id: 'D', text: 'Escalando' },
      { id: 'E', text: 'Aprendiendo sobre emprendiendo' },
    ],
  },
  {
    question: '¿Habilidad principal?',
    options: [
      { id: 'A', text: 'Programación' },
      { id: 'B', text: 'Ventas' },
      { id: 'C', text: 'Diseño' },
      { id: 'D', text: 'Negocios' },
      { id: 'E', text: 'Todas, soy un crack 😎' },
    ],
  },
  {
    question: '¿Experiencia emprendiendo?',
    options: [
      { id: 'A', text: 'Primera vez' },
      { id: 'B', text: '1-2 años' },
      { id: 'C', text: '3-5 años' },
      { id: 'D', text: '+5 años' },
      { id: 'E', text: 'Nunca' },
    ],
  },
  {
    question: '¿Tu fortaleza es?',
    options: [
      { id: 'A', text: 'Resolver problemas técnicos' },
      { id: 'B', text: 'Persuadir' },
      { id: 'C', text: 'Crear contenido' },
      { id: 'D', text: 'Vender' },
      { id: 'E', text: 'Todas, soy un crack 😎' },
    ],
  },
  {
    question: '¿Prefieres trabajar en?',
    options: [
      { id: 'A', text: 'Código' },
      { id: 'B', text: 'Pitch/presentaciones' },
      { id: 'C', text: 'Branding' },
      { id: 'D', text: 'Business plan' },
      { id: 'E', text: 'Me da lo mismo' },
    ],
  },
  {
    question: '¿Área de interés?',
    options: [
      { id: 'A', text: 'Software' },
      { id: 'B', text: 'Marketing' },
      { id: 'C', text: 'Diseño' },
      { id: 'D', text: 'Finanzas' },
      { id: 'E', text: 'Ninguna en particular' },
    ],
  },
];

export const PROFILES: Profile[] = [
  { id: 'A', name: 'TECH', description: 'Te enfocas en el desarrollo y la tecnología, construyendo la base sólida de los proyectos.' },
  { id: 'B', name: 'COMERCIAL', description: 'Tu fuerte son las ventas y las relaciones, impulsando el crecimiento del negocio.' },
  { id: 'C', name: 'CREATIVO', description: 'Aportas la visión de diseño y la comunicación, creando una marca memorable.' },
  { id: 'D', name: 'ESTRATEGIA', description: 'Piensas en el modelo de negocio y la estrategia a largo plazo, marcando el rumbo.' },
  { id: 'E', name: 'NOVATO', description: 'Estás aquí para aprender, explorar y descubrir el mundo del emprendimiento.' },
];

export const PROFILE_HIERARCHY: Answer[] = ['A', 'B', 'C', 'D', 'E'];

export const COLORS: Color[] = [
  { name: 'ROJO', emoji: '🔴', hex: '#FF4136' },
  { name: 'AZUL', emoji: '🔵', hex: '#0074D9' },
  { name: 'VERDE', emoji: '🟢', hex: '#2ECC40' },
  { name: 'AMARILLO', emoji: '🟡', hex: '#FFDC00' },
  { name: 'NARANJA', emoji: '🟠', hex: '#FF851B' },
];

export const LOCAL_STORAGE_KEYS = {
  COUNTERS: 'entreprenyour_counters',
  USER_RESULT: 'entreprenyour_user_result'
};
