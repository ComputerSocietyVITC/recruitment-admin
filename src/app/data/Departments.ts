export const Department: Record<number, string> = {
  0: "Technical",
  1: "HR and Management",
  2: "UI/UX and Design",
  3: "Social Media and Content",
};

export function getKeyFromValue(
  record: Record<number, string>,
  value: string
): number | undefined {
  for (const key of Object.keys(record)) {
    const numericKey = Number(key); // Convert key to a number
    if (record[numericKey] === value) {
      return numericKey;
    }
  }
  return undefined;
}
