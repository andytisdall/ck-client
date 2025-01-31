import { Question } from '../reusable/RadioFormSet';

export const questions: Question[] = [
  {
    English: 'What is your age?',
    Spanish: '',
    options: {
      English: ['0-17', '18-26', '27-49', '50-60', '60+'],
      Spanish: ['0-17', '18-26', '27-49', '50-60', '60+'],
    },
  },
  {
    English: 'What is your ethnicity?',
    Spanish: '',
    options: {
      English: [
        'African American/Black',
        'Asian/Pacific Islander',
        'Latina/Latino',
        'Native American/American Indian',
        'White/Caucasian',
        'Other',
      ],
      Spanish: ['0-17', '18-26', '27-49', '50-60', '60+'],
    },
  },
  {
    English:
      'Do you have access to a microwave or other equipment for reheating packaged meals?',
    Spanish: '¿Tienes acceso a un microondas?',
  },
  {
    English: 'Do you have access to utensils?',
    Spanish: '¿Para cuántas personas estás accediendo a las comidas?',
  },
  {
    English: 'How many people are you accessing meals for?',
    Spanish:
      '¿Para cuántas personas estás accediendo a las comidas? Marca una:',
    options: {
      English: ['Just yourself', '2-4', '4+'],
      Spanish: ['Solo 1', '2-4', '4+'],
    },
  },
  {
    English: 'Are you accessing meals for children under 10?',
    Spanish: '¿Estás accediendo a comidas para niños menores de 10 años?',
  },
  {
    English:
      'What time of day do you most often access Town Fridge meals? Check all that apply:',
    Spanish:
      '¿A qué hora del día accedes más a las comidas del Town Fridge? Marca todas las que apliquen:',
    options: {
      English: ['8am-12pm', '12pm-5pm', 'After 5pm'],
      Spanish: ['8am-12pm', '12pm-5pm', 'Después de las 5pm'],
    },
  },
  {
    English: 'What is your favorite type of food?',
    Spanish: '¿Qué tipos de comidas te gustaría tener en los Town Fridges?',
    options: {
      English: [
        'American',
        'Barbecue',
        'Mexican',
        'Italian',
        'Chinese',
        'Southern/Soul',
        'Sandwiches',
      ],
      Spanish: ['Desayuno', 'Almuerzo', 'Cena'],
    },
  },
  {
    English: 'What is your 2nd favorite type of food?',
    Spanish: '¿Qué tipos de comidas te gustaría tener en los Town Fridges?',
    options: {
      English: [
        'American',
        'Barbecue',
        'Mexican',
        'Italian',
        'Chinese',
        'Southern/Soul',
        'Sandwiches',
      ],
      Spanish: ['Desayuno', 'Almuerzo', 'Cena'],
    },
  },
  {
    English: 'Are you:',
    Spanish: '¿Cuáles son tus preferencias dietéticas?',
    options: {
      English: [
        'Vegetarian',
        'Pescatarian',
        'Allergic/sensitive to shellfish',
        'Allergic/sensitive to dairy',
        'Allergic/sensitive to nuts',
        'No Pork',
        'No Beef',
        'No Gluten',
        'Kosher or Halal',
      ],
      Spanish: ['Carne', 'Vegetariano', 'Sin Gluten'],
    },
  },

  {
    English: 'Would you like to have fresh fruits or salad added to the meal?',
    Spanish: '¿Te gustaría que se añadieran frutas frescas/crudas a la comida?',
  },

  {
    English: 'Are you enjoying the taste of the meals so far?',
    Spanish: '¿Estás disfrutando el sabor de las comidas hasta ahora?',
  },
  {
    English:
      'Without these meals, do you have access to healthy, homemade meals?',
    Spanish:
      '¿Sin estas comidas, tienes acceso a comidas saludables y caseras?',
  },
  {
    English: 'Without these meals, do you have to skip a meal?',
    Spanish: '¿Sin estas comidas, tienes que saltarte una comida?',
    options: {
      English: [
        'No',
        'Yes, but not very often',
        'Yes, about weekly',
        'Yes, 2-3 times a week',
        'Yes, more than 3 times a week',
      ],
      Spanish: [],
    },
  },
];
