const KEY = "soulstack32.pro.v1";

export function isPro(): boolean {
  return localStorage.getItem(KEY) === "1";
}

export function setPro(on: boolean) {
  localStorage.setItem(KEY, on ? "1" : "0");
}

export function clearPro() {
  localStorage.removeItem(KEY);
}
