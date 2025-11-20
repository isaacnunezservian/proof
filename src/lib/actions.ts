"use server";

import { generateProfileDescriptions } from "@/ai/flows/generate-profile-descriptions";
import type { ProfileDescriptionsInput } from "@/ai/flows/generate-profile-descriptions";
import { PROFILES } from "@/lib/constants";

export async function getProfileDescriptionsAction(): Promise<Record<string, string>> {
  try {
    const profileTypes = PROFILES.map(p => p.name);
    const input: ProfileDescriptionsInput = { profileTypes };
    const descriptions = await generateProfileDescriptions(input);
    return descriptions;
  } catch (error) {
    console.error("Error generating profile descriptions:", error);
    // Return a fallback with default descriptions
    return PROFILES.reduce((acc, p) => {
      acc[p.name] = p.description;
      return acc;
    }, {} as Record<string, string>);
  }
}
