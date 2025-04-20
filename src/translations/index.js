export const translations = {
  en: {
    nav: {
      home: 'Home',
      lessons: 'Lessons',
      games: 'Games',
      groups: 'Groups',
      forum: 'Forum',
      classroom: 'Classroom',
      profile: 'Profile',
      darkMode: 'Toggle Dark Mode',
      lightMode: 'Toggle Light Mode',
      selectLanguage: 'Select Language'
    },
    common: {
      search: 'Search',
      create: 'Create',
      join: 'Join',
      start: 'Start',
      play: 'Play',
      view: 'View',
      download: 'Download',
      send: 'Send',
      mute: 'Mute',
      unmute: 'Unmute',
      startVideo: 'Start Video',
      stopVideo: 'Stop Video',
      shareScreen: 'Share Screen',
      stopSharing: 'Stop Sharing',
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      noResults: 'No results found',
    },
    forum: {
      title: 'Forum',
      searchTopics: 'Search topics...',
      createTopic: 'Create New Topic',
      topic: 'Topic',
      author: 'Author',
      replies: 'Replies',
      views: 'Views',
      categories: {
        general: 'General Discussion',
        homework: 'Homework Help',
        studyGroups: 'Study Groups',
        resources: 'Resource Sharing'
      },
      createTopicForm: {
        title: 'Create New Topic',
        topicTitle: 'Topic Title',
        category: 'Category',
        content: 'Content',
        submit: 'Submit Topic',
        cancel: 'Cancel'
      },
      topicDetail: {
        reply: 'Reply',
        edit: 'Edit',
        delete: 'Delete',
        report: 'Report',
        share: 'Share'
      },
      description: 'Ask questions and participate in math discussions with the community.',
      goToForum: 'Go to Forum'
    },
    classroom: {
      chat: 'Chat',
      resources: 'Resources',
      participants: 'Participants',
      typeMessage: 'Type a message...'
    },
    profile: {
      posts: 'Posts',
      followers: 'Followers',
      following: 'Following',
      about: 'About',
      groups: 'Groups',
      documents: 'Documents'
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      forgotPassword: 'Forgot Password?',
      invalidCredentials: 'Invalid email or password',
      sessionExpired: 'Your session has expired. Please login again.',
    },
    navigation: {
      dashboard: 'Dashboard',
    },
    errors: {
      general: 'Something went wrong',
      network: 'Network error. Please check your connection.',
      unauthorized: 'You are not authorized to perform this action',
      notFound: 'The requested resource was not found',
      server: 'Server error. Please try again later.',
      lessonLoad: 'Failed to load lesson. Please try again.',
      submission: 'Failed to submit your answer. Please try again.',
    },
    notFound: {
      title: 'Page Not Found',
      message: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      homeButton: 'Return to Home'
    },
    lessons: {
      title: 'Math Lessons',
      description: 'Learn mathematics at your own pace',
      startLesson: 'Start Lesson',
      continueLesson: 'Continue Lesson',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      difficulty: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      categories: {
        algebra: 'Algebra',
        geometry: 'Geometry',
        calculus: 'Calculus',
        statistics: 'Statistics'
      }
    },
    games: {
      title: 'Math Games',
      description: 'Learn math through fun games',
      playNow: 'Play Now',
      difficulty: 'Difficulty',
      players: 'Players',
      timeLimit: 'Time Limit',
      score: 'Score',
      highScore: 'High Score',
      categories: {
        puzzle: 'Puzzle',
        quiz: 'Quiz',
        strategy: 'Strategy',
        arcade: 'Arcade'
      }
    },
    groups: {
      title: 'Study Groups',
      description: 'Connect with other learners and collaborate on math problems.',
      viewGroups: 'View Groups',
      myGroups: 'My Groups',
      availableGroups: 'Available Groups',
      members: 'members',
      nextSession: 'Next Session',
      createGroup: 'Create New Group',
      joinSuccess: 'Successfully joined the group',
      leaveSuccess: 'Successfully left the group',
      createSuccess: 'Group created successfully',
      form: {
        title: 'Group Title',
        description: 'Group Description',
        level: 'Difficulty Level',
        maxMembers: 'Maximum Members',
        schedule: 'Meeting Schedule',
        schedulePlaceholder: 'e.g., Every Monday at 6 PM',
        isPrivate: 'Private Group (Invitation Only)'
      },
      sampleGroups: {
        algebra: {
          title: 'Algebra Study Group',
          description: 'Weekly sessions to practice algebra concepts and solve problems together.'
        },
        competition: {
          title: 'Math Competition Prep',
          description: 'Preparing for upcoming math competitions with practice problems and strategies.'
        },
        geometry: {
          title: 'Geometry Explorers',
          description: 'Learn geometry through interactive exercises and real-world applications.'
        },
        calculus: {
          title: 'Calculus Study Group',
          description: 'Advanced calculus concepts and problem-solving techniques.'
        }
      }
    },
    home: {
      title: 'Master Mathematics with BrainyMath',
      subtitle: 'Interactive lessons, engaging games, and collaborative learning to make mathematics accessible and enjoyable for everyone.',
      whyChoose: 'Why Choose BrainyMath?',
      features: {
        lessons: {
          title: 'Comprehensive Lessons',
          description: 'From basic arithmetic to advanced calculus, our structured lessons cover all mathematical concepts with clear explanations and examples.'
        },
        games: {
          title: 'Interactive Games',
          description: 'Learn through play with our collection of math games designed to reinforce concepts and make learning fun and engaging.'
        },
        groups: {
          title: 'Collaborative Learning',
          description: 'Join study groups, participate in forums, and connect with peers to enhance your learning experience through collaboration.'
        },
        forum: {
          title: 'Community Support',
          description: 'Get help from the community, share your knowledge, and participate in discussions to deepen your understanding.'
        }
      },
      cta: {
        title: 'Ready to Transform Your Math Learning?',
        description: 'Join thousands of learners who have improved their mathematical skills with BrainyMath. Start your journey today!'
      }
    },
    dashboard: {
      welcome: 'Welcome, {{name}}!',
      student: 'Student',
      subtitle: 'Your personalized learning dashboard',
      continueLearning: 'Continue Learning',
      continueLearningDesc: 'Pick up where you left off with your math lessons and track your progress.',
      goToLessons: 'Go to Lessons',
      playGames: 'Play Math Games',
      playGamesDesc: 'Reinforce your learning with fun and interactive math games.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      lessons: 'Leçons',
      games: 'Jeux',
      groups: 'Groupes',
      forum: 'Forum',
      classroom: 'Salle de classe',
      profile: 'Profil',
      darkMode: 'Activer le mode sombre',
      lightMode: 'Activer le mode clair',
      selectLanguage: 'Sélectionner la langue'
    },
    common: {
      search: 'Rechercher',
      create: 'Créer',
      join: 'Rejoindre',
      start: 'Commencer',
      play: 'Jouer',
      view: 'Voir',
      download: 'Télécharger',
      send: 'Envoyer',
      mute: 'Couper',
      unmute: 'Activer',
      startVideo: 'Démarrer la vidéo',
      stopVideo: 'Arrêter la vidéo',
      shareScreen: 'Partager l\'écran',
      stopSharing: 'Arrêter le partage',
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      retry: 'Réessayer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      noResults: 'Aucun résultat trouvé',
    },
    forum: {
      title: 'Discussions du Forum',
      description: 'Posez des questions et participez aux discussions mathématiques avec la communauté.',
      goToForum: 'Aller au Forum',
      searchTopics: 'Rechercher des sujets...',
      createTopic: 'Créer un nouveau sujet',
      topic: 'Sujet',
      author: 'Auteur',
      replies: 'Réponses',
      views: 'Vues',
      categories: {
        general: 'Discussion générale',
        homework: 'Aide aux devoirs',
        studyGroups: 'Groupes d\'étude',
        resources: 'Partage de ressources'
      },
      createTopicForm: {
        title: 'Créer un nouveau sujet',
        topicTitle: 'Titre du sujet',
        category: 'Catégorie',
        content: 'Contenu',
        submit: 'Soumettre le sujet',
        cancel: 'Annuler'
      },
      topicDetail: {
        reply: 'Répondre',
        edit: 'Modifier',
        delete: 'Supprimer',
        report: 'Signaler',
        share: 'Partager'
      }
    },
    classroom: {
      chat: 'Chat',
      resources: 'Ressources',
      participants: 'Participants',
      typeMessage: 'Tapez un message...'
    },
    profile: {
      posts: 'Publications',
      followers: 'Abonnés',
      following: 'Abonnements',
      about: 'À propos',
      groups: 'Groupes',
      documents: 'Documents'
    },
    auth: {
      login: 'Connexion',
      register: 'S\'inscrire',
      logout: 'Déconnexion',
      email: 'Email',
      password: 'Mot de passe',
      name: 'Nom',
      forgotPassword: 'Mot de passe oublié ?',
      invalidCredentials: 'Email ou mot de passe invalide',
      sessionExpired: 'Votre session a expiré. Veuillez vous reconnecter.',
    },
    navigation: {
      dashboard: 'Tableau de bord',
    },
    errors: {
      general: 'Une erreur est survenue',
      network: 'Erreur réseau. Veuillez vérifier votre connexion.',
      unauthorized: 'Vous n\'êtes pas autorisé à effectuer cette action',
      notFound: 'La ressource demandée n\'a pas été trouvée',
      server: 'Erreur serveur. Veuillez réessayer plus tard.',
      lessonLoad: 'Échec du chargement de la leçon. Veuillez réessayer.',
      submission: 'Échec de la soumission de votre réponse. Veuillez réessayer.',
    },
    notFound: {
      title: 'Page Non Trouvée',
      message: 'La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible.',
      homeButton: 'Retour à l\'Accueil'
    },
    lessons: {
      title: 'Cours de Mathématiques',
      description: 'Apprenez les mathématiques à votre rythme',
      startLesson: 'Commencer la Leçon',
      continueLesson: 'Continuer la Leçon',
      completed: 'Terminé',
      inProgress: 'En cours',
      notStarted: 'Non commencé',
      difficulty: {
        beginner: 'Débutant',
        intermediate: 'Intermédiaire',
        advanced: 'Avancé'
      },
      categories: {
        algebra: 'Algèbre',
        geometry: 'Géométrie',
        calculus: 'Calcul',
        statistics: 'Statistiques'
      }
    },
    games: {
      title: 'Jeux Mathématiques',
      description: 'Apprenez les mathématiques en vous amusant',
      playNow: 'Jouer Maintenant',
      difficulty: 'Difficulté',
      players: 'Joueurs',
      timeLimit: 'Limite de Temps',
      score: 'Score',
      highScore: 'Meilleur Score',
      categories: {
        puzzle: 'Puzzle',
        quiz: 'Quiz',
        strategy: 'Stratégie',
        arcade: 'Arcade'
      }
    },
    groups: {
      title: 'Groupes d\'Étude',
      description: 'Connectez-vous avec d\'autres apprenants et collaborez sur des problèmes mathématiques.',
      viewGroups: 'Voir les Groupes',
      myGroups: 'Mes Groupes',
      availableGroups: 'Groupes Disponibles',
      members: 'membres',
      nextSession: 'Prochaine Séance',
      createGroup: 'Créer un Nouveau Groupe',
      joinSuccess: 'Groupe rejoint avec succès',
      leaveSuccess: 'Groupe quitté avec succès',
      createSuccess: 'Groupe créé avec succès',
      form: {
        title: 'Titre du Groupe',
        description: 'Description du Groupe',
        level: 'Niveau de Difficulté',
        maxMembers: 'Nombre Maximum de Membres',
        schedule: 'Horaire des Réunions',
        schedulePlaceholder: 'ex: Tous les lundis à 18h',
        isPrivate: 'Groupe Privé (Sur Invitation)'
      },
      sampleGroups: {
        algebra: {
          title: 'Groupe d\'Algèbre',
          description: 'Sessions hebdomadaires pour pratiquer les concepts d\'algèbre et résoudre des problèmes ensemble.'
        },
        competition: {
          title: 'Préparation aux Concours',
          description: 'Préparation aux concours de mathématiques avec des problèmes pratiques et des stratégies.'
        },
        geometry: {
          title: 'Explorateurs de Géométrie',
          description: 'Apprenez la géométrie à travers des exercices interactifs et des applications pratiques.'
        },
        calculus: {
          title: 'Groupe de Calcul',
          description: 'Concepts avancés de calcul et techniques de résolution de problèmes.'
        }
      }
    },
    home: {
      title: 'Maîtrisez les Mathématiques avec BrainyMath',
      subtitle: 'Des leçons interactives, des jeux engageants et un apprentissage collaboratif pour rendre les mathématiques accessibles et agréables pour tous.',
      whyChoose: 'Pourquoi Choisir BrainyMath?',
      features: {
        lessons: {
          title: 'Leçons Complètes',
          description: 'De l\'arithmétique de base au calcul avancé, nos leçons structurées couvrent tous les concepts mathématiques avec des explications claires et des exemples.'
        },
        games: {
          title: 'Jeux Interactifs',
          description: 'Apprenez en jouant avec notre collection de jeux mathématiques conçus pour renforcer les concepts et rendre l\'apprentissage amusant et engageant.'
        },
        groups: {
          title: 'Apprentissage Collaboratif',
          description: 'Rejoignez des groupes d\'étude, participez aux forums et connectez-vous avec vos pairs pour améliorer votre expérience d\'apprentissage grâce à la collaboration.'
        },
        forum: {
          title: 'Support Communautaire',
          description: 'Obtenez de l\'aide de la communauté, partagez vos connaissances et participez aux discussions pour approfondir votre compréhension.'
        }
      },
      cta: {
        title: 'Prêt à Transformer Votre Apprentissage des Mathématiques?',
        description: 'Rejoignez des milliers d\'apprenants qui ont amélioré leurs compétences mathématiques avec BrainyMath. Commencez votre voyage aujourd\'hui!'
      }
    },
    dashboard: {
      welcome: 'Bienvenue, {{name}} !',
      student: 'Étudiant',
      subtitle: 'Votre tableau de bord d\'apprentissage personnalisé',
      continueLearning: 'Continuer l\'apprentissage',
      continueLearningDesc: 'Reprenez là où vous vous êtes arrêté avec vos leçons de mathématiques et suivez vos progrès.',
      goToLessons: 'Aller aux leçons',
      playGames: 'Jouer aux jeux mathématiques',
      playGamesDesc: 'Renforcez votre apprentissage avec des jeux mathématiques amusants et interactifs.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      lessons: 'Lecciones',
      games: 'Juegos',
      groups: 'Grupos',
      forum: 'Foro',
      classroom: 'Aula',
      profile: 'Perfil',
      darkMode: 'Activar modo oscuro',
      lightMode: 'Activar modo claro',
      selectLanguage: 'Seleccionar idioma'
    },
    common: {
      search: 'Buscar',
      create: 'Crear',
      join: 'Unirse',
      start: 'Comenzar',
      play: 'Jugar',
      view: 'Ver',
      download: 'Descargar',
      send: 'Enviar',
      mute: 'Silenciar',
      unmute: 'Activar',
      startVideo: 'Iniciar video',
      stopVideo: 'Detener video',
      shareScreen: 'Compartir pantalla',
      stopSharing: 'Dejar de compartir',
      loading: 'Cargando...',
      error: 'Ha ocurrido un error',
      retry: 'Reintentar',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      noResults: 'No se encontraron resultados',
    },
    forum: {
      title: 'Discusiones del Foro',
      description: 'Haz preguntas y participa en discusiones matemáticas con la comunidad.',
      goToForum: 'Ir al Foro',
      searchTopics: 'Buscar temas...',
      createTopic: 'Crear nuevo tema',
      topic: 'Tema',
      author: 'Autor',
      replies: 'Respuestas',
      views: 'Vistas',
      categories: {
        general: 'Discusión general',
        homework: 'Ayuda con tareas',
        studyGroups: 'Grupos de estudio',
        resources: 'Compartir recursos'
      },
      createTopicForm: {
        title: 'Crear nuevo tema',
        topicTitle: 'Título del tema',
        category: 'Categoría',
        content: 'Contenido',
        submit: 'Enviar tema',
        cancel: 'Cancelar'
      },
      topicDetail: {
        reply: 'Responder',
        edit: 'Editar',
        delete: 'Eliminar',
        report: 'Reportar',
        share: 'Compartir'
      }
    },
    classroom: {
      chat: 'Chat',
      resources: 'Recursos',
      participants: 'Participantes',
      typeMessage: 'Escribe un mensaje...'
    },
    profile: {
      posts: 'Publicaciones',
      followers: 'Seguidores',
      following: 'Siguiendo',
      about: 'Acerca de',
      groups: 'Grupos',
      documents: 'Documentos'
    },
    auth: {
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      name: 'Nombre',
      forgotPassword: '¿Olvidó su contraseña?',
      invalidCredentials: 'Correo electrónico o contraseña inválidos',
      sessionExpired: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
    },
    navigation: {
      dashboard: 'Panel de control',
    },
    errors: {
      general: 'Ha ocurrido un error',
      network: 'Error de red. Por favor, verifique su conexión.',
      unauthorized: 'No está autorizado para realizar esta acción',
      notFound: 'No se encontró el recurso solicitado',
      server: 'Error del servidor. Por favor, intente más tarde.',
      lessonLoad: 'Falló la carga de la lección. Por favor, intente más tarde.',
      submission: 'Falló la envío de su respuesta. Por favor, intente más tarde.',
    },
    notFound: {
      title: 'Página No Encontrada',
      message: 'La página que está buscando puede haber sido eliminada, ha cambiado de nombre o está temporalmente no disponible.',
      homeButton: 'Volver al Inicio'
    },
    lessons: {
      title: 'Lecciones de Matemáticas',
      description: 'Aprende matemáticas a tu propio ritmo',
      startLesson: 'Comenzar Lección',
      continueLesson: 'Continuar Lección',
      completed: 'Completado',
      inProgress: 'En progreso',
      notStarted: 'No comenzado',
      difficulty: {
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado'
      },
      categories: {
        algebra: 'Álgebra',
        geometry: 'Geometría',
        calculus: 'Cálculo',
        statistics: 'Estadística'
      }
    },
    games: {
      title: 'Juegos Matemáticos',
      description: 'Aprende matemáticas jugando',
      playNow: 'Jugar Ahora',
      difficulty: 'Dificultad',
      players: 'Jugadores',
      timeLimit: 'Límite de Tiempo',
      score: 'Puntuación',
      highScore: 'Puntuación Máxima',
      categories: {
        puzzle: 'Puzzle',
        quiz: 'Quiz',
        strategy: 'Estrategia',
        arcade: 'Arcade'
      }
    },
    groups: {
      title: 'Grupos de Estudio',
      description: 'Conéctate con otros estudiantes y colabora en problemas matemáticos.',
      viewGroups: 'Ver Grupos',
      myGroups: 'Mis Grupos',
      availableGroups: 'Grupos Disponibles',
      members: 'miembros',
      nextSession: 'Próxima Sesión',
      createGroup: 'Crear Nuevo Grupo',
      joinSuccess: 'Grupo unido con éxito',
      leaveSuccess: 'Grupo abandonado con éxito',
      createSuccess: 'Grupo creado con éxito',
      form: {
        title: 'Título del Grupo',
        description: 'Descripción del Grupo',
        level: 'Nivel de Dificultad',
        maxMembers: 'Máximo de Miembros',
        schedule: 'Horario de Reuniones',
        schedulePlaceholder: 'ej: Todos los lunes a las 6 PM',
        isPrivate: 'Grupo Privado (Solo por Invitación)'
      },
      sampleGroups: {
        algebra: {
          title: 'Grupo de Álgebra',
          description: 'Sesiones semanales para practicar conceptos de álgebra y resolver problemas juntos.'
        },
        competition: {
          title: 'Preparación para Competencias',
          description: 'Preparación para competencias matemáticas con problemas prácticos y estrategias.'
        },
        geometry: {
          title: 'Exploradores de Geometría',
          description: 'Aprende geometría a través de ejercicios interactivos y aplicaciones prácticas.'
        },
        calculus: {
          title: 'Grupo de Cálculo',
          description: 'Conceptos avanzados de cálculo y técnicas de resolución de problemas.'
        }
      }
    },
    home: {
      title: 'Domina las Matemáticas con BrainyMath',
      subtitle: 'Lecciones interactivas, juegos atractivos y aprendizaje colaborativo para hacer las matemáticas accesibles y agradables para todos.',
      whyChoose: '¿Por Qué Elegir BrainyMath?',
      features: {
        lessons: {
          title: 'Lecciones Integrales',
          description: 'Desde la aritmética básica hasta el cálculo avanzado, nuestras lecciones estructuradas cubren todos los conceptos matemáticos con explicaciones claras y ejemplos.'
        },
        games: {
          title: 'Juegos Interactivos',
          description: 'Aprende jugando con nuestra colección de juegos matemáticos diseñados para reforzar conceptos y hacer que el aprendizaje sea divertido y atractivo.'
        },
        groups: {
          title: 'Aprendizaje Colaborativo',
          description: 'Únete a grupos de estudio, participa en foros y conéctate con compañeros para mejorar tu experiencia de aprendizaje a través de la colaboración.'
        },
        forum: {
          title: 'Soporte Comunitario',
          description: 'Obtén ayuda de la comunidad, comparte tu conocimiento y participa en discusiones para profundizar tu comprensión.'
        }
      },
      cta: {
        title: '¿Listo para Transformar tu Aprendizaje de las Matemáticas?',
        description: 'Únete a miles de estudiantes que han mejorado sus habilidades matemáticas con BrainyMath. ¡Comienza tu viaje hoy!'
      }
    },
    dashboard: {
      welcome: '¡Bienvenido, {{name}}!',
      student: 'Estudiante',
      subtitle: 'Tu panel de aprendizaje personalizado',
      continueLearning: 'Continuar aprendiendo',
      continueLearningDesc: 'Continúa donde lo dejaste con tus lecciones de matemáticas y sigue tu progreso.',
      goToLessons: 'Ir a las lecciones',
      playGames: 'Jugar juegos matemáticos',
      playGamesDesc: 'Refuerza tu aprendizaje con juegos matemáticos divertidos e interactivos.',
    },
  }
}; 