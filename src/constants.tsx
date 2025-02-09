export const ORDER_FORM_URI = "https://script.google.com/macros/s/AKfycbwUynmgA-PbAmqyccJ3MCSTltt4newFc5svYQ0XbMnwEPkPCGqHUs6VqN5UfpriD4DH/exec";
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