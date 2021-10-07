import { Attribute, Row } from "./types";

export function makeid(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getNumber(text: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let sum = Array.from(text.toLowerCase()).reduce(
    (total, char) => total + alphabet.indexOf(char) + 1,
    0
  );
  while (sum >= 10) {
    let sumString = String(sum);
    sum = Array.from(sumString).reduce(
      (total, char) => total + Number(char),
      0
    );
  }

  return sum;
}

export function getFirstDigit(attr: Attribute, row: Row): number {
  if (attr === "name") {
    return getNumber(row.name.last);
  } else if (attr === "postcode") {
    return Number(String(row.location.postcode)[0]);
  } else if (attr === "age") {
    return Number(String(row.dob.age)[0]);
  } else if (attr === "latitude") {
    return Number(
      Array.from(row.location.coordinates.latitude).find(
        (char) => Number(char) >= 1 && Number(char) <= 9
      )
    );
  } else if (attr === "street number") {
    return Number(String(row.location.street.number)[0]);
  }
  return 0;
}

export function getData(attr: Attribute, row: Row): string {
  if (attr === "name") {
    return row.name.last;
  } else if (attr === "postcode") {
    return String(row.location.postcode);
  } else if (attr === "age") {
    return String(row.dob.age);
  } else if (attr === "latitude") {
    return row.location.coordinates.latitude;
  } else if (attr === "street number") {
    return String(row.location.street.number);
  }
  return "";
}
export function get(endpoint: string): Promise<Response | undefined> {
  return new Promise((res, rej) => {
    fetch(endpoint)
      .then((response) => setTimeout(() => res(response), 1000))
      .catch(() => res(undefined));
  });
}
