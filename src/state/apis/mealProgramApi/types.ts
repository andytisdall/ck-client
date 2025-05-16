export interface Restaurant {
  name: string;
  salesforceId: string;
  user: string;
  id: string;
}
export type RestaurantState = Record<string, Restaurant>;

export interface CreateRestaurantArgs {
  name: string;
  salesforceId: string;
  userId: string;
}
export type EditRestaurantArgs = CreateRestaurantArgs & {
  restaurantId: string;
};

export interface RestaurantInfo {
  // remainingDocs: UploadFilesResponse[];
  completedDocs: string[];
  status: string;
  healthPermitExpired: boolean;
}

export interface MealDelivery {
  date: string;
  cbo: string;
  restaurant: string;
  id: string;
  time: string;
  deliveryMethod: string;
  numberOfMealsMeat: number;
  numberOfMealsVeg: number;
  notes: string;
  price: number;
  isThisWeek: boolean;
  isNextWeek: boolean;
}

export interface MealProgramAccount {
  id: string;
  name: string;
  address?: string;
}

export interface MealProgramScheduleResponse {
  accounts: MealProgramAccount[];
  deliveries: MealDelivery[];
}

export interface MealProgramState {
  accounts: Record<string, MealProgramAccount>;
  deliveries: MealDelivery[];
}
