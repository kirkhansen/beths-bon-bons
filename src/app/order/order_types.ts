export interface FlavorDetails {
  name: string;
  dozens: number;
  cakePops: number;
}

export interface CustomOrder {
  eventType: string | null;
  eventThemeDetails: string | null;
  cakeBallStyle: string | null;
  flavors: Record<string, FlavorDetails>;
}

export interface CustomerInfo {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  eventDate: string | null;
  pickupDate: string | null;
  paymentMethod: string | null;
  doNotMailingList?: boolean | null;
}

export interface DanceRecitalBoxes {
  name: string;
  boxes: number;
  pieces: number;
}

export interface DanceRecital {
  danceStudio: string | null;
  boxes: Record<string, DanceRecitalBoxes>;
}

export interface Totals {
  totalCakePops: number;
  totalBoxes: number;
  totalAddOnPieces: number;
  totalDanceRecitalPieces?: number;
  totalHalloweenPieces?: number;
  totalThanksgivingPieces?: number;
  totalChristmasPieces?: number;
  totalValentinesPieces?: number;
  totalEasterPieces?: number;
  totalTeacherAppreciationPieces?: number;
  totalMothersDayPieces?: number;
  grandTotalPieces: number;
}

export interface AddOns {
  name: string;
  quantity: number;
  unit: string;
  pieces: number;
}

export interface SeasonalHalloween {
  sets: number;
  pieces: number;
}

export interface SeasonalThanksgiving {
  dozens: number;
  pieces: number;
}

export interface SeasonalChristmas {
  partyBoxes?: number;
  cakePopsSets?: number;
  nutcrackerBoxes?: number;
  pieces?: number;
}

export interface SeasonalValentines {
  chocolateBouquets?: number;
  cakePopsSets?: number;
  pieces?: number;
}

export interface SeasonalEaster {
  samplers?: number;
  pieces?: number;
}

export interface SeasonalTeacherAppreciation {
  chocolates?: number;
  cakeBallBoxes?: number;
  pieces?: number;
}

export interface SeasonalMothersDay {
  coffeeChocolates?: number;
  cakeBallBoxes?: number;
  pieces?: number;
}

export interface OrderSummary {
  customerInfo: CustomerInfo;
  customOrder: CustomOrder;
  danceRecital: DanceRecital;
  addOns: Record<string, AddOns>;
  halloween?: SeasonalHalloween;
  thanksgiving?: SeasonalThanksgiving;
  christmas?: SeasonalChristmas;
  valentines?: SeasonalValentines;
  easter?: SeasonalEaster;
  teacherAppreciation?: SeasonalTeacherAppreciation;
  mothersDay?: SeasonalMothersDay;
  totals: Totals;
}
