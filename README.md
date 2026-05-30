# Portafolio de Moisés Santos

Desarrollador web y móvil enfocado en crear soluciones digitales que resuelven problemas reales de negocio.

## Acerca de mí

Soy desarrollador Full Stack con experiencia en el desarrollo de aplicaciones web y móviles. Me especializo en digitalizar procesos empresariales mediante sistemas a medida: control de inventario, registro de accesos, gestión de pagos, e-commerce y plataformas internas.

**Ubicación:** San Luis Potosí, México  
**Estado:** Disponible para proyectos

## Stack Tecnológico

### Frontend
- **Framework:** Astro 6.3.6 (SSR mode)
- **UI Framework:** Vue 3.5 + Composition API
- **Estilos:** Tailwind CSS 4
- **Animaciones:** CSS + IntersectionObserver con View Transitions API fallback

### Backend
- **Runtime:** Node.js (Astro SSR adapter)
- **Base de datos:** Supabase (PostgreSQL)
- **HTTP Client:** Axios

### DevOps & Tools
- **Linting:** Biome
- **Deploy:** Vercel + Node standalone adapter
- **CI/CD:** GitHub Actions
- **Cloud:** Vercel Blob (assets)

## Arquitectura del Proyecto

```
/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── section/         # Secciones de página (Vue)
│   │   ├── Ui/              # Componentes UI (Loading, etc)
│   │   └── *.astro          # Componentes estáticos
│   ├── layouts/             # Layouts principales (Layout.astro)
│   ├── pages/               # Rutas y páginas
│   │   ├── index.astro      # Página principal
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   ├── Blog.astro
│   │   ├── Demos.astro
│   │   ├── project/[slug].astro
│   │   └── post/[slug].astro
│   ├── store/               # Estado global (projects, posts)
│   ├── api/                 # Configuración de APIs
│   ├── types/               # Definiciones TypeScript
│   ├── helpers/             # Mappers y utilidades
│   ├── scripts/             # Scripts de utilidades
│   └── styles/              # Estilos globales
├── public/                  # Assets estáticos
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.js       # Configuración de Tailwind
└── biome.json               # Configuración de Biome
```

### Patrones de Diseño

- **Arquitectura híbrida:** Astro para páginas estáticas + Vue para componentes interactivos
- **State management:** Stores con ref() de Vue para datos asíncronos
- **Lazy loading:** Componentes Vue cargados con `client:visible`
- **Scroll animations:** IntersectionObserver con CSS scroll-driven animations fallback

## Secciones del Portafolio

### Proyectos Destacados
- Sistemas de gestión de inventario
- Aplicaciones de comercio electrónico
- Plataformas de traducción de light novels
- Sistemas de control de accesos

### Tecnologías por Proyecto
Cada proyecto muestra:
- Banner con mockups
- Stack tecnológico utilizado
- Enlaces a código (frontend/backend)
- Demo en vivo (cuando aplica)

### Experiencia Profesional
- Desarrollo web para empresas
- Participación en hackathons (UASLP MAGNA)
- Proyectos con ICP-MEXICO

## Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo (localhost:3000)
npm run build        # Build de producción con type checking
npm run preview      # Preview del build local
npm run astro        # CLI de Astro
npm run astro check  # Validación de tipos
```

## Requisitos

- **Node.js:** v18+ (LTS recomendado)
- **Package manager:** Bun (o npm/pnpm)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Moisessantos45/cv.git
cd cv

# Instalar dependencias
bun install

# Iniciar desarrollo
bun run dev
```

## Variables de Entorno

```env
API_URL=              # URL de la API principal
URL_CV=               # URL del CV deployed
# SUPABASE_URL=        # URL de Supabase (descomentar para usar)
# SUPABASE_ANON_KEY=   # Clave pública de Supabase (descomentar para usar)
```

## Contacto

- **GitHub:** [Moisessantos45](https://github.com/Moisessantos45)
- **LinkedIn:** [Moisés Santos Hernández](https://www.linkedin.com/in/moises-santos-hern%C3%A1ndez-31192b290/)
- **YouTube:** [@moy_4520](https://www.youtube.com/@moy_4520)