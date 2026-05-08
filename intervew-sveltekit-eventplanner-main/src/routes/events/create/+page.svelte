<script lang="ts">
	import type { PageData, ActionData } from "./$types";
	import EventForm from '$lib/components/EventForm.svelte';

    let {data, form}: {data: PageData; form: ActionData} = $props();
</script>
<EventForm event={data.event} errors={form?.errors} />