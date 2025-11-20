'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate descriptive texts for each entrepreneurial profile type.
 *
 * It exports:
 * - `generateProfileDescriptions`: An async function that generates profile descriptions.
 * - `ProfileDescriptionsInput`: The input type for the generateProfileDescriptions function.
 * - `ProfileDescriptionsOutput`: The output type for the generateProfileDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfileDescriptionsInputSchema = z.object({
  profileTypes: z.array(z.string()).describe('An array of profile types to generate descriptions for.'),
});
export type ProfileDescriptionsInput = z.infer<typeof ProfileDescriptionsInputSchema>;

const ProfileDescriptionsOutputSchema = z.record(z.string(), z.string()).describe('A record of profile types to their descriptions.');
export type ProfileDescriptionsOutput = z.infer<typeof ProfileDescriptionsOutputSchema>;

export async function generateProfileDescriptions(input: ProfileDescriptionsInput): Promise<ProfileDescriptionsOutput> {
  return generateProfileDescriptionsFlow(input);
}

const profileDescriptionsPrompt = ai.definePrompt({
  name: 'profileDescriptionsPrompt',
  input: {schema: ProfileDescriptionsInputSchema},
  output: {schema: ProfileDescriptionsOutputSchema},
  prompt: `You are an expert in creating concise and engaging descriptions for entrepreneurial profiles.

  Given the following profile types, generate a short, descriptive paragraph for each, explaining what that profile represents in the context of an entrepreneurship event.

  Profile Types:
  {{#each profileTypes}}- {{this}}\n{{/each}}

  Output the profile descriptions in a JSON object where the keys are the profile names and the values are the descriptions.
  Ensure valid JSON format.
  `,
});

const generateProfileDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateProfileDescriptionsFlow',
    inputSchema: ProfileDescriptionsInputSchema,
    outputSchema: ProfileDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await profileDescriptionsPrompt(input);
    return output!;
  }
);
