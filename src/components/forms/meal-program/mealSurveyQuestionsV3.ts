import { Question } from "../reusable/MealSurvey/RadioFormSet";

export const questions: Question[] = [
  {
    English: "What age range are you in?",
    Spanish: "¿Cuál es tu edad?",
    options: {
      English: ["0-17", "18-26", "27-49", "50-59", "60-65", "70-75", "75+"],
      Spanish: ["0-17", "18-26", "27-49", "50-59", "60-65", "70-75", "75+"],
    },
  },
  {
    English: "What is your race and/or ethnicity?",
    Spanish: "¿Cuál es tu etnia?",
    options: {
      English: [
        "American Indian or Alaska Native",
        "Asian",
        "Black or African American",
        "Hispanic or Latino",
        "Middle Eastern or North African",
        "Native Hawaiian or Pacific Islander",
        "White",
        "Prefer not to answer",
      ],
      Spanish: [
        "Afroamericano / Negro",
        "Asiático / isleño del Pacífico",
        "Nativo americano / indio americano",
        "Blanco / caucásico",
        "Otro",
      ],
    },
  },
  {
    English: "What is your preferred language?",
    Spanish:
      "¿Tiene acceso a un microondas u otro equipo para recalentar comidas empaquetadas?",
    options: {
      English: [
        "English",
        "Spanish",
        "Chinese (Cantonese or Mandarin)",
        "Vietnamese",
        "Tagalog",
        "Other",
      ],
      Spanish: [],
    },
  },
  { English: "What is your zip code?", Spanish: "¿Cuál es tu codigo postal?" },
  {
    English: "How many people live in your household?",
    Spanish: "¿Para cuántas personas estás pidiendo a las comidas?",
    options: {
      English: ["1", "2", "3", "4", "5+"],
      Spanish: ["1", "2", "3", "4", "5+"],
    },
  },
  {
    English: "Are you accessing meals for children under 5?",
    Spanish: "¿Estás pidiendo a comidas para niños menores de 5 años?",
  },
  {
    English: "Do you have access to utensils?",
    Spanish: "¿Tienes acceso a utensilios?",
  },

  {
    English:
      "What time of day do you most often access Town Fridge meals? Check all that apply:",
    Spanish:
      "¿A qué hora del día accedes más a las comidas del Town Fridge? Marca todas las que apliquen:",
    options: {
      English: ["8am-12pm", "12pm-5pm", "After 5pm"],
      Spanish: ["8am-12pm", "12pm-5pm", "Después de las 5pm"],
    },
  },
  {
    English: "What is your favorite type of food?",
    Spanish: "¿Cuál es tu tipo de comida favorita?",
    options: {
      English: [
        "American",
        "Barbecue",
        "Mexican",
        "Italian",
        "Chinese",
        "Southern/Soul",
        "Sandwiches",
      ],
      Spanish: [
        "Americana",
        "Parilla",
        "Mexicana",
        "China",
        "Italiano",
        "Cocina del sur de los Estados Unidos",
        "Sándwiches",
      ],
    },
  },
  {
    English: "What is your 2nd favorite type of food?",
    Spanish: "¿Qué tipos de comidas te gustaría tener en los Town Fridges?",
    options: {
      English: [
        "American",
        "Barbecue",
        "Mexican",
        "Italian",
        "Chinese",
        "Southern/Soul",
        "Sandwiches",
      ],
      Spanish: [
        "Americana",
        "Parilla",
        "Mexicana",
        "China",
        "Italiano",
        "Cocina del sur de los Estados Unidos",
        "Sándwiches",
      ],
    },
  },
  {
    English: "Are you:",
    Spanish: "Eres:",
    options: {
      English: [
        "Vegetarian",
        "Pescatarian",
        "Allergic/sensitive to shellfish",
        "Allergic/sensitive to dairy",
        "Allergic/sensitive to nuts",
        "No Pork",
        "No Beef",
        "No Gluten",
        "Kosher or Halal",
      ],
      Spanish: [
        "Vegetariano",
        "Pescatariano",
        "Alérgico / sensible a los mariscos",
        "Alérgico / sensible a los productos lácteos",
        "Alérgico / sensible a las nueces",
        "Sin cerdo",
        "Sin carne",
        "Sin gluten",
        "Kosher o Halal",
      ],
    },
  },

  {
    English: "Would you like to have fresh fruits or salad added to the meal?",
    Spanish: "¿Le gustaría agregar frutas frescas o ensalada a la comida?",
  },

  {
    English: "Are you enjoying the taste of the meals so far?",
    Spanish: "¿Estás disfrutando el sabor de las comidas hasta ahora?",
  },
  {
    English:
      "Without these meals, do you have access to healthy, homemade meals?",
    Spanish:
      "¿Sin estas comidas, tienes acceso a comidas saludables y caseras?",
  },
  {
    English: "Without these meals, do you have to skip a meal?",
    Spanish: "¿Sin estas comidas, tienes que saltarte una comida?",
    options: {
      English: [
        "No",
        "Yes, but not very often",
        "Yes, about weekly",
        "Yes, 2-3 times a week",
        "Yes, more than 3 times a week",
      ],
      Spanish: [
        "No",
        "Sí, pero no muy a menudo",
        "Sí, aproximadamente semanalmente",
        "Sí, 2 o 3 veces por semana",
        "Sí, más de 3 veces por semana",
      ],
    },
  },
  {
    English: "Do you have access to a refrigerator?",
    Spanish: "¿Tiene acceso a un refrigerador?",
  },
  { English: "Do you have diabetes?", Spanish: "¿Tienes diabetes?" },
  {
    English: "Do you have high blood pressure?",
    Spanish: "¿Tiene la presión arterial alta?",
  },
];
