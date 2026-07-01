import { LanguageText } from "../types";

export const Spanish: LanguageText = {
  errors: {
    incomplete: "Complete todas las preguntas antes de enviarla.",
    required: "Esta es una pregunta obligatoria.",
    ratingError: "No seleccione más de una respuesta por columna.",
  },
  displayText: {
    title: "Encuesta para clientes de Community Kitchens",
    headerText:
      "Gracias por completar la encuesta de comidas de Community Kitchens. Le aseguramos que sus datos personales se mantendrán confidenciales. Su opinión es invaluable y juega un papel crucial para asegurar fondos que permitan proporcionar comidas gratuitas a las personas.",
    submitText: "Enviar",
    headers: [
      "Cuéntenos sobre usted",
      "Vivienda y acceso",
      "Salud y dieta",
      "Preferencias alimentarias",
      "Recursos",
      "Comentarios sobre las comidas",
    ],
    requiredText: "* Significa que la pregunta es obligatoria.",
    successHeader: "¡Su envío fue exitoso!",
    successText:
      "¡Gracias por completar esta encuesta! Usaremos su información para mejorar nuestro programa de comidas gratuitas.",
  },
  questions: [
    {
      question: "¿En qué rango de edad se encuentra?",
      options: [
        "De 0 a 17",
        "De 18 a 26",
        "De 27a 49",
        "De 50 a 59",
        "De 60 a 65",
        "De 70 a 75",
        "Más de 75",
      ],
    },
    {
      question: "¿Cuál es su raza o etnia?",
      options: [
        "Indígena americano o nativo de Alaska",
        "Asiático",
        "Negro o afroamericano",
        "Hispano o latino",
        "Medio Oriente o África del Norte",
        "Nativo hawaiano o isleño del Pacífico",
        "Blanco",
        "Prefiero no responder",
      ],
    },
    {
      question: "¿Cuál es su idioma preferido?",
      options: [
        "Chino (cantonés o mandarín)",
        "Inglés",
        "Español",
        "Tagalo",
        "Vietnamita",
        "Otro:",
      ],
    },
    { question: "¿Cuál es su código postal?", options: [] },
    {
      question: "¿Cuántas personas viven en su hogar?",
      options: ["1", "2", "3", "4", "Más de 5"],
    },
    {
      question: "¿Está accediendo a comidas para niños menores de 5 años?",
      options: ["Sí", "No"],
    },
    {
      question:
        "¿Actualmente experimenta falta de vivienda o inestabilidad de vivienda? Esto incluye vivir en el exterior, en un vehículo, en un refugio temporal o en una vivienda transitoria, alojarse temporalmente en casa de otros o falta de acceso confiable a instalaciones de cocina.",
      options: ["Sí", "No", "Otro:"],
    },
    {
      question:
        "¿A qué elementos de cocina tiene acceso de manera regular? Seleccione todas las opciones que correspondan.",
      options: [
        "Refrigerador",
        "Microondas",
        "Estufa/horno",
        "Utensilios para comer (p. ej., palillos, tenedor, cuchillo, cuchara)",
        "Ninguno de las anteriores",
        "Otro:",
      ],
    },
    {
      question:
        "¿Usted o personas de su hogar padecen alguna de las siguientes afecciones de salud? Seleccione todas las opciones que correspondan.",
      options: [
        "Alergias alimentarias",
        "Enfermedad cardíaca",
        "Presión arterial alta",
        "Limitaciones de movilidad",
        "Diabetes tipo I",
        "Diabetes tipo II",
        "Otra",
        "Ninguna",
        "Prefiero no responder",
      ],
    },
    {
      question:
        "¿Tiene alguna preferencia o restricción en su dieta? Seleccione todas las opciones que correspondan.",
      options: [
        "Alergia/sensibilidad a los lácteos",
        "Sin gluten",
        "Kosher/halal",
        "Sin carne de res",
        "Sin carne de cerdo",
        "Alergia/sensibilidad a los frutos secos",
        "Es pescetariano",
        "Alergia/sensibilidad a los mariscos",
        "Es vegetariano/vegano",
        "Ninguna",
        "Otra:",
      ],
    },
    {
      question:
        "Si hubiera frutas frescas o ensalada, ¿le gustaría incluirlas con las comidas?",
      options: ["Sí", "No"],
    },
    {
      question:
        "Ordene los alimentos según su preferencia (1 = favorito, 7 = menos favorito)",
      options: [
        "Estadounidense",
        "Cocina asiática",
        "Barbacoa",
        "Italiana",
        "Mexicana",
        "Sándwiches",
        "Del sur/ soul",
      ],
    },
    {
      question:
        "¿Está inscrito en CalFresh? Si no lo está, ¿le gustaría recibir ayuda para inscribirse?",
      options: [
        "Sí, estoy inscrito.",
        "Sí, me gustaría recibir ayuda para inscribirme.",
        "No, no me interesa inscribirme.",
        "No, recientemente perdí mis beneficios de CalFresh.",
      ],
    },
    {
      question:
        "¿Cuáles de los siguientes recursos le serían útiles? Seleccione todas las opciones que correspondan.",
      options: [
        "Cuidado infantil",
        "Recursos para violencia doméstica",
        "Alimentos secos/enlatados",
        "Productos frescos",
        "Atención médica",
        "Orientación para la vivienda",
        "Kits de higiene o de tocador",
        "Productos de higiene menstrual",
        "Comidas preparadas",
        "Calcetines",
        "Servicios de recuperación por consumo de sustancias",
        "Lonas o carpas",
        "Agua",
        "Otro:",
      ],
    },
    {
      question: "¿Cómo calificaría las comidas de Community Kitchens?",
      options: [
        "Excelentes",
        "Buenas",
        "Regulares",
        "Malas",
        "Aún no he probado ninguna.",
      ],
    },
    {
      question:
        "Sin las comidas de Community Kitchens, ¿con qué frecuencia necesitaría saltarse comidas?",
      options: [
        "Nunca",
        "Rara vez",
        "Aproximadamente una vez a la semana",
        "De 2 a 3 veces a la semana",
        "Más de 3 veces a la semana",
      ],
    },
    {
      question:
        "¿Dónde suele recibir las comidas de Community Kitchens? Seleccione todas las opciones que correspondan.",
      options: [
        "Distribución en la puerta de CK Central Kitchen",
        "Organización comunitaria o sitio asociado",
        "Refrigeradores comunitarios",
        "Otro:",
      ],
    },
    {
      question:
        "Las comidas de Community Kitchens me ayudan a acceder a alimentos más saludables.",
      options: [
        "Totalmente de acuerdo",
        "De acuerdo",
        "Neutral",
        "En desacuerdo",
        "Totalmente en desacuerdo",
      ],
    },
  ],
};
