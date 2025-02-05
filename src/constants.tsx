export const ORDER_FORM_URI = "https://script.google.com/macros/s/AKfycbwPizDSxrTjv0AkL6AtUmYNj2XIsjsxa_XmbNuQP12wucTgHQsG-tfP5Kr9Zgj1Keya/exec";
export const MAIL_CHIMP_URI = "https://app.us8.list-manage.com/subscribe/post?u=c72545f330723e5656eae34ce&id=5dfc19aaa6&f_id=000dc9e2f0";

type PaymentMethod = "venmo" | "cash" | null;
// type CakeBallStyle = "cakeBallTruffle" | "cakePop" | "upsideDownCakePop" | null;

// key is what we send to the form, value is what should be displayed to the user
export enum CakeBallStyles {
  pop = "Cake Pop",
  upsideDownPop = "Upside Down Cake Pop",
  truffle = "Cake Ball Truffle",
}

// key is what we send to the form, value is what should be displayed to the user
export enum CakeFlavors {
  birthdayCakeBatter = "Birthday Cake Batter",
  deathByChocolate = "Death By Chocolate",
  lemon = "Lemon",
  redVelvet = "Red Velvet",
  veryVanilla = "Very Vanilla",
}

export type BaseFormState = {
  fullName: string;
  email: string;
  eventDate: string;
  pickupDate: string; // Treats are good for 3-5 days on the counter/room temp, and they are good up to two weeks in the fridge
  referralSource: string;
  paymentMethod: PaymentMethod;
  eventType: string;
  eventThemeDetails: string;
  cakeBallStyle?: CakeBallStyles;
  deathByChocolate?: number;
  veryVanilla?: string;
  birthdayCakeBatter?: string;
  redVelvet?: string;
  lemon?: string;
};

// Define the GoogleFormEntryIdMap with the same keys as FormState, but with string values
export type GoogleFormEntryIdMap = {
  [K in keyof BaseFormState]: string; // Ensure the values are of type string (e.g., "entry.<num>")
};

export const googleFormEntryIdMap: GoogleFormEntryIdMap = {
  fullName: "entry.269276840",
  email: "entry.1295339816",
  eventDate: "entry.895593470",
  pickupDate: "entry.1460784367",
  referralSource: "entry.1913813112",
  paymentMethod: "entry.782188801",
  eventType: "entry.673855529",
  eventThemeDetails: "entry.1894015756",
  cakeBallStyle: "entry.1153970736",
  deathByChocolate: "entry.572468806",
  veryVanilla: "entry.149604139",
  birthdayCakeBatter: "entry.680103830",
  redVelvet: "entry.1056584828",
  lemon: "entry.2026319349",
};

export const defaultFormState: {
  [K in keyof BaseFormState]: BaseFormState[K];
} = {
  fullName: "",
  email: "",
  eventDate: "",
  pickupDate: "",
  referralSource: "",
  paymentMethod: null,
  eventType: "",
  eventThemeDetails: "",
};

export interface PostResponse {
  success: boolean;
  message: string;
}

export const email = "bethsbonbons@gmail.com";