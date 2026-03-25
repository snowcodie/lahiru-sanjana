export const supportedLocales = ["en", "fr", "es", "ru", "de"] as const;

export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  ru: "Русский",
  de: "Deutsch",
};

type TranslationSchema = {
  nav: {
    home: string;
    projects: string;
    career: string;
    blog: string;
    contact: string;
    languageLabel: string;
    brandSubtitle: string;
  };
  home: {
    hero: {
      badge: string;
      titlePrefix: string;
      subtitle: string;
      description: string;
      viewProjects: string;
      contactMe: string;
      scroll: string;
    };
    stats: {
      projectsDelivered: string;
      yearsExperience: string;
      happyClients: string;
      clientSatisfaction: string;
    };
    featuredProjects: {
      title: string;
      subtitle: string;
      viewAll: string;
      projectTitleEnterpriseDms: string;
      projectTitleUiUxRedesign: string;
      projectTitleTravelAssistant: string;
    };
    skills: {
      title: string;
      subtitle: string;
      frontend: string;
      backend: string;
      database: string;
      cloudDevOps: string;
      design: string;
      mobile: string;
    };
    experience: {
      title: string;
      subtitle: string;
      itemTitleAssociateConsultantSapAbap: string;
      itemTitleSoftwareEngineer: string;
      itemTitleSoftwareEngineerIntern: string;
    };
    philosophy: {
      title: string;
      paragraph1: string;
      paragraph2: string;
      tagEnterprise: string;
      tagModernWeb: string;
      tagScalableArchitecture: string;
      innovationTitle: string;
      innovationDesc: string;
      userCentricTitle: string;
      userCentricDesc: string;
      cleanArchitectureTitle: string;
      cleanArchitectureDesc: string;
      performanceTitle: string;
      performanceDesc: string;
    };
    contact: {
      title: string;
      subtitle: string;
      emailMe: string;
      letsChat: string;
      scheduleCall: string;
      sendEmail: string;
      startChat: string;
      bookNow: string;
      getInTouch: string;
    };
  };
  footer: {
    aboutDescription: string;
    navigationTitle: string;
    connectTitle: string;
    openToOpportunities: string;
    builtWith: string;
  };
  contactPage: {
    heading: string;
    intro: string;
    myContactInfo: string;
    email: string;
    github: string;
    linkedIn: string;
    twitterX: string;
    location: string;
  };
  projectsPage: {
    badge: string;
    heading: string;
    subtitle: string;
    publishedProjectsSuffix: string;
    buildTogether: string;
    emptyState: string;
  };
  careerPage: {
    heading: string;
    subtitle: string;
    emptyState: string;
  };
};

export const translations: Record<Locale, TranslationSchema> = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      career: "Career",
      blog: "Blog",
      contact: "Contact",
      languageLabel: "Language",
      brandSubtitle: "Software Engineer · Portfolio",
    },
    home: {
      hero: {
        badge: "Welcome to my space",
        titlePrefix: "Hi, I'm",
        subtitle: "Software Engineer & SAP Developer",
        description:
          "Crafting elegant solutions for complex business challenges. Specializing in enterprise applications with a focus on user experience and scalable architecture.",
        viewProjects: "View Projects",
        contactMe: "Contact Me",
        scroll: "Scroll to explore",
      },
      stats: {
        projectsDelivered: "Projects Delivered",
        yearsExperience: "Years Experience",
        happyClients: "Happy Clients",
        clientSatisfaction: "Client Satisfaction",
      },
      featuredProjects: {
        title: "Featured Projects",
        subtitle:
          "A selection of recent work showcasing enterprise solutions and modern web applications",
        viewAll: "View All Projects",
        projectTitleEnterpriseDms: "Enterprise Document Management System",
        projectTitleUiUxRedesign: "Multiple UI/UX Websites Redesign",
        projectTitleTravelAssistant: "Travel Agent Assistant System",
      },
      skills: {
        title: "Skills & Technologies",
        subtitle:
          "A comprehensive toolkit for building modern, scalable applications",
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        cloudDevOps: "Cloud & DevOps",
        design: "Design",
        mobile: "Mobile",
      },
      experience: {
        title: "Professional Experience",
        subtitle: "Building innovative solutions across diverse industries",
        itemTitleAssociateConsultantSapAbap: "Associate Consultant - SAP ABAP",
        itemTitleSoftwareEngineer: "Software Engineer",
        itemTitleSoftwareEngineerIntern: "Software Engineer Intern",
      },
      philosophy: {
        title: "Philosophy & Approach",
        paragraph1:
          "I believe in crafting software that not only solves business problems but does so elegantly. With a foundation in enterprise development and a passion for modern design, I bridge the gap between technical excellence and user satisfaction.",
        paragraph2:
          "My approach combines SAP's proven methodologies with contemporary web technologies, resulting in solutions that are both robust and delightful to use.",
        tagEnterprise: "Enterprise Solutions",
        tagModernWeb: "Modern Web",
        tagScalableArchitecture: "Scalable Architecture",
        innovationTitle: "Innovation First",
        innovationDesc:
          "Embracing cutting-edge technologies while maintaining practical, production-ready solutions.",
        userCentricTitle: "User-Centric",
        userCentricDesc:
          "Designing experiences that prioritize usability, accessibility, and delightful interactions.",
        cleanArchitectureTitle: "Clean Architecture",
        cleanArchitectureDesc:
          "Building maintainable, scalable systems with clear separation of concerns and best practices.",
        performanceTitle: "Performance",
        performanceDesc:
          "Optimizing for speed and efficiency without compromising on feature richness.",
      },
      contact: {
        title: "Let's Build Something Great Together",
        subtitle:
          "Have a project in mind? Whether it's an enterprise solution or a modern web application, I'd love to hear about it.",
        emailMe: "Email Me",
        letsChat: "Let's Chat",
        scheduleCall: "Schedule a Call",
        sendEmail: "Send Email",
        startChat: "Start Chat",
        bookNow: "Book Now",
        getInTouch: "Get In Touch",
      },
    },
    footer: {
      aboutDescription:
        "Software Engineer & SAP Developer focused on building scalable enterprise applications and modern web solutions.",
      navigationTitle: "Navigation",
      connectTitle: "Connect",
      openToOpportunities: "Open to opportunities & collaborations.",
      builtWith: "Built with Next.js, Tailwind CSS & PostgreSQL.",
    },
    contactPage: {
      heading: "Contact Me",
      intro:
        "Have a question, collaboration idea, or just want to say hi? Fill out the form below or reach me directly through any of the channels listed.",
      myContactInfo: "My Contact Info",
      email: "Email",
      github: "GitHub",
      linkedIn: "LinkedIn",
      twitterX: "Twitter / X",
      location: "Location",
    },
    projectsPage: {
      badge: "Selected Work",
      heading: "Projects That Ship Real Value",
      subtitle:
        "A curated set of production-focused projects across enterprise apps, modern web platforms, and full-stack systems.",
      publishedProjectsSuffix: "published projects",
      buildTogether: "Let's build together",
      emptyState: "No projects yet. Check back soon.",
    },
    careerPage: {
      heading: "My Career",
      subtitle:
        "My professional journey - roles, companies, and what I worked on.",
      emptyState: "No career entries yet.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      projects: "Projets",
      career: "Carrière",
      blog: "Blog",
      contact: "Contact",
      languageLabel: "Langue",
      brandSubtitle: "Ingénieur logiciel · Portfolio",
    },
    home: {
      hero: {
        badge: "Bienvenue dans mon univers",
        titlePrefix: "Salut, je suis",
        subtitle: "Ingénieur logiciel et développeur SAP",
        description:
          "Je conçois des solutions elegantes pour des défis métier complexes, avec un accent sur l'expérience utilisateur et une architecture evolutive.",
        viewProjects: "Voir les projets",
        contactMe: "Me contacter",
        scroll: "Defilez pour explorer",
      },
      stats: {
        projectsDelivered: "Projets livres",
        yearsExperience: "Annees d'experience",
        happyClients: "Clients satisfaits",
        clientSatisfaction: "Satisfaction client",
      },
      featuredProjects: {
        title: "Projets en vedette",
        subtitle:
          "Une selection de travaux recents mettant en avant des solutions enterprise et des applications web modernes",
        viewAll: "Voir tous les projets",
        projectTitleEnterpriseDms: "Systeme de gestion documentaire d'entreprise",
        projectTitleUiUxRedesign: "Refonte de plusieurs sites UI/UX",
        projectTitleTravelAssistant: "Systeme d'assistant pour agences de voyage",
      },
      skills: {
        title: "Competences & technologies",
        subtitle:
          "Un ensemble complet d'outils pour construire des applications modernes et evolutives",
        frontend: "Frontend",
        backend: "Backend",
        database: "Base de donnees",
        cloudDevOps: "Cloud & DevOps",
        design: "Design",
        mobile: "Mobile",
      },
      experience: {
        title: "Experience professionnelle",
        subtitle: "Construire des solutions innovantes dans divers secteurs",
        itemTitleAssociateConsultantSapAbap: "Consultant associe- SAP ABAP",
        itemTitleSoftwareEngineer: "Ingenieur logiciel",
        itemTitleSoftwareEngineerIntern: "Stagiaire ingenieur logiciel",
      },
      philosophy: {
        title: "Philosophie et approche",
        paragraph1:
          "Je crois en la creation de logiciels qui resolvent les problemes metier avec elegance, en conciliant excellence technique et satisfaction utilisateur.",
        paragraph2:
          "Mon approche combine les methodes eprouvees de SAP avec des technologies web modernes pour des solutions robustes et agreables a utiliser.",
        tagEnterprise: "Solutions enterprise",
        tagModernWeb: "Web moderne",
        tagScalableArchitecture: "Architecture evolutive",
        innovationTitle: "Innovation d'abord",
        innovationDesc:
          "Adopter des technologies de pointe tout en gardant des solutions pragmatiques et prêtes pour la production.",
        userCentricTitle: "Oriente utilisateur",
        userCentricDesc:
          "Concevoir des experiences qui privilegient l'utilisabilite, l'accessibilite et des interactions agreables.",
        cleanArchitectureTitle: "Architecture propre",
        cleanArchitectureDesc:
          "Construire des systemes maintenables et evolutifs avec une separation claire des responsabilites.",
        performanceTitle: "Performance",
        performanceDesc:
          "Optimiser la rapidite et l'efficacite sans compromettre la richesse fonctionnelle.",
      },
      contact: {
        title: "Construisons quelque chose de grand ensemble",
        subtitle:
          "Vous avez un projet en tête ? Qu'il s'agisse d'une solution enterprise ou d'une application web moderne, j'aimerais en discuter.",
        emailMe: "M'ecrire",
        letsChat: "Discutons",
        scheduleCall: "Planifier un appel",
        sendEmail: "Envoyer un e-mail",
        startChat: "Demarrer le chat",
        bookNow: "Reserver",
        getInTouch: "Entrer en contact",
      },
    },
    footer: {
      aboutDescription:
        "Ingenieur logiciel et developpeur SAP, axe sur des applications enterprise evolutives et des solutions web modernes.",
      navigationTitle: "Navigation",
      connectTitle: "Reseaux",
      openToOpportunities: "Ouvert aux opportunites et collaborations.",
      builtWith: "Construit avec Next.js, Tailwind CSS et PostgreSQL.",
    },
    contactPage: {
      heading: "Contactez-moi",
      intro:
        "Une question, une idee de collaboration, ou simplement envie de dire bonjour ? Remplissez le formulaire ci-dessous ou contactez-moi via les canaux suivants.",
      myContactInfo: "Mes coordonnees",
      email: "E-mail",
      github: "GitHub",
      linkedIn: "LinkedIn",
      twitterX: "Twitter / X",
      location: "Localisation",
    },
    projectsPage: {
      badge: "Travaux selectionnes",
      heading: "Des projets qui apportent une vraie valeur",
      subtitle:
        "Une selection de projets orientes production, entre applications enterprise, plateformes web modernes et systemes full-stack.",
      publishedProjectsSuffix: "projets publies",
      buildTogether: "Construisons ensemble",
      emptyState: "Aucun projet pour le moment. Revenez bientot.",
    },
    careerPage: {
      heading: "Ma carriere",
      subtitle:
        "Mon parcours professionnel - roles, entreprises et contributions.",
      emptyState: "Aucune experience pour le moment.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      career: "Carrera",
      blog: "Blog",
      contact: "Contacto",
      languageLabel: "Idioma",
      brandSubtitle: "Ingeniero de software · Portafolio",
    },
    home: {
      hero: {
        badge: "Bienvenido a mi espacio",
        titlePrefix: "Hola, soy",
        subtitle: "Ingeniero de software y desarrollador SAP",
        description:
          "Creo soluciones elegantes para desafíos empresariales complejos, con enfoque en experiencia de usuario y arquitectura escalable.",
        viewProjects: "Ver proyectos",
        contactMe: "Contactame",
        scroll: "Desplazate para explorar",
      },
      stats: {
        projectsDelivered: "Proyectos entregados",
        yearsExperience: "Años de experiencia",
        happyClients: "Clientes satisfechos",
        clientSatisfaction: "Satisfaccion del cliente",
      },
      featuredProjects: {
        title: "Proyectos destacados",
        subtitle:
          "Una seleccion de trabajos recientes con soluciones empresariales y aplicaciones web modernas",
        viewAll: "Ver todos los proyectos",
        projectTitleEnterpriseDms: "Sistema empresarial de gestion documental",
        projectTitleUiUxRedesign: "Rediseno de multiples sitios web UI/UX",
        projectTitleTravelAssistant: "Sistema asistente para agencias de viaje",
      },
      skills: {
        title: "Habilidades y tecnologias",
        subtitle:
          "Un conjunto integral de herramientas para crear aplicaciones modernas y escalables",
        frontend: "Frontend",
        backend: "Backend",
        database: "Base de datos",
        cloudDevOps: "Cloud y DevOps",
        design: "Diseno",
        mobile: "Movil",
      },
      experience: {
        title: "Experiencia profesional",
        subtitle: "Construyendo soluciones innovadoras en diversas industrias",
        itemTitleAssociateConsultantSapAbap: "Consultor asociado- SAP ABAP",
        itemTitleSoftwareEngineer: "Ingeniero de software",
        itemTitleSoftwareEngineerIntern: "Practicante de ingenieria de software",
      },
      philosophy: {
        title: "Filosofia y enfoque",
        paragraph1:
          "Creo en crear software que no solo resuelva problemas de negocio, sino que lo haga con elegancia, uniendo excelencia tecnica y satisfaccion del usuario.",
        paragraph2:
          "Mi enfoque combina metodologias probadas de SAP con tecnologias web modernas para soluciones robustas y agradables de usar.",
        tagEnterprise: "Soluciones empresariales",
        tagModernWeb: "Web moderna",
        tagScalableArchitecture: "Arquitectura escalable",
        innovationTitle: "Innovacion primero",
        innovationDesc:
          "Adoptar tecnologias de vanguardia manteniendo soluciones practicas y listas para produccion.",
        userCentricTitle: "Centrado en el usuario",
        userCentricDesc:
          "Disenar experiencias que priorizan usabilidad, accesibilidad e interacciones agradables.",
        cleanArchitectureTitle: "Arquitectura limpia",
        cleanArchitectureDesc:
          "Construir sistemas mantenibles y escalables con clara separacion de responsabilidades.",
        performanceTitle: "Rendimiento",
        performanceDesc:
          "Optimizar velocidad y eficiencia sin comprometer la riqueza funcional.",
      },
      contact: {
        title: "Construyamos algo grandioso juntos",
        subtitle:
          "Tienes un proyecto en mente? Ya sea una solucion empresarial o una aplicacion web moderna, me encantaria escucharte.",
        emailMe: "Escribeme",
        letsChat: "Conversemos",
        scheduleCall: "Programar llamada",
        sendEmail: "Enviar correo",
        startChat: "Iniciar chat",
        bookNow: "Reservar",
        getInTouch: "Ponte en contacto",
      },
    },
    footer: {
      aboutDescription:
        "Ingeniero de software y desarrollador SAP enfocado en crear aplicaciones empresariales escalables y soluciones web modernas.",
      navigationTitle: "Navegacion",
      connectTitle: "Conectar",
      openToOpportunities: "Abierto a oportunidades y colaboraciones.",
      builtWith: "Creado con Next.js, Tailwind CSS y PostgreSQL.",
    },
    contactPage: {
      heading: "Contactame",
      intro:
        "Tienes una pregunta, una idea de colaboracion o solo quieres saludar? Completa el formulario de abajo o contactame directamente por cualquiera de estos canales.",
      myContactInfo: "Mi informacion de contacto",
      email: "Correo",
      github: "GitHub",
      linkedIn: "LinkedIn",
      twitterX: "Twitter / X",
      location: "Ubicacion",
    },
    projectsPage: {
      badge: "Trabajos destacados",
      heading: "Proyectos que entregan valor real",
      subtitle:
        "Una seleccion curada de proyectos listos para produccion en apps empresariales, plataformas web modernas y sistemas full-stack.",
      publishedProjectsSuffix: "proyectos publicados",
      buildTogether: "Construyamos juntos",
      emptyState: "Aun no hay proyectos. Vuelve pronto.",
    },
    careerPage: {
      heading: "Mi carrera",
      subtitle:
        "Mi recorrido profesional - roles, empresas y en lo que he trabajado.",
      emptyState: "Aun no hay entradas de carrera.",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      projects: "Проекты",
      career: "Карьера",
      blog: "Блог",
      contact: "Контакты",
      languageLabel: "Язык",
      brandSubtitle: "Инженер-программист · Портфолио",
    },
    home: {
      hero: {
        badge: "Добро пожаловать в мое пространство",
        titlePrefix: "Привет, я",
        subtitle: "Инженер-программист и SAP-разработчик",
        description:
          "Создаю элегантные решения для сложных бизнес-задач с фокусом на пользовательский опыт и масштабируемую архитектуру.",
        viewProjects: "Смотреть проекты",
        contactMe: "Связаться со мной",
        scroll: "Прокрутите, чтобы изучить",
      },
      stats: {
        projectsDelivered: "Реализованных проектов",
        yearsExperience: "Лет опыта",
        happyClients: "Довольных клиентов",
        clientSatisfaction: "Удовлетворенность клиентов",
      },
      featuredProjects: {
        title: "Избранные проекты",
        subtitle:
          "Подборка недавних работ: корпоративные решения и современные веб-приложения",
        viewAll: "Все проекты",
        projectTitleEnterpriseDms: "Корпоративная система управления документами",
        projectTitleUiUxRedesign: "Редизайн нескольких UI/UX веб-сайтов",
        projectTitleTravelAssistant: "Система ассистента для туристических агентств",
      },
      skills: {
        title: "Навыки и технологии",
        subtitle:
          "Полный набор инструментов для создания современных и масштабируемых приложений",
        frontend: "Фронтенд",
        backend: "Бэкенд",
        database: "Базы данных",
        cloudDevOps: "Cloud и DevOps",
        design: "Дизайн",
        mobile: "Мобильная разработка",
      },
      experience: {
        title: "Профессиональный опыт",
        subtitle: "Создание инновационных решений в разных отраслях",
        itemTitleAssociateConsultantSapAbap:
          "Младший консультант- SAP ABAP",
        itemTitleSoftwareEngineer: "Инженер-программист",
        itemTitleSoftwareEngineerIntern: "Стажер-инженер-программист",
      },
      philosophy: {
        title: "Философия и подход",
        paragraph1:
          "Я верю в разработку ПО, которое не только решает бизнес-задачи, но и делает это элегантно, объединяя техническое совершенство и удобство для пользователя.",
        paragraph2:
          "Мой подход сочетает проверенные методологии SAP и современные веб-технологии, создавая надежные и приятные в использовании решения.",
        tagEnterprise: "Корпоративные решения",
        tagModernWeb: "Современный веб",
        tagScalableArchitecture: "Масштабируемая архитектура",
        innovationTitle: "Сначала инновации",
        innovationDesc:
          "Использование передовых технологий при сохранении практичности и готовности к продакшену.",
        userCentricTitle: "Ориентир на пользователя",
        userCentricDesc:
          "Проектирование опыта с приоритетом на удобство, доступность и приятное взаимодействие.",
        cleanArchitectureTitle: "Чистая архитектура",
        cleanArchitectureDesc:
          "Построение поддерживаемых и масштабируемых систем с четким разделением ответственности.",
        performanceTitle: "Производительность",
        performanceDesc:
          "Оптимизация скорости и эффективности без компромиссов по функциональности.",
      },
      contact: {
        title: "Давайте создадим что-то крутое вместе",
        subtitle:
          "Есть идея проекта? Будь то корпоративное решение или современное веб-приложение, буду рад обсудить.",
        emailMe: "Написать на почту",
        letsChat: "Давайте обсудим",
        scheduleCall: "Запланировать звонок",
        sendEmail: "Отправить письмо",
        startChat: "Начать чат",
        bookNow: "Забронировать",
        getInTouch: "Связаться",
      },
    },
    footer: {
      aboutDescription:
        "Инженер-программист и SAP-разработчик, создающий масштабируемые корпоративные приложения и современные веб-решения.",
      navigationTitle: "Навигация",
      connectTitle: "Связаться",
      openToOpportunities: "Открыт к новым возможностям и сотрудничеству.",
      builtWith: "Создано на Next.js, Tailwind CSS и PostgreSQL.",
    },
    contactPage: {
      heading: "Связаться со мной",
      intro:
        "Есть вопрос, идея сотрудничества или просто хотите поздороваться? Заполните форму ниже или свяжитесь со мной напрямую через один из каналов.",
      myContactInfo: "Мои контакты",
      email: "Email",
      github: "GitHub",
      linkedIn: "LinkedIn",
      twitterX: "Twitter / X",
      location: "Местоположение",
    },
    projectsPage: {
      badge: "Избранные работы",
      heading: "Проекты, которые приносят реальную пользу",
      subtitle:
        "Подборка production-проектов: корпоративные приложения, современные веб-платформы и full-stack системы.",
      publishedProjectsSuffix: "опубликованных проектов",
      buildTogether: "Давайте создавать вместе",
      emptyState: "Пока нет проектов. Загляните позже.",
    },
    careerPage: {
      heading: "Моя карьера",
      subtitle:
        "Мой профессиональный путь - роли, компании и выполненная работа.",
      emptyState: "Пока нет записей о карьере.",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      projects: "Projekte",
      career: "Karriere",
      blog: "Blog",
      contact: "Kontakt",
      languageLabel: "Sprache",
      brandSubtitle: "Softwareentwickler · Portfolio",
    },
    home: {
      hero: {
        badge: "Willkommen in meinem Bereich",
        titlePrefix: "Hallo, ich bin",
        subtitle: "Softwareentwickler & SAP-Entwickler",
        description:
          "Ich entwickle elegante Lösungen für komplexe Geschäftsherausforderungen – mit Fokus auf Nutzererfahrung und skalierbare Architektur.",
        viewProjects: "Projekte ansehen",
        contactMe: "Kontakt aufnehmen",
        scroll: "Scrollen zum Erkunden",
      },
      stats: {
        projectsDelivered: "Abgeschlossene Projekte",
        yearsExperience: "Jahre Erfahrung",
        happyClients: "Zufriedene Kunden",
        clientSatisfaction: "Kundenzufriedenheit",
      },
      featuredProjects: {
        title: "Ausgewählte Projekte",
        subtitle:
          "Eine Auswahl aktueller Arbeiten mit Unternehmenslösungen und modernen Webanwendungen",
        viewAll: "Alle Projekte ansehen",
        projectTitleEnterpriseDms: "Unternehmensdokumentenmanagementsystem",
        projectTitleUiUxRedesign: "Neugestaltung mehrerer UI/UX-Websites",
        projectTitleTravelAssistant: "Assistenzsystem für Reisebüros",
      },
      skills: {
        title: "Fähigkeiten & Technologien",
        subtitle:
          "Ein umfassendes Toolkit zur Entwicklung moderner, skalierbarer Anwendungen",
        frontend: "Frontend",
        backend: "Backend",
        database: "Datenbank",
        cloudDevOps: "Cloud & DevOps",
        design: "Design",
        mobile: "Mobil",
      },
      experience: {
        title: "Berufliche Erfahrung",
        subtitle: "Innovative Lösungen in verschiedenen Branchen entwickeln",
        itemTitleAssociateConsultantSapAbap: "Junior-Berater – SAP ABAP",
        itemTitleSoftwareEngineer: "Softwareentwickler",
        itemTitleSoftwareEngineerIntern: "Softwareentwickler (Praktikant)",
      },
      philosophy: {
        title: "Philosophie & Ansatz",
        paragraph1:
          "Ich glaube daran, Software zu entwickeln, die Geschäftsprobleme nicht nur löst, sondern dies auf elegante Weise tut – durch die Verbindung von technischer Exzellenz und Nutzerzufriedenheit.",
        paragraph2:
          "Mein Ansatz verbindet bewährte SAP-Methoden mit modernen Webtechnologien und schafft so robuste und angenehm zu nutzende Lösungen.",
        tagEnterprise: "Unternehmenslösungen",
        tagModernWeb: "Modernes Web",
        tagScalableArchitecture: "Skalierbare Architektur",
        innovationTitle: "Innovation zuerst",
        innovationDesc:
          "Modernste Technologien einsetzen und gleichzeitig praxistaugliche, produktionsreife Lösungen liefern.",
        userCentricTitle: "Nutzerzentriert",
        userCentricDesc:
          "Erlebnisse gestalten, die Benutzerfreundlichkeit, Barrierefreiheit und angenehme Interaktionen in den Vordergrund stellen.",
        cleanArchitectureTitle: "Saubere Architektur",
        cleanArchitectureDesc:
          "Wartbare, skalierbare Systeme mit klarer Trennung von Verantwortlichkeiten und Best Practices entwickeln.",
        performanceTitle: "Performance",
        performanceDesc:
          "Geschwindigkeit und Effizienz optimieren, ohne den Funktionsumfang zu beeinträchtigen.",
      },
      contact: {
        title: "Lass uns gemeinsam etwas Großartiges bauen",
        subtitle:
          "Haben Sie ein Projekt im Sinn? Ob Unternehmenslösung oder moderne Webanwendung – ich freue mich, davon zu hören.",
        emailMe: "E-Mail schreiben",
        letsChat: "Lass uns reden",
        scheduleCall: "Anruf planen",
        sendEmail: "E-Mail senden",
        startChat: "Chat starten",
        bookNow: "Jetzt buchen",
        getInTouch: "Kontakt aufnehmen",
      },
    },
    footer: {
      aboutDescription:
        "Softwareentwickler & SAP-Entwickler mit Fokus auf skalierbare Unternehmensanwendungen und moderne Weblösungen.",
      navigationTitle: "Navigation",
      connectTitle: "Vernetzen",
      openToOpportunities: "Offen für Möglichkeiten und Kooperationen.",
      builtWith: "Erstellt mit Next.js, Tailwind CSS & PostgreSQL.",
    },
    contactPage: {
      heading: "Kontakt",
      intro:
        "Haben Sie eine Frage, eine Kooperationsidee oder möchten Sie einfach Hallo sagen? Füllen Sie das Formular aus oder kontaktieren Sie mich direkt über einen der aufgeführten Kanäle.",
      myContactInfo: "Meine Kontaktdaten",
      email: "E-Mail",
      github: "GitHub",
      linkedIn: "LinkedIn",
      twitterX: "Twitter / X",
      location: "Standort",
    },
    projectsPage: {
      badge: "Ausgewählte Arbeiten",
      heading: "Projekte, die echten Mehrwert liefern",
      subtitle:
        "Eine kuratierte Auswahl produktionsorientierter Projekte in den Bereichen Unternehmensanwendungen, moderne Webplattformen und Full-Stack-Systeme.",
      publishedProjectsSuffix: "veröffentlichte Projekte",
      buildTogether: "Lass uns gemeinsam bauen",
      emptyState: "Noch keine Projekte. Schau bald wieder vorbei.",
    },
    careerPage: {
      heading: "Meine Karriere",
      subtitle:
        "Mein beruflicher Werdegang – Rollen, Unternehmen und meine Tätigkeiten.",
      emptyState: "Noch keine Karriereeinträge vorhanden.",
    },
  },
};

export function isLocale(value: string): value is Locale {
  return (supportedLocales as readonly string[]).includes(value);
}
