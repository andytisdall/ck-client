import { LanguageText } from "../types";

const displayText = {
  title: "Community Kitchens Client Survey",
  headerText:
    "Thank you for completing the Community Kitchens meal survey. Rest assured, your personal data will remain confidential. Your input is invaluable and plays a crucial role in securing funding to provide free meals to the people.",
  submitText: "Submit",
  headers: [
    "Tell Us About Yourself",
    "Housing and Access",
    "Health and Diet",
    "Food Preferences",
    "Resources",
    "Meal Feedback",
  ],
  requiredText: "* Indicates required question",
  successHeader: "Your Submission Was Successful!",
  successText:
    "Thank you for filling out this survey! We will use your info to improve our free meal program.",
};

export const English: LanguageText = {
  errors: {
    incomplete: "Please complete all questions before submitting",
    required: "This is a required question",
    ratingError: "Please don't select more than one response per column",
  },
  displayText,
  questions: [
    {
      question: "What age range are you in?",
      options: ["0-17", "18-26", "27-49", "50-59", "60-65", "70-75", "75+"],
    },
    {
      question: "What is your race and/or ethnicity?",
      options: [
        "American Indian or Alaska Native",
        "Asian",
        "Black or African American",
        "Hispanic or Latino",
        "Middle Eastern or North African",
        "Native Hawaiian or Pacific Islander",
        "White",
        "Prefer not to answer",
      ],
    },
    {
      question: "What is your preferred language?",
      options: [
        "English",
        "Spanish",
        "Chinese (Cantonese or Mandarin)",
        "Vietnamese",
        "Tagalog",
        "Other:",
      ],
    },
    { question: "What is your zip code?", options: [] },
    {
      question: "How many people live in your household?",
      options: ["1", "2", "3", "4", "5+"],
    },
    {
      question: "Are you accessing meals for children under 5?",
      options: ["Yes", "No"],
    },
    {
      question:
        "Are you currently experiencing homelessness or housing instability? This includes living outdoors, in a vehicle, temporary shelter, transitional housing, couch surfing, or lacking reliable access to kitchen facilities.",
      options: ["Yes", "No", "Other:"],
    },
    {
      question:
        "Which cooking items do you regularly have access to? Select all that apply.",
      options: [
        "Refrigerator",
        "Microwave",
        "Stove/Oven",
        "Eating utensils (i.e. chopsticks, fork, knife, spoon)",
        "None of the above",
        "Other:",
      ],
    },
    {
      question:
        "Do you or members of your household experience any of the following health concerns? Select all that apply.",
      options: [
        "Food allergies",
        "Heart disease",
        "High blood pressure",
        "Mobility limitations",
        "Type I Diabetes",
        "Type II Diabetes",
        "Other",
        "Prefer not to answer",
      ],
    },
    {
      question:
        "Do you have any dietary preferences or restrictions? Select all that apply.",
      options: [
        "Dairy allergy/sensitivity",
        "Gluten-Free",
        "Kosher/Halal",
        "No Beef",
        "No Pork",
        "Nut allergy/sensitivity",
        "Pescatarian",
        "Shellfish allergy/sensitivity",
        "Vegetarian/Vegan",
        "None",
        "Other:",
      ],
    },
    {
      question:
        "Would you like fresh fruit or salad included with meals when available?",
      options: ["Yes", "No"],
    },
    {
      question: "Rank your favorite foods (1 = favorite, 7 = least favorite)",
      options: [
        "American",
        "Asian Cuisine",
        "Barbecue",
        "Italian",
        "Mexican",
        "Sandwiches",
        "Southern/ Soul",
      ],
    },
    {
      question:
        "Are you enrolled in CalFresh? If not, would you like assistance enrolling?",
      options: [
        "Yes, I am enrolled",
        "Yes, I would like assistance enrolling",
        "No, I am not interested in enrolling",
        "No, I recently lost my CalFresh benefits",
      ],
    },
    {
      question:
        "Which of the following resources would be helpful to you? Select all that apply.",
      options: [
        "Childcare",
        "Domestic violence resources",
        "Dry/canned food",
        "Fresh produce",
        "Healthcare",
        "Housing Navigation",
        "Hygiene kits or toiletries",
        "Menstrual hygiene products",
        "Prepared Meals",
        "Socks",
        "Substance use recovery services",
        "Tarps and/or Tents",
        "Water",
        "Other:",
      ],
    },
    {
      question: "How would you rate Community Kitchens' meals?",
      options: ["Excellent", "Good", "Okay", "Poor", "I haven't tried any yet"],
    },
    {
      question:
        "Without Community Kitchens' meals, how often would you need to skip meals?",
      options: [
        "Never",
        "Rarely",
        "About once a week",
        "2-3 times a week",
        "More than 3 times a week",
      ],
    },
    {
      question:
        "Where do you usually receive Community Kitchens' meals? Select all that apply.",
      options: [
        "CK Central Kitchen's Doorfront Distribution",
        "Community organization or partner site",
        "Town Fridges",
        "Other:",
      ],
    },
    {
      question: "Community Kitchens' meals help me access healthier food.",
      options: [
        "Strongly agree",
        "Agree",
        "Neutral",
        "Disagree",
        "Strongly Disagree",
      ],
    },
  ],
};
