import { WORDS, type WordCard } from "../data/words";
import { PROFILE_DEFAULTS, type ProfileValues } from "../data/profileFields";
import { getStorageItem, removeStorageItem, setStorageItem } from "./storage";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const PROFILE_STORAGE_KEY = "ec_profile";

export function buildProfileDisplayName(
  profile: ProfileValues,
  fallback: string | null,
): string | null {
  const fullName = [profile["lastName"], profile["firstName"]]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean)
    .join(" ");

  return fullName || fallback;
}

export function getSavedProfileDisplayName(
  fallback: string | null,
): string | null {
  return buildProfileDisplayName(getSavedProfile(), fallback);
}

export function getSavedProfile(): ProfileValues {
  const savedProfile = getStorageItem(PROFILE_STORAGE_KEY);

  if (!savedProfile) return PROFILE_DEFAULTS;

  try {
    return {
      ...PROFILE_DEFAULTS,
      ...JSON.parse(savedProfile),
    } as ProfileValues;
  } catch {
    removeStorageItem(PROFILE_STORAGE_KEY);
    return PROFILE_DEFAULTS;
  }
}

export async function mockLogin(
  login: string,
  password: string,
): Promise<string> {
  await delay(600); // имитация сети
  if (login === "admin" && password === "admin") return "admin";
  throw new Error("Invalid credentials");
}

export async function mockFetchWords(): Promise<WordCard[]> {
  await delay(500);
  return WORDS;
}

export async function mockFetchProfile(): Promise<ProfileValues> {
  await delay(300);
  return getSavedProfile();
}

export async function mockSaveProfile(
  data: ProfileValues,
): Promise<{ ok: true }> {
  await delay(500);
  setStorageItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
  return { ok: true };
}
