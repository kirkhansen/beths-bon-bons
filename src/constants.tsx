export const GOOGLE_FORM_URI = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdynSNJdglN23cmKY58j2Atio7nWYNoPNdyPOWrlKI-LnBTrw/formResponse"

type PaymentMethod = "venmo" | "cash" | null;
// type CakeBallStyle = "cakeBallTruffle" | "cakePop" | "upsideDownCakePop" | null;

// key is what we send to the form, value is what should be displayed to the user
export enum CakeBallStyles {
    truffle = "Cake Ball Truffle",
    pop = "Cake Pop",
    upsideDownPop = "Upside Down Cake Pop",
}

// key is what we send to the form, value is what should be displayed to the user
export enum CakeFlavors {
    deathByChocolate = "Death By Chocolate",
    veryVanilla = "Very Vanilla",
    redVelvet = "Red Velvet"
}

export type BaseFormState = {
  fullName: string;
  email: string;
  eventDate: string;
  pickupDatetime: string;  // Treats are good for 3-5 days on the counter/room temp, and they are good up to two weeks in the fridge
  referralSource: string,
  paymentMethod: PaymentMethod,
  eventType: string,
  eventThemeDetails: string,
  cakeBallStyle?: CakeBallStyles;
  deathByChocolate?: number,
  veryVanilla?: string,
  birthdayCakeBatter?: string,
  redVelvet?: string,
};

// Define the GoogleFormEntryIdMap with the same keys as FormState, but with string values
type GoogleFormEntryIdMap = {
  [K in keyof BaseFormState]: string; // Ensure the values are of type string (e.g., "entry.<num>")
};

export const googleFormEntryIdMap: GoogleFormEntryIdMap = {
  fullName: "entry.269276840",
  email: "entry.1295339816",
  eventDate: "entry.895593470",
  pickupDatetime: "entry.1460784367",
  referralSource: "entry.1913813112",
  paymentMethod: "entry.782188801",
  eventType: "entry.673855529",
  eventThemeDetails: "entry.1894015756",
  cakeBallStyle: "entry.1153970736",
  deathByChocolate: "entry.572468806",
  veryVanilla: "entry.149604139",
  birthdayCakeBatter: "entry.680103830",
  redVelvet: "entry.1056584828",
}

export const defaultFormState:  { [K in keyof BaseFormState]: BaseFormState[K] } = {
  fullName: "",
  email: "",
  eventDate: "",
  pickupDatetime: "",
  referralSource: "",
  paymentMethod: null,
  eventType: "",
  eventThemeDetails: "",
};

export interface PostResponse {
    success: boolean;
    message: string;
}
