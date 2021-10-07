export type Attribute = "none" | "name" | "postcode" | "age" | "latitude" | "street number";

export interface Row {
  cell: string;
  dob: { date: string; age: number };
  email: string;
  gender: string;
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    postcode: number;
    coordinates: { latitude: string; longitude: string };
  };
  name: { title: string; first: string; last: string };
  nat: string;
  phone: string;
}
