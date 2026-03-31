export class Masks {
  static removeSpecialChars(value: string): string {
    if (!value) return "";
    return value.replace(/[^a-zA-Z0-9]/g, "").trim();
  }

  static cleanName(name: string): string {
    if (!name) return "";
    return name.replace(/[^a-zA-ZÀ-ÿ ]/g, "").trim();
  }
}