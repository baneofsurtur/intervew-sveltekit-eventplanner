<script lang="ts">
    import { fly, slide } from 'svelte/transition';
	import type { PageData, ActionData } from "./$types";
	import EventForm from '$lib/components/EventForm.svelte';

    let submitting = $state(false);
    let {data, form}: {data: PageData; form: ActionData} = $props();
</script>
<EventForm event={data.event} errors={form?.errors} />