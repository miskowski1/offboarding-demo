export interface OffboardRequest {
  address: {
    streetLine1: string;
    country: string;
    postalCode: string;
    receiver: string;
  }
  phone: string;
  email: string;
  notes: string | null;
}
