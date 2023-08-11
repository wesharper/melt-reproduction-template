<script lang="ts" context="module">
	export type SelectOptions = SelectOptionProps[] | { [key: string]: SelectOptionProps[] };
</script>

<script lang="ts">
	import { melt, type SelectOptionProps, type Select } from '@melt-ui/svelte';
	import { CheckIcon, ChevronDownIcon } from 'heroicons-svelte/24/outline';
	import { fly } from 'svelte/transition';

	export let meltBuilder: Select;
	export let options: SelectOptions;
	export let label: string;
	export let emptyText = '';

	const {
		elements: { trigger, menu, option, group, groupLabel, input, label: meltLabel },
		states: { valueLabel, open, value: internalValue },
		helpers: { isSelected }
	} = meltBuilder;
</script>

<label
	use:melt={$meltLabel}
	for={$meltLabel.for}
	class="block text-sm font-medium leading-6 text-gray-900">{label}</label
>
<div class="mt-2">
	<button
		class="flex h-9 w-full items-center justify-between rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 transition-opacity placeholder:text-gray-400 hover:opacity-90 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
		use:melt={$trigger}
		><span class="truncate sm:leading-6">{$valueLabel || emptyText}</span>
		<ChevronDownIcon class="h-5 w-5 flex-shrink-0" /></button
	>
	{#if $open}
		<div
			transition:fly={{ duration: 150, y: -5 }}
			class="z-10 flex max-h-72 select-none flex-col overflow-y-auto rounded-md bg-white shadow outline-none focus:ring-2 focus:ring-violet-700"
			use:melt={$menu}
		>
			{#if Array.isArray(options)}
				{#each options as opt}
					<div
						class="flex cursor-pointer items-center justify-between px-4 py-1 text-gray-800 outline-none data-[highlighted]:!bg-violet-800 data-[selected]:bg-violet-300 data-[highlighted]:!text-violet-50 data-[selected]:text-violet-900"
						use:melt={$option(opt)}
					>
						{opt.label}
						{#if $isSelected(opt.value)}
							<div class="text-inherit">
								<CheckIcon class="h-5 w-5 stroke-2" />
							</div>
						{/if}
					</div>
				{/each}
			{:else}
				{#each Object.entries(options) as [groupKey, nestedOpts]}
					<div use:melt={$group(groupKey)}>
						<div
							class="bg-violet-600 px-2 py-1 font-semibold capitalize text-violet-50"
							use:melt={$groupLabel(groupKey)}
						>
							{groupKey}
						</div>
						{#each nestedOpts as opt}
							<div
								class="flex cursor-pointer items-center justify-between py-1 pl-4 pr-2 text-gray-800 outline-none data-[highlighted]:!bg-violet-900 data-[selected]:bg-violet-100 data-[highlighted]:!text-violet-100 data-[selected]:text-violet-900"
								use:melt={$option(opt)}
							>
								{opt.label}
								{#if $isSelected(opt.value)}
									<div class="text-inherit">
										<CheckIcon class="h-5 w-5 stroke-2" />
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
