import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/client';

export const _formSchema = z.object({
	playerType: z.enum(['pro', 'amateur', 'international'])
});

export async function load() {
	const form = await superValidate(_formSchema);

	return { form };
}
