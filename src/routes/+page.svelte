<script lang="ts">
	import { superForm, setMessage } from 'sveltekit-superforms/client';
	import { melt, createSelect } from '@melt-ui/svelte';
	import { _formSchema } from './+page';
	import type { PageData } from './$types';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';

	export let data: PageData;

	const { form, errors, message, constraints, enhance, fields } = superForm(data.form, {
		SPA: true,
		validators: _formSchema,
		onUpdate({ form }) {
			if (form.valid) {
				setMessage(form, 'Valid data!');
			} else {
				console.log(form.data, form.errors);
			}
		}
	});

	const playerTypeSelectBuilder = createSelect({
		forceVisible: true,
		required: true,
		name: fields.playerType.name
	});
	const {
		elements: { input: playerTypeInputBuilder }
	} = playerTypeSelectBuilder;

	const playerTypeOptions: { label: string; value: string }[] = [
		{ label: 'International', value: 'international' },
		{ label: 'Amateur', value: 'amateur' },
		{ label: 'Pro', value: 'pro' }
	];
</script>

<SuperDebug data={$form} />
<form action="" on:submit|preventDefault>
	<input use:melt={$playerTypeInputBuilder} bind:value={$form.playerType} />
	<SelectInput
		label="Player type"
		meltBuilder={playerTypeSelectBuilder}
		options={playerTypeOptions}
		emptyText="Select something"
	/>
</form>
