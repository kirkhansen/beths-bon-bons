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
}

export interface DanceRecitalBoxes {
  name: string;
  boxes: number;
}

export interface DanceRecital {
  danceStudio: string | null;
  boxes: Record<string, DanceRecitalBoxes>;
}

export interface Totals {
  totalCakePops: number;
  totalBoxes: number;
  totalAddOnPieces: number;
  grandTotalPieces: number;
}

export interface AddOns {
    name: string;
    quantity: number;
    unit: string;
    pieces: number;
}

export interface OrderSummary {
  customerInfo: CustomerInfo;
  customOrder: CustomOrder;
  danceRecital: DanceRecital;
  addOns: Record<string, AddOns>;
  totals: Totals;
}