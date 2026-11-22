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
  logo: string;
}

export const TECHNOLOGIES: Technology[] = [
  { name: '.NET', logo: 'tecnologias/dotnet.svg' },
  { name: 'Java', logo: 'tecnologias/java.svg' },
  { name: 'PHP', logo: 'tecnologias/php.svg' },
  { name: 'Laravel', logo: 'tecnologias/laravel.svg' },
  { name: 'Angular', logo: 'tecnologias/angular.svg' },
  { name: 'SQL Server', logo: 'tecnologias/sql-server.svg' },
  { name: 'PostgreSQL', logo: 'tecnologias/postgresql.svg' },
  { name: 'MySQL', logo: 'tecnologias/mysql.svg' },
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
  specialty: string;
  education: string;
  photo: string;
  linkedin: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Ezequiel Marcenal',
    role: 'CEO & Co-founder',
    specialty: 'Full Stack · Cybersecurity Specialist',
    education: 'Tecnólogo en Informática - UTEC',
    photo: 'quienes_somos/mar.jpg',
    linkedin: 'https://www.linkedin.com/in/ezequiel-marcenal/',
  },
  {
    name: 'Lucas Ottonello',
    role: 'CEO & Co-founder',
    specialty: 'Full Stack',
    education: 'Tecnólogo en Informática - UTEC',
    photo: 'quienes_somos/otto.png',
    linkedin: 'https://www.linkedin.com/in/lucas-ottonello-dolio/',
  },
];

export const CONTACT = {
  whatsapp: [
    { display: '+598 99 654 896', href: 'https://wa.me/59899654896' },
    { display: '+598 91 076 119', href: 'https://wa.me/59891076119' },
  ],
  email: { display: 'marotto.software@gmail.com', href: 'mailto:marotto.software@gmail.com' },
};
