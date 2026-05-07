<script lang="ts">
    import { fly, slide } from 'svelte/transition';
	import type { PageData, ActionData } from "./$types";
	import EventForm from '$lib/components/EventForm.svelte';

    let submitting = $state(false);
    let {data, form}: {data: PageData; form: ActionData} = $props();
</script>
<!-- <pre>{JSON.stringify(form, null, 2)}</pre> -->
<EventForm event={data.event} message={form?.message} errors={form?.errors} />