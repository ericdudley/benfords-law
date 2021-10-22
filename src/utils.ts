import { Row } from "./types";

export function getFirstNumber(num: number): string | undefined {
  if (num === Infinity || num === -Infinity || num < 0) {
    return undefined;
  }

  const firstNumber = Number(String(num)[0]);
  return 1 <= firstNumber && firstNumber <= 9 ? String(firstNumber) : undefined;
}

export function getBigIntString(bigInt: BigInt) {
  const maxLength = 24;
  const str = bigInt.toString();
  if (str.length > maxLength) {
    const arr = Array.from(str);
    arr.splice(maxLength, arr.length - maxLength);
    return arr.join("") + "...";
  } else {
    return str;
  }
}

type AttributeHandler = (page: number, seed: number) => Promise<Row[]>;
export const ATTRIBUTE_HANDLERS: Record<string, AttributeHandler> = {
  "Random numbers": async (page: number, seed: number) => {
    const pageSize = 1000;
    const results: Row[] = [];
    for (let i = 0; i < pageSize; i += 1) {
      const value = BigInt(Math.floor(Math.random() * 100000000000));
      const valueStr = getBigIntString(value);
      results.push({
        firstNumber: valueStr[0],
        id: Math.random().toString(),
        label: valueStr,
      });
    }

    return new Promise((res) => setTimeout(() => res(results), 500));
  },
  "Fibonacci Sequence": async (page: number, seed: number) => {
    const pageSize = 40;
    const results: Row[] = [];
    let a = BigInt(0);
    let b = BigInt(1);
    let count = 0;
    while (count < page * pageSize) {
      count += 1;
      let newB = a + b;
      a = b;
      b = newB;

      const firstNumber = getBigIntString(b)[0];
      if (count > (page - 1) * pageSize && firstNumber) {
        results.push({
          firstNumber,
          id: Math.random().toString(),
          label: getBigIntString(b),
        });
      }
    }

    return new Promise((res) => setTimeout(() => res(results), 500));
  },
  Factorials: async (page: number, seed: number) => {
    const pageSize = 100;
    const results: Row[] = [];

    for (let i = (page - 1) * pageSize; i < page * pageSize; i += 1) {
      let value = BigInt(1);
      for (let j = BigInt(1); j <= i; j = j + BigInt(1)) {
        value = value * j;
      }
      const firstNumber = value.toString()[0];
      if (firstNumber) {
        results.push({
          firstNumber,
          id: Math.random().toString(),
          label: `!${i} = ${getBigIntString(value)}`,
        });
      }
    }
    return new Promise((res) => setTimeout(() => res(results), 500));
  },
  "References to published works": async (page: number, seed: number) => {
    const pageSize = 100;
    const response = await fetch(
      `https://api.crossref.org/works?sample=${pageSize}&filter=has-references:true&mailto=crossrefapi@ericdudley.com`
    );
    const json: {
      message: {
        items: {
          "is-referenced-by-count": number;
          title: string[];
          ISSN: string[];
          page: string;
        }[];
      };
    } = await response.json();

    const results = [];

    for (let item of json.message.items) {
      const firstNumber = getFirstNumber(item["is-referenced-by-count"]);
      if (firstNumber) {
        results.push({
          firstNumber,
          id: (item.ISSN && item.ISSN[0]) || Math.random().toString(),
          label:
            (item.title &&
              `${item.title[0]} (${item["is-referenced-by-count"]} references)`) ||
            "Unknown",
        });
      }
    }
    return results;
  },
  "Today's currency conversions": async (page: number, seed: number) => {
    const currenciesJson: Record<string, string> = await (
      await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json"
      )
    ).json();
    const currencies = Array.from(Object.keys(currenciesJson));
    const baseCurrency =
      currencies[
        (Math.floor(seed * (currencies.length - 1)) + page * 4) %
          (currencies.length - 1)
      ];

    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}.min.json`
    );
    const json: Record<string, Record<string, number>> = await response.json();

    const results = [];

    for (let currency of Array.from(Object.keys(json[baseCurrency]))) {
      const value = json[baseCurrency][currency];
      const firstNumber = getFirstNumber(value);
      if (firstNumber) {
        results.push({
          firstNumber,
          id: `usd-${currency}`,
          label: ` 1 ${baseCurrency} = ${json[baseCurrency][currency]} ${currency}`,
        });
      }
    }
    return results;
  },
};
