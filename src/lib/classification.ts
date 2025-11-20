"use client";

import { PROFILES, PROFILE_HIERARCHY, COLORS, LOCAL_STORAGE_KEYS } from "./constants";
import type { Answer, Profile, Color } from "./types";

const getInitialCounters = () =>
  PROFILES.reduce((acc, profile) => {
    acc[profile.id] = 0;
    return acc;
  }, {} as Record<string, number>);

export const getProfileCounters = (): Record<string, number> => {
  if (typeof window === "undefined") return getInitialCounters();
  try {
    const counters = localStorage.getItem(LOCAL_STORAGE_KEYS.COUNTERS);
    if (counters) {
      return JSON.parse(counters);
    }
    const initialCounters = getInitialCounters();
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.COUNTERS,
      JSON.stringify(initialCounters)
    );
    return initialCounters;
  } catch (error) {
    console.error("Failed to get counters from localStorage", error);
    return getInitialCounters();
  }
};

export const calculateDominantProfile = (answers: Answer[]): Profile => {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  answers.forEach((answer) => {
    if (answer in counts) {
      counts[answer]++;
    }
  });

  const maxCount = Math.max(...Object.values(counts));
  const tiedLetters = Object.keys(counts).filter(
    (letter) => counts[letter] === maxCount
  );

  let dominantLetter: Answer = "E";
  for (const letter of PROFILE_HIERARCHY) {
    if (tiedLetters.includes(letter)) {
      dominantLetter = letter as Answer;
      break;
    }
  }

  return PROFILES.find((p) => p.id === dominantLetter)!;
};

export const assignColorAndIncrementCounter = (profileId: Answer): Color => {
  if (typeof window === "undefined") {
    // Return a default color for SSR, though this function should only be called on client
    return COLORS[0];
  }
  
  const counters = getProfileCounters();
  const currentCount = counters[profileId] || 0;

  const colorIndex = currentCount % COLORS.length;
  const assignedColor = COLORS[colorIndex];

  const newCounters = {
    ...counters,
    [profileId]: currentCount + 1,
  };

  localStorage.setItem(
    LOCAL_STORAGE_KEYS.COUNTERS,
    JSON.stringify(newCounters)
  );
  
  return assignedColor;
};

export const saveUserResult = (result: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER_RESULT, JSON.stringify(result));
};

export const getUserResult = () => {
  if (typeof window === 'undefined') return null;
  const result = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_RESULT);
  return result ? JSON.parse(result) : null;
};

export const clearUserResult = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_RESULT);
};
