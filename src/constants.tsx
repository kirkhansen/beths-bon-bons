export const ORDER_FORM_URI =
  "https://script.google.com/macros/s/AKfycbzPXLqIP-IHkmUpflawlo-82qrfhutajyJ2IvnCKo5pyUK9sKPBquaWPYrBeYGjU8IZPg/exec";
export const MAIL_CHIMP_URI =
  "https://app.us8.list-manage.com/subscribe/post?u=c72545f330723e5656eae34ce&id=5dfc19aaa6&f_id=000dc9e2f0";

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
  strawberry = "Strawberry",
  veryVanilla = "Very Vanilla",
  other = "Other",
}

export enum DanceRecitalBoxFlavors {
  danceRecitalBoxBirthdayCakeBatter = "Birthday Cake Batter",
  danceRecitalBoxDeathByChocolate = "Death By Chocolate",
}

export type BaseFormState = {
  fullName: string;
  email: string;
  phone: string;
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
  danceStudio?: string;
  doNotMailingList?: boolean;
};

export const defaultFormState: {
  [K in keyof BaseFormState]: BaseFormState[K];
} = {
  fullName: "",
  email: "",
  phone: "",
  eventDate: "",
  pickupDate: "",
  referralSource: "",
  paymentMethod: null,
  eventType: "",
  eventThemeDetails: "",
  danceStudio: "",
  doNotMailingList: false,
};

export interface PostResponse {
  success: boolean;
  message: string;
}

export const email = "bethsbonbons@gmail.com";

export const addOns = [
  { name: "Bon Bons", unit: "Dozen", price: "15" },
  { name: "Coffee Bites", unit: "4 Ounces", price: "10" },
  { name: "Coffee Flight", unit: "3 Bars", price: "20" },
  { name: "Custom Chocolate Bars", unit: "Single", price: "5" },
  { name: "Chocolate Oreos", unit: "Dozen", price: "20" },
  { name: "Golden Oreos", unit: "Dozen", price: "20" },
  { name: "Pretzel Rods", unit: "Dozen", price: "18" },
  { name: "S'mores Bars", unit: "Single", price: "4" },
];

// Seasonal ranges are expressed with 0-indexed months and day numbers.
export const SEASON_RANGES = {
  danceRecital: { start: { month: 3, day: 15 }, end: { month: 5, day: 15 } }, // Apr 15 - Jun 15
  halloween: { start: { month: 9, day: 1 }, end: { month: 9, day: 31 } }, // Oct 1 - Oct 31
  thanksgiving: { start: { month: 10, day: 1 }, end: { month: 10, day: 25 } }, // Nov 1 - Nov 25
  christmas: { start: { month: 10, day: 15 }, end: { month: 11, day: 20 } }, // Nov 15 - Dec 20
  valentines: { start: { month: 0, day: 26 }, end: { month: 1, day: 13 } }, // Jan 26 - Feb 13
};
