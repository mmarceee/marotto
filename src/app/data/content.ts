// Contenido de la landing. Los textos entre [CORCHETES] son placeholders a reemplazar con datos reales.

/** Proyectos queda oculto hasta tener trabajos con clientes reales. */
export const SHOW_PROJECTS = false;

export interface NavLink {
  label: string;
  fragment: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Servicios', fragment: 'servicios' },
  { label: 'Tecnologías', fragment: 'tecnologias' },
  { label: 'Proceso', fragment: 'proceso' },
  ...(SHOW_PROJECTS ? [{ label: 'Proyectos', fragment: 'proyectos' }] : []),
  { label: 'Nosotros', fragment: 'nosotros' },
];

export type ServiceIcon = 'web' | 'custom' | 'management' | 'secure';

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const SERVICES: Service[] = [
  {
    title: 'Desarrollo web',
    description:
      'Sitios y plataformas rápidos, que se ven bien en cualquier pantalla y son fáciles de mantener.',
    icon: 'web',
  },
  {
    title: 'Aplicaciones a medida',
    description:
      'Cuando ninguna herramienta resuelve tu caso, la construimos alrededor de cómo trabajás.',
    icon: 'custom',
  },
  {
    title: 'Sistemas de gestión',
    description:
      'Stock, clientes, facturación o turnos: tu operación en un solo lugar, sin planillas sueltas.',
    icon: 'management',
  },
  {
    title: 'Desarrollo seguro',
    description:
      'Autenticación, permisos y datos protegidos desde el diseño, no como un parche al final.',
    icon: 'secure',
  },
];

export interface Technology {
  name: string;
  area: string;
}

export const TECHNOLOGIES: Technology[] = [
  { name: '.NET', area: 'backend' },
  { name: 'Java', area: 'backend' },
  { name: 'PHP', area: 'backend' },
  { name: 'Laravel', area: 'backend' },
  { name: 'Angular', area: 'frontend' },
  { name: 'SQL Server', area: 'base de datos' },
  { name: 'PostgreSQL', area: 'base de datos' },
  { name: 'MySQL', area: 'base de datos' },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Análisis',
    description:
      'Entendemos tu negocio y qué problema hay que resolver, antes de escribir una línea.',
  },
  {
    number: '02',
    title: 'Diseño',
    description:
      'Definimos pantallas, flujos y arquitectura, y los revisamos con vos antes de construir.',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description:
      'Entregamos por etapas, para que veas avances reales y puedas corregir el rumbo a tiempo.',
  },
  {
    number: '04',
    title: 'Soporte',
    description:
      'Una vez en producción seguimos cerca: corregimos, mejoramos y acompañamos lo que venga.',
  },
];

export interface Project {
  name: string;
  description: string;
  technologies: string[];
}

export const PROJECTS: Project[] = [1, 2, 3].map((n) => ({
  name: `[NOMBRE DEL PROYECTO ${n}]`,
  description: '[Qué problema resolvió y para quién.]',
  technologies: ['[TECH]', '[TECH]', '[TECH]'],
}));

export interface TeamMember {
  name: string;
  role: string;
}

export const TEAM: TeamMember[] = [
  { name: 'Ezequiel', role: 'CEO · Full Stack · Cybersecurity Specialist' },
  { name: 'Lucas', role: 'CEO · Full Stack' },
];

export const CONTACT = {
  whatsapp: { display: '+598 99 654 896', href: 'https://wa.me/59899654896' },
  email: { display: 'marotto.sw@gmail.com', href: 'mailto:marotto.sw@gmail.com' },
};

export const SOCIAL_LINKS: NavLink[] = [
  { label: '[LINKEDIN]', fragment: 'inicio' },
  { label: '[GITHUB]', fragment: 'inicio' },
  { label: '[INSTAGRAM]', fragment: 'inicio' },
];
