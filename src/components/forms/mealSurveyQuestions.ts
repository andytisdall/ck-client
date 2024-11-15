export interface Question {
  English: string;
  Spanish: string;
  options?: { English: string[]; Spanish: string[] };
}

export const questions: Question[] = [
  {
    English: 'Do you have access to a microwave?',
    Spanish: '¿Tienes acceso a un microondas?',
  },
  {
    English: 'Do you have a way to heat food?',
    Spanish: '¿Tienes alguna manera de calentar comida?',
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
      English: ['Just 1', '2-4', '4+'],
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
      English: ['8-10am', '12-5pm', 'After 5pm'],
      Spanish: ['8-10am', '12-5pm', 'Después de las 5pm'],
    },
  },
  {
    English: 'What types of meals would you like to have in the Town Fridges?',
    Spanish: '¿Qué tipos de comidas te gustaría tener en los Town Fridges?',
    options: {
      English: ['Breakfast', 'Lunch', 'Dinner'],
      Spanish: ['Desayuno', 'Almuerzo', 'Cena'],
    },
  },
  {
    English: 'What are your dietary preferences?',
    Spanish: '¿Cuáles son tus preferencias dietéticas?',
    options: {
      English: ['Meat', 'Vegetarian', 'Gluten-Free'],
      Spanish: ['Carne', 'Vegetariano', 'Sin Gluten'],
    },
  },
  {
    English: 'What protein do you enjoy?',
    Spanish: '¿Qué proteína disfrutas? ',
    options: {
      English: [
        'Chicken',
        'Beef',
        'Fish',
        'Egg',
        'Tofu',
        'Beans',
        'Vegetarian',
      ],
      Spanish: [
        'Pollo',
        'Carne de res',
        'Pescado',
        'Huevo',
        'Tofu',
        'Frijoles',
        'Vegetariano',
      ],
    },
  },
  {
    English: 'Would you like to have fresh/raw fruits added to the meal?',
    Spanish: '¿Te gustaría que se añadieran frutas frescas/crudas a la comida?',
  },
  {
    English: 'Would you like to have a salad included with meals?',
    Spanish: '¿Te gustaría que se incluyera una ensalada con las comidas?',
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
  },
];
